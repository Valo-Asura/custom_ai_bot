import unittest
from unittest.mock import MagicMock, patch
import requests

from app import create_app
from config import Config
from services.llm_service import (
    _clean_api_key,
    _extract_error_detail,
    _openai_compatible_chat,
    generate_response,
    test_chat_connection,
)
from services.provider_service import (
    get_provider_config,
    upsert_provider_config,
    mask_api_key,
)


class TestGroqAndProviders(unittest.TestCase):
    def setUp(self):
        class TestConfig(Config):
            TESTING = True
            SECRET_KEY = 'test-secret'
            GROQ_API_KEY = ''

        self.app = create_app(TestConfig)
        self.ctx = self.app.app_context()
        self.ctx.push()

    def tearDown(self):
        self.ctx.pop()

    def test_clean_api_key(self):
        self.assertEqual(_clean_api_key(None), '')
        self.assertEqual(_clean_api_key(''), '')
        self.assertEqual(_clean_api_key('  gsk_12345  '), 'gsk_12345')
        self.assertEqual(_clean_api_key('"gsk_12345"'), 'gsk_12345')
        self.assertEqual(_clean_api_key("'gsk_12345'"), 'gsk_12345')
        self.assertEqual(_clean_api_key('Bearer gsk_12345'), 'gsk_12345')
        self.assertEqual(_clean_api_key('bearer "gsk_12345"'), 'gsk_12345')

    def test_extract_error_detail(self):
        mock_resp = MagicMock()
        mock_resp.json.return_value = {
            'error': {'message': 'Invalid API Key', 'code': 'invalid_api_key'}
        }
        self.assertEqual(_extract_error_detail(mock_resp), 'Invalid API Key')

    @patch('requests.post')
    def test_groq_401_error_handling(self, mock_post):
        mock_resp = MagicMock()
        mock_resp.ok = False
        mock_resp.status_code = 401
        mock_resp.json.return_value = {
            'error': {'message': 'Invalid API Key', 'code': 'invalid_api_key'}
        }
        mock_post.return_value = mock_resp

        with self.assertRaises(ValueError) as ctx:
            _openai_compatible_chat(
                base_url='https://api.groq.com/openai/v1',
                api_key='invalid_key',
                model='llama-3.3-70b-versatile',
                system_prompt='sys',
                user_prompt='hi',
                provider_name='Groq',
                env_var='GROQ_API_KEY',
            )

        self.assertIn('Groq API authentication failed (401 Unauthorized)', str(ctx.exception))
        self.assertIn('Invalid API Key', str(ctx.exception))
        self.assertIn('GROQ_API_KEY', str(ctx.exception))

    def test_missing_groq_api_key_message(self):
        with self.assertRaises(ValueError) as ctx:
            generate_response(
                provider='groq',
                model='llama-3.3-70b-versatile',
                api_key='',
                system_prompt='sys',
                user_prompt='hi',
            )
        self.assertIn('API key is missing for Groq', str(ctx.exception))
        self.assertIn('GROQ_API_KEY', str(ctx.exception))

    @patch('requests.post')
    def test_groq_chat_success(self, mock_post):
        mock_resp = MagicMock()
        mock_resp.ok = True
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            'choices': [{'message': {'content': 'Hello there!'}}]
        }
        mock_post.return_value = mock_resp

        answer = generate_response(
            provider='groq',
            model='llama-3.3-70b-versatile',
            api_key='gsk_valid_key',
            system_prompt='sys',
            user_prompt='hi',
        )
        self.assertEqual(answer, 'Hello there!')

    @patch('services.llm_service.generate_response')
    def test_test_chat_connection(self, mock_gen):
        mock_gen.return_value = 'Connected successfully'
        ok, msg = test_chat_connection('groq', 'llama-3.3-70b-versatile', 'gsk_test')
        self.assertTrue(ok)
        self.assertIn('Success! Groq answered', msg)

        mock_gen.side_effect = ValueError('Groq API authentication failed (401 Unauthorized)')
        ok, msg = test_chat_connection('groq', 'llama-3.3-70b-versatile', 'gsk_bad')
        self.assertFalse(ok)
        self.assertIn('401 Unauthorized', msg)

    def test_provider_key_clearing(self):
        user_id = 1
        upsert_provider_config(
            user_id=user_id,
            chat_provider='groq',
            chat_model='llama-3.3-70b-versatile',
            chat_api_key='gsk_custom_key',
            embedding_provider='gemini',
            embedding_model='gemini-embedding-001',
            embedding_api_key='gem_custom_key',
        )

        cfg = get_provider_config(user_id)
        self.assertEqual(cfg['chat_api_key'], 'gsk_custom_key')

        # Now clear the custom chat key
        upsert_provider_config(
            user_id=user_id,
            chat_provider='groq',
            chat_model='llama-3.3-70b-versatile',
            chat_api_key='',
            embedding_provider='gemini',
            embedding_model='gemini-embedding-001',
            embedding_api_key='',
            clear_chat_key=True,
        )

        cfg_after = get_provider_config(user_id)
        self.assertEqual(cfg_after['chat_api_key'], '')

    def test_providers_test_route_unauthenticated(self):
        client = self.app.test_client()
        resp = client.post('/providers/test', json={
            'chat_provider': 'groq',
            'chat_model': 'llama-3.3-70b-versatile',
            'chat_api_key': 'invalid_key',
        })
        # Should redirect to login when unauthenticated
        self.assertEqual(resp.status_code, 302)

    @patch('services.rag_service.generate_response')
    def test_chat_with_bot_failure_does_not_consume_message_quota(self, mock_gen):
        from services.rag_service import chat_with_bot, list_chat_messages
        mock_gen.side_effect = ValueError('Groq API authentication failed (401 Unauthorized): Invalid API Key.')

        initial_messages = list_chat_messages(1)

        with self.assertRaises(ValueError):
            chat_with_bot(1, 'Hello bot!')

        after_messages = list_chat_messages(1)
        self.assertEqual(len(initial_messages), len(after_messages))


if __name__ == '__main__':
    unittest.main()

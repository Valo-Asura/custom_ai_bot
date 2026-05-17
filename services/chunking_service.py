from langchain_text_splitters import RecursiveCharacterTextSplitter
from flask import current_app


def split_text(text: str) -> list[str]:
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=current_app.config['CHUNK_SIZE'],
        chunk_overlap=current_app.config['CHUNK_OVERLAP'],
    )
    chunks = [chunk.strip() for chunk in splitter.split_text(text) if chunk.strip()]
    return chunks

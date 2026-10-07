import React from 'react';

export default function PersonalityPage({ profile }) {
  return (
    <>
      <section className="page-header"><div><h1>Bot Personality</h1><p className="muted">Configure how your personal assistant should behave.</p></div></section>
      <section className="card">
        <form method="post" action="/personality" className="stack-form">
          <div className="grid two-col">
            <label>Bot Name<input type="text" name="bot_name" defaultValue={profile.bot_name} required /></label>
            <label>Tone<input type="text" name="tone" defaultValue={profile.tone} placeholder="Clear, concise, friendly" /></label>
          </div>
          <label>Personality / System Prompt<textarea name="personality_prompt" rows="3" defaultValue={profile.personality_prompt} required /></label>
          <label>Short Description<textarea name="description" rows="2" defaultValue={profile.description} placeholder="What is this bot optimized for?" /></label>
          <div className="form-footer-row"><span className="muted inline-note">💡 Safety &amp; instruction rules are automatically applied to keep your bot schema clean.</span><button type="submit">Save Personality</button></div>
        </form>
      </section>
    </>
  );
}

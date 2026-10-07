import React from 'react';

export default function KeyClearOption({ name, label }) {
  return <div style={{ marginTop: -6, marginBottom: 12 }}><label style={{ fontSize: '0.85rem', fontWeight: 'normal', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><input type="checkbox" name={name} value="1" /> {label}</label></div>;
}

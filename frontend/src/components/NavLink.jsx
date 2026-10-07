import React from 'react';

export default function NavLink({ href, children }) {
  const active = window.location.pathname === href;
  return <a href={href} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>{children}</a>;
}

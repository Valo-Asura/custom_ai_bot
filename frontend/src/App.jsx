import React from 'react';
import AppShell from './components/AppShell';
import { LoginPage, SignupPage } from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import PersonalityPage from './pages/PersonalityPage';
import ProvidersPage from './pages/ProvidersPage';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';

function Page({ page, props }) {
  switch (page) {
    case 'login': return <LoginPage />;
    case 'signup': return <SignupPage />;
    case 'dashboard': return <DashboardPage {...props} />;
    case 'personality': return <PersonalityPage {...props} />;
    case 'providers': return <ProvidersPage {...props} />;
    case 'upload': return <UploadPage {...props} />;
    case 'chat': return <ChatPage {...props} />;
    case 'admin': return <AdminPage {...props} />;
    default: return <section className="card"><h1>Page not found</h1><a href="/dashboard">Return to dashboard</a></section>;
  }
}

export default function App({ bootstrap }) {
  const { page, props = {}, currentUser, flashes = [] } = bootstrap;
  return <AppShell currentUser={currentUser} flashes={flashes}><Page page={page} props={props} /></AppShell>;
}

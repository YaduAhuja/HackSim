import React from 'react'

import { AppShell } from '@mantine/core';
import LoginPage from './pages/login';

const App: React.FC = () => {
  return (
    <AppShell>
      <AppShell.Main>
        <LoginPage />
      </AppShell.Main>
    </AppShell>
  )
};

export default App

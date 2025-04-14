import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={{ primaryColor: 'green' }} >
      <App />
    </MantineProvider>
  </StrictMode >,
)

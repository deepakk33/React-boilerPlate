import { ReactKeycloakProvider } from '@react-keycloak/web'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import { ApiLoader } from './components/index.ts'
import { keycloakCredentials } from './utils/keycloak.ts'
import { setBrowserSession } from './utils/helpers'
import './styles/main.scss'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //
  <ReactKeycloakProvider
    authClient={keycloakCredentials}
    initOptions={{ checkLoginIframe: false, onLoad: 'check-sso' }}
    onTokens={({ token }) => {
      if (token) {
        setBrowserSession(token)
      }
    }}
    LoadingComponent={<ApiLoader type="linear" />}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactKeycloakProvider>
)

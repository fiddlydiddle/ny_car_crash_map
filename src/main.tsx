import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MapContainer } from 'react-leaflet'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapContainer
      center={[40.7128, -74.0060]}
      zoom={10}
    >
      <App />
    </MapContainer>
  </StrictMode>,
)

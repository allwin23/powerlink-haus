import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from './components/WalletProvider.tsx'

createRoot(document.getElementById("root")!).render(<WalletProvider><App /></WalletProvider>);

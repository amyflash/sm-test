import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initGA } from './utils/analytics.ts';

// Initialize Google Analytics (GA4)
initGA();

createRoot(document.getElementById('root')!).render(<App />);

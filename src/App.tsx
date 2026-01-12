import { useState } from 'react';
import { Home } from './components/Home';
import { Results } from './components/Results';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks'; 
import { AnimatedBackground } from './components/AnimatedBackground';
export type Page = 'home' | 'results' | 'about' | 'how-it-works';
export interface DetectionResult {
  url: string;
  isPhishing: boolean;
  confidence: number;
  features: {
    urlLength: number;
    hasIP: boolean;
    hasAtSymbol: boolean;
    subdomainCount: number;
    httpsUsed: boolean;
  };
} 
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const handleScan = (url: string) => {  
    const mockResult: DetectionResult = {
      url, 
      isPhishing: Math.random() > 0.5,
      confidence: Math.random() * 40 + 60, 
      features: {
        urlLength: url.length,
        hasIP: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url),
        hasAtSymbol: url.includes('@'),
        subdomainCount: (url.match(/\./g) || []).length,
        httpsUsed: url.startsWith('https')
      }
    };
    
    setDetectionResult(mockResult);
    setCurrentPage('results');
  };
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {currentPage === 'home' && (
          <Home onScan={handleScan} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'results' && detectionResult && (
          <Results result={detectionResult} onNavigate={setCurrentPage} onNewScan={() => setCurrentPage('home')} />
        )}
        {currentPage === 'about' && (
          <About onNavigate={setCurrentPage} />
        )}
        {currentPage === 'how-it-works' && (
          <HowItWorks onNavigate={setCurrentPage} />
        )}
      </div>
    </div>
  );
}

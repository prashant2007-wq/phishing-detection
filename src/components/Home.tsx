import { useState } from 'react';
import { Shield, Search, AlertTriangle, Lock, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigation } from './Navigation';
import type { Page } from '../App';

interface HomeProps {
  onScan: (url: string) => void;
  onNavigate: (page: Page) => void;
}

export function Home({ onScan, onNavigate }: HomeProps) {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      setIsScanning(true);
      setTimeout(() => {
        onScan(url);
        setIsScanning(false);
      }, 2000);
    }
  };

  const stats = [
    { icon: Shield, label: 'URLs Scanned', value: '1.2M+', color: 'text-blue-400' },
    { icon: AlertTriangle, label: 'Threats Blocked', value: '450K+', color: 'text-red-400' },
    { icon: Zap, label: 'Detection Speed', value: '<1s', color: 'text-yellow-400' },
    { icon: Lock, label: 'Accuracy', value: '99.2%', color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentPage="home" onNavigate={onNavigate} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                <Shield className="w-20 h-20 text-blue-400 mx-auto" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(59, 130, 246, 0)',
                      '0 0 40px rgba(59, 130, 246, 0.6)',
                      '0 0 0px rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Protect Yourself from
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Phishing Attacks
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Advanced AI-powered detection system to identify malicious URLs and keep you safe online
            </p>
          </motion.div>

          {/* URL Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl mb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to scan (e.g., https://example.com)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    disabled={isScanning}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={!url.trim() || isScanning}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: url.trim() && !isScanning ? 1.02 : 1 }}
                  whileTap={{ scale: url.trim() && !isScanning ? 0.98 : 1 }}
                >
                  {isScanning ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Scan URL for Threats
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Your data is never stored or shared</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
                >
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

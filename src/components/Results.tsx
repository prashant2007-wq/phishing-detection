import { Shield, AlertTriangle, CheckCircle2, XCircle, ArrowLeft, BarChart3, Info, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigation } from './Navigation';
import type { Page, DetectionResult } from '../App';

interface ResultsProps {
  result: DetectionResult;
  onNavigate: (page: Page) => void;
  onNewScan: () => void;
}

export function Results({ result, onNavigate, onNewScan }: ResultsProps) {
  const isPhishing = result.isPhishing;
  const confidence = result.confidence;

  const features = [
    { 
      label: 'URL Length', 
      value: result.features.urlLength,
      status: result.features.urlLength > 75 ? 'warning' : 'safe',
      description: result.features.urlLength > 75 ? 'Suspicious length' : 'Normal length'
    },
    { 
      label: 'HTTPS Protocol', 
      value: result.features.httpsUsed ? 'Yes' : 'No',
      status: result.features.httpsUsed ? 'safe' : 'danger',
      description: result.features.httpsUsed ? 'Secure connection' : 'Insecure connection'
    },
    { 
      label: 'IP Address', 
      value: result.features.hasIP ? 'Detected' : 'Not Found',
      status: result.features.hasIP ? 'danger' : 'safe',
      description: result.features.hasIP ? 'Contains IP address' : 'No IP detected'
    },
    { 
      label: '@ Symbol', 
      value: result.features.hasAtSymbol ? 'Found' : 'Not Found',
      status: result.features.hasAtSymbol ? 'warning' : 'safe',
      description: result.features.hasAtSymbol ? 'Contains @ symbol' : 'Clean URL'
    },
    { 
      label: 'Subdomain Count', 
      value: result.features.subdomainCount,
      status: result.features.subdomainCount > 3 ? 'warning' : 'safe',
      description: result.features.subdomainCount > 3 ? 'Multiple subdomains' : 'Normal structure'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'danger': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage="home" onNavigate={onNavigate} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNewScan}
            className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-4 h-4" />
            Scan Another URL
          </motion.button>

          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          >
            {/* Result Icon and Status */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-block mb-6"
              >
                {isPhishing ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl" />
                    <AlertTriangle className="w-24 h-24 text-red-400 relative" />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
                    <CheckCircle2 className="w-24 h-24 text-green-400 relative" />
                  </div>
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl font-bold mb-4 ${isPhishing ? 'text-red-400' : 'text-green-400'}`}
              >
                {isPhishing ? 'Phishing Detected!' : 'URL is Safe'}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-300 text-lg mb-6"
              >
                {isPhishing 
                  ? 'This URL appears to be a phishing attempt. Do not enter any personal information.'
                  : 'This URL appears to be legitimate and safe to visit.'}
              </motion.p>

              {/* Confidence Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-6 py-3"
              >
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Confidence:</span>
                <span className={`text-xl font-bold ${isPhishing ? 'text-red-400' : 'text-green-400'}`}>
                  {confidence.toFixed(1)}%
                </span>
              </motion.div>
            </div>

            {/* URL Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 mb-8"
            >
              <div className="flex items-start gap-3">
                <LinkIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 mb-1">Scanned URL</div>
                  <div className="text-white font-mono text-sm break-all">{result.url}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Detailed Analysis</h3>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{feature.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{feature.value}</span>
                      {feature.status === 'safe' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {feature.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                      {feature.status === 'danger' && <XCircle className="w-5 h-5 text-red-400" />}
                    </div>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusColor(feature.status)}`}>
                    {feature.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-8 text-center"
          >
            <motion.button
              onClick={onNewScan}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Scan Another URL
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

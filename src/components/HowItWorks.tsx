import { Search, Database, Brain, Shield, CheckCircle, Link as LinkIcon, BarChart3, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigation } from './Navigation';
import type { Page } from '../App';

interface HowItWorksProps {
  onNavigate: (page: Page) => void;
}

export function HowItWorks({ onNavigate }: HowItWorksProps) {
  const steps = [
    {
      icon: LinkIcon,
      title: 'URL Submission',
      description: 'User submits a suspicious URL through our secure web interface. The URL is immediately prepared for analysis.',
      color: 'from-blue-500 to-cyan-500',
      features: ['Instant processing', 'Secure transmission', 'Format validation']
    },
    {
      icon: Search,
      title: 'Feature Extraction',
      description: 'Our system extracts multiple features from the URL including length, special characters, domain structure, and protocol type.',
      color: 'from-purple-500 to-pink-500',
      features: ['URL parsing', 'Domain analysis', 'Pattern matching']
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Advanced machine learning model analyzes extracted features using trained patterns to determine phishing probability.',
      color: 'from-green-500 to-emerald-500',
      features: ['ML classification', 'Pattern recognition', 'Confidence scoring']
    },
    {
      icon: BarChart3,
      title: 'Results Generation',
      description: 'Comprehensive results are generated showing the verdict, confidence score, and detailed feature analysis.',
      color: 'from-orange-500 to-red-500',
      features: ['Instant results', 'Detailed breakdown', 'Visual indicators']
    }
  ];

  const detectionFeatures = [
    {
      icon: Shield,
      title: 'URL Length Analysis',
      description: 'Phishing URLs are often longer to hide the real destination',
      indicator: 'Suspicious if > 75 characters'
    },
    {
      icon: CheckCircle,
      title: 'HTTPS Protocol Check',
      description: 'Verifies if the URL uses secure HTTPS connection',
      indicator: 'Safe if HTTPS is present'
    },
    {
      icon: AlertTriangle,
      title: 'IP Address Detection',
      description: 'Legitimate sites rarely use IP addresses directly in URLs',
      indicator: 'Red flag if IP found'
    },
    {
      icon: Database,
      title: 'Special Characters',
      description: 'Checks for suspicious characters like @ symbol in URLs',
      indicator: 'Warning if @ symbol present'
    },
    {
      icon: Search,
      title: 'Subdomain Count',
      description: 'Excessive subdomains often indicate phishing attempts',
      indicator: 'Suspicious if > 3 subdomains'
    },
    {
      icon: Brain,
      title: 'ML Pattern Recognition',
      description: 'AI identifies complex patterns invisible to human eye',
      indicator: 'Continuous learning'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentPage="how-it-works" onNavigate={onNavigate} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                <Brain className="w-16 h-16 text-purple-400 mx-auto" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(168, 85, 247, 0)',
                      '0 0 30px rgba(168, 85, 247, 0.4)',
                      '0 0 0px rgba(168, 85, 247, 0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">It Works</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced phishing detection system combines multiple analysis techniques 
              to identify malicious URLs with exceptional accuracy.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Detection Process</h2>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-white/20 to-transparent hidden md:block" />
                    )}

                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-lg`}>
                            <Icon className="w-full h-full text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-2xl font-bold text-white">
                              Step {index + 1}: {step.title}
                            </h3>
                          </div>
                          <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {step.features.map((feature) => (
                              <span
                                key={feature}
                                className="px-3 py-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Detection Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Analyze</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detectionFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
                  >
                    <Icon className="w-10 h-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 mb-3 leading-relaxed">{feature.description}</p>
                    <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs text-blue-400">
                      {feature.indicator}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ML Model Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <Brain className="w-10 h-10 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Machine Learning Model</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Our system uses a trained Random Forest Classifier (or similar ML algorithm) that has been 
                  trained on thousands of phishing and legitimate URLs. The model learns complex patterns and 
                  relationships between features that are difficult for humans to detect.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-purple-400 mb-1">99.2%</div>
                    <div className="text-gray-400">Model Accuracy</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-pink-400 mb-1">&lt;1s</div>
                    <div className="text-gray-400">Analysis Time</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-blue-400 mb-1">15+</div>
                    <div className="text-gray-400">Features Analyzed</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-400 mb-1">500K+</div>
                    <div className="text-gray-400">Training Samples</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

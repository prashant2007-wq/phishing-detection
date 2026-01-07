import { Shield, Target, Lock, Zap, Users, Globe, Brain, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Navigation } from './Navigation';
import type { Page } from '../App';

interface AboutProps {
  onNavigate: (page: Page) => void;
}

export function About({ onNavigate }: AboutProps) {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze URLs using multiple features and patterns to identify phishing attempts.',
      color: 'text-purple-400'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Get instant results in under a second. Our optimized system provides immediate feedback on URL safety.',
      color: 'text-yellow-400'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data is never stored or shared. All analysis happens in real-time and your information remains private.',
      color: 'text-green-400'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Our model achieves 99.2% accuracy through continuous training on the latest phishing techniques and patterns.',
      color: 'text-red-400'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Protection against phishing attempts from around the world, supporting all major URL formats and schemes.',
      color: 'text-blue-400'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Learning',
      description: 'Our system constantly evolves and improves, adapting to new phishing techniques as they emerge.',
      color: 'text-pink-400'
    }
  ];

  const stats = [
    { value: '1.2M+', label: 'URLs Analyzed' },
    { value: '450K+', label: 'Threats Blocked' },
    { value: '99.2%', label: 'Accuracy Rate' },
    { value: '<1s', label: 'Response Time' }
  ];

  return (
    <div className="min-h-screen">
      <Navigation currentPage="about" onNavigate={onNavigate} />
      
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
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Shield className="w-16 h-16 text-blue-400 mx-auto" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">PhishGuard</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A cutting-edge phishing detection system powered by advanced machine learning, 
              designed to protect you from online threats and keep your digital life secure.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl mb-12"
          >
            <div className="flex items-start gap-4 mb-4">
              <Target className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Phishing attacks are responsible for over 90% of data breaches, costing billions of 
                  dollars annually and compromising millions of personal accounts. Our mission is to make 
                  the internet a safer place by providing free, accessible, and powerful phishing detection 
                  tools to everyone.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Using state-of-the-art machine learning algorithms and continuous threat intelligence, 
                  we analyze URL patterns, domain characteristics, and behavioral indicators to identify 
                  malicious websites before they can cause harm.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl"
                  >
                    <Icon className={`w-10 h-10 ${feature.color} mb-4`} />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">By The Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <Users className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Built With Modern Technology</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  PhishGuard is built using cutting-edge technologies including Python for machine learning 
                  (scikit-learn), Flask for the backend API, and modern web technologies for a seamless user experience.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'scikit-learn', 'Flask', 'Pandas', 'NumPy', 'React', 'Tailwind CSS'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Cpu, Network, Layers, ArrowRight } from 'lucide-react';

const steps = [
  { id: 'input', title: 'Input Image', icon: ImageIcon, desc: 'Raw image upload (RGB)' },
  { id: 'preprocess', title: 'Preprocessing', icon: Layers, desc: 'Resize to 299x299, Normalize' },
  { id: 'model', title: 'InceptionV3', icon: Network, desc: 'Feature extraction via Inception modules' },
  { id: 'output', title: 'Prediction', icon: Cpu, desc: 'Sigmoid/Softmax classification (AI vs Real)' },
];

export default function ExplanationView() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-heading font-bold mb-4">How the Model Works</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Our backend uses a fine-tuned InceptionV3 model trained on the CIFAKE dataset, achieving ~98% accuracy extracting deep features from AI-generated artifacts.
        </p>
      </div>

      {/* Animated Flowchart */}
      <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
        {/* Animated Particle Path */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 hidden md:block z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan -translate-y-1/2 hidden md:block z-0"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-white dark:bg-dark-card shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-4 relative group">
                <step.icon className="w-8 h-8 text-neon-purple group-hover:scale-110 transition-transform" />
                
                {/* Mobile Arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute -bottom-8 md:hidden">
                    <ArrowRight className="w-6 h-6 rotate-90 text-slate-400" />
                  </div>
                )}
              </div>
              <h4 className="font-heading font-semibold text-lg">{step.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Architecture (Mock 3D representation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading font-semibold mb-4 text-lg">Inception Modules</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The InceptionV3 architecture uses specialized multiple-sized filters (1x1, 3x3, 5x5) simultaneously within the same layer to capture both localized and global artifacts left by generative AI.
          </p>
          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <motion.div 
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="flex-1 h-24 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30"
              />
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-heading font-semibold mb-4 text-lg">Classification Head</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            The extracted semantic features are pooled and passed to a final dense layer, calculating the probability of the image being Real or an AI Fake (CIFAKE).
          </p>
          <div className="space-y-2">
            {['AI-Generated', 'Real Image'].map((cls, i) => (
              <div key={cls} className="flex items-center text-sm">
                <span className="w-24 font-medium">{cls}</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mx-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${98 - i * 3}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-neon-cyan"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

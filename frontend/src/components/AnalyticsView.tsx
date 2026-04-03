import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Target, TrendingUp, Activity, Zap } from 'lucide-react';

const epochData = Array.from({ length: 20 }, (_, i) => ({
  epoch: i + 1,
  accuracy: 80 + Math.log(i + 1) * 6 + Math.random() * 1.5, // Climbs up to ~98
  loss: 1.5 * Math.exp(-i / 4) + Math.random() * 0.05,
}));

const metrics = [
  { label: 'Accuracy', value: '98.1%', icon: Target, color: 'text-green-500' },
  { label: 'Precision', value: '97.8%', icon: TrendingUp, color: 'text-blue-500' },
  { label: 'Recall', value: '98.5%', icon: Activity, color: 'text-neon-purple' },
  { label: 'F1-Score', value: '98.1%', icon: Zap, color: 'text-neon-cyan' },
];

export default function AnalyticsView({ isDark }: { isDark: boolean }) {
  const chartColor = isDark ? '#00f3ff' : '#4F46E5';
  const chartColor2 = isDark ? '#bc13fe' : '#E11D48';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center group hover:bg-white/80 dark:hover:bg-dark-card/80 transition-all"
          >
            <metric.icon className={`w-8 h-8 mb-3 ${metric.color} group-hover:scale-110 transition-transform`} />
            <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
            <p className="text-2xl font-bold font-heading">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-heading font-semibold mb-6">Accuracy vs Epochs</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={epochData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="epoch" stroke={textColor} fontSize={12} tickLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1F2E' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: chartColor }}
                />
                <Area type="monotone" dataKey="accuracy" stroke={chartColor} strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-lg font-heading font-semibold mb-6">Loss vs Epochs</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={epochData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="epoch" stroke={textColor} fontSize={12} tickLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#1A1F2E' : '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: chartColor2 }}
                />
                <Line type="monotone" dataKey="loss" stroke={chartColor2} strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Feature Importance Heatmap (Mock) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-2xl p-6 overflow-hidden"
      >
        <h3 className="text-lg font-heading font-semibold mb-4">Feature Importance (Attention Map)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-3 rounded-tl-lg">Feature Layer</th>
                <th className="px-6 py-3">Relevance Score</th>
                <th className="px-6 py-3 rounded-tr-lg">Impact Heatmap</th>
              </tr>
            </thead>
            <tbody>
              {[
                { layer: 'Inception_Module_A (Edges)', score: 0.85, color: 'bg-red-500' },
                { layer: 'Inception_Module_C', score: 0.62, color: 'bg-orange-500' },
                { layer: 'Inception_Module_E (Textures)', score: 0.91, color: 'bg-red-600' },
                { layer: 'Global_Average_Pooling', score: 0.98, color: 'bg-red-700' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-200 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.layer}</td>
                  <td className="px-6 py-4">{row.score.toFixed(2)}</td>
                  <td className="px-6 py-4 w-1/2">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${row.score * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className={`h-2.5 rounded-full ${row.color}`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

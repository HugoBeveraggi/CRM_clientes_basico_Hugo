import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import type { Client } from '../../types/client';
import { KANBAN_COLUMNS } from '../../constants/kanban';
import { formatCurrency } from '../../utils/format';

interface DashboardProps {
  clients: Client[];
}

export const Dashboard: React.FC<DashboardProps> = ({ clients }) => {
  const { t } = useTranslation();

  // ── Metrics Calculation ──────────────────────────────────────────────────
  const metrics = useMemo(() => {
    // 1. Win Rate
    const won = clients.filter((c) => c.status === 'won').length;
    const lost = clients.filter((c) => c.status === 'lost').length;
    const closed = won + lost;
    const winRate = closed > 0 ? Math.round((won / closed) * 100) : 0;

    // 2. Top Clients (Top 5 sorted by expectedAmount descending)
    const topClients = [...clients]
      .filter((c) => c.expectedAmount > 0 && c.status === 'won')
      .sort((a, b) => b.expectedAmount - a.expectedAmount)
      .slice(0, 5);

    // 3. Status Distributions (for charts)
    const statusData = KANBAN_COLUMNS.map((col) => {
      const colClients = clients.filter((c) => c.status === col.id);
      const totalAmount = colClients.reduce((sum, c) => sum + c.expectedAmount, 0);
      return {
        id: col.id,
        name: t(`kanban.columns.${col.id}`),
        count: colClients.length,
        value: totalAmount,
        color: col.headerColor, // We use the kanban column header color for the charts!
      };
    });

    return { winRate, topClients, statusData, won, lost };
  }, [clients, t]);

  // ── Custom Tooltip for Bar Chart ─────────────────────────────────────────
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 rounded-[var(--radius-md)] shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold text-[var(--color-text)] mb-1">{label}</p>
          <p className="text-sm text-[var(--color-accent-light)] font-bold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-4 hover:border-[var(--color-accent)]/50 transition-colors">
          <div className="p-3 bg-green-500/10 rounded-full text-green-500 shrink-0">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-[var(--color-text-dim)] font-medium">Tasa de Éxito</p>
            <h3 className="text-2xl font-bold text-[var(--color-text)] mt-1">{metrics.winRate}%</h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {metrics.won} ganados / {metrics.lost} perdidos
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-4 hover:border-[var(--color-accent)]/50 transition-colors">
          <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-500 shrink-0">
            <Trophy size={24} />
          </div>
          <div className="min-w-0 w-full">
            <p className="text-sm text-[var(--color-text-dim)] font-medium mb-1">Mejores Clientes</p>
            <select 
              className="
                w-full bg-[var(--color-bg)] text-[var(--color-text)] font-semibold text-sm
                border border-[var(--color-border)] rounded-[var(--radius-md)]
                px-2 py-1.5 focus:outline-none focus:border-[var(--color-accent)]
                cursor-pointer
              "
            >
              {metrics.topClients.length > 0 ? (
                metrics.topClients.map((c, idx) => (
                  <option key={c.id} value={c.id}>
                    #{idx + 1} {c.name} - {formatCurrency(c.expectedAmount)}
                  </option>
                ))
              ) : (
                <option value="">Ningún cliente ganado</option>
              )}
            </select>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 flex items-start gap-4 hover:border-[var(--color-accent)]/50 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-full text-blue-500 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-[var(--color-text-dim)] font-medium">Total Clientes</p>
            <h3 className="text-2xl font-bold text-[var(--color-text)] mt-1">{clients.length}</h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              En todas las etapas
            </p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Bar Chart: Revenue by Status */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 h-[360px] flex flex-col">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-6">Ingresos Esperados por Etapa</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.statusData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-dim)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="var(--color-text-dim)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(val) => `$${val >= 1000 ? (val/1000).toFixed(0) + 'k' : val}`}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'var(--color-border)', opacity: 0.2 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {metrics.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Clients by Status */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5 h-[360px] flex flex-col">
          <h3 className="text-sm font-semibold text-[var(--color-text)] mb-2">Distribución de Clientes</h3>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.statusData.filter(d => d.count > 0)}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  stroke="none"
                >
                  {metrics.statusData.filter(d => d.count > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '10px' }}
                  itemStyle={{ color: 'var(--color-text)', fontWeight: 'bold' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span style={{ color: 'var(--color-text)' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};

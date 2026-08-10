/**
 * StatsBar — Mini CRM
 * Top statistics bar showing key CRM metrics at a glance.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  TrendingUp,
  Trophy,
  HeartCrack,
  Activity,
} from 'lucide-react';
import type { CRMStats } from '../../types/client';
import { formatCurrencyCompact } from '../../utils/format';

interface StatsBarProps {
  stats: CRMStats;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  accentColor: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subValue,
  accentColor,
  trend,
}) => (
  <div
    className="
      relative flex-1 min-w-[160px]
      bg-[var(--color-card)] rounded-[var(--radius-lg)]
      border border-[var(--color-border)]
      p-4 overflow-hidden
      hover-card transition-all
      group
    "
    style={{
      borderTopColor: accentColor,
      borderTopWidth: '2px',
    }}
  >
    {/* Background glow effect */}
    <div
      className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"
      style={{ background: accentColor }}
    />

    <div className="relative flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
          {label}
        </span>
        <span className="text-2xl font-bold text-[var(--color-text)] tabular-nums leading-none">
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-[var(--color-text-dim)]">{subValue}</span>
        )}
      </div>

      <div
        className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center"
        style={{ background: `${accentColor}1a`, color: accentColor }}
      >
        {icon}
      </div>
    </div>

    {trend && (
      <div className={`
        absolute bottom-3 right-4 text-xs font-medium
        ${trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-[var(--color-text-dim)]'}
      `}>
        {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
      </div>
    )}
  </div>
);

export const StatsBar: React.FC<StatsBarProps> = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-3 animate-fade-in">
      <StatCard
        icon={<Users size={20} />}
        label={t('stats.totalClients')}
        value={stats.totalClients}
        subValue={`${stats.activeClients} activos`}
        accentColor="#6c63ff"
        trend="neutral"
      />
      <StatCard
        icon={<TrendingUp size={20} />}
        label={t('stats.potentialRevenue')}
        value={formatCurrencyCompact(stats.totalPotentialRevenue)}
        subValue="clientes activos"
        accentColor="#63b3ed"
        trend="up"
      />
      <StatCard
        icon={<Trophy size={20} />}
        label={t('stats.won')}
        value={stats.wonClients}
        subValue={`${stats.conversionRate}% conversión`}
        accentColor="#48bb78"
        trend="up"
      />
      <StatCard
        icon={<HeartCrack size={20} />}
        label={t('stats.lost')}
        value={stats.lostClients}
        subValue="cerrados sin éxito"
        accentColor="#fc8181"
        trend={stats.lostClients > stats.wonClients ? 'down' : 'neutral'}
      />
      <StatCard
        icon={<Activity size={20} />}
        label="Tasa de Conversión"
        value={`${stats.conversionRate}%`}
        subValue="ganados / cerrados"
        accentColor="#f6ad55"
        trend={stats.conversionRate >= 50 ? 'up' : 'down'}
      />
    </div>
  );
};

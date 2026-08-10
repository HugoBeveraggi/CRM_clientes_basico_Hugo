/**
 * Header — Mini CRM
 * Top navigation bar with branding, global search, filters, and quick actions.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Plus,
  SlidersHorizontal,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import type { FiltersState, SortField, ClientStatus } from '../../types/client';
import { KANBAN_COLUMNS } from '../../constants/kanban';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  filters: FiltersState;
  onFilterChange: <K extends keyof FiltersState>(key: K, value: FiltersState[K]) => void;
  onResetFilters: () => void;
  onAddClient: () => void;
  totalFiltered: number;
  totalAll: number;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onAddClient,
  totalFiltered,
  totalAll,
}) => {
  const { t, i18n } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const { theme, setTheme } = useTheme();

  const SORT_FIELDS: { value: SortField; label: string }[] = [
    { value: 'createdAt', label: t('header.sortFields.createdAt') },
    { value: 'name', label: t('header.sortFields.name') },
    { value: 'company', label: t('header.sortFields.company') },
    { value: 'expectedAmount', label: t('header.sortFields.expectedAmount') },
  ];

  const hasActiveFilters =
    filters.search !== '' ||
    filters.status !== 'all' ||
    filters.minAmount !== '' ||
    filters.maxAmount !== '' ||
    filters.sortField !== 'createdAt' ||
    filters.sortDirection !== 'desc';

  const toggleSortDirection = () => {
    onFilterChange(
      'sortDirection',
      filters.sortDirection === 'asc' ? 'desc' : 'asc'
    );
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Top row: brand + actions */}
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="
              w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center
              bg-[var(--color-accent)] shadow-lg shadow-[var(--color-accent-glow)]
            ">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M17 20H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8a2 2 0 01-2 2z"
                  fill="white" fillOpacity="0.9"
                />
                <path
                  d="M12 11v4M10 13h4"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-[var(--color-text)] leading-none">
                {t('app.title').replace('Pro', '')}<span className="gradient-text">Pro</span>
              </h1>
              <p className="text-[10px] text-[var(--color-text-dim)] leading-none mt-0.5">
                {t('app.subtitle')}
              </p>
            </div>
          </div>

          {/* Global search */}
          <div className="flex-1 max-w-md">
            <Input
              id="global-search"
              placeholder={t('header.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              leftIcon={<Search size={14} />}
              rightIcon={
                filters.search ? (
                  <button
                    onClick={() => onFilterChange('search', '')}
                    className="text-[var(--color-text-dim)] hover:text-[var(--color-text)] cursor-pointer"
                    aria-label={t('header.clearSearch')}
                  >
                    <X size={14} />
                  </button>
                ) : null
              }
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full mr-2">
              <button
                onClick={() => setTheme('dark')}
                className={`w-6 h-6 rounded-full bg-[#1a1a2e] border-2 transition-all ${theme === 'dark' ? 'border-indigo-400 scale-110' : 'border-transparent hover:scale-110'}`}
                title={t('header.themes.dark', 'Oscuro')}
                aria-label="Oscuro"
              />
              <button
                onClick={() => setTheme('orange')}
                className={`w-6 h-6 rounded-full bg-orange-500 border-2 transition-all ${theme === 'orange' ? 'border-orange-800 scale-110' : 'border-transparent hover:scale-110'}`}
                title={t('header.themes.orange', 'Naranja')}
                aria-label="Naranja"
              />
              <button
                onClick={() => setTheme('frutiger')}
                className={`w-6 h-6 rounded-full border-2 transition-all shadow-sm ${theme === 'frutiger' ? 'border-blue-900 scale-110' : 'border-transparent hover:scale-110'}`}
                title={t('header.themes.frutiger', 'Aero')}
                aria-label="Frutiger Aero"
                style={{ background: 'radial-gradient(circle at 30% 30%, #e0f2fe, #0284c7)' }}
              />
            </div>

            {/* Language toggle */}
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleLanguage}
            >
              <span className="text-sm">{i18n.language === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}</span>
            </Button>

            {/* Filter toggle */}
            <Button
              variant={showFilters ? 'primary' : 'secondary'}
              size="sm"
              icon={<SlidersHorizontal size={14} />}
              onClick={() => setShowFilters((v) => !v)}
            >
              <span className="hidden sm:inline">{t('header.filters')}</span>
              {hasActiveFilters && (
                <span className="
                  w-4 h-4 rounded-full bg-[var(--color-accent-light)] text-white
                  text-[9px] font-bold flex items-center justify-center
                  -ml-1
                ">
                  !
                </span>
              )}
            </Button>

            {/* Add client */}
            <Button
              variant="primary"
              size="sm"
              onClick={onAddClient}
              icon={<Plus size={14} />}
            >
              <span className="hidden sm:inline">{t('header.newClient')}</span>
            </Button>
          </div>
        </div>

        {/* Filter bar (expandable) */}
        {showFilters && (
          <div className="
            py-3 pb-4 flex flex-wrap items-end gap-3
            border-t border-[var(--color-border)]
            animate-fade-in
          ">
            {/* Status filter */}
            <Select
              label={t('header.status')}
              id="filter-status"
              value={filters.status}
              onChange={(e) =>
                onFilterChange('status', e.target.value as ClientStatus | 'all')
              }
              wrapperClassName="min-w-[160px]"
            >
              <option value="all">{t('header.allStatuses')}</option>
              {KANBAN_COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.icon} {t(`kanban.columns.${col.id}`)}
                </option>
              ))}
            </Select>

            {/* Sort field */}
            <Select
              label={t('header.sortBy')}
              id="filter-sort"
              value={filters.sortField}
              onChange={(e) =>
                onFilterChange('sortField', e.target.value as SortField)
              }
              wrapperClassName="min-w-[160px]"
            >
              {SORT_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </Select>

            {/* Sort direction toggle */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                {t('header.direction')}
              </label>
              <Button
                variant="secondary"
                size="md"
                onClick={toggleSortDirection}
                icon={
                  filters.sortDirection === 'asc' ? (
                    <ArrowUp size={14} />
                  ) : (
                    <ArrowDown size={14} />
                  )
                }
              >
                {filters.sortDirection === 'asc' ? t('header.asc') : t('header.desc')}
              </Button>
            </div>

            {/* Amount range */}
            <Input
              label={t('header.minAmount')}
              id="filter-min"
              type="number"
              min="0"
              placeholder="0"
              value={filters.minAmount}
              onChange={(e) => onFilterChange('minAmount', e.target.value)}
              wrapperClassName="w-28"
            />
            <Input
              label={t('header.maxAmount')}
              id="filter-max"
              type="number"
              min="0"
              placeholder="∞"
              value={filters.maxAmount}
              onChange={(e) => onFilterChange('maxAmount', e.target.value)}
              wrapperClassName="w-28"
            />

            {/* Result count + reset */}
            <div className="flex items-end gap-2 ml-auto">
              <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap pb-2">
                {t('header.showing', { filtered: totalFiltered, total: totalAll })}
              </span>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onResetFilters}
                  icon={<X size={12} />}
                >
                  {t('header.clearFilters')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Phone, 
  Mail, 
  Users, 
  FileText, 
  Bell, 
  CheckCircle2, 
  Circle,
  Plus,
  Calendar,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/Button';
import type { Activity, ActivityType } from '../../types/client';
import { generateId } from '../../utils/format';

interface ActivityTimelineProps {
  activities: Activity[];
  onChange: (activities: Activity[]) => void;
}

const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  note: <FileText size={16} />,
  call: <Phone size={16} />,
  email: <Mail size={16} />,
  meeting: <Users size={16} />,
  reminder: <Bell size={16} />,
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  note: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  call: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  email: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  meeting: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  reminder: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, onChange }) => {
  const { t } = useTranslation();
  const [newType, setNewType] = useState<ActivityType>('note');
  const [newContent, setNewContent] = useState('');
  const [newDate, setNewDate] = useState('');

  const handleAdd = () => {
    if (!newContent.trim()) return;

    const activity: Activity = {
      id: generateId(),
      type: newType,
      date: newType === 'reminder' && newDate ? new Date(newDate).toISOString() : new Date().toISOString(),
      content: newContent.trim(),
      ...(newType === 'reminder' ? { completed: false } : {}),
    };

    onChange([activity, ...activities]);
    setNewContent('');
    setNewDate('');
  };

  const toggleCompleted = (id: string) => {
    onChange(
      activities.map((a) =>
        a.id === id && a.type === 'reminder'
          ? { ...a, completed: !a.completed }
          : a
      )
    );
  };

  const deleteActivity = (id: string) => {
    onChange(activities.filter((a) => a.id !== id));
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {/* Add New Activity Form */}
      <div className="bg-[var(--color-bg)] p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {(Object.keys(ACTIVITY_ICONS) as ActivityType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setNewType(type)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap
                ${
                  newType === type
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
                }
              `}
            >
              {ACTIVITY_ICONS[type]}
              <span className="capitalize">{t(`timeline.types.${type}`)}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <textarea
            placeholder={t('timeline.addPlaceholder', { type: t(`timeline.types.${newType}`) })}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={2}
            className="w-full bg-[var(--color-surface)] text-[var(--color-text)] text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] px-3 py-2 resize-none focus:outline-none focus:border-[var(--color-accent)]"
          />
          
          {newType === 'reminder' && (
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-[var(--color-text-muted)]" />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="bg-[var(--color-surface)] text-[var(--color-text)] text-sm border border-[var(--color-border)] rounded-[var(--radius-sm)] px-2 py-1 focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={handleAdd}
              disabled={!newContent.trim() || (newType === 'reminder' && !newDate)}
              icon={<Plus size={14} />}
            >
              {t('timeline.add')}
            </Button>
          </div>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {sortedActivities.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-text-muted)] py-4">
            {t('timeline.empty')}
          </p>
        ) : (
          sortedActivities.map((act) => {
            const isOverdue = act.type === 'reminder' && !act.completed && new Date(act.date) < new Date(new Date().setHours(0,0,0,0));
            
            return (
              <div key={act.id} className={`group flex gap-3 p-3 rounded-[var(--radius-sm)] border ${isOverdue ? 'border-red-500/50 bg-red-500/5' : 'border-[var(--color-border)] bg-[var(--color-surface)]'}`}>
                <div className={`mt-0.5 shrink-0 p-2 rounded-full border h-fit ${ACTIVITY_COLORS[act.type]}`}>
                  {ACTIVITY_ICONS[act.type]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <p className={`text-sm ${act.type === 'reminder' && act.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}`}>
                      {act.content}
                    </p>
                    {act.type === 'reminder' && (
                      <button
                        type="button"
                        onClick={() => toggleCompleted(act.id)}
                        className={`shrink-0 ${act.completed ? 'text-emerald-500' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'}`}
                      >
                        {act.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${isOverdue ? 'text-red-500 font-bold' : 'text-[var(--color-text-muted)]'}`}>
                      {new Date(act.date).toLocaleDateString()} {isOverdue && ` ${t('timeline.overdue')}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteActivity(act.id)}
                      className="text-xs text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} /> {t('timeline.delete')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

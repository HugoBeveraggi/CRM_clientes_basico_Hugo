/**
 * ClientModal — Mini CRM
 * Create / Edit client form in a modal dialog.
 * Uses controlled inputs with basic validation.
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  User,
  Building2,
  Phone,
  Mail,
  DollarSign,
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { Client, ClientFormData, ClientStatus } from '../../types/client';
import { KANBAN_COLUMNS } from '../../constants/kanban';
import { ActivityTimeline } from './ActivityTimeline';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
  client?: Client | null;       // If set → edit mode; otherwise → create mode
  defaultStatus?: ClientStatus;
}

// ---------------------------------------------------------------------------
// Empty form state factory
// ---------------------------------------------------------------------------
const emptyForm = (defaultStatus: ClientStatus = 'new'): ClientFormData => ({
  name: '',
  company: '',
  phone: '',
  email: '',
  expectedAmount: 0,
  status: defaultStatus,
  activities: [],
});

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
type FormErrors = Partial<Record<keyof ClientFormData, string>>;

function validateForm(data: ClientFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'El nombre es obligatorio';
  
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Formato de email inválido';
  }
  
  if (data.expectedAmount < 0) errors.expectedAmount = 'El importe no puede ser negativo';
  return errors;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  client,
  defaultStatus = 'new',
}) => {
  const { t } = useTranslation();
  const isEditing = Boolean(client);

  const [form, setForm] = useState<ClientFormData>(
    client ? { ...client } : emptyForm(defaultStatus)
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  // Reset form whenever modal opens/closes or client changes
  useEffect(() => {
    if (isOpen) {
      setForm(client ? { ...client } : emptyForm(defaultStatus));
      setErrors({});
    }
  }, [isOpen, client, defaultStatus]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = <K extends keyof ClientFormData>(
    key: K,
    value: ClientFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear field error on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    // Simulate brief async delay for UX feedback
    await new Promise((r) => setTimeout(r, 200));
    onSave(form);
    setIsSaving(false);
    onClose();
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const footer = (
    <div className="flex items-center justify-end gap-3">
      <Button variant="ghost" onClick={onClose} disabled={isSaving}>
        {t('client.modal.cancel')}
      </Button>
      <Button
        type="submit"
        form="client-form"
        loading={isSaving}
        icon={
          !isSaving ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : undefined
        }
      >
        {isEditing ? t('client.modal.saveChanges') : t('client.modal.create')}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? t('client.modal.titleEdit') : t('client.modal.titleNew')}
      subtitle={
        isEditing
          ? t('client.modal.subtitleEdit', { name: client?.name })
          : t('client.modal.subtitleNew')
      }
      footer={footer}
    >
      <form
        id="client-form"
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Row 1: Name + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('client.modal.labels.name')}
            id="client-name"
            placeholder={t('client.modal.placeholders.name')}
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name ? t('client.modal.errors.nameRequired') : undefined}
            leftIcon={<User size={14} />}
            autoFocus
          />
          <Input
            label={t('client.modal.labels.company')}
            id="client-company"
            placeholder={t('client.modal.placeholders.company')}
            value={form.company}
            onChange={(e) => handleChange('company', e.target.value)}
            error={errors.company}
            leftIcon={<Building2 size={14} />}
          />
        </div>

        {/* Row 2: Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('client.modal.labels.phone')}
            id="client-phone"
            type="tel"
            placeholder={t('client.modal.placeholders.phone')}
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            error={errors.phone}
            leftIcon={<Phone size={14} />}
          />
          <Input
            label={t('client.modal.labels.email')}
            id="client-email"
            type="email"
            placeholder={t('client.modal.placeholders.email')}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email ? t('client.modal.errors.emailInvalid') : undefined}
            leftIcon={<Mail size={14} />}
          />
        </div>

        {/* Row 3: Amount + Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('client.modal.labels.amount')}
            id="client-amount"
            type="number"
            min="0"
            step="100"
            placeholder="0"
            value={form.expectedAmount === 0 ? '' : String(form.expectedAmount)}
            onChange={(e) =>
              handleChange('expectedAmount', parseFloat(e.target.value) || 0)
            }
            error={errors.expectedAmount ? t('client.modal.errors.amountNegative') : undefined}
            leftIcon={<DollarSign size={14} />}
          />
          <Select
            label={t('client.modal.labels.status')}
            id="client-status"
            value={form.status}
            onChange={(e) =>
              handleChange('status', e.target.value as ClientStatus)
            }
          >
            {KANBAN_COLUMNS.map((col) => (
              <option key={col.id} value={col.id}>
                {col.icon} {t(`kanban.columns.${col.id}`)}
              </option>
            ))}
          </Select>
        </div>

        {/* Activities Timeline */}
        <div className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-4 mt-2">
          <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            {t('client.modal.labels.historyAndReminders')}
          </label>
          <ActivityTimeline 
            activities={form.activities || []} 
            onChange={(activities) => handleChange('activities', activities)}
          />
        </div>
      </form>
    </Modal>
  );
};

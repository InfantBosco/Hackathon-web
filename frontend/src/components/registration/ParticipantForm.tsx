import React from 'react';
import { ParticipantInput } from '../../services/registrationService';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { RadioGroup } from '../ui/Radio';
import { User, Mail, Phone, GraduationCap, Building2, Linkedin, Utensils } from 'lucide-react';

export interface ParticipantFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  college?: string;
  department?: string;
  yearOfStudy?: string;
  linkedinUrl?: string;
  foodPreference?: string;
}

interface ParticipantFormProps {
  title: string;
  description?: string;
  data: ParticipantInput;
  onChange: (data: Partial<ParticipantInput>) => void;
  errors?: ParticipantFormErrors;
  isCaptain?: boolean;
}

const YEAR_OPTIONS = [
  { value: '1st Year', label: '1st Year (UG)' },
  { value: '2nd Year', label: '2nd Year (UG)' },
  { value: '3rd Year', label: '3rd Year (UG)' },
  { value: '4th Year', label: '4th Year (UG)' },
  { value: 'PG / Other', label: 'Postgraduate / Other' },
];

const FOOD_OPTIONS = [
  { value: 'VEGETARIAN', label: 'Vegetarian', description: 'Pure vegetarian food provided at venue' },
  { value: 'NON_VEGETARIAN', label: 'Non-Vegetarian', description: 'Non-vegetarian food provided at venue' },
];

export const ParticipantForm: React.FC<ParticipantFormProps> = ({
  title,
  description,
  data,
  onChange,
  errors = {},
  isCaptain = false,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-[var(--color-accent-cyan)]" />
          {title}
        </h3>
        {description && <p className="text-xs text-[var(--color-text-secondary)] mt-1">{description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <Input
          label="Full Name *"
          placeholder="e.g. Alex Morgan"
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          error={errors.name}
          leftIcon={<User className="w-4 h-4" />}
        />

        {/* Email Address */}
        <Input
          label={isCaptain ? 'Email Address (Account Owner) *' : 'Email Address *'}
          type="email"
          placeholder="e.g. alex@example.com"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          disabled={isCaptain}
          error={errors.email}
          description={isCaptain ? 'Pre-filled from your authenticated account.' : undefined}
          leftIcon={<Mail className="w-4 h-4" />}
        />

        {/* Phone Number */}
        <Input
          label="Phone Number *"
          type="tel"
          placeholder="e.g. 9876543210"
          value={data.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          error={errors.phone}
          leftIcon={<Phone className="w-4 h-4" />}
        />

        {/* College Name */}
        <Input
          label="College / Institution Name *"
          placeholder="e.g. Karunya Institute of Technology and Sciences"
          value={data.college}
          onChange={(e) => onChange({ college: e.target.value })}
          error={errors.college}
          leftIcon={<Building2 className="w-4 h-4" />}
        />

        {/* Department */}
        <Input
          label="Department / Branch *"
          placeholder="e.g. Computer Science & Engineering"
          value={data.department}
          onChange={(e) => onChange({ department: e.target.value })}
          error={errors.department}
          leftIcon={<GraduationCap className="w-4 h-4" />}
        />

        {/* Year of Study */}
        <Select
          label="Year of Study *"
          options={YEAR_OPTIONS}
          value={data.yearOfStudy}
          onChange={(e) => onChange({ yearOfStudy: e.target.value })}
          error={errors.yearOfStudy}
        />
      </div>

      {/* LinkedIn URL */}
      <Input
        label="LinkedIn Profile URL (Optional)"
        placeholder="https://linkedin.com/in/username"
        value={data.linkedinUrl || ''}
        onChange={(e) => onChange({ linkedinUrl: e.target.value })}
        error={errors.linkedinUrl}
        leftIcon={<Linkedin className="w-4 h-4" />}
      />

      {/* Food Preference */}
      <div className="pt-2">
        <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] font-medium flex items-center gap-1.5 mb-2">
          <Utensils className="w-3.5 h-3.5 text-[var(--color-accent-cyan)]" />
          Food Preference *
        </label>
        <RadioGroup
          name={`foodPref-${title.replace(/\s+/g, '-')}`}
          options={FOOD_OPTIONS}
          selectedValue={data.foodPreference}
          onChange={(val) => onChange({ foodPreference: val as any })}
          error={errors.foodPreference}
        />
      </div>
    </div>
  );
};

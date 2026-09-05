import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useRegistrationStore } from '../store/useRegistrationStore';
import { ParticipantInput } from '../services/registrationService';
import { AuthNavbar } from '../components/navigation/AuthNavbar';
import { GridBackground } from '../components/backgrounds/GridBackground';
import { NeuralNoise } from '../components/backgrounds/NeuralNoise';
import { RegistrationProgress } from '../components/registration/RegistrationProgress';
import { TeamInfoStep } from '../components/registration/TeamInfoStep';
import { ParticipantForm, ParticipantFormErrors } from '../components/registration/ParticipantForm';
import { ReviewStep } from '../components/registration/ReviewStep';
import { PaymentBoundaryHandoff } from '../components/registration/PaymentBoundaryHandoff';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const RegistrationWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const {
    currentStep,
    setStep,
    teamName,
    setTeamName,
    captain,
    updateCaptain,
    member2,
    updateMember2,
    member3,
    updateMember3,
    member4,
    updateMember4,
    initCaptainFromUser,
    isSubmitting,
    error,
    submittedRegistration,
    submitFullRegistration,
  } = useRegistrationStore();

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const {
    fetchUserRegistration,
  } = useRegistrationStore();

  useEffect(() => {
    if (user) {
      initCaptainFromUser(user);
      fetchUserRegistration(user.id).then((existingReg) => {
        if (existingReg) {
          navigate('/registration/status', { replace: true });
        }
      });
    }
  }, [user, initCaptainFromUser, fetchUserRegistration, navigate]);

  // Email format regex & phone validation helper
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidPhone = (phone: string) => phone.trim().replace(/\D/g, '').length >= 10;

  const validateParticipant = (p: ParticipantInput, _isCaptain = false): ParticipantFormErrors => {
    const errors: ParticipantFormErrors = {};
    if (!p.name || p.name.trim().length < 2) {
      errors.name = 'Full name must be at least 2 characters.';
    }
    if (!p.email || !isValidEmail(p.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!p.phone || !isValidPhone(p.phone)) {
      errors.phone = 'Phone number must be at least 10 digits.';
    }
    if (!p.college || p.college.trim().length < 2) {
      errors.college = 'College/Institution name is required.';
    }
    if (!p.department || p.department.trim().length < 2) {
      errors.department = 'Department is required.';
    }
    if (!p.yearOfStudy) {
      errors.yearOfStudy = 'Please select year of study.';
    }
    if (p.linkedinUrl && p.linkedinUrl.trim() && !/^https?:\/\//i.test(p.linkedinUrl.trim())) {
      errors.linkedinUrl = 'LinkedIn URL must start with http:// or https://';
    }
    return errors;
  };

  const handleNextStep = () => {
    setStepErrors({});
    let errors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!teamName || teamName.trim().length < 2) {
        errors.teamName = 'Team name must be at least 2 characters.';
      }
    } else if (currentStep === 2) {
      const pErrors = validateParticipant(captain, true);
      if (Object.keys(pErrors).length > 0) errors = pErrors as Record<string, string>;
    } else if (currentStep === 3) {
      const pErrors = validateParticipant(member2);
      if (Object.keys(pErrors).length > 0) errors = pErrors as Record<string, string>;

      // Check unique emails
      if (member2.email.trim().toLowerCase() === captain.email.trim().toLowerCase()) {
        errors.email = 'Member 2 email cannot be the same as Team Captain email.';
      }
    } else if (currentStep === 4) {
      const pErrors = validateParticipant(member3);
      if (Object.keys(pErrors).length > 0) errors = pErrors as Record<string, string>;

      const emails = [captain.email, member2.email].map((e) => e.trim().toLowerCase());
      if (emails.includes(member3.email.trim().toLowerCase())) {
        errors.email = 'Member 3 email must be unique across all team members.';
      }
    } else if (currentStep === 5) {
      const pErrors = validateParticipant(member4);
      if (Object.keys(pErrors).length > 0) errors = pErrors as Record<string, string>;

      const emails = [captain.email, member2.email, member3.email].map((e) => e.trim().toLowerCase());
      if (emails.includes(member4.email.trim().toLowerCase())) {
        errors.email = 'Member 4 email must be unique across all team members.';
      }
    }

    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }

    if (currentStep < 6) {
      setStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setStepErrors({});
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const handleSubmitRegistration = async () => {
    if (!user) return;
    await submitFullRegistration(user.id);
  };

  return (
    <GridBackground className="min-h-screen flex flex-col justify-between relative overflow-hidden">
      <NeuralNoise opacity={0.25} />
      <AuthNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Step Indicator Header (Steps 1–6) */}
        {currentStep <= 6 && (
          <>
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-cyan)] font-bold">
                HACKNEX 2026 REGISTRATION
              </span>
              <h1 className="text-3xl font-heading font-bold text-white mt-1">
                Team Registration Wizard
              </h1>
            </div>

            <RegistrationProgress
              currentStep={currentStep}
              onStepClick={(step) => {
                if (step < currentStep) setStep(step);
              }}
            />
          </>
        )}

        {/* Step Content Area */}
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/20 rounded-[var(--radius-lg)] p-6 md:p-8 shadow-2xl">
          {currentStep === 1 && (
            <TeamInfoStep
              teamName={teamName}
              onChange={setTeamName}
              error={stepErrors.teamName}
            />
          )}

          {currentStep === 2 && (
            <ParticipantForm
              title="Team Captain Details (Member 1)"
              description="Your profile as team captain initiating registration for HackNEX 2026."
              data={captain}
              onChange={updateCaptain}
              errors={stepErrors}
              isCaptain={true}
            />
          )}

          {currentStep === 3 && (
            <ParticipantForm
              title="Team Member 2 Details"
              description="Enter the second participant details for your 4-member team."
              data={member2}
              onChange={updateMember2}
              errors={stepErrors}
            />
          )}

          {currentStep === 4 && (
            <ParticipantForm
              title="Team Member 3 Details"
              description="Enter the third participant details for your 4-member team."
              data={member3}
              onChange={updateMember3}
              errors={stepErrors}
            />
          )}

          {currentStep === 5 && (
            <ParticipantForm
              title="Team Member 4 Details"
              description="Enter the fourth participant details for your 4-member team."
              data={member4}
              onChange={updateMember4}
              errors={stepErrors}
            />
          )}

          {currentStep === 6 && (
            <ReviewStep
              teamName={teamName}
              captain={captain}
              member2={member2}
              member3={member3}
              member4={member4}
              onEditStep={setStep}
              onSubmit={handleSubmitRegistration}
              isSubmitting={isSubmitting}
              error={error}
            />
          )}

          {currentStep === 7 && submittedRegistration && (
            <PaymentBoundaryHandoff
              summary={submittedRegistration}
              onReturnHome={() => navigate('/')}
            />
          )}

          {/* Navigation Controls for Steps 1 through 5 */}
          {currentStep >= 1 && currentStep <= 5 && (
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  variant="ghost"
                  onClick={handlePrevStep}
                  className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-secondary)] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
              ) : (
                <div />
              )}

              <Button
                onClick={handleNextStep}
                className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-bold bg-[var(--color-accent-cyan)] text-black hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </GridBackground>
  );
};

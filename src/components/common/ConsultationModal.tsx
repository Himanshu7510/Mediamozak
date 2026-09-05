import React from 'react';
import { X } from 'lucide-react';
import { LeadForm } from './LeadForm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  sourcePage?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'digital-marketing',
  sourcePage = '/',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          id="close-consultation-modal"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <LeadForm
          defaultService={defaultService}
          sourcePage={sourcePage}
          title="Claim Your Free Growth Consultation"
          subtitle="Speak with Mediamozak’s marketing team in West Delhi. We evaluate your current acquisition channels and map a high-ROI growth framework tailored to your category."
          className="border-0 !p-0 !bg-transparent shadow-none"
          onSuccess={() => {
            setTimeout(onClose, 3500);
          }}
        />
      </div>
    </div>
  );
};

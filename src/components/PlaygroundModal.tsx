import React from 'react';
import { X } from 'lucide-react';
import { CodePlayground } from './CodePlayground';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[95vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 bg-[#1E293B] text-white border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
              1С
            </div>
            <span className="font-bold text-sm">Интерактивный симулятор встроенного языка</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <CodePlayground />
        </div>
      </div>
    </div>
  );
};

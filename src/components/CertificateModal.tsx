import React, { useState } from 'react';
import { X, Award, Printer, CheckCircle, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onSaveName: (name: string) => void;
  completedHours: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onSaveName,
  completedHours
}) => {
  const [name, setName] = useState<string>(studentName || 'Иванов Иван Иванович');

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  const handleSave = () => {
    onSaveName(name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 print:border-none print:shadow-none print:my-0">
        
        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Генератор официального сертификата установленного образца
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar (Hidden in Print) */}
        <div className="p-6 bg-amber-50/50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
          <div className="w-full sm:w-auto flex-1">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ФИО студента / слушателя (в родительном или именительном падеже):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleSave();
              }}
              placeholder="Например: Смирнов Алексей Дмитриевич"
              className="w-full px-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Печать / Сохранить в PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Sheet (Printable A4 ratio canvas) */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 relative print:p-8">
          {/* Decorative 1C Yellow and Gold Double Border */}
          <div className="border-4 border-amber-400 p-2 rounded-2xl">
            <div className="border-2 border-red-600/40 p-8 sm:p-12 rounded-xl text-center relative bg-[radial-gradient(#fef3c7_1px,transparent_1px)] [background-size:16px_16px]">
              
              {/* Certificate Header */}
              <div className="mb-6 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Образовательная программа практической подготовки
                </p>
                <p className="text-xs sm:text-sm font-black uppercase tracking-wide text-slate-800">
                  Практикум разработки прикладных решений «1С:Предприятие 8.3»
                </p>
              </div>

              {/* 1C Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 mb-6 shadow-sm">
                <div className="w-5 h-5 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
                  1С
                </div>
                <span className="text-xs font-black tracking-wider text-amber-950 uppercase">
                  1С:Предприятие 8.3 • Образовательная инициатива
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#B91C1C] mb-2 font-serif">
                СЕРТИФИКАТ
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 tracking-widest uppercase font-semibold mb-6">
                об освоении дополнительной общеобразовательной программы
              </p>

              <p className="text-xs text-slate-500 mb-2">Настоящим подтверждается, что</p>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-slate-300 pb-2 mb-6 max-w-xl mx-auto font-serif tracking-wide">
                {name || 'Иванов Иван Иванович'}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed mb-6">
                успешно освоил(а) дополнительную общеобразовательную программу технической направленности:
                <br />
                <strong className="text-base sm:text-lg text-slate-950 font-bold block mt-1">
                  «Первый шаг в 1С-разработку: практикум для начинающих»
                </strong>
                в объеме <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">24 академических часов</span>, выполнил(а) практические работы по проектированию объектов метаданных, программированию на встроенном языке и защитил(а) собственный прикладной проект.
              </p>

              {/* Signatures & Seal */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-6 border-t border-slate-200">
                <div className="space-y-1 text-left">
                  <p className="text-xs font-bold text-slate-900">Евдокимова Дарина Игоревна</p>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Разработчик и автор образовательной программы
                  </p>
                </div>
                <div className="font-serif italic text-slate-400 text-xs text-right">
                  Подпись: ______________________
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>2026 г.</span>
                <span>Регистрационный номер: 1С-START-2026/042</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

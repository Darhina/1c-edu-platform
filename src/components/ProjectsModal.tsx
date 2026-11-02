import React, { useState } from 'react';
import { X, Trophy, CheckCircle, Database, FileText, Layers, Check, Copy, ArrowRight, XCircle } from 'lucide-react';
import { PROJECT_TOPICS } from '../data/projectsData';
import { ProjectTopic } from '../types';

interface ProjectsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProjectId?: string;
  onSelectProject: (projectId: string | undefined) => void;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({
  isOpen,
  onClose,
  selectedProjectId,
  onSelectProject
}) => {
  // If user selected a project, preview that one; otherwise preview the first topic in the list without selecting it
  const [activeTopicId, setActiveTopicId] = useState<string>(selectedProjectId || PROJECT_TOPICS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentTopic = PROJECT_TOPICS.find(t => t.id === activeTopicId) || PROJECT_TOPICS[0];

  const handleCopySpec = () => {
    const text = `
ТЕМА ПРОЕКТА: ${currentTopic.title}
СФЕРА: ${currentTopic.targetDomain}
ОПИСАНИЕ: ${currentTopic.subtitle}

БИЗНЕС-ЦЕЛИ:
${currentTopic.businessGoals.map(g => '• ' + g).join('\n')}

СТРУКТУРА МЕТАДАННЫХ 1С:
Подсистемы: ${currentTopic.metadataSchema.subsystems.join(', ')}
Справочники: ${currentTopic.metadataSchema.catalogs.map(c => `${c.name} (${c.attributes.join(', ')})`).join('; ')}
Документы: ${currentTopic.metadataSchema.documents.map(d => `${d.name} [Таб: ${d.tableParts.join(', ')}]`).join('; ')}
Регистры: ${currentTopic.metadataSchema.registers.map(r => `${r.name} (${r.type})`).join('; ')}
Отчеты СКД: ${currentTopic.metadataSchema.reports.map(rep => rep.name).join('; ')}

КРИТЕРИИ ЗАЩИТЫ:
${currentTopic.defenseCriteria.map(c => '• ' + c).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCurrentTopicSelected = selectedProjectId === currentTopic.id;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1E293B] text-white border-b border-slate-700">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-amber-400 flex items-center justify-center font-black text-[#B91C1C] text-xs">
              ★
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                Банк тем сквозных практических проектов для итоговой защиты
              </h3>
              <p className="text-[11px] text-slate-400">
                {selectedProjectId 
                  ? `Выбрана тема для защиты: ${PROJECT_TOPICS.find(t => t.id === selectedProjectId)?.title}`
                  : 'Тема еще не выбрана (выберите 1 проект из 6 предложенных)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Topics List on Left */}
          <div className="md:col-span-4 bg-slate-50 dark:bg-slate-850 p-4 border-r border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[75vh]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Темы проектов (1 из 6):
              </span>
              {selectedProjectId && (
                <button
                  onClick={() => onSelectProject(undefined)}
                  className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
                  title="Сбросить выбор темы"
                >
                  <XCircle className="w-3 h-3" />
                  <span>Сбросить</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              {PROJECT_TOPICS.map((topic, idx) => {
                const isCurrent = activeTopicId === topic.id;
                const isSelectedForExam = selectedProjectId === topic.id;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      isCurrent
                        ? 'border-amber-500 bg-amber-50/80 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 shadow-sm font-semibold'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                        Тема {idx + 1}
                      </span>
                      {isSelectedForExam ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Мой выбор
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Не выбрано</span>
                      )}
                    </div>
                    <p className="line-clamp-2 leading-tight">{topic.title}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Topic Details on Right */}
          <div className="md:col-span-8 p-6 overflow-y-auto max-h-[75vh] flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                    {currentTopic.targetDomain}
                  </span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopySpec}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Скопировано!' : 'Копировать ТЗ'}</span>
                    </button>
                    
                    {isCurrentTopicSelected ? (
                      <button
                        onClick={() => onSelectProject(undefined)}
                        className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-emerald-600 hover:bg-red-600 text-white font-bold transition-all"
                        title="Нажмите, чтобы снять выбор"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Тема выбрана (нажмите для отмены)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectProject(currentTopic.id)}
                        className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Выбрать эту тему для защиты</span>
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {currentTopic.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentTopic.subtitle}
                </p>
              </div>

              {/* Goals */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Ключевые бизнес-цели прикладного решения:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {currentTopic.businessGoals.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metadata Schema */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-500" />
                  Рекомендуемая архитектура метаданных:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Справочники:</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      {currentTopic.metadataSchema.catalogs.map((cat, i) => (
                        <li key={i}>
                          <strong>{cat.name}</strong>: {cat.attributes.join(', ')}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850">
                    <span className="font-bold text-red-600 dark:text-red-400 block mb-1">Документы:</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      {currentTopic.metadataSchema.documents.map((doc, i) => (
                        <li key={i}>
                          <strong>{doc.name}</strong> ({doc.purpose})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Регистры:</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      {currentTopic.metadataSchema.registers.map((reg, i) => (
                        <li key={i}>
                          <strong>{reg.name}</strong> ({reg.type})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850">
                    <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Отчеты (СКД):</span>
                    <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                      {currentTopic.metadataSchema.reports.map((rep, i) => (
                        <li key={i}>
                          <strong>{rep.name}</strong>: {rep.purpose}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sample workflow */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 mb-2">
                  Пример сквозного сценария демонстрации на защите:
                </h4>
                <ol className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside">
                  {currentTopic.sampleBusinessProcess.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Защита: регламент 5-7 минут + демонстрация выгрузки базы .dt</span>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 font-semibold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, MessageCircle, Heart, Smile } from 'lucide-react';

interface MascotCatProps {
  lessonId?: string;
  className?: string;
}

const MASCOT_TIPS: Record<string, string[]> = {
  'home': [
    'Привет, будущий 1С-разработчик! Я Барсик, твой пушистый наставник. Давай освоим 1С с нуля легко и весело!',
    'Знаешь ли ты, что на 1С работает более 90% предприятий страны? Твои навыки будут супер-востребованы!',
    'Не переживай, если раньше не кодил: встроенный язык 1С полностью на русском — это очень дружелюбно!'
  ],
  'lecture-1': [
    'Формула успеха проста: Платформа (движок) + Конфигурация (твоя бизнес-логика) = Информационная база!',
    'Вся база хранится в одном компактном файле 1Cv8.1CD. Его можно просто скинуть на флешку перед защитой!'
  ],
  'lecture-2': [
    'Запомни две главные горячие клавиши: F5 запускает режим Предприятия, а F1 открывает Синтакс-помощник!',
    'Дерево метаданных в Конфигураторе — твой главный компас. Все справочники и документы живут именно там!'
  ],
  'lecture-3': [
    'Справочники отвечают на вопрос «КТО/ЧТО» (Клиенты, Услуги), а Документы — «ЧТО СЛУЧИЛОСЬ И КОГДА»!',
    'Не забывай делать длину наименования справочника побольше (например, 100 символов), чтобы длинные имена не обрезались.'
  ],
  'lecture-4': [
    'Золотое правило 1С: всё для кнопочек и интерфейса — &НаКлиенте, а доступ к таблицам и вычисления — &НаСервере!',
    'В условии «Если» пишется один знак равенства «=», как в школьной математике!'
  ],
  'lecture-5': [
    'СрезПоследних — это суперсила регистров сведений! Он возвращает самую свежую цену мгновенно без перебора документов.',
    'Не забывай строчку: Движения.Продажи.Записывать = Истина; иначе движения не сохранятся!'
  ],
  'lecture-6': [
    'СКД (Система компоновки данных) собирает крутые отчеты с группировками и графиками без ручного кода!',
    'Перед сдачей обязательно сделай выгрузку базы в .dt через меню «Администрирование».'
  ],
  'final-exam': [
    'Ты прошел весь путь! Выбирай тему проекта по душе из списка и покажи класс на защите своего проекта!',
    'Главное на защите — уверенно показать работу документа и красивый отчет на СКД.'
  ]
};

export const MascotCat: React.FC<MascotCatProps> = ({ lessonId = 'home', className = '' }) => {
  const tips = MASCOT_TIPS[lessonId] || MASCOT_TIPS['home'];
  const [tipIdx, setTipIdx] = useState(0);
  const [likes, setLikes] = useState(0);

  const nextTip = () => {
    setTipIdx((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className={`p-4 rounded-3xl bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-500/15 border border-amber-300/60 dark:border-amber-500/30 shadow-sm flex flex-col sm:flex-row items-center gap-4 ${className}`}>
      
      {/* Mascot Avatar */}
      <div className="relative flex-shrink-0 cursor-pointer group" onClick={nextTip} title="Нажми на кота, чтобы получить следующий совет!">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md bg-amber-200">
          <img
            src="/mascot.jpg"
            alt="Кот Барсик — маскот 1С-разработчик"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[9px] shadow">
          1С
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 space-y-1.5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1">
              Барсик • Кот-наставник 1С
            </span>
            <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 font-bold">
              Подсказка наставника
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setLikes(l => l + 1)}
              className="flex items-center gap-1 text-[11px] text-rose-600 dark:text-rose-400 hover:text-rose-700 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-current' : ''}`} />
              <span>{likes > 0 ? likes : ''}</span>
            </button>
            <button
              onClick={nextTip}
              className="text-[11px] text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Sparkles className="w-3 h-3" />
              <span>Еще совет</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          «{tips[tipIdx]}»
        </p>

        <div className="flex sm:hidden items-center justify-center gap-4 pt-1">
          <button
            onClick={() => setLikes(l => l + 1)}
            className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"
          >
            <Heart className={`w-3.5 h-3.5 ${likes > 0 ? 'fill-current' : ''}`} />
            <span>{likes > 0 ? likes : 'Погладить кота'}</span>
          </button>
          <button
            onClick={nextTip}
            className="text-xs text-amber-700 dark:text-amber-400 font-semibold"
          >
            Следующий совет →
          </button>
        </div>
      </div>

    </div>
  );
};

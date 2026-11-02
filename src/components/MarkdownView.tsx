import React from 'react';

interface MarkdownViewProps {
  content: string;
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  // Parse inline text (bold, code, links)
  const renderInline = (text: string): React.ReactNode => {
    // Regex for: `code`, **bold**, *italic*
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return parts.map((part, idx) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeText = part.slice(1, -1);
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-mono text-xs font-semibold border border-amber-300/40"
          >
            {codeText}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">
            {boldText}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        const italicText = part.slice(1, -1);
        return (
          <em key={idx} className="italic text-slate-800 dark:text-slate-200">
            {italicText}
          </em>
        );
      }
      return part;
    });
  };

  // Split lines and group blocks
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (currentList.length > 0 && listType) {
      if (listType === 'ul') {
        blocks.push(
          <ul key={`list-${blocks.length}`} className="my-3 space-y-1.5 pl-2">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      } else {
        blocks.push(
          <ol key={`list-${blocks.length}`} className="my-3 space-y-1.5 pl-2">
            {currentList.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs mt-0.5">{i + 1}.</span>
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    // Headings
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h4 key={idx} className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-4 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded bg-amber-500 inline-block" />
          {renderInline(line.replace('### ', ''))}
        </h4>
      );
      return;
    }

    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h3 key={idx} className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-5 mb-2.5">
          {renderInline(line.replace('## ', ''))}
        </h3>
      );
      return;
    }

    if (line.startsWith('# ')) {
      flushList();
      blocks.push(
        <h2 key={idx} className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-6 mb-3">
          {renderInline(line.replace('# ', ''))}
        </h2>
      );
      return;
    }

    // Bullet lists
    if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.replace(/^[-•*]\s+/, ''));
      return;
    }

    // Numbered lists: 1. , 2.
    const numMatch = line.match(/^\d+\.\s+(.*)/);
    if (numMatch) {
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(numMatch[1]);
      return;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushList();
      blocks.push(
        <blockquote key={idx} className="my-3 pl-4 border-l-4 border-amber-400 bg-amber-50/60 dark:bg-amber-950/30 p-3 rounded-r-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
          {renderInline(line.replace('> ', ''))}
        </blockquote>
      );
      return;
    }

    // Normal paragraph line
    flushList();
    blocks.push(
      <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-2">
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return <div className="space-y-1">{blocks}</div>;
};

import React, { useState } from 'react';
import { ZoomIn, X, Image as ImageIcon } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
}

interface ListItem {
  num?: string;
  text: string;
  subItems: string[];
}

interface ListBlock {
  type: 'ol' | 'ul';
  items: ListItem[];
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({ content }) => {
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);

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

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: ListBlock | null = null;

  const flushList = () => {
    if (currentList && currentList.items.length > 0) {
      const list = currentList;
      currentList = null;

      if (list.type === 'ol') {
        blocks.push(
          <ol key={`ol-${blocks.length}`} className="my-3 space-y-2.5 pl-1">
            {list.items.map((item, i) => {
              const displayNum = item.num || String(i + 1);
              return (
                <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-xs mt-0.5 flex-shrink-0">
                      {displayNum}.
                    </span>
                    <div className="flex-1">
                      <span>{renderInline(item.text)}</span>
                      {item.subItems.length > 0 && (
                        <ul className="mt-2 space-y-1.5 pl-2 border-l-2 border-amber-300/40 dark:border-slate-700 ml-1">
                          {item.subItems.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                              <span>{renderInline(sub)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        );
      } else {
        blocks.push(
          <ul key={`ul-${blocks.length}`} className="my-3 space-y-1.5 pl-2">
            {list.items.map((item, i) => (
              <li key={i} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <span>{renderInline(item.text)}</span>
                    {item.subItems.length > 0 && (
                      <ul className="mt-2 space-y-1.5 pl-2 border-l border-slate-300 dark:border-slate-700 ml-1">
                        {item.subItems.map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1.5 flex-shrink-0" />
                            <span>{renderInline(sub)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        );
      }
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      // Empty line doesn't immediately flush if followed by an indented sub-item,
      // but will flush if next non-empty is a heading or image.
      return;
    }

    // Markdown Image: ![Caption](src)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      const alt = imgMatch[1];
      let rawSrc = imgMatch[2];
      // Normalize path for GitHub Pages subfolder deployment:
      const basePath = import.meta.env.BASE_URL || '/';
      const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
      const src = rawSrc.startsWith('/') ? `${cleanBase}${rawSrc}` : rawSrc;

      blocks.push(
        <figure key={`img-${idx}`} className="my-5 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 shadow-md">
          <div className="bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 border-b border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Реальный скриншот конфигурации</span>
            </span>
            <button 
              onClick={() => setZoomImage({ src, alt })}
              className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 hover:underline font-bold"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Увеличить</span>
            </button>
          </div>
          <div 
            className="cursor-pointer group relative overflow-hidden bg-slate-950/20"
            onClick={() => setZoomImage({ src, alt })}
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-auto max-h-[460px] object-contain transition-transform duration-300 group-hover:scale-[1.01]" 
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg flex items-center gap-1.5">
                <ZoomIn className="w-4 h-4 text-amber-400" /> Нажмите для просмотра в полном размере
              </span>
            </div>
          </div>
          {alt && (
            <figcaption className="p-3 text-xs text-center text-slate-600 dark:text-slate-400 italic bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              📷 {alt}
            </figcaption>
          )}
        </figure>
      );
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

    // Indented sub-bullet under an active list item (e.g. "   - item")
    const indentBulletMatch = rawLine.match(/^(\s{2,}|\t)[-•*]\s+(.*)/);
    if (indentBulletMatch && currentList && currentList.items.length > 0) {
      currentList.items[currentList.items.length - 1].subItems.push(indentBulletMatch[2].trim());
      return;
    }

    // Numbered list: "1. text" or "2. text"
    const numMatch = rawLine.match(/^(\s*)(\d+)\.\s+(.*)/);
    if (numMatch) {
      const indent = numMatch[1].length;
      const num = numMatch[2];
      const text = numMatch[3].trim();

      // Indented numbered subitem under existing item
      if (indent >= 2 && currentList && currentList.items.length > 0) {
        currentList.items[currentList.items.length - 1].subItems.push(`${num}. ${text}`);
        return;
      }

      // Root numbered item
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push({ num, text, subItems: [] });
      return;
    }

    // Bullet list: "- text", "• text", "* text"
    const bulletMatch = rawLine.match(/^(\s*)[-•*]\s+(.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const text = bulletMatch[2].trim();

      // If indented under an ordered list, treat as subitem
      if (indent >= 2 && currentList && currentList.items.length > 0) {
        currentList.items[currentList.items.length - 1].subItems.push(text);
        return;
      }

      // Root bullet list
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push({ text, subItems: [] });
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

  return (
    <div className="space-y-1">
      {blocks}

      {/* Lightbox Modal for Fullscreen Image Zoom */}
      {zoomImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[92vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {zoomImage.alt || 'Скриншот конфигурации 1С'}
              </span>
              <button 
                onClick={() => setZoomImage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(92vh-80px)] p-2 bg-slate-950/60 flex items-center justify-center">
              <img 
                src={zoomImage.src} 
                alt={zoomImage.alt} 
                className="max-w-full max-h-[82vh] object-contain rounded"
              />
            </div>
            {zoomImage.alt && (
              <div className="px-4 py-2 bg-slate-800 text-[11px] text-slate-300 border-t border-slate-700">
                {zoomImage.alt}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

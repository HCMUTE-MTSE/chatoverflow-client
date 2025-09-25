import React, { useEffect, useRef, useState } from 'react';
import { generateHTML } from '@tiptap/html';
import { extensions } from '~/libs/tiptap/extensions';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface AnswerContentProps {
  content: any; // JSON content from TipTap
}

const AnswerContent: React.FC<AnswerContentProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  // Convert TipTap JSON to HTML
  useEffect(() => {
    if (!content) return;

    try {
      const tiptapContent =
        typeof content === 'string' ? JSON.parse(content) : content;
      const html = generateHTML(tiptapContent, extensions);
      setHtmlContent(html);
    } catch (err) {
      console.error('Render error:', err);
      setHtmlContent(
        typeof content === 'string'
          ? `<pre>${content}</pre>`
          : `<p>[Invalid content]</p>`
      );
    }
  }, [content]);

  // Highlight code & attach image zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const applyEnhancements = () => {
      container.querySelectorAll<HTMLElement>('pre > code').forEach((block) => {
        hljs.highlightElement(block);

        const wrapper = block.parentElement;
        if (wrapper && !wrapper.querySelector('.copy-btn')) {
          wrapper.classList.add('relative', 'group');

          const btn = document.createElement('button');
          btn.innerText = 'Copy';
          btn.className =
            'copy-btn absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity';
          btn.onclick = async (e) => {
            e.stopPropagation();
            try {
              await navigator.clipboard.writeText(block.innerText);
              btn.innerText = 'Copied!';
              setTimeout(() => (btn.innerText = 'Copy'), 2000);
            } catch {}
          };
          wrapper.appendChild(btn);
        }
      });

      container.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
        img.style.cursor = 'zoom-in';
        img.onclick = (e) => {
          e.stopPropagation();
          setZoomedImg(img.src);
        };
      });
    };

    applyEnhancements();
    const observer = new MutationObserver(() => applyEnhancements());
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [htmlContent]);

  if (!content) return null;

  return (
    <>
      <div
        ref={containerRef}
        className={`px-5 pb-2 pt-1 rich-content prose prose-invert max-w-none transition-all duration-200 ${
          zoomedImg ? 'filter blur-sm pointer-events-none' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {zoomedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setZoomedImg(null)}
        >
          <img
            src={zoomedImg}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg cursor-zoom-out transition-transform duration-200"
            onClick={() => setZoomedImg(null)}
          />
        </div>
      )}
    </>
  );
};

export default AnswerContent;

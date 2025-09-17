import React, { useState, useEffect, useRef } from 'react';

type LinkBubbleProps = { editor: any };

const LinkBubble: React.FC<LinkBubbleProps> = ({ editor }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [href, setHref] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      const { from, to } = editor.state.selection;
      const mark = editor.state.doc.rangeHasMark(
        from,
        to,
        editor.schema.marks.link
      );

      if (mark && editor.view) {
        const attrs = editor.getAttributes('link');
        setHref(attrs.href || '');
        setShow(true);

        const domSelection = window.getSelection();
        if (domSelection && domSelection.rangeCount > 0) {
          const range = domSelection.getRangeAt(0);

          // tạo span ảo để đo tọa độ
          const dummy = document.createElement('span');
          dummy.textContent = '\u200b';
          range.insertNode(dummy);

          const rect = dummy.getBoundingClientRect();
          dummy.remove();

          const containerRect = containerRef.current?.getBoundingClientRect();
          if (containerRect) {
            setCoords({
              top: rect.bottom - containerRect.top + 2,
              left: rect.left - containerRect.left,
            });
          }
        }
      } else {
        setShow(false);
      }
    };

    editor.on('selectionUpdate', update);
    editor.on('transaction', update);
    update();

    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
    };
  }, [editor]);

  const applyLink = () => {
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setShow(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShow(false);
  };

  if (!show) return null;

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={bubbleRef}
        style={{ top: coords.top, left: coords.left }}
        className="absolute z-50 p-2 bg-[#23272F] rounded shadow-md flex gap-2"
      >
        <input
          type="text"
          value={href}
          onChange={(e) => setHref(e.target.value)}
          className="px-2 py-1 rounded bg-[#181A20] text-white outline-none w-64"
          placeholder="Enter URL"
        />
        <button
          type="button"
          onClick={applyLink}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={removeLink}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default LinkBubble;

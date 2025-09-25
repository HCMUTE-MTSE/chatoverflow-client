import React, { useRef, useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

const CodeBlockWithCopy = () => {
  const codeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (codeRef.current) {
      const text = codeRef.current.innerText;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <NodeViewWrapper className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre className="bg-gray-900 text-gray-100 text-sm p-3 rounded-md overflow-x-auto font-mono">
        <code ref={codeRef}>
          <NodeViewContent as="div" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockWithCopy;

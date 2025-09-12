import React from 'react';
import { EditorContent, type Editor } from '@tiptap/react';
import Toolbar from './Toolbar';
import LinkBubble from './LinkBubble';

type TextEditorProps = {
  editor: Editor | null;
};

const TextEditor: React.FC<TextEditorProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="relative">
      <label className="block text-white font-semibold mb-2">
        Detailed explanation of your problem?
        <span className="text-red-500">*</span>
      </label>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="editor-content prose prose-invert bg-[#23272F] rounded-b-md px-4 py-3 min-h-[160px] focus:outline-none"
      />
      <LinkBubble editor={editor} />
    </div>
  );
};

export default TextEditor;

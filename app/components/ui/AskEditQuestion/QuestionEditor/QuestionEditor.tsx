import React, { useEffect } from 'react';
import { useEditor, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextEditor from './TextEditor';

interface QuestionEditorProps {
  content: JSONContent;
  onChange: (content: JSONContent) => void;
  editorRef?: (editor: any) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  content,
  onChange,
  editorRef,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      Link.configure({ HTMLAttributes: {}, openOnClick: false }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    autofocus: false,
  });

  useEffect(() => {
    if (editorRef && editor) {
      editorRef(editor); // expose instance editor cho parent
    }
  }, [editor, editorRef]);

  return <TextEditor editor={editor} />;
};

export default QuestionEditor;

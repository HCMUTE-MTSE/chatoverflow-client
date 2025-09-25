import React, { useEffect } from 'react';
import {
  useEditor,
  type JSONContent,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import 'highlight.js/styles/github-dark.css';
import TextEditor from './TextEditor';
import lowlight from '~/libs/tiptap/lowlight-languages';
import CodeBlockWithCopy from './CodeBlockWithCopy';

interface QuestionEditorProps {
  content: JSONContent;
  title: string;
  onChange: (content: JSONContent) => void;
  editorRef?: (editor: any) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  content,
  title,
  onChange,
  editorRef,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      Link.configure({ HTMLAttributes: {}, openOnClick: false }),
      Image,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockWithCopy);
        },
      }).configure({ lowlight }),
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

  return <TextEditor title={title} editor={editor} />;
};

export default QuestionEditor;

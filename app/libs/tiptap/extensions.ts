import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import lowlight from '~/libs/tiptap/lowlight-languages';
import CodeBlockWithCopy from '~/components/ui/AskEditQuestion/QuestionEditor/CodeBlockWithCopy';

export const extensions = [
  StarterKit.configure({
    codeBlock: false, // disable default codeBlock
  }),
  Heading.configure({ levels: [1, 2] }),
  Link.configure({ openOnClick: false }),
  Image,
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockWithCopy);
    },
  }).configure({ lowlight }),
];

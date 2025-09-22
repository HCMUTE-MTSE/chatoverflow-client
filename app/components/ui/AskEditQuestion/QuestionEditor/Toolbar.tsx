import React, { useState, useEffect, useRef } from 'react';
import ImageUploadingIndicator from './ImageUploadingIndicator';
import {
  BoldIcon,
  ItalicIcon,
  H1Icon,
  H2Icon,
  QuoteIcon,
  LinkIcon,
  ImageIcon,
  BulletIcon,
  NumberIcon,
  CodeIcon,
} from '~/libs/icons';
import { uploadImage } from '~/services/api/topic/question.service';

type ToolbarProps = {
  editor: any;
};

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [activeMarks, setActiveMarks] = useState({
    bold: false,
    italic: false,
    heading1: false,
    heading2: false,
    blockquote: false,
    orderedList: false,
    bulletList: false,
    link: false,
    codeBlock: false,
  });

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const linkInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // Update toolbar state when selection changes
  useEffect(() => {
    if (!editor) return;

    const update = () => {
      setActiveMarks({
        bold: editor.isActive('bold'),
        italic: editor.isActive('italic'),
        heading1: editor.isActive('heading', { level: 1 }),
        heading2: editor.isActive('heading', { level: 2 }),
        blockquote: editor.isActive('blockquote'),
        orderedList: editor.isActive('orderedList'),
        bulletList: editor.isActive('bulletList'),
        link: editor.isActive('link'),
        codeBlock: editor.isActive('codeBlock'),
      });

      if (editor.isActive('link')) {
        setLinkValue(editor.getAttributes('link').href || '');
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

  const btnClass = (active: boolean) =>
    `p-1 rounded transition-colors duration-150 cursor-pointer ${
      active
        ? 'bg-orange-500 text-white'
        : 'text-gray-300 hover:bg-orange-500 hover:text-white'
    }`;

  const toggleHeading = (level: 1 | 2) => {
    if (!editor) return;
    editor.isActive('heading', { level })
      ? editor.chain().focus().setParagraph().run()
      : editor.chain().focus().toggleHeading({ level }).run();
  };

  const toggleList = (type: 'orderedList' | 'bulletList') => {
    if (!editor) return;
    editor.isActive(type)
      ? editor.chain().focus().liftListItem('listItem').run()
      : editor
          .chain()
          .focus()
          [`toggle${type.charAt(0).toUpperCase() + type.slice(1)}`]()
          .run();
  };

  const toggleBlockquote = () => {
    if (!editor) return;
    editor.isActive('blockquote')
      ? editor.chain().focus().setParagraph().run()
      : editor.chain().focus().toggleBlockquote().run();
  };

  const applyLink = () => {
    if (!linkValue) return;
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkValue })
      .run();
    setShowLinkInput(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setLoading(true);
    const imageUrl = await uploadImage(file);
    setLoading(false);

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }

    e.target.value = '';
  };

  return (
    <div className="flex items-center gap-1 mb-2 bg-[#23272F] px-2 py-1 rounded-t border-b border-gray-700 relative">
      {/* Overlay loading */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/35">
          <ImageUploadingIndicator />
        </div>
      )}

      {/* Basic formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(activeMarks.bold)}
        disabled={loading}
      >
        <BoldIcon />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(activeMarks.italic)}
        disabled={loading}
      >
        <ItalicIcon />
      </button>

      {/* Headings */}
      <button
        type="button"
        onClick={() => toggleHeading(1)}
        className={btnClass(activeMarks.heading1)}
        disabled={loading}
      >
        <H1Icon />
      </button>
      <button
        type="button"
        onClick={() => toggleHeading(2)}
        className={btnClass(activeMarks.heading2)}
        disabled={loading}
      >
        <H2Icon />
      </button>

      {/* Blockquote */}
      <button
        type="button"
        onClick={toggleBlockquote}
        className={btnClass(activeMarks.blockquote)}
        disabled={loading}
      >
        <QuoteIcon />
      </button>

      {/* Lists */}
      <button
        type="button"
        onClick={() => toggleList('orderedList')}
        className={btnClass(activeMarks.orderedList)}
        disabled={loading}
      >
        <NumberIcon />
      </button>
      <button
        type="button"
        onClick={() => toggleList('bulletList')}
        className={btnClass(activeMarks.bulletList)}
        disabled={loading}
      >
        <BulletIcon />
      </button>

      {/* Code block */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btnClass(activeMarks.codeBlock)}
        disabled={loading}
      >
        <CodeIcon />
      </button>

      {/* Link */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={btnClass(activeMarks.link)}
          disabled={loading}
        >
          <LinkIcon />
        </button>
        {showLinkInput && !loading && (
          <div className="absolute top-10 left-0 bg-[#23272F] p-2 rounded border border-gray-700 flex gap-1 items-center z-50">
            <input
              ref={linkInputRef}
              value={linkValue}
              onChange={(e) => setLinkValue(e.target.value)}
              className="px-2 py-1 rounded bg-[#1E1F24] text-white outline-none text-sm w-48"
              placeholder="Enter URL"
              disabled={loading}
            />
            <button
              type="button"
              onClick={applyLink}
              className="px-2 py-1 bg-orange-500 text-white rounded text-sm"
              disabled={loading}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setShowLinkInput(false);
              }}
              className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
              disabled={loading}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-1 rounded text-gray-300 hover:bg-orange-500 hover:text-white transition-colors duration-150"
        disabled={loading}
      >
        {loading ? 'Uploading...' : <ImageIcon />}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );
};

export default Toolbar;

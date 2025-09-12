import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from '../../../ui/Toast';
import QuestionTitle from '../../../ui/AskEditQuestion/QuestionTitle';
import QuestionEditor from '../../../ui/AskEditQuestion/QuestionEditor';
import QuestionTags from '../../../ui/AskEditQuestion/QuestionTags';
import SubmitButton from '../../../ui/AskEditQuestion/SubmitButton';
import type { JSONContent } from '@tiptap/react';

const TAG_SUGGESTIONS = [
  'javascript',
  'react',
  'nodejs',
  'css',
  'html',
  'typescript',
  'python',
  'java',
  'csharp',
  'php',
  'sql',
  'docker',
  'linux',
  'git',
  'api',
];

const MOCK_QUESTION = {
  id: '1',
  title: 'How to use React useState?',
  tags: ['react', 'javascript'],
  content: JSON.stringify({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Sample content' }],
      },
    ],
  }),
};

const EMPTY_CONTENT: JSONContent = { type: 'doc', content: [] };

const EditQuestionContent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<JSONContent>(EMPTY_CONTENT);
  const [editor, setEditor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    // Mock fetch question
    const timer = setTimeout(() => {
      setTitle(MOCK_QUESTION.title);
      setTags(MOCK_QUESTION.tags);
      setContent(
        MOCK_QUESTION.content
          ? JSON.parse(MOCK_QUESTION.content)
          : EMPTY_CONTENT
      );
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      showToast('Title is required', 'error');
      return;
    }
    if (
      !content ||
      !content.content ||
      content.content.length === 0 ||
      (content.content.length === 1 && !content.content[0].content)
    ) {
      showToast('Content is required', 'error');
      return;
    }
    if (!tags || tags.length === 0) {
      showToast('At least one tag is required', 'error');
      return;
    }

    try {
      // Mock update
      console.log('Updated question:', {
        title,
        tags,
        content: JSON.stringify(content),
      });
      showToast('Question updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating question:', error);
      showToast('Error updating question', 'error');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#111217] flex flex-col items-center justify-center py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-2">
        <h1 className="text-2xl font-bold text-white mb-8">Edit a question</h1>

        <QuestionTitle title={title} onChange={setTitle} />
        {typeof window !== 'undefined' && (
          <QuestionEditor
            content={content}
            onChange={setContent}
            editorRef={setEditor}
          />
        )}
        <QuestionTags
          tags={tags}
          onChange={setTags}
          suggestions={TAG_SUGGESTIONS}
          maxTags={5}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

const EditQuestion: React.FC = () => (
  <ToastProvider>
    <EditQuestionContent />
  </ToastProvider>
);

export default EditQuestion;

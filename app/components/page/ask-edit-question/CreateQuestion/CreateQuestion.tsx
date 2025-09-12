import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from '../../../ui/Toast';
import QuestionTitle from '../../../ui/AskEditQuestion/QuestionTitle';
import QuestionEditor from '../../../ui/AskEditQuestion/QuestionEditor';
import QuestionTags from '../../../ui/AskEditQuestion/QuestionTags';
import SubmitButton from '../../../ui/AskEditQuestion/SubmitButton';
import { createQuestion } from '~/services/api/topic/question.service';
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

const EMPTY_CONTENT: JSONContent = { type: 'doc', content: [] };

const CreateQuestionContent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<JSONContent>(EMPTY_CONTENT);
  const [editor, setEditor] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast('You must be logged in to ask a question', 'error');
      return;
    }

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
      const payload = {
        title,
        tags,
        content: JSON.stringify(content), // backend nhận string
      };

      const newQuestion = await createQuestion(payload, token);
      if (newQuestion) {
        showToast('Question created successfully', 'success');
        setTitle('');
        setTags([]);
        setContent(EMPTY_CONTENT);
        editor?.commands.setContent(EMPTY_CONTENT); // reset editor UI
      } else {
        showToast('Failed to create question', 'error');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      showToast('Error creating question', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#111217] flex flex-col items-center justify-center py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-2">
        <h1 className="text-2xl font-bold text-white mb-8">
          Ask a public question
        </h1>

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

const CreateQuestion: React.FC = () => (
  <ToastProvider>
    <CreateQuestionContent />
  </ToastProvider>
);

export default CreateQuestion;

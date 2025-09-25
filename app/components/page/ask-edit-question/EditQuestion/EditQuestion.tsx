/*
  This component are HEAVY AI generated. I haven't battle-tested it yet.
  Somehow (and worstly), it works... Please check with caution if you're managing to reuse it.
*/

import React, { useState, useEffect } from 'react';
import {
  getQuestionDetail,
  type Question,
} from '~/services/api/topic/question.service';

import { ToastProvider, useToast } from '../../../ui/Toast';
import QuestionTitle from '../../../ui/AskEditQuestion/QuestionTitle';
import QuestionEditor from '../../../ui/AskEditQuestion/QuestionEditor';
import QuestionTags from '../../../ui/AskEditQuestion/QuestionTags';
import SubmitButton from '../../../ui/AskEditQuestion/SubmitButton';
import type { JSONContent } from '@tiptap/react';
import axios from 'axios';

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

interface EditQuestionContentProps {
  questionId: string | undefined;
}

const EMPTY_CONTENT: JSONContent = { type: 'doc', content: [] };
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to convert plain text content to JSONContent format
const convertTextToJSONContent = (text: string): JSONContent => {
  if (!text || text.trim() === '') {
    return EMPTY_CONTENT;
  }

  return {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: text }],
      },
    ],
  };
};

// Helper function to extract plain text from JSONContent
const extractTextFromJSONContent = (content: JSONContent): string => {
  if (!content || !content.content) return '';

  let text = '';
  const traverse = (node: any) => {
    if (node.type === 'text') {
      text += node.text || '';
    } else if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  content.content.forEach(traverse);
  return text;
};

const EditQuestionContent: React.FC<EditQuestionContentProps> = ({
  questionId,
}) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<JSONContent>(EMPTY_CONTENT);
  const [editor, setEditor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      if (!questionId) {
        setLoading(false);
        showToast('Question ID is required', 'error');
        return;
      }

      try {
        const questionData = await getQuestionDetail(questionId);
        console.log('Question: ', questionData);

        if (questionData) {
          setQuestion(questionData);
          setTitle(questionData.title);
          setTags(questionData.tags || []);

          // Convert plain text content to JSONContent format for the editor
          // const jsonContent = convertTextToJSONContent(questionData.content);
          const jsonContent = JSON.parse(questionData.content);
          setContent(jsonContent);
        } else {
          showToast('Question not found', 'error');
        }
      } catch (error) {
        console.error('Error fetching question:', error);
        showToast('Error loading question data', 'error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [questionId, showToast]);

  const updateQuestion = async (
    questionId: string,
    updateData: {
      title: string;
      content: string;
      tags: string[];
    }
  ) => {
    const token = localStorage.getItem('token'); // Assuming you store the auth token in localStorage

    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.put(
      `${API_BASE_URL}/question/${questionId}/edit`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionId) {
      showToast('Question ID is required', 'error');
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

    setSubmitting(true);

    try {
      // Extract plain text from JSONContent for API
      const plainTextContent = extractTextFromJSONContent(content);

      const updateData = {
        title: title.trim(),
        content: plainTextContent,
        tags: tags,
      };

      console.log('Updating question with data:', updateData);

      const response = await updateQuestion(questionId, updateData);

      console.log('Update response:', response);
      showToast('Question updated successfully!', 'success');

      // Optionally redirect or update local state
      // window.location.href = `/questions/${questionId}`;
    } catch (error: any) {
      console.error('Error updating question:', error);
      const errorMessage =
        error.response?.data?.message || 'Error updating question';
      showToast(errorMessage, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111217] flex items-center justify-center">
        <div className="text-white text-lg">Loading question...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-[#111217] flex items-center justify-center">
        <div className="text-white text-lg">Question not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111217] flex flex-col items-center justify-center py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-2">
        <h1 className="text-2xl font-bold text-white mb-8">Edit Question</h1>

        <QuestionTitle title={title} onChange={setTitle} />

        {typeof window !== 'undefined' && (
          <QuestionEditor
            title="Detailed explanation of your problem?"
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

        {submitting && (
          <div className="text-white text-center mt-4">
            Updating question...
          </div>
        )}
      </form>
    </div>
  );
};

const EditQuestion: React.FC<EditQuestionContentProps> = ({ questionId }) => (
  <ToastProvider>
    <EditQuestionContent questionId={questionId} />
  </ToastProvider>
);

export default EditQuestion;

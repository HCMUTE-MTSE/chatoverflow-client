import { useState, useCallback } from 'react';
import { type JSONContent } from '@tiptap/react';
import { editAnswer } from '~/services/api/topic/answer.service';
import type { Answer } from '../../components/page/question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';

export function useAnswerActions(token: string | null, onSuccess: () => void) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<JSONContent>({
    type: 'doc',
    content: [],
  });

  const isEditorEmpty = useCallback(
    (content: JSONContent) =>
      !content?.content?.some(
        (node) =>
          node.type === 'paragraph' &&
          node.content?.some((t) => t.text?.trim() !== '')
      ),
    []
  );

  const handleEdit = useCallback((ans: Answer) => {
    setEditingId(ans._id);
    try {
      setEditingContent(JSON.parse(ans.content));
    } catch {
      setEditingContent({ type: 'doc', content: [] });
    }
  }, []);

  const handleSaveEdit = useCallback(
    async (updateAnswer: (data: any) => void) => {
      if (!editingId || !token) return;
      if (isEditorEmpty(editingContent)) {
        alert('Content cannot be empty');
        return;
      }

      try {
        const res = await editAnswer(
          editingId,
          JSON.stringify(editingContent),
          token
        );
        if (res.success && res.data) {
          updateAnswer({
            _id: editingId,
            content: res.data.content,
            updatedAt: res.data.updatedAt,
          });
          setEditingId(null);
          setEditingContent({ type: 'doc', content: [] });
          onSuccess();
        } else {
          alert(res.message || 'Failed to update answer');
        }
      } catch (err) {
        console.error('Error updating answer:', err);
        alert('Failed to update answer');
      }
    },
    [editingId, token, editingContent, isEditorEmpty, onSuccess]
  );

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingContent({ type: 'doc', content: [] });
  }, []);

  return {
    editingId,
    editingContent,
    setEditingContent,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
  };
}

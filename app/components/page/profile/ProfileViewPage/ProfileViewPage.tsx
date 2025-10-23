import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProfileData } from '../../../../hooks/profile/useProfileData';
import { useBlogs } from '../../../../hooks/profile/useBlogs';
import { useAnswerActions } from '../../../../hooks/profile/useAnswerActions';
import { useDeleteAnswer } from '../../../../hooks/profile/useDeleteAnswer';
import { useDeletePost } from '../../../../hooks/profile/useDeletePost';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileStats } from './components/ProfileStats';
import { PostsList } from './components/PostsList';
import { AnswersList } from './components/AnswersList';
import { BlogsList } from './components/BlogsList';
import { ConfirmModal } from './components/ConfirmModal';
import PopularTags from '../../home/PopularTags';
import { usePopularTags } from '~/hooks/usePopularTags';

export default function ProfileViewPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'answers' | 'blogs'>(
    'posts'
  );
  const [modal, setModal] = useState<{
    type: 'confirm' | 'success' | null;
    open: boolean;
    answerId?: string;
    postId?: string;
    message?: string;
  }>({ type: null, open: false });

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // 🚀 Use custom hooks
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    setData: setProfileData,
  } = useProfileData();

  const {
    blogs,
    loading: blogsLoading,
    error: blogsError,
  } = useBlogs(profileData?.user?.userId);

  const {
    tags: popularTags,
    loading: tagsLoading,
    error: tagsError,
  } = usePopularTags(20);

  const {
    editingId,
    editingContent,
    setEditingContent,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
  } = useAnswerActions(token, () => {
    // Refresh callback if needed
  });

  const {
    handleDelete: handleDeleteAnswer,
    confirmDelete: confirmDeleteAnswer,
  } = useDeleteAnswer(token, setProfileData, setModal);

  const { handleDelete: handleDeletePost, confirmDelete: confirmDeletePost } =
    useDeletePost(token, setProfileData, setModal);

  const updateAnswer = useCallback(
    (updatedData: { _id: string; content: string; updatedAt: string }) => {
      setProfileData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          answers: prev.answers.map((ans) =>
            ans._id === updatedData._id
              ? {
                  ...ans,
                  content: updatedData.content,
                  updatedAt: updatedData.updatedAt,
                }
              : ans
          ),
        };
      });
    },
    [setProfileData]
  );

  const handleConfirm = useCallback(() => {
    if (modal.answerId) {
      confirmDeleteAnswer(modal.answerId);
    } else if (modal.postId) {
      confirmDeletePost(modal.postId);
    }
  }, [modal.answerId, modal.postId, confirmDeleteAnswer, confirmDeletePost]);

  // 🚀 Loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  // 🚀 Error state
  if (profileError) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-lg">{profileError}</div>
      </div>
    );
  }

  const displayName = profileData?.user?.name || 'JavaScript Pro';
  const displayHandle = profileData?.user?.nickName
    ? `@${profileData.user.nickName}`
    : '@javascriptpro';

  const location =
    profileData?.user?.address?.province && profileData?.user?.address?.ward
      ? `${profileData.user.address.ward}, ${profileData.user.address.province}`
      : 'Croatia, Europe';

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="w-full bg-gray-900">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Profile Header */}
          <ProfileHeader
            avatar={
              profileData?.user?.avatar || '/assets/images/defaultavatar.png'
            }
            displayName={displayName}
            displayHandle={displayHandle}
            location={location}
            joinedDate={
              profileData?.user?.createdAt
                ? new Date(profileData.user.createdAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                    }
                  )
                : 'June 2022'
            }
            onEditClick={() =>
              navigate('/profile', { state: { userData: profileData?.user } })
            }
          />

          {/* Bio */}
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            {profileData?.user?.bio ||
              'Launch your development career with project-based coaching - showcase your skills with practical development experience and land the coding career of your dreams. Check out jsmastery.pro'}
          </p>

          {/* Stats */}
          <ProfileStats
            totalPosts={profileData?.statistics?.totalPosts || 0}
            totalAnswers={profileData?.statistics?.totalAnswers || 0}
            totalBlogs={blogs?.length || 0}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts Section */}
            <div className="lg:col-span-3">
              {/* Posts List */}
              {activeTab === 'posts' && (
                <PostsList
                  posts={profileData?.posts || []}
                  onEdit={(postId) => navigate(`/question/${postId}/edit`)}
                  onDelete={handleDeletePost}
                  onClick={(postId) => navigate(`/question/${postId}`)}
                />
              )}

              {/* Answers List */}
              {activeTab === 'answers' && (
                <AnswersList
                  answers={profileData?.answers || []}
                  editingId={editingId}
                  editingContent={editingContent}
                  onEdit={handleEdit}
                  onDelete={handleDeleteAnswer}
                  onSave={() => handleSaveEdit(updateAnswer)}
                  onCancel={handleCancelEdit}
                  onContentChange={setEditingContent}
                  onClick={(questionId) => navigate(`/question/${questionId}`)}
                />
              )}

              {/* Blogs List */}
              {activeTab === 'blogs' && (
                <BlogsList
                  blogs={blogs}
                  loading={blogsLoading}
                  error={blogsError}
                />
              )}
            </div>

            {/* Top Tags Sidebar */}
            <div className="lg:col-span-1">
              {tagsLoading ? (
                <p className="text-gray-400 text-center">Loading tags...</p>
              ) : tagsError ? (
                <p className="text-red-500 text-center">{tagsError}</p>
              ) : (
                <PopularTags tags={popularTags} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 Modal */}
      <ConfirmModal
        open={modal.open}
        type={modal.type}
        message={modal.message}
        onConfirm={handleConfirm}
        onCancel={() => setModal({ open: false, type: null })}
      />
    </div>
  );
}

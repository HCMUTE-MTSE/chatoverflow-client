import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router';
import { useProfileDataById } from '../../../../hooks/profile/useProfileData';
import { useBlogs } from '../../../../hooks/profile/useBlogs';
import { useAnswerActions } from '../../../../hooks/profile/useAnswerActions';
import { useDeleteAnswer } from '../../../../hooks/profile/useDeleteAnswer';
import { useDeletePost } from '../../../../hooks/profile/useDeletePost';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileStats } from '../ProfileViewPage/components/ProfileStats';
import { PostsList } from '../ProfileViewPage/components/PostsList';
import { AnswersList } from '../ProfileViewPage/components/AnswersList';
import { BlogsList } from '../ProfileViewPage/components/BlogsList';
import { ConfirmModal } from '../ProfileViewPage/components/ConfirmModal';
import PopularTags from '../../home/PopularTags';
import { usePopularTags } from '~/hooks/usePopularTags';
import { createConversation } from '~/services/api/chat/conversation.service';
import { getCurrentUserId } from '~/utils/userUtils';
import { usePosts } from '~/hooks/profile/usePosts';
import { useAnswer } from '~/hooks/profile/useAnswer';
import { IsOpenChatContext } from '~/routes/layout';

interface UserProfilePageProps {
  userId: string;
}

export default function ProfileViewPage({ userId }: UserProfilePageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'answers' | 'blogs'>(
    'posts'
  );
  const [sending, setSending] = useState(false);
  const [isOpenChat, setIsOpenChat] = React.useContext(IsOpenChatContext);

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    setData: setProfileData,
  } = useProfileDataById(userId);
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
    answers,
    pagination: answersPagination,
    loading: answersLoading,
    loadingMore: answersLoadingMore,
    error: answersError,
    setAnswers,
    loadMore: loadMoreAnswers,
    hasMore: hasMoreAnswers,
  } = useAnswer(profileData?.user?.userId);
  const {
    posts,
    pagination: postsPagination,
    loading: postsLoading,
    loadingMore: postsLoadingMore,
    error: postsError,
    setPosts,
    loadMore: loadMorePosts,
    hasMore: hasMorePosts,
  } = usePosts(profileData?.user?.userId);

  const handleSendMessage = async () => {
    const nextIsOpenChat = !isOpenChat;
    setIsOpenChat(nextIsOpenChat);

    try {
      const currentUserId = await getCurrentUserId();
      if (!currentUserId || !profileData?.user?.userId) {
        alert('Cannot get user info. Please login.');
        return;
      }

      const conversation = await createConversation(
        currentUserId,
        profileData.user.userId
      );
    } catch (err) {
      alert('Failed to start conversation.');
    } finally {
      setSending(false);
    }
  };

  // 🚀 Loading & Error
  if (profileLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );

  if (profileError)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-lg">{profileError}</div>
      </div>
    );

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
            sendMessageProps={{
              onClick: handleSendMessage,
              disabled: sending,
              label: sending ? 'Sending...' : 'Send Message',
            }}
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
            <div className="lg:col-span-3">
              {activeTab === 'posts' && (
                <PostsList
                  posts={posts || []}
                  pagination={postsPagination}
                  loading={postsLoading}
                  loadingMore={postsLoadingMore}
                  hasMore={hasMorePosts}
                  onLoadMore={loadMorePosts}
                  onClick={(postId) => navigate(`/question/${postId}`)}
                />
              )}

              {activeTab === 'answers' && (
                <AnswersList
                  answers={answers || []}
                  pagination={answersPagination}
                  loading={answersLoading}
                  loadingMore={answersLoadingMore}
                  hasMore={hasMoreAnswers}
                  onClick={(questionId) => navigate(`/question/${questionId}`)}
                  onLoadMore={loadMoreAnswers}
                />
              )}

              {activeTab === 'blogs' && (
                <BlogsList
                  blogs={blogs}
                  loading={blogsLoading}
                  error={blogsError}
                />
              )}
            </div>

            {/* Top Tags */}
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
    </div>
  );
}

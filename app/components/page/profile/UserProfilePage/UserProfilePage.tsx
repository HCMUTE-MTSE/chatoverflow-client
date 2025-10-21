import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { createConversation } from '~/services/api/chat/conversation.service';
import { getCurrentUserId } from '~/utils/userUtils';
import { getUserById } from '~/services/api/user/user.service';
import type { UserResponse } from '~/models/res/user.response';
import EditQuestionCard from '~/components/ui/QuestionCard/EditQuestionCard/QuestionCard';
import type { Answer } from '../../question-pages/questtion-detail/QuestionAnswer/QuestionAnswer';
import StatCard from '~/components/ui/StatCard';
import AnswerCard from '~/components/ui/AnswerCard/Card';
import {
  getPopularTags,
  type PopularTag,
} from '~/services/api/search/search.service';
// Interface for API response
interface ProfileApiResponse {
  user: UserResponse;
  posts: Array<{
    _id: string;
    title: string;
    content: string;
    tags: string[];
    views: number;
    upvotedBy: string[];
    downvotedBy: string[];
    user: {
      _id: string;
      name: string;
      nickName: string;
      avatar: string | null;
    };
    askedTime: string;
    upvotes: number;
    downvotes: number;
    score: number;
    answerCount?: number;
  }>;
  answers: Array<Answer>;
  statistics: {
    totalPosts: number;
    totalAnswers: number;
    totalContributions: number;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface UserProfilePageProps {
  userId: string;
}

export default function UserProfilePage({ userId }: UserProfilePageProps) {
  const [profileData, setProfileData] = useState<ProfileApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'answers'>('posts');
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);

  const [popularTags, setPopularTags] = useState<
    { name: string; count: string }[]
  >([]);
  const [tagLoading, setTagLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        setTagLoading(true);
        const data = await getPopularTags(5);

        const formatted = data.map((t: PopularTag) => ({
          name: t.tag.toUpperCase(),
          count: `${t.count}+`,
        }));

        setPopularTags(formatted);
      } catch (err) {
        console.error('Failed to load popular tags:', err);
      } finally {
        setTagLoading(false);
      }
    }

    fetchPopularTags();
  }, []);
  const handleSendMessage = async () => {
    setSending(true);
    try {
      const currentUserId = await getCurrentUserId();
      if (!currentUserId || !profileData?.user?.userId) {
        alert('Cannot get user info. Please login.');
        setSending(false);
        return;
      }
      const conversation = await createConversation(
        currentUserId,
        profileData.user.userId
      );
      // Navigate to chat page
      navigate('/chat', { state: { conversationId: conversation.id } });
    } catch (err) {
      alert('Failed to start conversation.');
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log('Loading user data for userId:', userId);
        const response = await getUserById(userId);
        console.log('API response:', response);
        if (response.success && response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        if (error instanceof Error && 'response' in error) {
          console.error('Error details:', (error as any).response?.data);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">Loading profile...</div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-lg">User not found</div>
      </div>
    );
  }

  const displayName = profileData?.user?.name || 'JavaScript Pro';
  const avatarUrl =
    profileData?.user?.avatar || '/assets/images/defaultavatar.png';
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
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500">
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-white text-3xl font-bold">
                    {displayName}
                  </h1>

                  <div className="flex items-center gap-4 mt-4 text-gray-400">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.102 1.101"
                        />
                      </svg>
                      <p className="text-blue-300 text-base mt-1">
                        {displayHandle}
                      </p>
                    </a>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Joined{' '}
                      {profileData?.user?.createdAt
                        ? new Date(
                            profileData.user.createdAt
                          ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })
                        : 'June 2022'}
                    </span>
                  </div>
                </div>

                {/* Send Message Button */}
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors disabled:opacity-60"
                  onClick={handleSendMessage}
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-300 mb-6 text-sm leading-relaxed">
            {profileData?.user?.bio ||
              'Launch your development career with project-based coaching - showcase your skills with practical development experience and land the coding career of your dreams. Check out jsmastery.pro'}
          </p>

          {/* Stats */}
          <div className="mb-8">
            <h2 className="text-white text-lg font-semibold mb-4">Stats</h2>
            <div className="flex gap-4 flex-wrap">
              <StatCard
                value={profileData?.statistics?.totalPosts?.toString() || '0'}
                label="Questions"
              />
              <StatCard
                value={profileData?.statistics?.totalAnswers?.toString() || '0'}
                label="Answers"
              />
              <StatCard
                value="15"
                label="Gold Badges"
                icon={
                  <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">🥇</span>
                  </div>
                }
              />
              <StatCard
                value="23"
                label="Silver Badges"
                icon={
                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">🥈</span>
                  </div>
                }
              />
              <StatCard
                value="38"
                label="Bronze Badges"
                icon={
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-xs">🥉</span>
                  </div>
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Posts Section */}
            <div className="lg:col-span-3">
              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeTab === 'posts'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Top Posts
                </button>
                <button
                  onClick={() => setActiveTab('answers')}
                  className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                    activeTab === 'answers'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Answers
                </button>
              </div>

              {/* Posts List */}
              {activeTab === 'posts' && (
                <div className="space-y-4">
                  {profileData?.posts && profileData.posts.length > 0 ? (
                    profileData.posts.map((post) => (
                      <EditQuestionCard
                        key={post._id}
                        title={post.title}
                        tags={post.tags.map((tag) => tag.toUpperCase())}
                        user={{
                          name: post.user.name,
                          avatar: avatarUrl,
                        }}
                        time={new Date(post.askedTime).toLocaleDateString()}
                        votes={post.upvotes}
                        answers={0}
                        views={post.views}
                        onClick={() => navigate(`/question/${post._id}`)}
                      />
                    ))
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      No posts yet
                    </div>
                  )}

                  <div className="flex justify-center pt-6">
                    <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition-colors">
                      Load More
                    </button>
                  </div>
                </div>
              )}

              {/* Answers List */}
              {activeTab === 'answers' && (
                <div className="space-y-4">
                  {profileData?.answers && profileData.answers.length > 0 ? (
                    profileData.answers.map((answer) => (
                      <div key={answer._id} className="mb-6">
                        <AnswerCard
                          answer={answer}
                          isOwner={true}
                          showUpvoteButton={false}
                          showDownvoteButton={false}
                          showReplyButton={false}
                          onClick={() =>
                            navigate(`/question/${answer.question}`)
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400 text-center py-8">
                      No answers yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Top Tags Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-orange-500 text-lg font-bold mb-4">
                Top Tags
              </h2>
              <div className="space-y-3">
                {tagLoading ? (
                  <div className="text-gray-400 text-center py-8">
                    Loading tags...
                  </div>
                ) : (
                  popularTags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:underline px-3 py-2 rounded cursor-pointer transition-colors"
                      onClick={() =>
                        navigate(`/tags/${tag.name.toLowerCase()}/questions`)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-200 text-sm font-medium">
                          {tag.name}
                        </span>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {tag.count.toLocaleString()}+
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

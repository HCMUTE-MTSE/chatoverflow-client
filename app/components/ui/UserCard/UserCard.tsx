import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getUserProfileLink } from '~/utils/userUtils';

interface UserCardProps {
  userId: string;
  name: string;
  username: string;
  avatarUrl?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  userId,
  name,
  username,
  avatarUrl,
}) => {
  const [profileLink, setProfileLink] = useState(`/user/${userId}`);

  useEffect(() => {
    const loadProfileLink = async () => {
      const link = await getUserProfileLink(userId);
      setProfileLink(link);
    };
    loadProfileLink();
  }, [userId]);

  return (
    <Link
      to={profileLink}
      className="w-64 h-58 bg-[#181A20] rounded-md flex flex-col items-center py-8 px-4 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#23262F] mb-4">
        <img
          src={avatarUrl || '/assets/images/defaultavatar.png'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white text-lg font-semibold mb-1 text-center">
        {name}
      </div>
      <div className="text-[#6e7fb2] text-sm text-center">@{username}</div>
    </Link>
  );
};

export default UserCard;

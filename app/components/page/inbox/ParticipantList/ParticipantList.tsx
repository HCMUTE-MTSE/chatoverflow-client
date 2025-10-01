import React, { useEffect, useState } from 'react';

import { getAllUsers } from '~/services/api/chat/participant.service';

import type { UserData } from '~/services/api/chat/participant.service';

import ParticipantListHeader from '../ParticipantListHeader';
import ParticipantCard from '../ParticipantCard';

interface ParticipantListProps {
  currentUserId: string | null;
  onSelectUser: (userId: string) => void | Promise<void>;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  currentUserId,
  onSelectUser,
}) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await getAllUsers();

        // Filter out current user
        const filteredUsers = userData.filter(
          (user) => user._id !== currentUserId
        );
        setUsers(filteredUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <ParticipantListHeader />
      <div className="grid grid-cols-3 overflow-y-auto p-4 space-y-2">
        {users.map((user) => (
          <ParticipantCard
            key={user._id}
            userId={user._id}
            name={user.name}
            nickName={user.nickName}
            avatar={user.avatar}
            onSelect={onSelectUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;

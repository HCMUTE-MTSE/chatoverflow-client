import React from 'react';
import UserCard from '../../UserCard/UserCard';
import type { User } from '../../../../models/constant/GetUser.dto';

interface UserGridProps {
  users: User[];
}

const UserGrid: React.FC<UserGridProps> = ({ users }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          userId={user.id}
          name={user.name}
          username={user.username}
          avatarUrl={user.avatarUrl}
        />
      ))}
    </div>
  );
};

export default UserGrid;

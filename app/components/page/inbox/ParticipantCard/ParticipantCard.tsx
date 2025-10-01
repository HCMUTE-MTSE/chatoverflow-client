import React from 'react';

interface ParticipantCardProps {
  userId: string;
  name: string;
  nickName: string;
  avatar: string;
  onSelect: (userId: string) => void | Promise<void>;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  userId,
  name,
  nickName,
  avatar,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(userId)}
      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors border border-gray-100"
    >
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">@{nickName}</p>
      </div>
    </div>
  );
};

export default ParticipantCard;

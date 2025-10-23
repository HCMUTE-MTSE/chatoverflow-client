import React from 'react';

interface ProfileHeaderProps {
  avatar: string;
  displayName: string;
  displayHandle: string;
  location: string;
  joinedDate: string;
  sendMessageProps?: {
    onClick: () => void;
    disabled?: boolean;
    label?: string;
  };
}

export function ProfileHeader({
  avatar,
  displayName,
  displayHandle,
  location,
  joinedDate,
  sendMessageProps,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-6 mb-6">
      <div className="relative">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500">
          <img
            src={avatar}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-white text-3xl font-bold">{displayName}</h1>

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
                <p className="text-blue-300 text-base mt-1">{displayHandle}</p>
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
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                Joined {joinedDate}
              </span>
            </div>
          </div>
          {sendMessageProps && (
            <button
              onClick={sendMessageProps.onClick}
              disabled={sendMessageProps.disabled}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-lg transition-colors"
            >
              {sendMessageProps.label || 'Send Message'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

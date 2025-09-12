import React from 'react';

export const HomeIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path d="M8 1.4L6 2.7V1H4v3L0 6.6l.6.8L8 2.6l7.4 4.8.6-.8z" />
    <path d="M8 4L2 8v7h5v-3h2v3h5V8z" />
  </svg>
);

export const CollectionsIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);

export const JobsIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

export const TagsIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3H4a2 2 0 0 0-2 2v5.59A2 2 0 0 0 3 11l9.59 9.59a2 2 0 0 0 2.82 0l5.18-5.18a2 2 0 0 0 0-2.82z" />
    <path d="M7 7h.01" />
  </svg>
);

export const CommunitiesIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const AskIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M9.09 9a3 3 0 0 1 5.91 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const LogoutIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// export const HomeIcon = ({
//    size = 24,
//    color = 'currentColor',
//    ...props
// }) => (
//    <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 16 16"
//       width={size}
//       height={size}
//       fill={color}
//       {...props}
//    >
//       <path
//          xmlns="http://www.w3.org/2000/svg"
//          fill="currentColor"
//          d="M8 1.4L6 2.7V1H4v3L0 6.6l.6.8L8 2.6l7.4 4.8l.6-.8z"
//       />
//       <path
//          xmlns="http://www.w3.org/2000/svg"
//          fill="currentColor"
//          d="M8 4L2 8v7h5v-3h2v3h5V8z"
//       />
//    </svg>
// );

export const DiscoverIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12Zm13-3l-3.693.739a2 2 0 0 0-1.568 1.568L9 15l3.693-.739a2 2 0 0 0 1.569-1.568L15 9Z"
      clipRule="evenodd"
    />
  </svg>
);

export const PodcastIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M12 3a4 4 0 0 0-4 4h2a.5.5 0 0 1 0 1H8v1h2a.5.5 0 0 1 0 1H8v1h2a.5.5 0 0 1 0 1H8a4 4 0 0 0 8 0h-2a.5.5 0 0 1 0-1h2v-1h-2a.5.5 0 0 1 0-1h2V8h-2a.5.5 0 0 1 0-1h2a4 4 0 0 0-4-4"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M11.5 20v-2.5h1V20zm-3.5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5"
      clipRule="evenodd"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M6.227 13.709a.5.5 0 0 1 .647.284a5.5 5.5 0 0 0 10.16.222a.5.5 0 0 1 .916.403a6.5 6.5 0 0 1-12.008-.262a.5.5 0 0 1 .285-.647"
      clipRule="evenodd"
    />
  </svg>
);

export const ProfileIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1408 1472"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M704 128q-144 0-225 106t-81 271q-1 205 132 325q17 16 12 41l-23 48q-11 24-32.5 37.5T396 995q-3 1-126.5 41T138 1080q-84 35-110 73q-28 63-28 319h1408q0-256-28-319q-26-38-110-73q-8-4-131.5-44T1012 995q-69-25-90.5-38.5T889 919l-23-48q-5-25 12-41q133-120 132-325q0-165-81-271T704 128z"
    />
  </svg>
);

export const HeadphonesIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M256 32C114.52 32 0 146.496 0 288v48a32 32 0 0 0 17.689 28.622l14.383 7.191C34.083 431.903 83.421 480 144 480h24c13.255 0 24-10.745 24-24V280c0-13.255-10.745-24-24-24h-24c-31.342 0-59.671 12.879-80 33.627V288c0-105.869 86.131-192 192-192s192 86.131 192 192v1.627C427.671 268.879 399.342 256 368 256h-24c-13.255 0-24 10.745-24 24v176c0 13.255 10.745 24 24 24h24c60.579 0 109.917-48.098 111.928-108.187l14.382-7.191A32 32 0 0 0 512 336v-48c0-141.479-114.496-256-256-256z"
    />
  </svg>
);

export const ClockIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M12 6a1 1 0 0 1 1 1v4.422l2.098 1.212a1 1 0 0 1-1 1.732l-2.598-1.5A1.005 1.005 0 0 1 11 12V7a1 1 0 0 1 1-1Z"
    />
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M2 12A10 10 0 1 0 12 2A10 10 0 0 0 2 12Zm9-5a1 1 0 0 1 2 0v4.422l2.098 1.212a1 1 0 0 1-1 1.732l-2.598-1.5A1.005 1.005 0 0 1 11 12Z"
      opacity=".5"
    />
  </svg>
);

export const MenuDotsIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Zm14 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" />
      <path d="M14 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0Z" opacity=".5" />
    </g>
  </svg>
);

export const PauseIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
    />
  </svg>
);

export const PlayIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="M18.54 9L8.88 3.46a3.42 3.42 0 0 0-5.13 3v11.12A3.42 3.42 0 0 0 7.17 21a3.43 3.43 0 0 0 1.71-.46L18.54 15a3.42 3.42 0 0 0 0-5.92Zm-1 4.19l-9.66 5.62a1.44 1.44 0 0 1-1.42 0a1.42 1.42 0 0 1-.71-1.23V6.42a1.42 1.42 0 0 1 .71-1.23A1.51 1.51 0 0 1 7.17 5a1.54 1.54 0 0 1 .71.19l9.66 5.58a1.42 1.42 0 0 1 0 2.46Z"
    />
  </svg>
);

export const ShuffleIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <g
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2l4 4l-4 4M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14l4 4l-4 4" />
    </g>
  </svg>
);

export const RepeatIcon = ({ size = 24, color = 'currentColor', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <g
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M14.519 2.749a.75.75 0 0 1 1.052.13l1.547 1.982a.75.75 0 1 1-1.183.923L14.39 3.8a.75.75 0 0 1 .13-1.052Z" />
      <path d="M16.983 4.727a.75.75 0 0 0-1.052.14l-1.546 2.017a.75.75 0 1 0 1.19.912l1.547-2.017a.75.75 0 0 0-.14-1.052Z" />
      <path d="M2.48 9.323a5 5 0 0 1 5-5h7.86a1 1 0 1 1 0 2H7.48a3 3 0 0 0-3 3v1a1 1 0 1 1-2 0v-1Zm3.008 7.928a.75.75 0 0 1-1.053-.13L2.89 15.14a.75.75 0 1 1 1.182-.923L5.619 16.2a.75.75 0 0 1-.13 1.052Z" />
      <path d="M3.024 15.273a.75.75 0 0 0 1.051-.14l1.547-2.017a.75.75 0 0 0-1.19-.912L2.884 14.22a.75.75 0 0 0 .139 1.052Z" />
      <path d="M17.526 10.677a5 5 0 0 1-5 5h-7.86a1 1 0 1 1 0-2h7.86a3 3 0 0 0 3-3v-1a1 1 0 1 1 2 0v1Z" />
    </g>
  </svg>
);

export const PlayNextFillIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      fillRule="evenodd"
      d="M2.538 4.113a1 1 0 0 1 1.035.068l10 7a1 1 0 0 1 0 1.638l-10 7A1 1 0 0 1 2 19V5a1 1 0 0 1 .538-.887M16 5.8A1.8 1.8 0 0 1 17.8 4h1.4A1.8 1.8 0 0 1 21 5.8v12.4a1.8 1.8 0 0 1-1.8 1.8h-1.4a1.8 1.8 0 0 1-1.8-1.8z"
      clipRule="evenodd"
    />
  </svg>
);

export const PlayBackIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="m30.71 229.47l188.87-113a30.54 30.54 0 0 1 31.09-.39a33.74 33.74 0 0 1 16.76 29.47v79.05l180.72-108.16a30.54 30.54 0 0 1 31.09-.39A33.74 33.74 0 0 1 496 145.52v221A33.73 33.73 0 0 1 479.24 396a30.54 30.54 0 0 1-31.09-.39L267.43 287.4v79.08A33.73 33.73 0 0 1 250.67 396a30.54 30.54 0 0 1-31.09-.39l-188.87-113a31.27 31.27 0 0 1 0-53Z"
    />
  </svg>
);

export const Volume2Icon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 5L6 9H2v6h4l5 4V5zm8.07-.07a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
    />
  </svg>
);

export const MutedSpeakerIcon = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill={color}
    {...props}
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      d="m19.036 20.718l5.933 5.934a1.189 1.189 0 1 0 1.682-1.683L6.83 5.15a1.19 1.19 0 0 0-1.68 1.683L7.318 9H3.803C2.807 9 2 9.847 2 10.892v10.216C2 22.153 2.807 23 3.803 23l4.195.001l8.613 3.83a1.693 1.693 0 0 0 2.425-1.526v-4.587Zm-2-2v6.113l-7.038-3.13V11.68l7.038 7.038ZM22 16.023c0 .504-.122.979-.337 1.397l-4.627-4.627v-5.76l-.03-.001a.38.38 0 0 0-.113.013h-.002l-3.81 1.793l-1.504-1.503l4.47-2.103c1.123-.529 2.989.023 2.989 1.265v6.473A3.055 3.055 0 0 1 22 16.023Z"
    />
  </svg>
);

type ShuffleLineDuotoneProps = {
  size: string;
};

export const ShuffleLineDuotone = ({ size }: ShuffleLineDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill="currentColor">
      <path d="M2 16.25a.75.75 0 0 0 0 1.5v-1.5Zm8.748-2.163l-.643-.386l.643.386Zm2.504-4.174l.643.386l-.643-.386ZM22 7l.53.53a.75.75 0 0 0 0-1.06L22 7Zm-2.53 1.47a.75.75 0 0 0 1.06 1.06l-1.06-1.06Zm1.06-4a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm-5.31 2.92l-.369-.653l.37.652ZM2 17.75h3.603v-1.5H2v1.5Zm9.39-3.277l2.505-4.174l-1.286-.772l-2.504 4.174l1.286.772Zm7.007-6.723H22v-1.5h-3.603v1.5Zm3.073-1.28l-2 2l1.06 1.06l2-2l-1.06-1.06Zm1.06 0l-2-2l-1.06 1.06l2 2l1.06-1.06Zm-8.635 3.829c.434-.724.734-1.22 1.006-1.589c.263-.355.468-.543.689-.668l-.739-1.305c-.467.264-.82.627-1.155 1.08c-.326.44-.668 1.011-1.087 1.71l1.286.772Zm4.502-4.049c-.815 0-1.48 0-2.025.052c-.562.055-1.054.17-1.521.435l.739 1.305c.22-.125.487-.204.927-.247c.456-.044 1.036-.045 1.88-.045v-1.5ZM5.603 17.75c.815 0 1.48 0 2.025-.052c.562-.055 1.054-.17 1.521-.435l-.739-1.305c-.22.125-.487.204-.927.247c-.456.044-1.036.045-1.88.045v1.5Zm4.502-4.049c-.435.724-.734 1.22-1.006 1.589c-.263.355-.468.543-.689.668l.74 1.305c.466-.264.819-.627 1.154-1.08c.326-.44.668-1.011 1.087-1.71l-1.286-.772Z" />
      <path
        d="M2 7.75a.75.75 0 0 1 0-1.5v1.5Zm8.748 2.163l-.643.386l.643-.386Zm2.504 4.174l.643-.386l-.643.386ZM22 17l.53-.53a.75.75 0 0 1 0 1.06L22 17Zm-2.53-1.47a.75.75 0 1 1 1.06-1.06l-1.06 1.06Zm1.06 4a.75.75 0 1 1-1.06-1.06l1.06 1.06Zm-5.31-2.92l-.369.653l.37-.652ZM2 6.25h3.603v1.5H2v-1.5Zm9.39 3.277l2.505 4.174l-1.286.772l-2.504-4.174l1.286-.772Zm7.007 6.723H22v1.5h-3.603v-1.5Zm3.073 1.28l-2-2l1.06-1.06l2 2l-1.06 1.06Zm1.06 0l-2 2l-1.06-1.06l2-2l1.06 1.06Zm-8.635-3.829c.434.724.734 1.22 1.006 1.589c.263.355.468.543.689.668l-.739 1.305c-.467-.264-.82-.627-1.155-1.08c-.326-.44-.668-1.011-1.087-1.71l1.286-.772Zm4.502 4.049c-.815 0-1.48 0-2.025-.052c-.562-.055-1.054-.17-1.521-.435l.739-1.305c.22.125.487.204.927.247c.456.044 1.036.045 1.88.045v1.5ZM5.603 6.25c.815 0 1.48 0 2.025.052c.562.055 1.054.17 1.521.435L8.41 8.042c-.22-.125-.487-.204-.927-.247c-.456-.044-1.036-.045-1.88-.045v-1.5Zm4.502 4.049c-.435-.724-.734-1.22-1.006-1.589c-.263-.355-.468-.543-.689-.668l.74-1.305c.466.264.819.627 1.154 1.08c.326.44.668 1.011 1.087 1.71l-1.286.772Z"
        opacity=".2"
      />
    </g>
  </svg>
);

type PlayerPreviousDuotoneProps = {
  size: string;
};

export const PlayerPreviousDuotone = ({ size }: PlayerPreviousDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        fill="currentColor"
        d="M3 13.732c-1.333-.77-1.333-2.694 0-3.464l9-5.196c1.333-.77 3 .192 3 1.732v10.392c0 1.54-1.667 2.502-3 1.732l-9-5.196Z"
        opacity=".2"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 17.196V6.804c0-1.54-1.667-2.502-3-1.732l-3 1.732v10.392l3 1.732c1.333.77 3-.192 3-1.732ZM3 13.732c-1.333-.77-1.333-2.694 0-3.464l9-5.196c1.333-.77 3 .192 3 1.732v10.392c0 1.54-1.667 2.502-3 1.732l-9-5.196Z"
      />
    </g>
  </svg>
);

type PlayerNextDuotoneProps = {
  size: string;
};

export const PlayerNextDuotone = ({ size }: PlayerNextDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill="none">
      <path
        fill="currentColor"
        d="M21 10.268c1.333.77 1.333 2.694 0 3.464l-9 5.196c-1.333.77-3-.192-3-1.732V6.804c0-1.54 1.667-2.502 3-1.732l9 5.196Z"
        opacity=".2"
      />
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 6.804v10.392c0 1.54 1.667 2.502 3 1.732l3-1.732V6.804L6 5.072c-1.333-.77-3 .192-3 1.732Zm18 3.464c1.333.77 1.333 2.694 0 3.464l-9 5.196c-1.333.77-3-.192-3-1.732V6.804c0-1.54 1.667-2.502 3-1.732l9 5.196Z"
      />
    </g>
  </svg>
);

type PlayLineDuotoneProps = {
  size: string;
};

export const PlayLineDuotone = ({ size }: PlayLineDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      d="M20.409 9.353a2.998 2.998 0 0 1 0 5.294L7.597 21.614C5.534 22.736 3 21.276 3 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648l12.812 6.968Z"
    />
  </svg>
);

type PauseLineDuotoneProps = {
  size: string;
};

export const PauseLineDuotone = ({ size }: PauseLineDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 6c0-1.886 0-2.828.586-3.414C3.172 2 4.114 2 6 2c1.886 0 2.828 0 3.414.586C10 3.172 10 4.114 10 6v12c0 1.886 0 2.828-.586 3.414C8.828 22 7.886 22 6 22c-1.886 0-2.828 0-3.414-.586C2 20.828 2 19.886 2 18V6Z" />
      <path
        d="M14 6c0-1.886 0-2.828.586-3.414C15.172 2 16.114 2 18 2c1.886 0 2.828 0 3.414.586C22 3.172 22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414C20.828 22 19.886 22 18 22c-1.886 0-2.828 0-3.414-.586C14 20.828 14 19.886 14 18V6Z"
        opacity=".2"
      />
    </g>
  </svg>
);

type RepeatLineDuotoneProps = {
  size: string;
};

export const RepeatLineDuotone = ({ size }: RepeatLineDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill="currentColor">
      <path d="M9.5 19.75a.75.75 0 0 0 0-1.5v1.5ZM11 5v.75a.75.75 0 0 0 .53-1.28L11 5ZM9.53 2.47a.75.75 0 0 0-1.06 1.06l1.06-1.06ZM9.5 18.25H9v1.5h.5v-1.5ZM9 5.75h2v-1.5H9v1.5Zm2.53-1.28l-2-2l-1.06 1.06l2 2l1.06-1.06ZM1.25 12A7.75 7.75 0 0 0 9 19.75v-1.5A6.25 6.25 0 0 1 2.75 12h-1.5Zm1.5 0A6.25 6.25 0 0 1 9 5.75v-1.5A7.75 7.75 0 0 0 1.25 12h1.5Z" />
      <path
        d="M13 19v-.75a.75.75 0 0 0-.53 1.28L13 19Zm1.47 2.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm.03-17.28a.75.75 0 0 0 0 1.5v-1.5Zm.5 14h-2v1.5h2v-1.5Zm-2.53 1.28l2 2l1.06-1.06l-2-2l-1.06 1.06ZM14.5 5.75h.5v-1.5h-.5v1.5ZM21.25 12A6.25 6.25 0 0 1 15 18.25v1.5A7.75 7.75 0 0 0 22.75 12h-1.5Zm1.5 0A7.75 7.75 0 0 0 15 4.25v1.5A6.25 6.25 0 0 1 21.25 12h1.5Z"
        opacity=".5"
      />
    </g>
  </svg>
);

type SpeakerHighDuotoneProps = {
  size: string;
};

export const SpeakerHighDuotone = ({ size }: SpeakerHighDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <g fill="currentColor">
      <path d="M80 88v80H32a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8Z" opacity=".2" />
      <path d="M155.51 24.81a8 8 0 0 0-8.42.88L77.25 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224V32a8 8 0 0 0-4.49-7.19ZM32 96h40v64H32Zm112 111.64l-56-43.55V91.91l56-43.55Zm54-106.08a40 40 0 0 1 0 52.88a8 8 0 0 1-12-10.58a24 24 0 0 0 0-31.72a8 8 0 0 1 12-10.58ZM248 128a79.9 79.9 0 0 1-20.37 53.34a8 8 0 0 1-11.92-10.67a64 64 0 0 0 0-85.33a8 8 0 1 1 11.92-10.67A79.83 79.83 0 0 1 248 128Z" />
    </g>
  </svg>
);

type SpeakerSlashDuotoneProps = {
  size: string;
};

export const SpeakerSlashDuotone = ({ size }: SpeakerSlashDuotoneProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
  >
    <g fill="currentColor">
      <path d="M80 88v80H32a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8Z" opacity=".2" />
      <path d="M53.92 34.62a8 8 0 1 0-11.84 10.76L73.55 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224v-48.91l42.08 46.29a8 8 0 1 0 11.84-10.76ZM32 96h40v64H32Zm112 111.64l-56-43.55v-68.2l56 61.6Zm42-63.77a24 24 0 0 0 0-31.72a8 8 0 1 1 12-10.57a40 40 0 0 1 0 52.88a8 8 0 0 1-12-10.59Zm-80.16-76a8 8 0 0 1 1.4-11.23l39.85-31A8 8 0 0 1 160 32v74.83a8 8 0 0 1-16 0V48.36l-26.94 21a8 8 0 0 1-11.22-1.45ZM248 128a79.9 79.9 0 0 1-20.37 53.34a8 8 0 0 1-11.92-10.67a64 64 0 0 0 0-85.33a8 8 0 1 1 11.92-10.67A79.83 79.83 0 0 1 248 128Z" />
    </g>
  </svg>
);

export const QuestionCardLikeIcon = ({
  size = 16,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.66667L9.34267 6.55733C9.3268 6.6528 9.3319 6.75057 9.35762 6.84386C9.38334 6.93715 9.42907 7.02373 9.49161 7.09757C9.55416 7.17141 9.63204 7.23075 9.71983 7.27146C9.80762 7.31218 9.90323 7.33329 10 7.33333V6.66667ZM2.66667 6.66667V6C2.48986 6 2.32029 6.07024 2.19526 6.19526C2.07024 6.32029 2 6.48986 2 6.66667H2.66667ZM4 14H11.5733V12.6667H4V14ZM12.3733 6H10V7.33333H12.3733V6ZM10.658 6.776L11.1947 3.55267L9.88 3.33333L9.34267 6.55733L10.658 6.776ZM9.88 2H9.73733V3.33333H9.88V2ZM7.518 3.18733L5.84133 5.70333L6.95067 6.44333L8.628 3.92733L7.518 3.18733ZM5.28667 6H2.66667V7.33333H5.28667V6ZM2 6.66667V12H3.33333V6.66667H2ZM13.5347 12.392L14.3347 8.392L13.028 8.13067L12.228 12.1307L13.5347 12.392ZM5.84133 5.70333C5.78043 5.79461 5.69795 5.86945 5.60119 5.9212C5.50443 5.97295 5.39639 6.00002 5.28667 6V7.33333C5.61591 7.33331 5.94006 7.252 6.23034 7.09663C6.52061 6.94126 6.76805 6.71662 6.95067 6.44267L5.84133 5.70267V5.70333ZM11.1947 3.55267C11.2265 3.36169 11.2164 3.16607 11.165 2.97941C11.1136 2.79274 11.0222 2.6195 10.8971 2.47174C10.772 2.32398 10.6162 2.20524 10.4405 2.12378C10.2649 2.04231 10.0736 2.00007 9.88 2V3.33333L11.1947 3.55267ZM12.3733 7.33333C12.472 7.33329 12.5694 7.35515 12.6586 7.39732C12.7478 7.43949 12.8265 7.50093 12.889 7.57721C12.9516 7.65348 12.9965 7.74269 13.0204 7.8384C13.0443 7.93411 13.0473 8.03393 13.028 8.13067L14.3347 8.392C14.3927 8.1019 14.3856 7.80255 14.3139 7.51552C14.2422 7.22849 14.1078 6.96094 13.9202 6.73214C13.7327 6.50334 13.4967 6.319 13.2294 6.19239C12.962 6.06579 12.6698 6.00008 12.374 6V7.33333H12.3733ZM11.5733 14C12.0357 14 12.4839 13.8398 12.8415 13.5466C13.1991 13.2535 13.444 12.8454 13.5347 12.392L12.228 12.1307C12.1978 12.282 12.116 12.4181 11.9966 12.5158C11.8772 12.6136 11.7276 12.6669 11.5733 12.6667V14ZM9.73733 2C9.29825 1.9999 8.86593 2.10822 8.47877 2.31535C8.09161 2.52248 7.76158 2.82201 7.518 3.18733L8.628 3.92733C8.74972 3.74465 8.91466 3.59486 9.10818 3.49123C9.30171 3.38761 9.51782 3.33337 9.73733 3.33333V2ZM4 12.6667C3.82319 12.6667 3.65362 12.5964 3.5286 12.4714C3.40357 12.3464 3.33333 12.1768 3.33333 12H2C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14V12.6667Z"
      fill="#1DA1F2"
    />
    <path d="M5.33325 6.66663V13.3333" stroke="#1DA1F2" />
  </svg>
);

export const QuestionCardAnswerIcon = ({
  size = 16,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.25 12.5C9.09057 12.5 9.91226 12.2507 10.6112 11.7837C11.3101 11.3168 11.8548 10.653 12.1765 9.87641C12.4982 9.09982 12.5823 8.24529 12.4183 7.42087C12.2543 6.59645 11.8496 5.83917 11.2552 5.2448C10.6608 4.65042 9.90355 4.24565 9.07913 4.08166C8.25471 3.91768 7.40018 4.00184 6.6236 4.32351C5.84701 4.64519 5.18325 5.18992 4.71625 5.88883C4.24926 6.58774 4 7.40943 4 8.25C4 8.95267 4.17 9.6152 4.47222 10.1989L4 12.5L6.30114 12.0278C6.88481 12.33 7.54781 12.5 8.25 12.5Z"
      stroke="#1DA1F2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const QuestionCardViewIcon = ({
  size = 16,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.47 7.83C14.882 6.30882 13.861 4.99331 12.5334 4.04604C11.2058 3.09878 9.62977 2.56129 8.00003 2.5C6.37029 2.56129 4.79423 3.09878 3.46663 4.04604C2.13904 4.99331 1.11811 6.30882 0.530031 7.83C0.490315 7.93985 0.490315 8.06015 0.530031 8.17C1.11811 9.69118 2.13904 11.0067 3.46663 11.954C4.79423 12.9012 6.37029 13.4387 8.00003 13.5C9.62977 13.4387 11.2058 12.9012 12.5334 11.954C13.861 11.0067 14.882 9.69118 15.47 8.17C15.5097 8.06015 15.5097 7.93985 15.47 7.83ZM8.00003 12.5C5.35003 12.5 2.55003 10.535 1.53503 8C2.55003 5.465 5.35003 3.5 8.00003 3.5C10.65 3.5 13.45 5.465 14.465 8C13.45 10.535 10.65 12.5 8.00003 12.5Z"
      fill="#1DA1F2"
    />
    <path
      d="M8 5C7.40666 5 6.82664 5.17595 6.33329 5.50559C5.83994 5.83524 5.45543 6.30377 5.22836 6.85195C5.0013 7.40013 4.94189 8.00333 5.05765 8.58527C5.1734 9.16721 5.45912 9.70176 5.87868 10.1213C6.29824 10.5409 6.83279 10.8266 7.41473 10.9424C7.99667 11.0581 8.59987 10.9987 9.14805 10.7716C9.69623 10.5446 10.1648 10.1601 10.4944 9.66671C10.8241 9.17336 11 8.59334 11 8C11 7.20435 10.6839 6.44129 10.1213 5.87868C9.55871 5.31607 8.79565 5 8 5ZM8 10C7.60444 10 7.21776 9.8827 6.88886 9.66294C6.55996 9.44318 6.30362 9.13082 6.15224 8.76537C6.00087 8.39991 5.96126 7.99778 6.03843 7.60982C6.1156 7.22186 6.30608 6.86549 6.58579 6.58579C6.86549 6.30608 7.22186 6.1156 7.60982 6.03843C7.99778 5.96126 8.39992 6.00087 8.76537 6.15224C9.13082 6.30362 9.44318 6.55996 9.66294 6.88886C9.8827 7.21776 10 7.60444 10 8C10 8.53043 9.78929 9.03914 9.41421 9.41421C9.03914 9.78929 8.53043 10 8 10Z"
      fill="#1DA1F2"
    />
  </svg>
);

export const QuestionCardEditIcon = ({
  size = 14,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_543_6431)">
      <path
        d="M6.41699 2.3335H2.33366C2.02424 2.3335 1.72749 2.45641 1.5087 2.6752C1.28991 2.894 1.16699 3.19074 1.16699 3.50016V11.6668C1.16699 11.9762 1.28991 12.273 1.5087 12.4918C1.72749 12.7106 2.02424 12.8335 2.33366 12.8335H10.5003C10.8097 12.8335 11.1065 12.7106 11.3253 12.4918C11.5441 12.273 11.667 11.9762 11.667 11.6668V7.5835"
        stroke="#1DA1F2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.792 1.45814C11.0241 1.22608 11.3388 1.0957 11.667 1.0957C11.9952 1.0957 12.3099 1.22608 12.542 1.45814C12.7741 1.6902 12.9044 2.00495 12.9044 2.33314C12.9044 2.66133 12.7741 2.97608 12.542 3.20814L7.00033 8.74981L4.66699 9.33314L5.25033 6.99981L10.792 1.45814Z"
        stroke="#1DA1F2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_543_6431">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const QuestionCardDeleteIcon = ({
  size = 14,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.75 3.5H2.91667H12.25"
      stroke="#FF2121"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0837 3.49984V11.6665C11.0837 11.9759 10.9607 12.2727 10.742 12.4915C10.5232 12.7103 10.2264 12.8332 9.91699 12.8332H4.08366C3.77424 12.8332 3.47749 12.7103 3.2587 12.4915C3.03991 12.2727 2.91699 11.9759 2.91699 11.6665V3.49984M4.66699 3.49984V2.33317C4.66699 2.02375 4.78991 1.72701 5.0087 1.50821C5.22749 1.28942 5.52424 1.1665 5.83366 1.1665H8.16699C8.47641 1.1665 8.77316 1.28942 8.99195 1.50821C9.21074 1.72701 9.33366 2.02375 9.33366 2.33317V3.49984"
      stroke="#FF2121"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const QuestionCardSavedIcon = ({
  size = 14,
  color = '#1DA1F2',
  ...props
}) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00561 13.6161L4.06109 16.2157L5.00561 10.7096L1 6.81053L6.52774 6.00941L9 1L11.4723 6.00941L17 6.81053L12.9944 10.7096L13.9389 16.2157L9.00561 13.6161Z"
      fill="url(#paint0_linear_546_20335)"
      stroke="url(#paint1_linear_546_20335)"
      stroke-width="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_546_20335"
        x1="-1.35838"
        y1="1"
        x2="17.755"
        y2="2.13075"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF7000" />
        <stop offset="0.9999" stop-color="#E2985E" />
        <stop offset="1" stop-color="#E2995F" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_546_20335"
        x1="-1.35838"
        y1="1"
        x2="17.755"
        y2="2.13075"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF7000" />
        <stop offset="0.9999" stop-color="#E2985E" />
        <stop offset="1" stop-color="#E2995F" />
      </linearGradient>
    </defs>
  </svg>
);

export const BoldIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="9"
    height="11"
    viewBox="0 0 9 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.7 5.0925C7.4275 4.59 7.9375 3.765 7.9375 3C7.9375 1.305 6.625 0 4.9375 0H0.25V10.5H5.53C7.0975 10.5 8.3125 9.225 8.3125 7.6575C8.3125 6.5175 7.6675 5.5425 6.7 5.0925ZM2.5 1.875H4.75C5.3725 1.875 5.875 2.3775 5.875 3C5.875 3.6225 5.3725 4.125 4.75 4.125H2.5V1.875ZM5.125 8.625H2.5V6.375H5.125C5.7475 6.375 6.25 6.8775 6.25 7.5C6.25 8.1225 5.7475 8.625 5.125 8.625Z"
      fill="#858EAD"
    />
  </svg>
);

export const ItalicIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="10"
    height="11"
    viewBox="0 0 10 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 0V2.25H5.1575L2.5925 8.25H0.5V10.5H6.5V8.25H4.8425L7.4075 2.25H9.5V0H3.5Z"
      fill="#858EAD"
    />
  </svg>
);

export const H1Icon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.33643 11.5H7.13916V6.92969H2.85449V11.5H0.657227V0.835938H2.85449V5.15723H7.13916V0.835938H9.33643V11.5Z"
      fill="#858EAD"
    />
  </svg>
);

export const H2Icon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.56055 9.5H5.51562V5.9375H2.48633V9.5H0.429688V0.96875H2.48633V4.35547H5.51562V0.96875H7.56055V9.5Z"
      fill="#858EAD"
    />
  </svg>
);

export const QuoteIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="12"
    height="8"
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 7.75H3.75L5.25 4.75V0.25H0.75V4.75H3L1.5 7.75ZM7.5 7.75H9.75L11.25 4.75V0.25H6.75V4.75H9L7.5 7.75Z"
      fill="#858EAD"
    />
  </svg>
);

export const LinkIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="16"
    height="8"
    viewBox="0 0 16 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.925 4C1.925 2.7175 2.9675 1.675 4.25 1.675H7.25V0.25H4.25C2.18 0.25 0.5 1.93 0.5 4C0.5 6.07 2.18 7.75 4.25 7.75H7.25V6.325H4.25C2.9675 6.325 1.925 5.2825 1.925 4ZM5 4.75H11V3.25H5V4.75ZM11.75 0.25H8.75V1.675H11.75C13.0325 1.675 14.075 2.7175 14.075 4C14.075 5.2825 13.0325 6.325 11.75 6.325H8.75V7.75H11.75C13.82 7.75 15.5 6.07 15.5 4C15.5 1.93 13.82 0.25 11.75 0.25Z"
      fill="#858EAD"
    />
  </svg>
);

export const ImageIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.75 12.25V1.75C13.75 0.925 13.075 0.25 12.25 0.25H1.75C0.925 0.25 0.25 0.925 0.25 1.75V12.25C0.25 13.075 0.925 13.75 1.75 13.75H12.25C13.075 13.75 13.75 13.075 13.75 12.25ZM4.375 8.125L6.25 10.3825L8.875 7L12.25 11.5H1.75L4.375 8.125Z"
      fill="#858EAD"
    />
  </svg>
);

export const BulletIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="14"
    height="12"
    viewBox="0 0 14 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.1875 4.875C0.565 4.875 0.0625 5.3775 0.0625 6C0.0625 6.6225 0.565 7.125 1.1875 7.125C1.81 7.125 2.3125 6.6225 2.3125 6C2.3125 5.3775 1.81 4.875 1.1875 4.875ZM1.1875 0.375C0.565 0.375 0.0625 0.8775 0.0625 1.5C0.0625 2.1225 0.565 2.625 1.1875 2.625C1.81 2.625 2.3125 2.1225 2.3125 1.5C2.3125 0.8775 1.81 0.375 1.1875 0.375ZM1.1875 9.375C0.565 9.375 0.0625 9.885 0.0625 10.5C0.0625 11.115 0.5725 11.625 1.1875 11.625C1.8025 11.625 2.3125 11.115 2.3125 10.5C2.3125 9.885 1.81 9.375 1.1875 9.375ZM3.4375 11.25H13.9375V9.75H3.4375V11.25ZM3.4375 6.75H13.9375V5.25H3.4375V6.75ZM3.4375 0.75V2.25H13.9375V0.75H3.4375Z"
      fill="#858EAD"
    />
  </svg>
);

export const NumberIcon = ({ size = 9, color = '#1DA1F2', ...props }) => (
  <svg
    width="15"
    height="12"
    viewBox="0 0 15 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.25 9.75H1.75V10.125H1V10.875H1.75V11.25H0.25V12H2.5V9H0.25V9.75ZM1 3H1.75V0H0.25V0.75H1V3ZM0.25 5.25H1.6L0.25 6.825V7.5H2.5V6.75H1.15L2.5 5.175V4.5H0.25V5.25ZM4 0.75V2.25H14.5V0.75H4ZM4 11.25H14.5V9.75H4V11.25ZM4 6.75H14.5V5.25H4V6.75Z"
      fill="#858EAD"
    />
  </svg>
);

export const SearchIcon = ({ size = 24, color = '#1DA1F2', ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z"
      fill="#7B8EC8"
    />
  </svg>
);
export const FilterIcon = ({ size = 18, color = '#1DA1F2', ...props }) => (
  <svg
    width="18"
    height="11"
    viewBox="0 0 18 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9.75C6 9.55109 6.07902 9.36032 6.21967 9.21967C6.36032 9.07902 6.55109 9 6.75 9H11.25C11.4489 9 11.6397 9.07902 11.7803 9.21967C11.921 9.36032 12 9.55109 12 9.75C12 9.94891 11.921 10.1397 11.7803 10.2803C11.6397 10.421 11.4489 10.5 11.25 10.5H6.75C6.55109 10.5 6.36032 10.421 6.21967 10.2803C6.07902 10.1397 6 9.94891 6 9.75ZM3 5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H14.25C14.4489 4.5 14.6397 4.57902 14.7803 4.71967C14.921 4.86032 15 5.05109 15 5.25C15 5.44891 14.921 5.63968 14.7803 5.78033C14.6397 5.92098 14.4489 6 14.25 6H3.75C3.55109 6 3.36032 5.92098 3.21967 5.78033C3.07902 5.63968 3 5.44891 3 5.25ZM0 0.75C0 0.551088 0.0790178 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H17.25C17.4489 0 17.6397 0.0790178 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75C18 0.948912 17.921 1.13968 17.7803 1.28033C17.6397 1.42098 17.4489 1.5 17.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790178 1.13968 0 0.948912 0 0.75Z"
      fill="#7B8EC8"
    />
  </svg>
);
export const DropDownIcon = ({ size = 18, color = '#1DA1F2', ...props }) => (
  <svg
    width="14"
    height="9"
    viewBox="0 0 14 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.75635 7.75623C7.55916 7.95336 7.29175 8.0641 7.01292 8.0641C6.7341 8.0641 6.46668 7.95336 6.26949 7.75623L0.321018 1.80775C0.220587 1.71075 0.140479 1.59472 0.08537 1.46643C0.0302606 1.33814 0.00125297 1.20016 3.97018e-05 1.06054C-0.00117356 0.920919 0.0254321 0.782455 0.0783037 0.653226C0.131175 0.523998 0.209254 0.406593 0.307985 0.307862C0.406715 0.209132 0.52412 0.131053 0.653348 0.0781811C0.782577 0.0253095 0.921041 -0.00129563 1.06066 -8.23678e-05C1.20028 0.0011309 1.33826 0.0301386 1.46655 0.0852479C1.59484 0.140357 1.71087 0.220464 1.80787 0.320896L7.01292 5.52594L12.218 0.320896C12.4163 0.129352 12.6819 0.0233643 12.9576 0.0257601C13.2333 0.0281559 13.4971 0.138743 13.692 0.333705C13.887 0.528666 13.9976 0.792402 14 1.06811C14.0024 1.34381 13.8964 1.60943 13.7048 1.80775L7.75635 7.75623Z"
      fill="#7B8EC8"
    />
  </svg>
);

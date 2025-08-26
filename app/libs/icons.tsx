import React from 'react';

export const HomeIcon = ({
   size = 24,
   color = 'currentColor',
   ...props
}) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill={color}
      {...props}
   >
      <path
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         d="M8 1.4L6 2.7V1H4v3L0 6.6l.6.8L8 2.6l7.4 4.8l.6-.8z"
      />
      <path
         xmlns="http://www.w3.org/2000/svg"
         fill="currentColor"
         d="M8 4L2 8v7h5v-3h2v3h5V8z"
      />
   </svg>
);

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

export const ClockIcon = ({
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

export const PauseIcon = ({
   size = 24,
   color = 'currentColor',
   ...props
}) => (
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

export const PlayIcon = ({
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

export const RepeatIcon = ({
   size = 24,
   color = 'currentColor',
   ...props
}) => (
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

export const ShuffleLineDuotone = ({
   size,
}: ShuffleLineDuotoneProps) => (
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

export const PlayerPreviousDuotone = ({
   size,
}: PlayerPreviousDuotoneProps) => (
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

export const PlayerNextDuotone = ({
   size,
}: PlayerNextDuotoneProps) => (
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

export const RepeatLineDuotone = ({
   size,
}: RepeatLineDuotoneProps) => (
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

export const SpeakerHighDuotone = ({
   size,
}: SpeakerHighDuotoneProps) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
   >
      <g fill="currentColor">
         <path
            d="M80 88v80H32a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8Z"
            opacity=".2"
         />
         <path d="M155.51 24.81a8 8 0 0 0-8.42.88L77.25 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224V32a8 8 0 0 0-4.49-7.19ZM32 96h40v64H32Zm112 111.64l-56-43.55V91.91l56-43.55Zm54-106.08a40 40 0 0 1 0 52.88a8 8 0 0 1-12-10.58a24 24 0 0 0 0-31.72a8 8 0 0 1 12-10.58ZM248 128a79.9 79.9 0 0 1-20.37 53.34a8 8 0 0 1-11.92-10.67a64 64 0 0 0 0-85.33a8 8 0 1 1 11.92-10.67A79.83 79.83 0 0 1 248 128Z" />
      </g>
   </svg>
);

type SpeakerSlashDuotoneProps = {
   size: string;
};

export const SpeakerSlashDuotone = ({
   size,
}: SpeakerSlashDuotoneProps) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
   >
      <g fill="currentColor">
         <path
            d="M80 88v80H32a8 8 0 0 1-8-8V96a8 8 0 0 1 8-8Z"
            opacity=".2"
         />
         <path d="M53.92 34.62a8 8 0 1 0-11.84 10.76L73.55 80H32a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h45.25l69.84 54.31A8 8 0 0 0 160 224v-48.91l42.08 46.29a8 8 0 1 0 11.84-10.76ZM32 96h40v64H32Zm112 111.64l-56-43.55v-68.2l56 61.6Zm42-63.77a24 24 0 0 0 0-31.72a8 8 0 1 1 12-10.57a40 40 0 0 1 0 52.88a8 8 0 0 1-12-10.59Zm-80.16-76a8 8 0 0 1 1.4-11.23l39.85-31A8 8 0 0 1 160 32v74.83a8 8 0 0 1-16 0V48.36l-26.94 21a8 8 0 0 1-11.22-1.45ZM248 128a79.9 79.9 0 0 1-20.37 53.34a8 8 0 0 1-11.92-10.67a64 64 0 0 0 0-85.33a8 8 0 1 1 11.92-10.67A79.83 79.83 0 0 1 248 128Z" />
      </g>
   </svg>
);

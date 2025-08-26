import { FaGithub, FaGoogle } from 'react-icons/fa';

export default function SocialRegister() {
   return (
      <div className="flex flex-col gap-2 mt-4">
         <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition">
            <FaGithub /> <span>Sign up with GitHub</span>
         </button>
         <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 transition">
            <FaGoogle className="text-red-500" />{' '}
            <span>Sign up with Google</span>
         </button>
      </div>
   );
}

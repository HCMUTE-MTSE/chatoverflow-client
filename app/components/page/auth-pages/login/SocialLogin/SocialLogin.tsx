import * as React from 'react';
import { FaGoogle, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

export default function SocialLogin() {
   return (
      <div className="flex justify-center gap-4">
         <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
            <FaGoogle className="text-xl" />
         </button>
         <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
            <FaFacebook className="text-xl text-blue-500" />
         </button>
         <button className="flex items-center justify-center w-12 h-12 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
            <FaGithub className="text-xl text-gray-200" />
         </button>
      </div>
   );
}

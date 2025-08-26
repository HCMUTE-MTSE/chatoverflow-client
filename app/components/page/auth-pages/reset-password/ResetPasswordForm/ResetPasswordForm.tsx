import * as React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

function ResetPasswordForm() {
   return (
      <form className="space-y-4">
         <div>
            <label htmlFor="otp" className="block text-sm text-gray-400 mb-1">
               OTP Code
            </label>
            <input
               id="otp"
               type="number"
               placeholder="your otp code"
               className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
         </div>

         <div>
            <label
               htmlFor="new-password"
               className="block text-sm text-gray-400 mb-1"
            >
               New password
            </label>
            <input
               id="new-password"
               type="password"
               placeholder="password"
               className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
         </div>
         <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition font-semibold"
         >
            <p className="text-center text-sm">Continute</p>
         </button>

         <div className="flex items-center justify-center gap-2 text-gray-200">
            <FaArrowLeft className="w-5 h-5 hover:opacity-80" />
            <a href="/login" className="text-sm hover:opacity-80">
               Back to login
            </a>
         </div>
      </form>
   );
}

export default ResetPasswordForm;

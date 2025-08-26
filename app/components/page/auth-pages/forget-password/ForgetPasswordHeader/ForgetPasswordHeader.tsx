import { FaSun } from 'react-icons/fa';

export default function ForgetPasswordHeader() {
   return (
      <div className="flex justify-between items-start mb-6">
         <div>
            <h2 className="text-xl font-semibold">Forgot password?</h2>
            <p className="text-gray-400 text-sm">
               No worries, we’ll send you reset instructions.
            </p>
         </div>
         <FaSun className="text-orange-500 w-8 h-8" />
      </div>
   );
}

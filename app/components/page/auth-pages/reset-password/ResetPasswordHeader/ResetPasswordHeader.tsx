import * as React from 'react';
import { FaSun } from 'react-icons/fa';

function ResetPasswordHeader() {
   return (
      <div className="flex justify-between items-start mb-6">
         <div>
            <h2 className="text-xl font-semibold">Set new password</h2>
            <p className="text-gray-400 text-sm">
               New password must be different from your previous.
            </p>
         </div>
         <FaSun className="text-orange-500 w-8 h-8" />
      </div>
   );
}

export default ResetPasswordHeader;

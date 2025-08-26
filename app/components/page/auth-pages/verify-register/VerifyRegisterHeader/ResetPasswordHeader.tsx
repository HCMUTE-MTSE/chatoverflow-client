import * as React from 'react';
import { FaSun } from 'react-icons/fa';

function VerifyRegisterHeader() {
   return (
      <div className="flex justify-between items-start mb-6">
         <div>
            <h2 className="text-xl font-semibold">Verify your email</h2>
            <p className="text-gray-400 text-sm">
               Enter the code sent to your email.
            </p>
         </div>
         <FaSun className="text-orange-500 w-8 h-8" />
      </div>
   );
}

export default VerifyRegisterHeader;

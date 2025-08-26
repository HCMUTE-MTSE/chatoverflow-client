import * as React from 'react';
import ResetPasswordForm from '../ResetPasswordForm';
import ResetPasswordHeader from '../ResetPasswordHeader';

function ResetPasswordCard() {
   return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
         <ResetPasswordHeader />
         <ResetPasswordForm />
      </div>
   );
}

export default ResetPasswordCard;

import * as React from 'react';
import ForgetPasswordHeader from '../ForgetPasswordHeader';
import ForgetPasswordForm from '../ForgetPasswordForm';

export default function ForgetPasswordCard() {
   return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
         <ForgetPasswordHeader />
         <ForgetPasswordForm />
      </div>
   );
}

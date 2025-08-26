import * as React from 'react';
import VerifyRegisterForm from '../VerifyRegisterForm';
import VerifyRegisterHeader from '../VerifyRegisterHeader';

function VerifyRegisterCard() {
   return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
         <VerifyRegisterHeader />
         <VerifyRegisterForm />
      </div>
   );
}

export default VerifyRegisterCard;

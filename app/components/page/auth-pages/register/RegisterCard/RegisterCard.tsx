import * as React from 'react';
import AuthFooter from '../../AuthFooter';
import AuthHeader from '../../AuthHeader';
import RegisterForm from '../RegisterForm';
import SocialRegister from '../SocialRegister';

function RegisterCard() {
   return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
         <AuthHeader content={'Create your account'} />
         <RegisterForm />
         <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-orange-500 hover:underline">
               Sign in
            </a>
         </p>
         <SocialRegister />
      </div>
   );
}

export default RegisterCard;

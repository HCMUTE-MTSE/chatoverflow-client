import AuthFooter from '../../AuthFooter';
import AuthHeader from '../../AuthHeader';
import EmailLoginForm from '../EmailLoginForm';
import SocialLogin from '../SocialLogin';

export default function LoginCard() {
   return (
      <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
         <AuthHeader />
         <SocialLogin />
         <EmailLoginForm />
         <AuthFooter />
      </div>
   );
}

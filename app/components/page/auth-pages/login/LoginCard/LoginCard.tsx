import AuthFooter from "../../AuthFooter";
import AuthHeader from "../../AuthHeader";
import EmailLoginForm from "../EmailLoginForm";
import SocialLogin from "../SocialLogin";

interface LoginCardProps {
  from: string;
}

export default function LoginCard({ from }: LoginCardProps) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
      <AuthHeader content={"Login in to your account"} />
      <SocialLogin />
      <EmailLoginForm from={from} />
      <AuthFooter />
    </div>
  );
}

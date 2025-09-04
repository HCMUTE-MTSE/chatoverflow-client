import AuthLayout from "../../AuthLayout";
import LoginCard from "../LoginCard";

interface LoginPageProps {
  from: string;
}

export default function LoginPage({ from }: LoginPageProps) {
  return (
    <AuthLayout>
      <LoginCard from={from} />
    </AuthLayout>
  );
}

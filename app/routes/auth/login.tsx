import * as React from "react";
import { useLocation } from "react-router";
import LoginPage from "~/components/page/auth-pages/login/LoginPage";

export default function Login() {
  const location = useLocation();
  const from = location.state?.from || "/";

  return <LoginPage from={from} />;
}

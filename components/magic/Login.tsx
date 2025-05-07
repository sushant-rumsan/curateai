import { LoginProps } from "@/utils/types";

import EmailOTP from "./auth/EmailOTP";
import GoogleLogin from "./auth/GoogleLogin";

const Login = ({ token, setToken }: LoginProps) => {
  return (
    <>
      <EmailOTP token={token} setToken={setToken} />
    </>
  );
};

export default Login;

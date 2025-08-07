"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import { useServices } from "@/data/providers/ServicesProvider";
import { useRouter } from "next/navigation";

const LoginFormContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useServices();
  const router = useRouter();

  const signIn = async (data) => {
    setIsLoading(true);
    const res = await login(data.email, data.password);
    if (res) {
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="login-form-container">
        <LoginForm isLoading={isLoading} signIn={signIn} />
      </div>
      <style jsx>
        {`
          .login-form-container {
            width: 100%;
            height: 70vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
};

export default LoginFormContainer;

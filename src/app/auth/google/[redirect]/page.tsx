"use client";
import { NextApiRequest } from "next";
import { useUserContext } from "@/components/UserProvider";
import userDto from "@/components/loginForm/helpers/userDto";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CustomRequest extends NextApiRequest {
  searchParams: {
    state: string;
  };
}

export default function handler(req: CustomRequest) {
  const router = useRouter();
  const { setUser, setToken } = useUserContext();
  const user = JSON.parse(req.searchParams.state);
  const userInfo = userDto(user.dataUser);

  useEffect(() => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(user.dataUser.token);
    localStorage.setItem("token", user.dataUser.token);
    router.push("/acciones");
  }, []);
}

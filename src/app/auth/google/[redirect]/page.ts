"use client";

import { useUserContext } from "@/components/UserProvider";
import userDto from "@/components/loginForm/helpers/userDto";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// export default function handler(req: CustomRequest) {
//   const router = useRouter();
//   const { setUser, setToken } = useUserContext();
//   const user = JSON.parse(req.searchParams.state);
//   const userInfo = userDto(user.dataUser);

//   useEffect(() => {
//     setUser(userInfo);
//     localStorage.setItem("user", JSON.stringify(userInfo));
//     setToken(user.dataUser.token);
//     localStorage.setItem("token", user.dataUser.token);
//     router.push("/acciones");
//   }, []);
// }

export default function GoogleRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser, setToken } = useUserContext();

  useEffect(() => {
    const state = searchParams.get("state");
    if (state) {
      const user = JSON.parse(state);
      const userInfo = userDto(user.dataUser);
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
      setToken(user.dataUser.token);
      localStorage.setItem("token", user.dataUser.token);
      router.push("/acciones");
    }
  }, [searchParams, setUser, setToken, router]);

  return null;
}

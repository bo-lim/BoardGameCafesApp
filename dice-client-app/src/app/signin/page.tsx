"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Flex,
  Card,
  Button,
  Heading,
  TextField,
  Text,
  IconButton,
} from "@radix-ui/themes";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useUserStore } from "@/stores/user";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [userpwd, setUserpwd] = useState("");
  const [pwdEyes, setPwdEyes] = useState(false);
  const router = useRouter();

  const loginUser = useUserStore((state) => state.loginUser);
  //const userI = useUserStore((state) => state.userInfo);

  const usernameHandleChange = (value: string) => {
    //console.log(value);
    setUsername((prev) => value);
    //console.log(username);
  };

  const pwdHandleChange = (value: string) => {
    setUserpwd((prev) => value);
    //console.log(userpwd);
  };

  async function submitLogin() {
    const loginInfo = { email: username, password: userpwd };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/auth`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        res.json().then((authData) => {
          const authToken = authData.token.access;
          localStorage.setItem("accessToken", authToken);
          // console.log(authToken);
          const userData = authData.user;
          //console.log(userData.id);

          loginUser(
            userData.id,
            userData.email,
            userData.nickname,
            userData.age,
            userData.gender
          );
        });
        // setUsername("");
        // setUserpwd("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    //console.log("Login");
    //console.log(userI);
  }

  return (
    <>
      <Card size="5">
        <Flex direction={"column"} gap={"5"}>
          <Heading
            as="h1"
            color="indigo"
            className="text-center"
            weight={"bold"}
          >
            로그인
          </Heading>
          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              아이디
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="아이디"
                  onChange={(e) => usernameHandleChange(e.target.value)}
                  value={username}
                />
              </TextField.Root>
            </Flex>
          </Text>
          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              비밀번호
              <TextField.Root>
                <TextField.Input
                  size="3"
                  type={pwdEyes ? "text" : "password"}
                  placeholder="비밀번호"
                  onChange={(e) => pwdHandleChange(e.target.value)}
                  value={userpwd}
                />
                <TextField.Slot>
                  <IconButton
                    variant="ghost"
                    onClick={() => setPwdEyes(!pwdEyes)}
                  >
                    {pwdEyes ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </IconButton>
                </TextField.Slot>
              </TextField.Root>
            </Flex>
          </Text>
          <Button size="3" variant="soft" onClick={submitLogin}>
            로그인
          </Button>
          <span>
            <Text className="pr-3">아직 가입을 안하셨나요?</Text>
            <Button variant="ghost" size="3" className="underline">
              <Link href="/signup">회원가입</Link>
            </Button>
          </span>
        </Flex>
      </Card>
    </>
  );
};

export default SignInPage;

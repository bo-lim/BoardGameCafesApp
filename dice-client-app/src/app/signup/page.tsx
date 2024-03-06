"use client";
import React from "react";

import {
  Flex,
  Card,
  Button,
  Heading,
  TextField,
  Text,
  Checkbox,
  Select,
} from "@radix-ui/themes";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("10");
  const [gender, setGender] = useState("F");
  const [pwd, setPwd] = useState("");
  const [pwdCheck, setPwdCheck] = useState("");

  const router = useRouter();

  function handlePasswordCheck(value: string) {}

  async function submitSignup() {
    const signupInfo = {
      email: email,
      nickname: nickname,
      age: age,
      gender: gender,
      password: pwd,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
          method: "POST",
          body: JSON.stringify(signupInfo),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        res.json().then((authData) => {
          const authToken = authData.token.access;
          localStorage.setItem("accessToken", authToken);
          // console.log(authToken);
          const userData = authData.user;
          //console.log(userData.id);
          localStorage.setItem("userID", userData);

          router.push("/");
        });
      }
    } catch (error) {
      console.log(error);
    }
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
            회원가입
          </Heading>
          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              이메일
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="이메일"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </TextField.Root>
            </Flex>
          </Text>
          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              이름
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="닉네임"
                  onChange={(e) => setNickname(e.target.value)}
                />
              </TextField.Root>
            </Flex>
          </Text>
          <div className="flex gap-2">
            <Text className="pt-2">연령</Text>
            <Select.Root defaultValue={age} size="3">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="10">10대</Select.Item>
                <Select.Item value="20">20대</Select.Item>
                <Select.Item value="30">30대</Select.Item>
              </Select.Content>
            </Select.Root>
            <Text className="pt-2">성별</Text>
            <Select.Root
              defaultValue={gender}
              size="3"
              onValueChange={(value) => setGender(value)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="F">여성</Select.Item>
                <Select.Item value="M">남성</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              비밀번호
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="비밀번호"
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                />
              </TextField.Root>
            </Flex>
          </Text>

          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              비밀번호 확인
              <TextField.Root>
                <TextField.Input
                  size="3"
                  placeholder="비밀번호 확인"
                  type="password"
                  onChange={(e) => setPwdCheck(e.target.value)}
                />
              </TextField.Root>
            </Flex>
          </Text>
          <Text as={"label"} size="3">
            <Checkbox /> 이용양관 개인정보 및 정보이용에 동의합니다.
          </Text>

          <Button size="3" variant="soft" onClick={submitSignup}>
            회원가입
          </Button>
        </Flex>
      </Card>
    </>
  );
};

export default SignUpPage;

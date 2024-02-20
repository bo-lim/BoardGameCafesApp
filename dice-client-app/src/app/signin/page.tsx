"use client";
import React from "react";

import { Flex, Card, Button, Heading, TextField, Text } from "@radix-ui/themes";

const SignInPage = () => {
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
                <TextField.Input size="3" placeholder="아이디" />
              </TextField.Root>
            </Flex>
          </Text>
          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              비밀번호
              <TextField.Root>
                <TextField.Input size="3" placeholder="비밀번호" />
              </TextField.Root>
            </Flex>
          </Text>
          <Button size="3" variant="soft">
            로그인
          </Button>
          <span>
            <Text className="pr-3">아직 가입을 안하셨나요?</Text>
            <Button variant="ghost" size="3" className="underline">
              회원가입
            </Button>
          </span>
        </Flex>
      </Card>
    </>
  );
};

export default SignInPage;

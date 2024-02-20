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
} from "@radix-ui/themes";

const SignUpPage = () => {
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
                <TextField.Input size="3" placeholder="이메일" />
              </TextField.Root>
            </Flex>
          </Text>
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

          <Text as={"label"} weight={"medium"}>
            <Flex direction={"column"} gap="2">
              비밀번호 확인
              <TextField.Root>
                <TextField.Input size="3" placeholder="비밀번호 확인" />
              </TextField.Root>
            </Flex>
          </Text>

          <Button size="3" variant="soft">
            회원가입
          </Button>
          <Text as={"label"} size="3">
            <Checkbox /> 이용양관 개인정보 및 정보이용에 동의합니다.
          </Text>
        </Flex>
      </Card>
    </>
  );
};

export default SignUpPage;

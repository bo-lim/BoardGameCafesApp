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
              이름
              <TextField.Root>
                <TextField.Input size="3" placeholder="이름" />
              </TextField.Root>
            </Flex>
          </Text>
          <div className="flex gap-2">
            <Text>연령</Text>
            <Select.Root defaultValue="10" size="3">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="10">10대</Select.Item>
                <Select.Item value="20">20대</Select.Item>
                <Select.Item value="30">30대</Select.Item>
              </Select.Content>
            </Select.Root>
            <Text>성별</Text>
            <Select.Root defaultValue="female" size="3">
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="female">여성</Select.Item>
                <Select.Item value="male">남성</Select.Item>
                <Select.Item value="unknown">비밀</Select.Item>
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
                />
              </TextField.Root>
            </Flex>
          </Text>
          <Text as={"label"} size="3">
            <Checkbox /> 이용양관 개인정보 및 정보이용에 동의합니다.
          </Text>

          <Button size="3" variant="soft">
            회원가입
          </Button>
        </Flex>
      </Card>
    </>
  );
};

export default SignUpPage;

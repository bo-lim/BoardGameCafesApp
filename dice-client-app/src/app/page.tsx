"use client";
import {
  Flex,
  TextField,
  Button,
  Box,
  Callout,
  Heading,
  Select,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, InfoCircledIcon } from "@radix-ui/react-icons";
export default function Home() {
  return (
    <>
      <Flex direction={"column"} gap={"8"}>
        <Heading as="h1" className="text-center">
          보드게임 종합 검색
        </Heading>
        <Callout.Root>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            현재 검색 가능한 필터들은 아래와 같습니다. 뭔가를 바라시겠지만,
            {"\n"}
            이것이 우리의 한계! 국비 끝나면 업데이트 할수도? 안할수도.. 헿
            <ul>
              <li>- 보드게임 카페 이름</li>
              <li>- 보드게임</li>
              <li>- 지하철역</li>
            </ul>
          </Callout.Text>
        </Callout.Root>
        <Flex gap="1" className="flex-col sm:flex-row">
          <TextField.Root>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input size="3" placeholder="검색" />
          </TextField.Root>
          <Select.Root defaultValue="game" size="3">
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="game">보드게임</Select.Item>
              <Select.Item value="cafe">보드게임 카페</Select.Item>
              <Select.Item value="metro">지하철역</Select.Item>
            </Select.Content>
          </Select.Root>
          <Button size="3">검색</Button>
        </Flex>
        <Box className="mt-10">test</Box>
      </Flex>
    </>
  );
}

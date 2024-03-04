"use client";
import {
  Flex,
  TextField,
  Button,
  Card,
  Callout,
  Heading,
  Select,
  Grid,
  Inset,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Cafe {
  CafeID: number;
  Name: string;
  Location: string;
  PhoneNumber: string;
  OperatingHour: string;
  Image: string | null;
}

const sampleCafeData: Cafe[] = [
  {
    CafeID: 1,
    Name: "테스트 카페 1",
    Location: "서울시 서초구 somewhere over the rainbow",
    PhoneNumber: "010-1234-5678",
    OperatingHour: "9:00 ~ 24:00",
    Image: "https://www.jigsawexplorer.com/puzzles/subjects/spa-supplies.jpg",
  },
  {
    CafeID: 2,
    Name: "테스트 카페 2",
    Location: "서울시 서초구 somewhere over the rainbow",
    PhoneNumber: "010-1234-5678",
    OperatingHour: "9:00 ~ 24:00",
    Image: "https://www.jigsawexplorer.com/puzzles/subjects/avon-pub.jpg",
  },
  {
    CafeID: 3,
    Name: "테스트 카페 3",
    Location: "서울시 서초구 somewhere over the rainbow",
    PhoneNumber: "010-1234-5678",
    OperatingHour: "9:00 ~ 24:00",
    Image:
      "https://www.jigsawexplorer.com/puzzles/subjects/island-hut-423x300.jpg",
  },
];

export default function Home() {
  const [cafeData, setCafeData] = useState<Cafe[]>([]);

  async function getCafe() {
    try {
      const response = await fetch("http://192.168.0.36:8000/cafe/cafe_p");
      const cafe_data = await response.json();
      return cafe_data;
    } catch (error) {
      return "Please check your server";
    }
  }

  useEffect(() => {
    getCafe().then((cafe_data) => {
      setCafeData(cafe_data);
    });
  }, [cafeData]);

  return (
    //TODO: 정렬 별점순 이메일 순
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
          </Callout.Text>
        </Callout.Root>
        <Flex gap="1" className="flex-col sm:flex-row w-full">
          <TextField.Root className="flex-grow">
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
              <Select.Item value="gu">지역구</Select.Item>
              <Select.Item value="city">행정구역</Select.Item>
            </Select.Content>
          </Select.Root>
          <Button size="3">검색</Button>
        </Flex>

        <Grid columns="3" gap="3" width="auto">
          {sampleCafeData.map((cafe) => (
            <Card key={cafe.CafeID}>
              {cafe.Image ? (
                <Inset clip="padding-box" side="top" pb="current">
                  <Image
                    src={cafe.Image}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                  ></Image>
                </Inset>
              ) : null}
              <h2>{cafe.Name}</h2>
              <p>{cafe.Location}</p>
              <p>{cafe.PhoneNumber}</p>
              <p>{cafe.OperatingHour}</p>
            </Card>
          ))}
        </Grid>
      </Flex>
    </>
  );
}

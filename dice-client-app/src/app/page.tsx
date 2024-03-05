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
import Link from "next/link";
import Recommendation from "@/components/CafeRecommendation";

interface ICafe {
  CafeID: number;
  Name: String;
  PhoneNumber: string;
  OperatingHour: String;
  Image?: string;
}

interface IGame {
  GameID: number;
  Name: string;
  MinPlayers: number;
  MaxPlayers: number;
  AgeLimit: number;
  Description?: string;
  VideoURL?: string;
  Image?: string;
  SearchCount: number;
}

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("gamename");
  const [cafeData, setCafeData] = useState<ICafe[]>([]);
  const [gameData, setGameData] = useState<IGame[]>([]);

  async function submitSearch() {
    switch (filterValue) {
      case "gamename":
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/boardgame/api/search_by_name/?boardgame_name=${searchValue}`
          );
          const board_game = await response.json();
          console.log(board_game);
          setGameData(board_game);
          if (board_game) return board_game;
        } catch (error) {
          return "Please check your server";
        }
        break;
      case "numberofpeople":
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/boardgame/api/search_by_number/?number_of_people=${searchValue}`
          );
          const board_game = await response.json();
          console.log(board_game);
          setGameData(board_game);
          if (board_game) return board_game;
        } catch (error) {
          return "Please check your server";
        }
        break;
      case "agelimit":
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/boardgame/api/boardgame_limit/?age=${searchValue}`
          );
          const board_game = await response.json();
          console.log(board_game);
          setGameData(board_game);
          if (board_game) return board_game;
        } catch (error) {
          return "Please check your server";
        }
        break;
      case "cafename":
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/search_by_name/?cafe_name=${searchValue}`
          );
          const board_game = await response.json();
          setCafeData((prev) => board_game);
          if (board_game) return board_game;
        } catch (error) {
          return "Please check your server";
        }
        break;
      case "location":
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/location_contains/?location=${searchValue}`
          );
          const board_game = await response.json();
          setCafeData((prev) => board_game);
          if (board_game) return board_game;
        } catch (error) {
          return "Please check your server";
        }
        break;
      default:
        return [];
    }
  }

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
            이 프로젝트는 AWS Cloud School 4기 3조 박재연, 오현택, 이보림,
            최재원이 만들었습니다. DB 구현을 목표로한 프로젝트입니다.
          </Callout.Text>
        </Callout.Root>
        <Flex gap="1" className="flex-col sm:flex-row w-full">
          <TextField.Root className="flex-grow">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              size="3"
              placeholder="검색"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </TextField.Root>
          <Select.Root
            defaultValue="gamename"
            size="3"
            onValueChange={(value) => setFilterValue(value)}
          >
            <Select.Trigger className="w-1/5" />
            <Select.Content>
              <Select.Group>
                <Select.Label>보드게임</Select.Label>
                <Select.Item value="gamename">보드게임 이름</Select.Item>
                <Select.Item value="numberofpeople">
                  보드게임 인원 수
                </Select.Item>
                <Select.Item value="agelimit">연령 제한</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>보드게임 카페</Select.Label>
                <Select.Item value="cafename">보드게임 카페 이름</Select.Item>
                <Select.Item value="location">보드게임 카페 위치</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button size="3" onClick={submitSearch}>
            검색
          </Button>
        </Flex>
        {cafeData.length === 0 ? (
          <></>
        ) : (
          <>
            <Heading>검색 결과</Heading>
            <Grid columns="3" gap="3" width="auto">
              {cafeData.map((cafe) => (
                <Card key={cafe.CafeID}>
                  <Link href={`/cafe/${cafe.CafeID}`}>
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
                    <p>가게 전화번호</p>
                    <p>{cafe.PhoneNumber}</p>
                    <p>가게 운영시간</p>
                    <p>{cafe.OperatingHour}</p>
                  </Link>
                </Card>
              ))}
            </Grid>
          </>
        )}
        {gameData.length === 0 ? (
          <></>
        ) : (
          <>
            <Heading>검색 결과</Heading>
            <Grid columns="3" gap="3" width="auto">
              {gameData.map((game) => (
                <Card key={game.GameID}>
                  <Link href={`/boardgame/${game.GameID}`}>
                    {game.Image ? (
                      <Inset clip="padding-box" side="top" pb="current">
                        <Image
                          src={game.Image}
                          width={500}
                          height={500}
                          alt="Picture of the author"
                        ></Image>
                      </Inset>
                    ) : null}
                    <h2>{game.Name}</h2>
                    <p>플레이 인원</p>
                    <p>
                      {game.MinPlayers} ~ {game.MaxPlayers}
                    </p>
                    <p>연령 제한</p>
                    <p>{game.AgeLimit}살</p>
                  </Link>
                </Card>
              ))}
            </Grid>
          </>
        )}
        <Heading>보드게임 및 보드게임 카페 추천</Heading>
        <Recommendation />
      </Flex>
    </>
  );
}

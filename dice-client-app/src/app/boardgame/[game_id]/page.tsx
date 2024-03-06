"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
  TextArea,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

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

interface IReview {
  Board_ReviewID: number;
  Rating: number;
  Comment: string;
  Image?: string;
  Date: string;
  UserID: number;
  BoardGameID: number;
  nickname: string;
}

interface ICafe {
  CafeID: number;
  Name: String;
  Location: String;
  PhoneNumber: string;
  OperatingHour: String;
  Image?: string;
  review_count: number;
}

const page = () => {
  const [review, setReview] = useState("");
  const [boardGame, setBoardGame] = useState<IGame[]>([]);
  const [reviewData, setReviewData] = useState<IReview[]>([]);
  const [cafeData, setCafeData] = useState<ICafe[]>([]);
  const [rating, setRating] = useState("5");
  const params = useParams<{ game_id: string }>();

  const [userInfo, setUserInfo] = useState<string | null>(null);

  function getRating(value: number) {
    switch (value) {
      case 5:
        return <p>🌕🌕🌕🌕🌕</p>;
      case 4.5:
        return <p>🌕🌕🌕🌕🌗</p>;
      case 4.0:
        return <p>🌕🌕🌕🌕🌑</p>;
      case 3.5:
        return <p>🌕🌕🌕🌗🌑</p>;
      case 3.0:
        return <p>🌕🌕🌕🌑🌑</p>;
      case 2.5:
        return <p>🌕🌕🌗🌑🌑</p>;
      case 2.0:
        return <p>🌕🌕🌑🌑🌑</p>;
      case 1.5:
        return <p>🌕🌗🌑🌑🌑</p>;
      case 1.0:
        return <p>🌕🌑🌑🌑🌑</p>;
      case 0.5:
        return <p>🌗🌑🌑🌑🌑</p>;
      case 0.0:
        return <p>🌑🌑🌑🌑🌑</p>;
      default:
        return <></>;
    }
  }

  async function getCafeData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/search_cafe_by_game_id/?game_id=${params.game_id}`
      );
      const cafe_data = await response.json();
      setCafeData(cafe_data);
      if (cafe_data) return cafe_data;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function getBoardGame() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgame/api/search_by_id/?game_id=${params.game_id}`
      );
      const board_game = await response.json();
      setBoardGame(board_game);
      if (board_game) return board_game;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function getReviews() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgame/review/api/search_by_id/?game_id=${params.game_id}`
      );
      const game_review = await response.json();
      // const FilteredGame = game_review.filter(
      //   (user: IReview) => user.BoardGameID === Number(params.game_id)
      // );
      //console.log(FilteredGame);
      setReviewData(game_review);
      if (game_review) return game_review;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function submitReview() {
    const userReview = {
      UserID: Number(userInfo),
      BoardGameID: Number(params.game_id),
      rating: Number(rating),
      Comment: review,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgame/review/api/`,
        {
          method: "POST",
          body: JSON.stringify(userReview),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        //console.log("리뷰 등록 완료");
        window.location.reload();
      }
    } catch (error) {
      //console.log(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userID") !== undefined)
      setUserInfo(localStorage.getItem("userID"));
    getCafeData();
    getBoardGame();
    getReviews();
  }, []);

  //console.log(params);
  return (
    <div>
      <Flex direction={"column"} gap={"5"}>
        <Grid columns={"2"} gap={"7"}>
          <Flex direction={"column"} gap={"4"}>
            <Heading>게임 정보</Heading>
            <Card>
              {boardGame.map((game) => (
                <Flex gap={"3"} direction={"column"}>
                  <Text color="iris" size={"4"} weight={"bold"}>
                    {game.Name}
                  </Text>
                  <Flex gap={"9"}>
                    <div>
                      <p>게임 플레이 인원</p>
                      <p>
                        {game.MinPlayers} ~ {game.MaxPlayers}
                      </p>
                    </div>
                    <div className="px-4">
                      <p>연령제한</p>
                      <p>{game.AgeLimit}</p>
                    </div>
                  </Flex>

                  <p>게임 설명</p>
                  <p>{game.Description}</p>
                  <p>게임 설명 비디오 링크</p>
                  <p>{game.VideoURL}</p>
                </Flex>
              ))}
            </Card>
          </Flex>
          <Flex direction={"column"} gap={"4"}>
            <Heading>게임을 보유한 카페</Heading>
            <Card>
              {cafeData.map((cafe) => (
                <Flex direction={"column"} gap={"3"} className="pb-4">
                  <h2>
                    {cafe.Name} ({cafe.review_count})
                  </h2>
                  <p>{cafe.Location}</p>
                  {/* <p>운영 시간</p>
                  <p>{cafe.OperatingHour}</p>
                  
                  <p>전화번호</p>
                  <p>{cafe.PhoneNumber}</p> */}
                </Flex>
              ))}
            </Card>
          </Flex>
        </Grid>
        <Heading>리뷰</Heading>
        <Grid columns={"2"} gap={"7"}>
          <Flex direction={"column"} gap={"3"}>
            {reviewData.map((uReview) => (
              <div>
                <Flex
                  justify={{ xs: "between", md: "start" }}
                  gap={{ xs: "1", md: "5" }}
                >
                  <div className="min-w-18">
                    {" "}
                    <Text color="iris" weight={"bold"}>
                      {uReview.nickname}
                    </Text>
                  </div>

                  {getRating(uReview.Rating)}
                  <p>{new Date(uReview.Date).toLocaleDateString()}</p>
                </Flex>

                <p>{uReview.Comment}</p>
              </div>
            ))}
          </Flex>
          <Flex direction={"column"} gap={"4"}>
            <TextArea
              placeholder={userInfo ? "리뷰 남기기" : "로그인 후 이용해주세요"}
              size={"3"}
              className="w-full"
              value={review}
              disabled={userInfo ? false : true}
              onChange={(e) => setReview(e.target.value)}
            />
            <Select.Root
              defaultValue={rating}
              size="3"
              onValueChange={(value) => setRating(value)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="5">(5.0) 🌕🌕🌕🌕🌕 </Select.Item>
                <Select.Item value="4.5">(4.5) 🌕🌕🌕🌕🌗 </Select.Item>
                <Select.Item value="4">(4.0) 🌕🌕🌕🌕🌑</Select.Item>
                <Select.Item value="3.5">(3.5) 🌕🌕🌕🌗🌑</Select.Item>
                <Select.Item value="3">(3.0) 🌕🌕🌕🌑🌑</Select.Item>
                <Select.Item value="2.5">(2.5) 🌕🌕🌗🌑🌑</Select.Item>
                <Select.Item value="2">(2.0) 🌕🌕🌑🌑🌑</Select.Item>
                <Select.Item value="1.5">(1.5) 🌕🌗🌑🌑🌑</Select.Item>
                <Select.Item value="1">(1.0) 🌕🌑🌑🌑🌑</Select.Item>
                <Select.Item value="0.5">(0.5) 🌗🌑🌑🌑🌑</Select.Item>
                <Select.Item value="0">(0.0) 🌑🌑🌑🌑🌑</Select.Item>
              </Select.Content>
            </Select.Root>
            <Button onClick={submitReview} disabled={userInfo ? false : true}>
              리뷰 남기기
            </Button>
          </Flex>
        </Grid>
      </Flex>
    </div>
  );
};

export default page;

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
} from "@radix-ui/themes";
import Link from "next/link";

interface IGame {
  id: number;
  CafeID: number;
  GameID: number;
  Quantity: number;
  Name: string;
}

interface IReview {
  CafeReviewID: number;
  Rating: number;
  Comment: string;
  Image?: string;
  Date: string;
  UserID: number;
  CafeID: number;
}

interface ICafe {
  CafeID: number;
  Name: String;
  Location: String;
  PhoneNumber: string;
  OperatingHour: String;
  Image?: string;
}

const page = () => {
  const [review, setReview] = useState("");
  const [boardGame, setBoardGame] = useState<IGame[]>([]);
  const [reviewData, setReviewData] = useState<IReview[]>([]);
  const [cafeData, setCafeData] = useState<ICafe[]>([]);
  const [rating, setRating] = useState("5");
  const params = useParams<{ cafe_id: string }>();

  const [userInfo, setUserInfo] = useState<string | null>(null);

  async function getCafeData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/${params.cafe_id}`
      );
      const cafe_data = await response.json();
      setCafeData([cafe_data]);
      if (cafe_data) return cafe_data;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function getBoardGame() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgame/cafe/api/cafe_game/?cafe_id=${params.cafe_id}`
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
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/review/api/search_by_cafe_id/?cafe_id=${params.cafe_id}`
      );
      const game_review = await response.json();
      //console.log(game_review);
      setReviewData(game_review);
      if (game_review) return game_review;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function submitReview() {
    const userReview = {
      UserID: Number(userInfo),
      CafeID: Number(params.cafe_id),
      Rating: Number(rating),
      Comment: review,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/review/api/`,
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
            <Heading>카페 정보</Heading>
            <Card>
              {cafeData.map((cafe) => (
                <Flex direction={"column"} gap={"3"}>
                  <h2>{cafe.Name}</h2>
                  <p>운영 시간</p>
                  <p>{cafe.OperatingHour}</p>
                  <p>주소</p>
                  <p>{cafe.Location}</p>
                  <p>전화번호</p>
                  <p>{cafe.PhoneNumber}</p>
                </Flex>
              ))}
            </Card>
          </Flex>
          <Flex direction={"column"} gap={"4"}>
            <Heading>보유 게임</Heading>
            <Card>
              {boardGame.map((game) => (
                <Link href={`/boardgame/${game.GameID}`}>
                  <Flex gap={"3"}>
                    <h2>{game.Name}</h2>
                    <p>(평점 {game.Quantity}점)</p>
                  </Flex>
                </Link>
              ))}
            </Card>
          </Flex>
        </Grid>
        <Heading>리뷰</Heading>
        <Grid columns={"2"} gap={"7"}>
          <Flex direction={"column"} gap={"3"}>
            {reviewData.map((uReview) => (
              <div>
                <p>{uReview.UserID}</p>
                <p>날짜: {new Date(uReview.Date).toLocaleDateString()}</p>
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
                <Select.Item value="3.5">(3.5) 🌕🌕🌕🌗</Select.Item>
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

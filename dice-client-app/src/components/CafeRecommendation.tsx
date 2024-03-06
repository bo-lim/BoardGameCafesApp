"use client";

import React from "react";
import { useEffect, useState } from "react";
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
import Link from "next/link";

interface ICafeReview {
  CafeID: number;
  Name: string;
  review_count: number;
}

interface ICafeScore {
  CafeID: number;
  Name: string;
  avg_rating: number;
}

interface IGameSearch {
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

const GameRecommendation = () => {
  const [cafeReview, setCafeReview] = useState<ICafeReview[]>([]);
  const [cafeScore, setCafeScore] = useState<ICafeScore[]>([]);
  const [gameSearch, setGameSearch] = useState<IGameSearch[]>([]);

  async function getCafeReview() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/cafe_review_rank`
      );
      const cafe_review = await response.json();
      if (cafe_review) return cafe_review;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function getCafeScore() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cafe/api/cafe_review_avg_rank`
      );
      const cafe_score = await response.json();
      if (cafe_score) return cafe_score;
    } catch (error) {
      return "Please check your server";
    }
  }

  async function getGameRank() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/boardgame/api/search_rank`
      );
      const game_rank = await response.json();
      if (game_rank) return game_rank;
    } catch (error) {
      return "Please check your server";
    }
  }

  useEffect(() => {
    getCafeReview().then((cafe_review) => {
      //console.log(cafe_review.slice(0, 5));
      setCafeReview(cafe_review.slice(0, 5));
    });

    getCafeScore().then((cafe_score) => {
      setCafeScore(cafe_score.slice(0, 5));
    });

    getGameRank().then((game_rank) => {
      setGameSearch(game_rank.slice(0, 5));
    });
  }, []);

  return (
    <div>
      {" "}
      <Grid columns="3" gap="3" width="auto">
        <Card>
          <Heading className="justify-center text-center py-3">
            인기 게임
          </Heading>
          {gameSearch.map((cafe, i) => (
            <Link href={`/boardgame/${cafe.GameID}`} id={String(cafe.GameID)}>
              <Flex
                direction={"row"}
                id={String(cafe.GameID)}
                className="pl-10 py-2"
                gap={"2"}
              >
                <h2>
                  {i + 1}. {cafe.Name}
                </h2>
                <p> (최대 {cafe.MaxPlayers}명)</p>
              </Flex>
            </Link>
          ))}
        </Card>
        <Card>
          <Heading className="justify-center text-center py-3">
            리뷰 많은 카페
          </Heading>
          {cafeReview.map((cafe, i) => (
            <Link href={`/cafe/${cafe.CafeID}`} id={String(cafe.CafeID)}>
              <Flex
                direction={"row"}
                gap={"2"}
                id={String(cafe.CafeID)}
                className="pl-10 py-2"
              >
                <h2>
                  {i + 1}. {cafe.Name}
                </h2>
                <p>({cafe.review_count})</p>
              </Flex>
            </Link>
          ))}
        </Card>
        <Card>
          <Heading className="justify-center text-center py-3">
            별점 높은 카페
          </Heading>
          {cafeScore.map((cafe, i) => (
            <Link href={`/cafe/${cafe.CafeID}`} id={String(cafe.CafeID)}>
              <Flex
                direction={"row"}
                gap={"2"}
                id={String(cafe.CafeID)}
                className="pl-10 py-2"
              >
                <h2>
                  {i + 1}. {cafe.Name}
                </h2>
                <p>({cafe.avg_rating})</p>
              </Flex>
            </Link>
          ))}
        </Card>
      </Grid>
    </div>
  );
};

export default GameRecommendation;

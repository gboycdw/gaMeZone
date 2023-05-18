import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../style/gameRanking.css";
import exitImg from "../../style/icons/x-solid.svg";
import backgroundImg from "../../style/icons/ranking-background.png";
import rankingFavicon from "../../style/icons/ranking_favicon.svg";

import ExampleRankingData from "../../components/Games/sampleRankingData";

interface rankingDataType {
  gameId: string;
  userNickname: string;
  totalScores: number;
  averageScore: number;
  highScore: number;
}

const GameRanking = (props: { setShowranking: (show: boolean) => void }) => {
  const { setShowranking } = props;
  const [rankingData, setLankingData] = useState<rankingDataType[]>([]);

  useEffect(() => {
    setLankingData(ExampleRankingData);
  }, []);

  return (
    <div className="ranking-container">
      <div className="ranking-container-header">
        <div className="ranking-container-header-title">
          <img src={rankingFavicon} alt="rankingFavicon" />
          <p>랭킹</p>
        </div>
        <div
          className="exit-button"
          onClick={() => {
            setShowranking(false);
          }}
        >
          <img src={exitImg} alt="exitImg" />
        </div>
      </div>
      <div
        className="ranking-container-body"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="ranking-container-body-title">Ranking Zone</div>
        <div className="ranking-list">
          <ol>
            {rankingData &&
              rankingData.map((data: rankingDataType, idx: number) => (
                <li key={data.userNickname}>
                  <span className="ranking-list-idx">{`${idx + 1}.`}</span>
                  <p className="ranking-list-userID">{data.userNickname}</p>
                  <p className="ranking-list-score">{data.averageScore}</p>
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default GameRanking;
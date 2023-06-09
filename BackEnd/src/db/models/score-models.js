import mongoose from "mongoose";
import GameSchema from "../schemas/game-schema.js";
import ScoreSchema from "../schemas/score-schema.js";
import { nanoid } from "nanoid"; // npm install nanoid 로 라이브러리 설치해야 함
import dayjs from "dayjs"; // npm install dayjs 로 라이브러리 설치해야 함
import UserSchema from "../schemas/user-schema.js";

const Game = mongoose.model("games", GameSchema);
const Score = mongoose.model("scores", ScoreSchema);
const User = mongoose.model("User", UserSchema);

class ScoreModel {
  async findScoresByGame(id) {
    // 게임명으로 검색하여 모든 기록정보를 불러오기
    // 무한스크롤이나 페이지네이션을 구현해야 할 것임.
    const findScores = await Score.find({ gameUrl: id });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }

  async findScoresByGameId(id) {
    // 게임명으로 검색하여 모든 기록정보를 불러오기
    // 무한스크롤이나 페이지네이션을 구현해야 할 것임.
    const findScores = await Score.find({ gameId: id });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }

  //닉네임으로 검색 하기
  async findScoresByNickname(nickname) {
    const findScores = await Score.find({
      userNickname: { $regex: new RegExp(`${nickname}`, "i") },
    });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }

  async findScoresById(id) {
    // 유저아이디로 검색하여 달성한 모든 기록정보를 불러오기
    const findScores = await Score.find({ userNickname: id });
    if (findScores.length < 1) {
      console.log(`저장된 기록이 없습니다.`);
    }
    return findScores;
  }
  async createScoreBoard(data) {
    // 새 기록을 저장하기
    const newScore = await Score.create(data);

    return newScore;
  }

  async calculateRanking(id, param) {
    // 해당 게임의 랭킹정보를 불러오기 : 랭킹정보의 기준 데이터 - 5판 평균점수
    // 기록 데이터는 프론트단에서 걸러서 와야함.(기준이 게임마다 다르기 때문)
    // option은 Average Score, High Score 중 어느 것을 랭킹 기준으로 할 지
    const findScores = await Score.find({ gameUrl: id });
    let nonOption = "default";
    let option = "default";
    if (param === "avr") {
      option = "averageScore";
      nonOption = "highScore";
    } else {
      option = "highScore";
      nonOption = "averageScore";
    }
    // 랭킹등록 우선순위 : 1순위(option) 2순위(non-option) 3순위(달성시점)
    const ranking = [...findScores].sort((b, a) =>
      a[option] === b[option]
        ? a[nonOption] === b[nonOption]
          ? Date.parse(a.createdAt) - Date.parse(b.createdAt)
          : a[nonOption] - b[nonOption]
        : a[option] - b[option]
    );
    const rankingWithIcon = await Promise.all(
      // 유저 아이콘 추가
      ranking.map(async (rankingItem) => {
        const userData = await User.findOne({
          nickname: rankingItem.userNickname,
        });
        const userIcon = userData ? userData.userIcon : null;
        return { ...rankingItem._doc, userIcon: userIcon };
      })
    );
    return rankingWithIcon;
  }

  async userRanking() {
    // 명예의전당을 출력하는 함수.
    // 명예의 전당은 총 기록이 3개 이상이어야 등록 가능함.
    const scoreData = await Score.find(
      {},
      {
        _id: 0,
        gameUrl: 1,
        gameId: 1,
        userNickname: 1,
        averageScore: 1,
        highScore: 1,
      }
    );
    // scoreData는 배열에 다음 객체들이 담길 예정임
    // 일단 게임데이터가 있는 유저목록을 객체로 관리해야함
    const userRanking = {};
    for (let data of scoreData) {
      const { userNickname, gameUrl, averageScore, highScore } = data;
      const game = await Game.findOne(
        { gameUrl: gameUrl },
        { gameTitle: 1, gameOption: 1 }
      );
      const title = game.gameTitle;
      if (!userRanking[userNickname]) {
        userRanking[userNickname] = {};
      }
      if (!userRanking[userNickname][title]) {
        userRanking[userNickname][title] = {
          sumOfAvr: 0,
          count: 0,
          // top: 0,
          score: 0,
        };
      }

      if (game.gameOption === "avr") {
        userRanking[userNickname][title]["sumOfAvr"] += averageScore;
        userRanking[userNickname][title]["count"] += 1;
        userRanking[userNickname][title]["score"] =
          userRanking[userNickname][title]["sumOfAvr"] /
          userRanking[userNickname][title]["count"];
      } else {
        if (userRanking[userNickname][title]["score"] < highScore) {
          userRanking[userNickname][title]["score"] = highScore;
        }
      }
    }

    // 가져온 데이터를 sorting 한다.
    const users = Object.keys(userRanking);
    const final = {};
    for (let user of users) {
      let gameList = Object.keys(userRanking[user]);
      for (let game of gameList) {
        if (!final[user]) {
          final[user] = 0;
        }
        // ★★★★★★★★★ 명예의전당 산정 최소 기록갯수를 정하는 부분 ★★★★★★★★★
        if (
          userRanking[user][game]["count"] === 0 || // count 속성이 0이라면 avr종목이 아니므로 점수반영
          userRanking[user][game]["count"] >= 5 // count 속성이 0이 아니라면 5회 이상이어야 반영함.
        ) {
          final[user] += userRanking[user][game]["score"];
        }
      }
    }
    const honorsRanking = Object.entries(final);
    honorsRanking.sort((b, a) => a[1] - b[1]);

    const honorsRankingWithIcon = await Promise.all(
      //유저 아이콘 추가
      honorsRanking.map(async (a) => {
        const user = await User.findOne({ nickname: a[0] });
        const userIcon = user ? user.userIcon : null;
        return [...a, userIcon];
      })
    );
    const transformedRanking = honorsRankingWithIcon.map((data) => ({
      userNickname: data[0],
      score: parseFloat(data[1]).toFixed(2),
      userIcon: data[2],
    }));
    return transformedRanking;
  }

  async deleteScore(id) {
    // 부정한 방법으로 달성한 기록을 말소하기 위한 운영자 기능
    try {
      const deleteData = await Score.deleteOne({ _id: id });
      return deleteData;
    } catch (e) {
      console.log(`[기록 삭제 실패] 입력한 id를 다시 확인해주세요`);
      throw new Error(e);
    }
  }
  async updateScore(userEmail, userNickname) {
    // 닉네임 변경유저 기록 업데이트 기능?
    try {
      console.log(userEmail, userNickname);
      const updatedData = await Score.updateMany(
        { userEmail: userEmail },
        { $set: { userNickname: userNickname } }
      );
      console.log(updatedData);
      return updatedData;
    } catch (e) {
      console.log("[게임 기록 내 유저 이메일 업데이트 실패]");
      throw new Error(e);
    }
  }

  async deleteScoreByUserNickname(userNickname) {
    // 특정 유저의 기록을 말소하는 기능
    try {
      const deleteData = await Score.deleteMany({ userNickname: userNickname });
      return deleteData;
    } catch (e) {
      console.log("[기록 삭제 실패] 입력한 닉네임을 다시 확인해주세요");
      throw new Error(e);
    }
  }
}

const scoreModel = new ScoreModel();
export { scoreModel };

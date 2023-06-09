import { Router } from "express";
import jwt from "jsonwebtoken";
import { scoreService } from "../services/index.js";
import { loginRequired } from "../middlewares/login-required.js";
// import { userChecker } from "../middlewares/userValidation.js";

const scoreRouter = Router();

// 해당 game의 모든 기록정보를 가져오는 GET 요청
scoreRouter.get("/games/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    console.log("🖐️ 해당 게임의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresByGame(gameId);

    console.log("✔️ 해당 게임의 모든 기록을 불러오는 데 성공했습니다!");

    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});
// 해당 game의 gameId로 모든 기록정보 가져오는 GET 요청
scoreRouter.get("/games/gameId/:id", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    console.log("🖐️ 해당 게임의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresByGameId(gameId);

    console.log("✔️ 해당 게임의 모든 기록을 불러오는 데 성공했습니다!");

    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});
//닉네임으로 게임 기록 조회하는 get 요청
scoreRouter.get("/search/:nickname", async (req, res, next) => {
  try {
    const nickname = req.params.nickname;
    console.log(nickname);
    console.log("🖐️ 해당 게임의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresByNickname(nickname);

    console.log("✔️ 해당 게임의 모든 기록을 불러오는 데 성공했습니다!");

    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 해당 user의 모든 기록정보를 가져오는 GET 요청
scoreRouter.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("🖐️ 해당 유저의 기록을 요청합니다.");
    const scoreList = await scoreService.findScoresById(userId);
    console.log("✔️ 해당 유저의 모든 기록을 불러오는 데 성공했습니다!");
    res.status(201).json(scoreList);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 새 기록을 등록하는 POST 요청
scoreRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    console.log("🖐️ 게임 기록을 DB에 저장합니다.");
    const newScore = await scoreService.createScoreBoard(data);
    console.log("✔️ 기록이 등록되었습니다!");
    res.status(201).json(newScore);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임 랭킹순으로 정렬해서 가져오는 GET 요청
// 상위 몇명을 불러올지 pagenation 세팅해야함 (model혹은 service에서)
// 쿼리 파라미터로 &num={number} 을 전달함. 만약 없을경우, 전체 데이터를 불러옴.
scoreRouter.get("/:id/:option/:isHonor", async (req, res, next) => {
  try {
    const gameId = req.params.id;
    const option = req.params.option;
    const isHonor = req.params.isHonor;
    const query = req.query.num;

    // console.log("🖐️ 랭킹을 불러옵니다.");
    const rankingData = await scoreService.calculateRanking(gameId, option);
    // console.log("✔️ 랭킹 로딩 완료!");
    if (!query) {
      res.status(201).json(rankingData);
    }

    //명예의 전당에서는 랭킹 내 유저 중복되지 않도록 필터링 (1명이 점령하지 않도록)
    const uniqueRanking = [];
    if (isHonor === "honors") {
      //명예의 전당용 api 호출인지 확인
      const nicknameSet = new Set();

      rankingData.forEach((data) => {
        const { userNickname } = data;
        if (!nicknameSet.has(userNickname)) {
          nicknameSet.add(userNickname);
          uniqueRanking.push(data);
        }
      });
      const selectedRanking = uniqueRanking.slice(0, query);
      res.status(201).json(selectedRanking);
    } else {
      //명예의 전당용 api 호출이 아닐 경우 유저 중복 필터링 X
      const selectedRanking = rankingData.slice(0, query);
      res.status(201).json(selectedRanking);
    }
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 명예의 전당
scoreRouter.get("/honors", async (req, res, next) => {
  try {
    // console.log("🖐️ 명예의 전당을 출력합니다.");
    const honor = await scoreService.userRanking();
    // console.log("✔️ 명예의 전당에 오신 것을 환영합니다.");
    res.status(201).json(honor);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 기록정보를 삭제하는 DELETE 요청
scoreRouter.delete("/:id", async (req, res, next) => {
  try {
    const index = req.params.id;
    console.log("🖐️ 해당 기록 데이터를 삭제합니다.");
    await scoreService.deleteScore(index);
    console.log("✔️ 기록 삭제 완료!");
    res.status(201).send("기록 삭제 완료");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

//해당 유저의 기록에서 저장된 nickname을 모두 변경
scoreRouter.patch("/", async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json("토큰이 없습니다. 로그인 후 이용해주세요.");
  }
  console.log("😸 게임 기록 내 유저 이메일 업데이트합니다...");
  const { userEmail, userNickname } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✔️ 토큰 검증 완료. 유저 정보를 업데이트 합니다.");

    const updatedScore = await scoreService.updateScore(
      userEmail,
      userNickname
    );
    console.log("✔️ 게임 기록 내 유저 이메일 업데이트 완료!");
    return res.status(200).json(updatedScore);
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

// 게임정보를 삭제하는 DELETE 요청
scoreRouter.delete("/users/:name", async (req, res, next) => {
  try {
    const userNickname = req.params.name;
    console.log(`🖐️ ${userNickname} 유저의 기록 데이터를 삭제합니다.`);
    await scoreService.deleteScoreByUserNickname(userNickname);
    console.log("✔️ 기록 삭제 완료!");
    res.status(201).send("기록 삭제 완료");
  } catch (err) {
    console.log(`❌ ${err}`);
    next(err);
  }
});

export { scoreRouter };

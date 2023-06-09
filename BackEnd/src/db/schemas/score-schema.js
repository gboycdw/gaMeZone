import { Schema } from "mongoose";

const ScoreSchema = new Schema(
  {
    // 게임 기록정보는 게임명, 유저아이디, 날짜, 기록이 저장되어야 할 것임.
    gameId: {
      type: Schema.Types.ObjectId,
      ref: "Game", // 참조할 모델 이름
      required: true,
    },
    gameUrl: {
      type: String,
      ref: "Game",
      required: true,
    },
    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // 참조할 모델 이름
    //   required: true,
    // },
    userEmail: {
      type: String,
      required: true,
    },
    userNickname: {
      type: String,
      required: true,
    },
    totalScores: {
      type: [[]],
      required: true,
      validate: {
        validator: function (v) {
          return v.length >= 1;
        },
        message: "랭킹에 반영하기 위해서는 최소 1게임 이상 진행해야 합니다.",
      },
    },

    averageScore: {
      //평균 점수
      type: Number,
      required: true,
    },
    highScore: {
      //최고 점수
      type: Number,
      required: true,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "scores",
  }
);

export default ScoreSchema;

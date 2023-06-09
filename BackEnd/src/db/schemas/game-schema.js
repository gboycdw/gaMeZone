import { Schema } from "mongoose";

const GameSchema = new Schema(
  {
    gameTitle: {
      // 게임 이름
      type: String,
      required: true,
    },
    gameCategory: {
      type: [String],
      validate: {
        validator: (v) => v.length > 0,
        message: "카테고리는 1개 이상 존재해야 합니다.",
      },
    },
    gameUrl: {
      // 게임 접속 주소 - 고유한 값이어야함
      type: String,
      required: true, // Url을 식별자로 사용해야 하기 때문에 true로 변경
    },
    // gameIconUrl: {
    //   // 게임 아이콘 : Multer를 사용해서 imgUrl로 사용한다. - 미사용
    //   type: String,
    //   required: false,
    // },
    gameImageUrl: {
      // 게임 이미지 : Multer를 사용해서 imgUrl로 사용한다.
      type: String,
      required: true,
    },
    gameDescription: {
      // 게임 요약정보
      type: String,
      required: true,
    },
    gameManual: {
      // 게임 설명서
      type: String,
      required: true,
    },
    gameServiceStatus: {
      // 게임 서비스 상태 (온라인, 점검중, 숨김)
      type: String,
      requried: true,
    },
    gameOption: {
      // 평균점수가 중요하면 avr, 최고점수가 중요하면 top
      type: String,
      required: true,
    },
  },
  {
    // 타임스탬프와 DB에서 사용할 컬렉션 이름 설정
    timestamps: true,
    collection: "games",
  }
);

export default GameSchema;

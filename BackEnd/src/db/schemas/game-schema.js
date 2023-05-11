import { Schema } from "mongoose";

const GameSchema = new Schema(
  {
    gameTitle: {
      // 게임 이름
      type: String,
      required: true,
    },
    gameCategory: {
      // 게임 카테고리 : 카테고리는 여러 개 존재할 수 있다.
      type: [
        {
          _id: false,
          category: String,
          required: true,
        },
      ],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: "카테고리는 1개 이상 존재해야 합니다.",
      },
    },
    gameIconUrl: {
      // 게임 아이콘 : Multer를 사용해서 imgUrl로 사용한다.
      type: String,
      required: true,
    },
    gameImageUrl: {
      // 게임 이미지 : Multer를 사용해서 imgUrl로 사용한다.
      type: String,
      required: true,
    },
    gameDescription: {
      // 게임 요약정보
      type: Text,
      required: true,
    },
    gameManual: {
      // 게임 설명서
      type: Text,
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

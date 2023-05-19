import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import CommunityContainer from "./components/communityContainer";

function PostWithComment() {
  return (
    <>
      <CommunityContainer>
        <Title>내가 쓴 댓글</Title>
        <Line></Line>
        <CommentMenu>
          <Link to="/mypage/mycomment">
            <Title>내가 쓴 댓글</Title>
          </Link>
          <Link to="/mypage/mycomment-post">
            <Title>내가 댓글 단 게시글</Title>
          </Link>
        </CommentMenu>
      </CommunityContainer>
    </>
  );
}

const Title = styled.h1`
  margin-left: 6.3rem;
  margin-top: 3rem;
`;
const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: 0 auto;
`;

const CommentMenu = styled.div`
  display: flex;
  flex-direction: row;
  & > h1:not(:first-of-type) {
    margin-left: 3rem;
  }
`;
export default PostWithComment;
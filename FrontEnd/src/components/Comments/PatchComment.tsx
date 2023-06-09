import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { get, patch } from '../../api/api';
import {
  CommentDataType,
  CommentDataList,
  ModifiedCommentProps,
} from '../../types/commentType';

const ModifiedComment = ({
  postId,
  closeModal,
  commentId,
}: ModifiedCommentProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState<string>('');
  const [content, setContent] = useState<CommentDataType | null>(null); // 코멘트 하나만 가져오기 위해 상태를 단일 코멘트로 변경
  const [Id, setId] = useState<CommentDataList>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<CommentDataType>(
        `/api/comments/post/${postId}`
      );
      setContent(responseData.data);
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<CommentDataList>(
        `/api/comments/comment/${commentId}`
      );
      setId(responseData.data);
      console.log(responseData.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (content) {
      // content가 가져와졌을 때 기본값으로 사용할 데이터를 설정
      setComment(Id[0].content);
    }
  }, [content]);

  if (!content) {
    return null;
  }

  if (!Id) {
    return null;
  }

  const handleContentChange = (e: any) => {
    setComment(e.target.value);
  };

  const clickHandler = async () => {
    if (comment.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }

    try {
      const commentData = {
        _id: commentId,
        content: comment,
        post: postId,
        author: Id[0].author,
      };

      await patch<CommentDataType>(`/api/comments/${postId}`, commentData);
      closeModal(true);

      alert('댓글 수정이 완료되었습니다.');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  };

  const goBackHandler = () => {
    closeModal(true);
    navigate(location.pathname);
  };

  return (
    <ModifiedSection>
      <Modal>
        <ModalTitle>댓글 수정</ModalTitle>
        <ModalMain>
          <Main>내용</Main>
          <MainText value={comment} onChange={handleContentChange} />
        </ModalMain>
        <ButtonContainer>
          <CompleteButton onClick={clickHandler}>수정하기</CompleteButton>
          <GoBackButton onClick={goBackHandler}>뒤로가기</GoBackButton>
        </ButtonContainer>
      </Modal>
    </ModifiedSection>
  );
};

export default ModifiedComment;

const ModifiedSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: end;
`;

const Modal = styled.div`
  position: absolute;
  width: 125rem;
  height: 20rem;
  margin-bottom: 4rem;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalTitle = styled.h3`
  margin-left: 2rem;
`;

const ModalMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.p`
  margin-right: 3rem;
`;

const MainText = styled.textarea`
  width: 100rem;
  height: 7rem;
  font-size: 1.7rem;
`;

const ButtonContainer = styled.div`
  margin: 2rem;
  text-align: center;
`;
const GoBackButton = styled.button`
  word-wrap: normal;
  margin: 0 3rem 2rem;
  height: 3.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
const CompleteButton = styled.button`
  word-wrap: normal;
  margin: 0 3rem 2rem;
  height: 3.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  font-size: 1.5rem;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

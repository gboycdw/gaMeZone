import React from 'react';
import styled from 'styled-components';

interface PageType {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: any;
}

function Pagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}: PageType) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <PageNav>
        <PageNation>
          {pageNumbers.map((number) => (
            <PageNationList key={number}>
              <PageLink
                onClick={() => paginate(number)}
                style={{
                  fontWeight: currentPage === number ? 'bold' : 'normal',
                }}
              >
                {number}
              </PageLink>
            </PageNationList>
          ))}
        </PageNation>
      </PageNav>
    </>
  );
}

const PageNav = styled.div`
  display: flex;
  align-self: center;
  font-size: 1.7rem;
`;

const PageNation = styled.ul`
  display: flex;
`;

const PageNationList = styled.li`
  margin: 0.5rem;
`;

const PageLink = styled.a`
  cursor: pointer;
  font-size: 2.5rem;
`;
export default Pagination;

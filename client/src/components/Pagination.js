import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  padding: 8px;
  margin: 0;
  background: #fbfbfb;
  color: black;
  border: 1px solid #d3d3d3;
  font-size: 1rem;
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    border: 1px solid black;
    background: #ffffff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, page, setPage }) {
  const numPages = Math.ceil(total / 12);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, idx) => (
            <Button
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
              aria-current={page === idx + 1 ? "page" : null}
            >
              {idx + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default Pagination;
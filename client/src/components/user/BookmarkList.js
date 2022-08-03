import axios from "axios";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

const Container = styled.li`
  width: 22.2vw;
  height: 40vh;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 1px solid black;
  overflow: hidden;
  cursor: default;
`;
const Img = styled.img`
  width: 100%;
  height: 60%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const InfoDiv = styled.div`
  margin-top: 1rem;
  align-self: center;
  font-weight: ${(props) => (props.weight ? "bold" : null)};
  color: ${(props) => (props.color ? "rgba(85,85,85)" : null)};
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 7%;
`;
const ReviewDiv = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px 0 10px;
  color: #368bca;
`;
function BookmarkList({ bookmarkInfo }) {
  let img = JSON.parse(bookmarkInfo.image_src)[0].location

  return (
    <Container>
      <Img src={img}></Img>
      <InfoDiv weight={true}>{bookmarkInfo.user.shop_name}</InfoDiv>
      <InfoDiv color={"true"}>{bookmarkInfo.user.address_line1}</InfoDiv>
      <FlexRow>
        <ReviewDiv>✎ {bookmarkInfo.Reviews.length}</ReviewDiv>
      </FlexRow>
    </Container>
  );
}

export default BookmarkList;

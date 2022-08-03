import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.li`
  width: 22.2vw;
  height: 40vh;
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  background-color: mintcream;
  border: 1px solid transparent;
  overflow: hidden;
  cursor: default;
  border-radius: 15px;
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
const ScoreDiv = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px 0 10px;
  color: #ef5e28;
`;
const ReviewDiv = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px 0 10px;
  color: #368bca;
`;

function SearchList({ shopInfo }) {
  const img = JSON.parse(shopInfo.image_src)[0]?.location;
  const score = shopInfo.score_average || 0;
  const reviewNum = shopInfo.total_views || 0;

  return (
    <Container>
      <Img src={img}></Img>
      <InfoDiv weight={true}>{shopInfo.shop_name}</InfoDiv>
      <InfoDiv color={"true"}>{shopInfo.shop_category_city}</InfoDiv>
      <FlexRow>
        <ScoreDiv>★ {score}</ScoreDiv>
        <ReviewDiv>✎ {reviewNum}</ReviewDiv>
      </FlexRow>
    </Container>
  );
}

export default SearchList;

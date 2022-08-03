import React, { useState, Component } from "react";
import styled from "styled-components";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
const Container = styled.div`
  background-color: #f86d56;

  overflow: hidden;
`;

const Radio = styled.input``;

const Slidelist = styled.ul`
  white-space: nowrap;
  font-size: 0;
`;

// const Li2= styled.li`
//   display: inline-block;
//   vertical-align: middle;
//   width: 100%;
//   transition: all 0.5s;
//   transform: translateX(-100%);

// `
// const Li3= styled.li`
//   display: inline-block;
//   vertical-align: middle;
//   width: 100%;
//   transition: all 0.5s;
//   transform: ${(props)=>props.primary ? none :translateX(-200%)};

// `

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrows = styled.div`
  margin: 5em;
  opacity: 0.6;
`;
const Li = styled.li`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  transition: all 0.5s;
`;
const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  align-items: space-between;
`;
const MentionContainer = styled.div`
  font-family: "roboto", "Noto Sans KR";
  /* margin-top: 30px; */
  /* justify-content: center;
  align-items: center; */
  position: absolute;
  vertical-align: center;
  margin-top: 25px;
  transform: translateX(20vw);
  justify-content: space-between;
  align-items: space-between;
  align-items: space-evenly;
  /* display: flex; */
`;
const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: center;
  margin: 5px;
`;
const Badge1 = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 5px;
  text-align: center;
  color: white;
  height: 25px;
  font-size: 13px;

  /* margin: auto; */
  padding: 5px 10px;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 7px 10px;
  }
`;
const Badge2 = styled.div`
  margin-left: 10px;
  background-color: ${(props) => props.color};
  border-radius: 5px;
  text-align: center;
  color: white;
  height: 25px;
  font-size: 13px;
  padding: 5px 10px;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 7px 10px;
  }
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 100%;
  .gif {
    align-items: right;
    justify-content: right;
  }
`;
const Mention1 = styled.div`
  font-size: 45px;
  color: white;
  font-weight: 500;
  margin-top: 20px;

  @media only screen and (max-width: 1300px) {
    font-size: 21px;
  }
`;
const Mention2 = styled.div`
  font-size: 40px;
  color: white;
  font-weight: 600;
  margin-top: 10px;
  @media only screen and (max-width: 1300px) {
    font-size: 21px;
  }
`;
const Mention3 = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 300;
  margin-top: 20px;
  @media only screen and (max-width: 1300px) {
    font-size: 13px;
  }
`;
const Mention4 = styled.div`
  font-size: 20px;
  color: white;
  font-weight: 300;
  margin-top: 10px;
  @media only screen and (max-width: 1300px) {
    font-size: 13px;
  }
`;
const Img2 = styled.img`
  max-height: 90%;
  width: 400px;
  position: absolute;
  margin-left: 50vw;
  transform: translateY(-10%);
  @media only screen and (max-width: 800px) {
    width: 250px;
    height: 250px;
  }
`;
const Img3 = styled.img`
  max-height: 90%;
  width: 500px;
  position: absolute;
  margin-left: 50vw;
  transform: translateY(-10%);
  @media only screen and (max-width: 800px) {
    width: 250px;
    height: 250px;
  }
`;
const Img4 = styled.img`
  max-height: 90%;
  width: 400px;
  position: absolute;
  margin-left: 40vw;
  transform: translateY(-10%);
  @media only screen and (max-width: 800px) {
    width: 250px;
    height: 250px;
  }
`;
function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeend: 10000,
  };
  return (
    <Container className="section">
      <Contents>
        <Slider {...settings}>
          <div>
            <MentionContainer>
              <BadgeContainer>
                <Badge1 color="aqua">여름</Badge1>
                <Badge2 color="aqua">바캉스</Badge2>
              </BadgeContainer>
              <Mention1>더운 여름에</Mention1>
              <Mention2>밖에서</Mention2>
              <Mention3>땀 흘릴 순</Mention3>
              <Mention4>없잖소!</Mention4>
            </MentionContainer>
            <ImgContainer>
              <Img Img src="/img/summer.jpg"></Img>
              <Img2 src="/img/파워펭귄.gif" primary="gif"></Img2>
            </ImgContainer>
          </div>
          <div>
            <MentionContainer>
              <BadgeContainer>
                <Badge1 color="orange">제주도여행</Badge1>
                <Badge2 color="orange">예약필수!</Badge2>
              </BadgeContainer>
              <Mention1>제주도</Mention1>
              <Mention2>기다리지않을려면</Mention2>
              <Mention3>미리준비하는 것이</Mention3>
              <Mention4>좋을겁니다!!</Mention4>
            </MentionContainer>
            <ImgContainer>
              <Img src="/img/제주도.jpeg"></Img>
              <Img4 src="/img/멍멍이.gif" primary="gif"></Img4>
            </ImgContainer>
          </div>
          <div>
            <MentionContainer className="MentionContainer">
              <BadgeContainer className="BadgeContainger">
                <Badge1 color="#34345a">데이트</Badge1>
                <Badge2 color="#34345a">예약필수!</Badge2>
              </BadgeContainer>
              <Mention1>봄맞이</Mention1>
              <Mention2>여친과의 데이트엔</Mention2>
              <Mention3>예약은</Mention3>
              <Mention4>필수!</Mention4>
            </MentionContainer>
            <ImgContainer className="나냐?">
              <Img src="/img/다운로드.png"></Img>
              <Img3 src="/img/예약하는고양이.gif" primary="gif"></Img3>
            </ImgContainer>
          </div>
        </Slider>
      </Contents>
    </Container>
  );
}

export default Banner;

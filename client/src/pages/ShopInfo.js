import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Map from "../components/Map";
import axios from "axios";
import ReservationModal from "../components/ReservationModal";
import ShopInfoReview from "../components/ShopInfoReview";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faCircleInfo,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 625px;
  justify-self: center;
  margin: 0px auto;
`;
const HeartContainer = styled.div`
  font-size: 30px;
  color: lightcoral;
  text-align: right;
  margin-top: 1rem;
  cursor: pointer;
  p {
    :hover {
      color: red;
    }
  }
`;
const Imgcontainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  height: 500px;
  margin-bottom: 1rem;
`;

const MainImg = styled.img`
  width: 500px;
  height: 100%;
  margin-right: 5px;
`;

const SelectImg = styled.img`
  width: 120px;
  height: 124px;
  margin-bottom: ${(props) => (props.lastChild ? null : "5px")};
  :hover {
    transform: scale(1.05);
  }
`;

const Imgselectbox = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3vh;
`;
const ShopName = styled.h2`
  font-weight: 700;
  font-size: 35px;
  align-self: center;
  margin-bottom: 15px;
`;
const ScoreStarDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  div {
    font-size: 14px;
    margin-right: 13px;
    color: gray;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
`;
const ShopInfoCon = styled.div`
  display: flex;
  border-bottom: ${(props)=> props.lineOn?'1px solid rgba(85, 85, 85, 0.3)':null };
  flex-direction: row;
  margin-bottom: ${(props)=> props.lineOn? '50px' : '15px'};
  svg {
    margin-right: 10px;
  }
  div {
    margin-bottom: 10px;
  }
`;
const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px;
  padding: 20px 0px;
  border-top: 1px solid rgba(85, 85, 85, 0.3);
  div {
    margin-left: 10px;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 4px;
  }
`;
const InfoText = styled.div`
  color: rgb(85, 85, 85);
  margin-top: ${(props) => (props.info ? "30px" : "0px")};
`;

const TitleDiv = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 50px;
  margin-bottom: 15px;
`
const MenuInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  div{
    margin-bottom: 15px;
  }
`;
const MenuPrice = styled.div`
  font-weight: 700;
`
const MapContainer = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
  margin-top: 20px;
`;

const Info = styled.div`
  height: auto;
  h2 {
    margin: 20px 0px;
  }
`;

const Review = styled.div`
  height: auto;
  h2 {
    margin: 20px 0px;
  }
`;

const Bookbutton = styled.button`
  font-size: 20px;
  font-weight: 500;
  height: 40px;
  width: 100%;
  position: sticky;
  bottom: 0px;
  z-index: 100;
  align-self: center;
  justify-self: flex-end;
  border-top-left-radius:7px;
  border-top-right-radius:7px;
  color: white;
  background-color: rgba(21, 64, 99,0.9);
  p {
    :hover {
      transform: scale(1.05);
    }
  }
`;

function ShopInfo({ userInfo }) {
  const [img, setImg] = useState([]);
  const [menuImg, setMenuImg] = useState([]);
  const [pickedShop, setPickedShop] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [openReservation, setOpenReservation] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [businessHour, setBusinessHour] = useState("");
  const getPickedShopInfo = useCallback(async () => {
    const shopId = Number(window.location.pathname.slice(10));
    await axios
      .get(`${process.env.REACT_APP_API_URL}/shop/${shopId}`)
      .then((resp) => {
        const image = JSON.parse(resp.data.data[0].image_src);
        setBusinessHour(
          resp.data.data[0].business_hour
            .split("~")
            .map((el) => el.slice(0, 2) + ":00~")
        );
        const parsingMenuImg = resp.data.data[0].Menus.map((menu) => {
          return JSON.parse(menu.image_src)[0];
        });
        setMenuImg(parsingMenuImg);
        setPickedShop(resp.data.data[0]);
        for (let i = 0; i < resp.data.data[0].Bookmarks.length; i++) {
          if (resp.data.data[0].Bookmarks[i].user_id === userInfo.id) {
            if (resp.data.data[0].Bookmarks[i].is_marked === 1) {
              setIsBookmarked(true);
            }
          }
        }
        setImg(image);
      });
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getPickedShopInfo();
  }, [getPickedShopInfo]);
  const clickImg = (idx) => {
    setCurrentImg(idx);
  };

  const clickReservation = () => {
    setOpenReservation(!openReservation);
  };
  const clickBookmark = () => {
    setIsBookmarked(!isBookmarked);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/bookmark/${pickedShop.id}/${userInfo.user_name}`,
        {
          is_marked: !isBookmarked,
        },
        {
          withCredentials: true,
        }
      )
      .then(() =>
        isBookmarked
          ? alert("즐겨찾기가 해제되었습니다.")
          : alert("즐겨찾기가 추가되었습니다.")
      );
  };
  return (
    <Container>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        <>
          <HeartContainer onClick={clickBookmark}>
            {isBookmarked ? <p>♥️</p> : <p>♡</p>}
          </HeartContainer>
          <Imgcontainer>
            <MainImg src={img[currentImg]?.location}></MainImg>
            <Imgselectbox>
              {img.map((image, idx) => {
                return (
                  <SelectImg
                    lastChild={img.length - 1 === idx ? true : false}
                    onClick={() => clickImg(idx)}
                    key={idx}
                    src={image?.location}
                  ></SelectImg>
                );
              })}
            </Imgselectbox>
          </Imgcontainer>
          <Box>
            <NameScoreContainer>
              <ShopName>{pickedShop.user.shop_name}</ShopName>
              <ScoreStarDiv>
                <div>{pickedShop.total_views || 0}명의 평가</div>
                <div>{pickedShop.score_average || 0}점</div>
              </ScoreStarDiv>
            </NameScoreContainer>
            <Info>
              <ShopInfoCon>
                <FontAwesomeIcon icon={faCalendarCheck} />
                <div>
                  <div>영업시간</div>
                  <InfoText>
                    {businessHour[0] + businessHour[1].slice(0, -1)}
                  </InfoText>
                  <div>휴무일</div>
                  <InfoText>{pickedShop.holiday}</InfoText>
                </div>
              </ShopInfoCon>
              <ShopInfoCon>
                <FontAwesomeIcon icon={faCircleInfo} />
                <div>
                  <div>매장정보</div>
                  <InfoText info={true}>{pickedShop.contents}</InfoText>
                </div>
              </ShopInfoCon>
              <ShopInfoCon lineOn={true}>
              <FontAwesomeIcon icon={faPhone} />
                <div>
                <div>전화번호</div>
              <InfoText>{pickedShop.phone_number || "정보없음"}</InfoText>
              </div>
              </ShopInfoCon>
              <TitleDiv>메뉴정보</TitleDiv>
              {pickedShop.Menus.map((menu, idx) => (
                <MenuContainer key={idx}>
                  {menuImg[idx] ? (
                    <img src={menuImg[idx].location} alt="img" />
                  ) : null}
                  <MenuInfoDiv>
                    <div>{menu.name}</div>
                    <MenuPrice>{menu.price.slice(0,-3)+',000'}</MenuPrice>
                  </MenuInfoDiv>
                </MenuContainer>
              ))}
              <TitleDiv>가게위치</TitleDiv>
              <div>{pickedShop.user.address_line1 || "정보없음"}</div>
            </Info>
            <MapContainer>
              <Map x={pickedShop.x} y={pickedShop.y}></Map>
            </MapContainer>
            <Review>
              <TitleDiv>{pickedShop.total_views || 0}건의 방문자 평가</TitleDiv>
              {pickedShop.Reviews.map((review, idx) => (
                <ShopInfoReview key={idx} review={review} />
              ))}
            </Review>
            {openReservation ? (
              <ReservationModal
                pickedShop={pickedShop}
                setOpenReservation={setOpenReservation}
              />
            ) : null}
            <Bookbutton onClick={clickReservation}>
              <p>예약하기</p>
            </Bookbutton>
          </Box>
        </>
      )}
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(ShopInfo);

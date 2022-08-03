import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  h2 {
    margin: 1em;
  }
`;
const Input = styled.input`
  text-align: center;
  margin: 1vw;
  height: 2vw;
  width: 75%;
`;
const InputshopInfo = styled.input`
  margin: 1vw;
  width: 75%;
  height: 10vh;
  text-align: center;
`;

const Editbutton = styled.button`
  width: 15em;
  height: 5em;
  background-color: rgb(21, 64, 99);
  color: white;

  border-radius: 0.5rem;
  position: relative;
  float: right;
  :hover {
    transform: scale(1.05);
    background-color: aqua;
  }
  margin: 1em;
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  width: 75%;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`;

const Shopinfo = ({ userInfo }) => {
  const [shop, setShop] = useState({});
  const [brand, setBrand] = useState(""); // 브랜드명 스테이트
  const [runtime, setRuntime] = useState(""); //운영시간 스테이트
  const [phone, setPhone] = useState(""); //전화 번호 스테이트
  const [breaktime, setBreaktime] = useState(""); //휴무일 스테이트
  const [info, setInfo] = useState(""); //상세정보 스테이트

  // console.log(userInfo);
  const shopinfo = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/shopinfo/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp.data.data[0].user.shop_name);
        setShop(resp.data.data[0]);
      });
  }, []);

  const edit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/shopinfo/${userInfo.user_name}`,
        {
          user_id: `${userInfo.id}`,
          shop_name: brand ? `${brand}` : `${shop.user.shop_name}`,
          business_hour: runtime ? `${runtime}` : `${shop.business_hour}`,
          phone_number: phone ? `${phone}` : `${shop.phone_number}`,
          holiday: breaktime ? `${breaktime}` : `${shop.holiday}`,
          contents: info ? `${info}` : `${shop.contents}`,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        shopinfo();
        setBrand("");
        setRuntime("");
        setPhone("");
        setBreaktime("");
        setInfo("");
      });
  };

  useEffect(() => {
    shopinfo();
  }, [shopinfo]);
  return (
    <>
      <Container>
        <FlexDiv direction="row">
          <div>가게이름</div>
          <Input
            placeholder={shop.user?.shop_name}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          ></Input>
        </FlexDiv>
        <FlexDiv direction="row">
          <div>운영시간</div>
          <Input
            placeholder={`${shop.business_hour}(이와같은형식으로 기입해야함)`}
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          ></Input>
        </FlexDiv>
        <FlexDiv direction="row">
          <div>가게 전화 번호</div>
          <Input
            placeholder={shop.phone_number}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Input>
        </FlexDiv>
        <FlexDiv direction="row">
          <div>휴무일</div>
          <Input
            placeholder={shop.holiday}
            value={breaktime}
            onChange={(e) => setBreaktime(e.target.value)}
          ></Input>
        </FlexDiv>
        <FlexDiv direction="row">
          <div>가게 설명</div>
          <InputshopInfo
            placeholder={shop.contents}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          ></InputshopInfo>
        </FlexDiv>
        <Editbutton onClick={() => edit()}>수정</Editbutton>
      </Container>
    </>
  );
};
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}

export default connect(mapStateToProps)(Shopinfo);

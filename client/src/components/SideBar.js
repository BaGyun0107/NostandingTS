import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 20px;
`;
const Flex = styled.div`
  flex: ${(props) => props.grow} 1 0;
  margin-bottom: 50px;
`;
const MemberDiv = styled.div`
  margin: 1rem;
`;
const Div = styled.div`
  margin: 1rem;
  color: ${(props) => (props.idx === props.isOn ? "rgba(239,93,40)" : "black")};
  font-weight: ${(props) => (props.idx === props.isOn ? "bold" : null)};
  :hover {
    color: rgba(239, 93, 40);
    transform: scale(1.03);
  }
`;
const NameDiv = styled.div`
  margin: 1rem;
  font-size: 20px;
  font-weight: bold;
`;
const UserImg = styled.img`
  width: 8em;
  height: 8em;
  margin: 1em;
  border-radius: 70%;
  overflow: hidden;
`;
const H2 = styled.h2`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
function SideBar({ userInfo }) {
  const [isOn, setIsOn] = useState("0");

  const clickMenu = (num) => {
    setIsOn(num);
  };
  return (
    <Container>
      {userInfo.is_master === 0 || null ? (
        <div>
          <Flex grow={3}>
            <UserImg src={require("../img/default.png")} />
            <NameDiv>{userInfo.user_name}</NameDiv>
            <MemberDiv>일반회원</MemberDiv>
          </Flex>
          <Flex grow={7}>
            <div>
              <H2>예약</H2>
              <Link to="reservation">
                <Div idx="1" isOn={isOn} onClick={() => clickMenu("1")}>
                  예약내역
                </Div>
              </Link>
              <Link to="review">
                <Div idx="2" isOn={isOn} onClick={() => clickMenu("2")}>
                  내가 쓴 후기
                </Div>
              </Link>
            </div>
            <div>
              <H2>즐겨찾기</H2>
              <Link to="bookmark">
                <Div idx="3" isOn={isOn} onClick={() => clickMenu("3")}>
                  즐겨찾기
                </Div>
              </Link>
            </div>
            <div>
              <H2>알림</H2>
              <Link to="notification">
                <Div idx="4" isOn={isOn} onClick={() => clickMenu("4")}>
                  알림
                </Div>
              </Link>
            </div>
            <div>
              <H2>내 정보</H2>
              <Link to="userinfo">
                <Div idx="5" isOn={isOn} onClick={() => clickMenu("5")}>
                  회원 정보 수정
                </Div>
              </Link>
              <Link to="userdelete">
                <Div idx="6" isOn={isOn} onClick={() => clickMenu("6")}>
                  회원 탈퇴
                </Div>
              </Link>
            </div>
          </Flex>
        </div>
      ) : (
        <div>
          <Flex grow={3}>
            <UserImg src={require("../img/default.png")} />
            <NameDiv>{userInfo.user_name}</NameDiv>
            <MemberDiv>점주회원</MemberDiv>
          </Flex>
          <Flex grow={7}>
            <div>
              <H2>예약</H2>
              <Link to="masterreservation">
                <Div idx="1" isOn={isOn} onClick={() => clickMenu("1")}>
                  예약현황
                </Div>
              </Link>
              <Link to="masterreview">
                <Div idx="2" isOn={isOn} onClick={() => clickMenu("2")}>
                  내 가게 후기
                </Div>
              </Link>
            </div>
            <div>
              <H2>알림</H2>
              <Link to="masternotification">
                <Div idx="3" isOn={isOn} onClick={() => clickMenu("3")}>
                  알림
                </Div>
              </Link>
            </div>
            <div>
              <H2>내 정보</H2>
              <Link to="mastermanagement">
                <Div idx="4" isOn={isOn} onClick={() => clickMenu("4")}>
                  내 가게 관리
                </Div>
              </Link>
              <Link to="masteruserinfo">
                <Div idx="5" isOn={isOn} onClick={() => clickMenu("5")}>
                  회원 정보 수정
                </Div>
              </Link>
              <Link to="userdelete">
                <Div idx="6" isOn={isOn} onClick={() => clickMenu("6")}>
                  회원 탈퇴
                </Div>
              </Link>
            </div>
          </Flex>
        </div>
      )}
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(SideBar);

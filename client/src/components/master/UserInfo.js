import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import axios from "axios";
import { deleteUserInfo, getUserLogout } from "../../store/store";
import { useNavigate } from "react-router-dom";
import Post from "../Post";
const Container = styled.div`

  display: flex;
  flex-direction: column;
  width: 350px;
  margin: 0px auto;
  h2 {
    margin: 1em;
  }
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const CheckInput = styled.input`
  width: 67%;
  height: 6vh;
  font-size: 15px;
  margin-right: 3%;
`;
const CheckBtn = styled.button`
  height: 6vh;
  width: 30%;
  border-radius: 0.3rem;
  background-color: rgb(21, 64, 99);
  color: white;
  &[disabled] {
    cursor: revert;
    transform: revert;
    background-color: rgb(65,65,65);
  }
`;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const TagDiv = styled.div`
  align-self: start;
  margin: 2px;
  font-size: 15px;
  font-weight: 600;
`;
const Input = styled.input`
  width: 100%;
  height: 5vh;
  font-size: 15px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  margin: 1em;
  width: 10em;
  height: 4em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  :hover {
    transform: scale(1.03);
    background-color: tomato;
  }
`;
function UserInfo({ user, logout, deleteUserInfo }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [changePwd, setChangePwd] = useState("");
  const [ckeckChangePwd, setChengeCheckPwd] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [popup, setPopup] = useState(false);
  const [shopName, setShopName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [pwdValid, setPwdValid] = useState(true);
  const inputPassword = (e) => setPassword(e.target.value);
  const inputchangePwd = (e) => setChangePwd(e.target.value);
  const inputChangeCheckPwd = (e) => {
    setChengeCheckPwd(e.target.value);
    if (changePwd !== ckeckChangePwd) {
      setPwdValid(true);
    } else {
      setPwdValid(false);
    }
  };
  const inputNickname = (e) => setNickname(e.target.value);
  const inputPhoneNumber = (e) => setPhoneNumber(e.target.value);
  const inputEmail = (e) => setEmail(e.target.value);

  const submitModify = (e) => {
    e.preventDefault();
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/mypage/userinfo/${user.user_name}`,
          {
            password: changePwd || null,
            nickname: nickname || null,
            phone_number: phoneNumber || null,
            shop_name:shopName || null,
            address_line1: address || null,
            address_line2: addressLine || null,
            email: email || null,
            is_master: user.is_master,
          },
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          alert(`수정이 완료되었습니다. 다시 로그인해주세요.`);
          logout();
          deleteUserInfo();
          navigate("/");
        }).catch((err) => alert(err.response.data.message))
  };
  return (
    <Container>
      <h2>내 정보 수정</h2>
      <FlexCol>
        <FlexCol>
          <TagDiv>아이디</TagDiv>
          <Input type="text" value={user.user_name} disabled />
        </FlexCol>
        <FlexCol>
          <TagDiv>현재 패스워드</TagDiv>
          <Input
            placeholder="******"
            type="password"
            value={password}
            onChange={inputPassword}
          />
        </FlexCol>
        <FlexCol>
          <TagDiv>변경할 패스워드</TagDiv>
          <Input
            type="password"
            placeholder="******"
            value={changePwd}
            onChange={inputchangePwd}
          />
        </FlexCol>
        <FlexCol>
          <TagDiv>변경할 패스워드 확인</TagDiv>
          <Input
            type="password"
            placeholder="******"
            value={ckeckChangePwd}
            onChange={inputChangeCheckPwd}
          />
          {pwdValid ? null : <div>비밀번호가 일치하지 않습니다.</div>}
        </FlexCol>
        <FlexCol>
          <TagDiv>닉네임 변경하기</TagDiv>
          <Input
            type="text"
            placeholder="변경할 닉네임을 입력하세요"
            onChange={inputNickname}
          />
        </FlexCol>
        <FlexCol>
          <TagDiv>매장명 변경하기</TagDiv>
          <Input type="text" placeholder="변경된 매장명을 입력하세요." onChange={(e)=> setShopName(e.target.value)} value={shopName}/>
        </FlexCol>
        <FlexCol>
              <TagDiv value={address}>변경할 주소지</TagDiv>
              <FlexRow>
                <CheckInput
                  type="text"
                  placeholder="우편번호"
                  value={address.zonecode}
                  disabled
                />
                <CheckBtn
                  onClick={() => {
                    setPopup(!popup);
                  }}
                >
                  주소찾기
                </CheckBtn>
              </FlexRow>
              <Input
                type="text"
                value={address.address}
                placeholder="주소"
                disabled
              />
              <Input
                type="text"
                placeholder="상세주소"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
              />
              {popup ? (
                <Post setAddress={setAddress} setPopup={setPopup}></Post>
              ) : null}
            </FlexCol>
        <FlexCol>
          <TagDiv>핸드폰 번호 변경</TagDiv>
          <Input
            type="text"
            placeholder="전화번호를 입력하세요."
            onChange={inputPhoneNumber}
          />
        </FlexCol>
        <Button onClick={submitModify}>수정하기</Button>
      </FlexCol>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    user: state.loginInfo.userInfo,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(getUserLogout());
    },
    deleteUserInfo: () => {
      dispatch(deleteUserInfo());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);

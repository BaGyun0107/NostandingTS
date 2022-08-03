import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteUserInfo, getUserLogout } from "../store/store";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0px auto;
  h2{
    margin: 1em;
  }
`;

const Button = styled.button`
  margin: 5em;
  width: 10em;
  height: 4em;
  background-color: rgb(21,64,99);
  color: white;
  border-radius: 0.5rem;
  align-self: center;
  :hover{
    transform: scale(1.05);
    background-color: tomato;
  }
`;
function UserDelete({ userInfo, logout, deleteUserInfo }) {
  const navigate = useNavigate()
  console.log(userInfo);
  const clickDeleteBtn = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/mypage/userinfo/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        deleteUserInfo();
        logout();
        alert('삭제 완료')
        navigate('/')
      })
      .catch((err) => console.log(err.response.data));
  };
  return (
    <Container>
        <h2>회원탈퇴</h2>
        <Button onClick={clickDeleteBtn}>탈퇴하기</Button>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserDelete);

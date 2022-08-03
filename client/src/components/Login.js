import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import axios from "axios";
import { getUserInfo, getUserLogin, clickCheckBox } from "../store/store";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const RowDiv = styled.div`
  margin: 5px;
  display: flex;
  width: 70%;
  flex-direction: row;
  justify-content: ${(props) => (props.primary ? "none" : "space-around")};
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
`;
const Div = styled.div`
  width: 100%;
  display: block;
  @media only screen and (max-width: 48rem) {
    font-size: 0.5rem;
  }
`;
const Logoimage = styled.img`
  margin: 10px;
  width: 50%;
  height: 30%;
`;
const OauthLogin = styled.div`
  margin: 4px;
  height: 5vh;
  width: 22vw;
  background-color: ${(props) =>
    props.primary === "1"
      ? "yellow"
      : props.primary === "2"
      ? "green"
      : props.primary === "0"
      ? "black"
      : "tomato"};
  color: ${(props) =>
    props.primary === "1"
      ? "black"
      : props.primary === "2"
      ? "black"
      : props.primary === "0"
      ? "white"
      : "black"};
  text-align: center;
  padding: 1em;
  flex: auto;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    transform: scale(1.02);
  }
`;
const Button = styled.button`
  width: 7rem;
  background-color: #fff;
  font-weight: 600;
  cursor: pointer;
  :hover {
    transform: scale(1.03);
    color: rebeccapurple;
  }
  @media only screen and (max-width: 48rem) {
    font-size: 0.5rem;
  }
`;
const Xbutton = styled.button`
  height: 1vw;
  width: 1vw;
  float: right;
  text-align: right;
  align-items: center;
  padding: 3px;
  background-color: #fff;
`;
const Input = styled.input`
  height: auto;
  width: 12vw;
`;
function LoginModal({
  controlClose,
  getUserInfo,
  getUserLogin,
  clickCheckBox,
  holdLogin,
}) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIslogin] = useState(false);
  const navigate = useNavigate();

  const idSetter = (e) => {
    setId(e.target.value);
  };
  const passwordSetter = (e) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setId("");
    setPassword("");
  };
  const loginHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          user_name: id,
          password: password,
        },
        {
          withCredentials: true,
        }
      )

      .then((resp) => {
        const userInfo = resp.data.data.userInfo;
        getUserInfo(userInfo);
        setIslogin(true);
        getUserLogin();
      })
      .catch((err) => {
        console.log("err\n", err.response);
        alert(err.response.data.message);
      });
    clearForm();
  };
  const clickOauthBtn = (val) => {
    const url = process.env.REACT_APP_CLI_URL;

    if (val === "kakao") {
      window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=42009e870cdf666e6d0d8ae29350f9cb&redirect_uri=${url}/callbackkakao&response_type=code&scope=account_email`
      );
    } else if (val === "google") {
      window.location.assign(
        `https://accounts.google.com/o/oauth2/auth?client_id=136738573059-qo57hsrstcie7fu7btivdccae2bbtkpk.apps.googleusercontent.com&redirect_uri=${url}/callbackgoogle&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid`
      );
    }
  };
  const clickFindPwdBtn = () => {
    navigate("/Findpassword");
    controlClose(false);
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isLogin ? false : true}
      onRequestClose={() => controlClose(false)}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          position: "absolute",
          top: "40px",
          left: "29%",
          right: "32%",
          bottom: "40%",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
        },
      }}
    >
      <Xbutton onClick={() => controlClose(false)}>X</Xbutton>
      <ColumnDiv>
        <Logoimage src={require("../img/nostandinglogo.png")}></Logoimage>
        <RowDiv>
          <ColumnDiv>
            <Div>아이디</Div>
            <Div>비밀번호</Div>
          </ColumnDiv>
          <ColumnDiv>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              onChange={(e) => idSetter(e)}
              value={id}
            ></Input>
            <Input
              type="password"
              placeholder="******"
              onChange={(e) => passwordSetter(e)}
              value={password}
            ></Input>
          </ColumnDiv>
        </RowDiv>
        <RowDiv>
          <Button onClick={clickFindPwdBtn}>비밀번호 찾기</Button>
        </RowDiv>
        <OauthLogin primary="0" onClick={loginHandler}>
          로그인
        </OauthLogin>
        <OauthLogin onClick={() => clickOauthBtn("kakao")} primary="1">
          카카오톡 로그인
        </OauthLogin>
        <OauthLogin onClick={() => clickOauthBtn("google")}>
          구글 로그인
        </OauthLogin>
      </ColumnDiv>
    </Modal>
  );
}
const mapStateToProps = (state) => {
  return {
    holdLogin: state.checkLoginHold,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (userInfo) => {
      dispatch(getUserInfo(userInfo));
    },
    getUserLogin: () => {
      dispatch(getUserLogin());
    },
    clickCheckBox: () => {
      dispatch(clickCheckBox());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

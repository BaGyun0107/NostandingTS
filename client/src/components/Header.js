import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login.js";
import axios from "axios";
import { connect } from "react-redux";
import {
  getUserLogout,
  getShopSearch,
  deleteUserInfo,
  getAlarm,
} from "../store/store";
import AlarmModal from "./AlarmModal.js";
const Container = styled.div`
  padding-bottom: 1px solid black;
`;
const Navbar = styled.nav`
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid rgba(85, 85, 85, 0.3);
  align-items: center;
  margin-bottom: 1rem;
`;
const Logo = styled.div``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  svg {
    color: ${(props) =>
      props.ringing ? "rgba(239,93,40)" : "rgba(0,0,0,0.5)"};
    :hover {
      transform: scale(1.05);
    }
  }
`;
const Search = styled.form`
  display: flex;
  height: 15%;
  width: 30%;
  align-items: center;
  justify-content: center;
  border: 3px solid #154063;
  border-radius: 20px;
  input {
    width: 100%;
    height: 3rem;
    background-color: white;
    border: none;
    border-radius: 20px;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }
  svg {
    margin-right: 5px;
    cursor: pointer;
  }
`;
const WelcomeDiv = styled.div`
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  color: lightcoral;
`;
const Img = styled.img`
  width: 120px;
  height: 100%;
  margin-left: 1rem;
  @keyframes logoHover {
    50% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  :hover {
    animation-name: logoHover;
    animation-duration: 0.8s;
    animation-iteration-count: 2;
  }
`;
const NavMenu = styled.div`
  position: relative;
  width: auto;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 14px;
  font-weight: bold;
  :hover {
    color: #154063;
    transform: scale(1.05);
  }
`;
function Header({
  userInfo,
  loginState,
  logout,
  shopsearch,
  deleteUserInfo,
  getAlarmData,
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchedshop, setSearchedshop] = useState("");
  const [goMypage, setGoMypage] = useState("/");
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [ringAlarm, setRingAlarm] = useState(false);
  
  const getData = useCallback(() => {
    if (loginState) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/mypage/notification/${userInfo.user_name}`,
          {
            withCredentials: true,
          }
        )
        .then((resp) => {
          getAlarmData(resp.data.data);
          for (let i = 0; i < resp.data.data.length; i++) {
            if (resp.data.data[i].read === 0) {
              setRingAlarm(true);
            }
          }
        });
    }
  },[])
  useEffect(() => {
    getData()
  }, [getData]);

  const clickLoginButton = () => {
    setIsOpen(!isOpen);
  };
  const clickLogoutBtn = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/logout`).then((resp) => {
      logout();
      deleteUserInfo();
      navigate("/");
    });
  };
  const controlClose = (val) => {
    setIsOpen(val);
  };
  const searchText = (e) => {
    setSearchedshop(e.target.value);
  };
  const searchShop = (e) => {
    e.preventDefault();
    shopsearch(searchedshop);
    setSearchedshop("");
  };
  const clickMypage = (e) => {
    if (loginState === false) {
      alert("로그인이 필요한 서비스입니다.");
      setGoMypage("/");
    } else if (loginState === true) {
      if (userInfo.is_master === 1) {
        setGoMypage("/Mypage/masterreservation");
      } else if (userInfo.is_master === 0) {
        setGoMypage("/Mypage/reservation");
      }
    }
  };

  const clickAlarm = () => {
    if (loginState === false) {
      alert("로그인이 필요합니다");
    } else {
      setAlarmOpen(!alarmOpen);
      setRingAlarm(false);
    }
  };
  return (
    <Container>
      <Navbar>
        <Logo>
          <Link to="/">
            <Img src={require("../img/nostandinglogo.png")} />
          </Link>
        </Logo>
        <Search onSubmit={searchShop}>
          <input
            placeholder="가게이름을 입력하세요."
            onChange={searchText}
            value={searchedshop}
          ></input>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={searchShop}
          ></FontAwesomeIcon>
        </Search>
        <Menu ringing={ringAlarm}>
          {loginState ? (
            <>
              <WelcomeDiv>환영합니다 {userInfo.nickname || userInfo.user_name}님</WelcomeDiv>
              <NavMenu onClick={clickLogoutBtn}>로그아웃</NavMenu>
            </>
          ) : (
            <>
              <NavMenu onClick={clickLoginButton}>로그인</NavMenu>
              <Link to="/Signup">
                <NavMenu>회원가입</NavMenu>
              </Link>
            </>
          )}
          <Link to={goMypage}>
            <NavMenu onClick={clickMypage}>마이페이지</NavMenu>
          </Link>
          <FontAwesomeIcon icon={faBell} onClick={clickAlarm}></FontAwesomeIcon>
          {alarmOpen ? <AlarmModal setRingAlarm={setRingAlarm} /> : null}
          {isOpen ? <Login controlClose={controlClose} /> : null}
        </Menu>
      </Navbar>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
    loginState: state.loginState.userLoginState,
    searchShop: state.shopSearch.shopSearchInfo,
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
    shopsearch: (resp) => {
      dispatch(getShopSearch(resp));
    },
    getAlarmData: (data) => {
      dispatch(getAlarm(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

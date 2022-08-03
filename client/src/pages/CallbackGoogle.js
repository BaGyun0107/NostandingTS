import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo, getUserLogin } from "../store/store";

function CallbackGoogle({ getUserLogin, getUserInfo }) {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const callbackCheck = useCallback(async () => {
    try {
      if (authorizationCode) {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/oauth/google`,
            { authorizationCode },
            { headers: { accept: "application/json" }, withCredentials: true }
          )
          .then((resp) => {
            const userInfo = resp.data.data.userInfo;
            getUserLogin();
            getUserInfo(userInfo);
            alert("구글로그인성공");
            navigate("/");
          });
      }
    } catch (err) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    callbackCheck();
  }, [callbackCheck]);

  return <div>구글로그인</div>;
}

function mapDispatchToProps(dispatch) {
  return {
    getUserLogin: () => {
      dispatch(getUserLogin());
    },
    getUserInfo: (userInfo) => {
      dispatch(getUserInfo(userInfo));
    },
  };
}
export default connect(null, mapDispatchToProps)(CallbackGoogle);

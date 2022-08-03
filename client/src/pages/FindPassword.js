import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
function FindPassword() {
  const [confirmNum, setConfirmNum] = useState("");
  const [userConfirmNum, setUserConfirmNum] = useState("");
  const [emailCheckOK, setEmailcheckOK] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [findId, setFindId] = useState("");
  const [changePwd, setChangePwd] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const changeFindId = (e) => setFindId(e.target.value);
  const inputConfirmNum = (e) => setUserConfirmNum(e.target.value);
  const inputChangePwd = (e) => setChangePwd(e.target.value);
  const inputCheckPwd = (e) => setCheckPassword(e.target.value);

  const submitCheckEmail = (e) => {
    e.preventDefault();
    setMinutes(2);
    setSeconds(59);
    setCheckEmail(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/emailsend`, {
        user_name: findId,
      })
      .then((resp) => setConfirmNum(resp.data.data));
  };
  const submitConfirmNum = (e) => {
    e.preventDefault();
    console.log(confirmNum, userConfirmNum);
    if (Number(confirmNum) === Number(userConfirmNum)) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/confirm`, {
          user_name: findId,
          confirmNumber: Number(confirmNum),
          confirm_body: Number(userConfirmNum),
        })
        .then((resp) => {
          console.log(resp);
          alert("인증완료!");
          setEmailcheckOK(true);
          setCheckEmail(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      setCheckEmail(false);
      alert("인증번호가 맞지 않습니다.");
    }
  };

  const clickModifyPwd = () => {
    if (changePwd === checkPassword) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/passwordchange`, {
          user_name: findId,
          password: changePwd,
        })
        .then((resp) => {
          alert("비밀번호가 변경되었습니다.");
          navigate("/");
        });
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <ColumnDiv>
      {emailCheckOK ? (
        <>
          <div>변경할 비밀번호를 입력하세요</div>
          <input type="password" onChange={inputChangePwd} />
          <div>비밀번호 확인</div>
          <input type="password" onChange={inputCheckPwd} />
          <button onClick={clickModifyPwd}>비밀번호 변경하기</button>
        </>
      ) : (
        <>
          <div>비밀번호를 찾을 아이디를 입력하세요</div>
          <input
            type="text"
            onChange={changeFindId}
            value={findId}
            placeholder="아이디를 입력하세요."
          />
          <button onClick={submitCheckEmail}>이메일 인증 보내기</button>
          {checkEmail ? (
            <form onSubmit={submitConfirmNum}>
              <input
                type="text"
                placeholder="인증번호를 입력하세요"
                value={userConfirmNum}
                onChange={inputConfirmNum}
              />
              <div>
                남은 인증시간 {minutes}:{seconds}
              </div>
              <button>인증하기</button>
            </form>
          ) : null}
        </>
      )}
    </ColumnDiv>
  );
}
export default FindPassword;

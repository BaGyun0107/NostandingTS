import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getAlarm } from "../store/store";
import ReviewModal from "./ReviewModal";
import RereviewModal from "./RereviewModal";
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const P = styled.p`
  color: ${(props) => (props.isRead === 1 ? "gray" : "black")};
  :hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 7em;
  height: 2em;
  margin-top: 5px;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  :hover {
    transform: scale(1.03);
  }
`;

function Alarm({ userInfo, data, idx, getAlarmData }) {
  const [openReview, setOpenReview] = useState(false);
  const [chooseIdx, setChooseIdx] = useState(0);
  const clickAlarm = (id) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/mypage/notification/${userInfo.user_name}`,
        {
          id: id,
          read: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) =>
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/mypage/notification/${userInfo.user_name}`,
            {
              withCredentials: true,
            }
          )
          .then((resp) => {
            getAlarmData(resp.data.data);
          })
      );
  };
  const clickOpenReview = () => {
    setOpenReview(true);
  };

  return (
    <Container>
      <P isRead={data.read} onClick={() => clickAlarm(data.id)}>
        {data.contents}
      </P>
      {data.review === 1 || data.rereview === 1 ? (
        userInfo.is_master === 0 ? (
          <Button onClick={() => clickOpenReview()}>리뷰 작성하기</Button>
        ) : (
          <Button onClick={() => clickOpenReview()}>답글 작성하기</Button>
        )
      ) : null}
      {openReview ? (
        userInfo.is_master === 0 ? (
          <ReviewModal
            isOpen={setOpenReview}
            shopId={data.reservation.menu.shop_id}
            alarmData={data}
          />
        ) : (
          <RereviewModal isOpen={setOpenReview} alarmData={data} />
        )
      ) : null}
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    alarmData: state.alarmState,
    userInfo: state.loginInfo.userInfo,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getAlarmData: (data) => {
      dispatch(getAlarm(data));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Alarm);

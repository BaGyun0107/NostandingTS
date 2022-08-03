import React, { useState } from "react";
import { connect } from "react-redux";
import { getAlarm } from "../store/store";
import styled from "styled-components";
import axios from "axios";
import ReviewModal from "./ReviewModal";
import RereviewModal from "./RereviewModal";
const Wrapper = styled.div`
  width: 18rem;
  height: 30rem;
  background-color: white;
  position: absolute;
  top: 40px;
  border-radius: 0.5rem;
  overflow-y: scroll;
  border: 2px solid black;
  z-index: 100;
  > div {
    text-align: left;
    margin: 10px 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
const P = styled.p`
  color: ${(props) => (props.isRead === 1 ? "gray" : "black")};
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
function AlarmModal({ alarmData, userInfo, setRingAlarm, getAlarmData}) {
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
      .then((resp)=> {
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
      });
  };
  const clickOpenReview = (id) => {
    setOpenReview(true);
    setChooseIdx(id);
  };
  return (
    <Wrapper>
      {alarmData.map((data, idx) => (
        <div key={data.id}>
          <P isRead={data.read} onClick={() => clickAlarm(data.id)}>
            {data.contents}
          </P>
          {userInfo.is_master === 1 ? (
            <P isRead={1}>{data.Review?.contents}</P>
          ) : null}
          {data.review === 1 || data.rereview === 1 ? (
            <Button onClick={() => clickOpenReview(idx)}>리뷰 작성하기</Button>
          ) : null}
        </div>
      ))}
      {openReview ? (
        userInfo.is_master === 0 ? (
          <ReviewModal
            isOpen={setOpenReview}
            shopId={alarmData[chooseIdx].reservation.menu.shop_id}
            alarmData={alarmData[chooseIdx]}
          />
        ) : (
          <RereviewModal
            isOpen={setOpenReview}
            alarmData={alarmData[chooseIdx]}
          />
        )
      ) : null}
    </Wrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(AlarmModal);

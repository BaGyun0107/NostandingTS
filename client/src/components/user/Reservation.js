import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReservationInfo from "./ReservationInfo";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0px auto;
  h2{
    margin: 1em;
  }
`;
const Div = styled.div`
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;
const ChooseDiv = styled.div`
  margin-top: 1rem;
  border: 1px solid rgb(231, 231, 231);
  font-size: 15px;
  font-weight: 550;
  height: auto;
  padding: 12px;
  width: 12rem;
  text-align: center;
  margin-bottom: 3rem;
  flex-grow: 1;
  color: ${(props) => (props.backgroundOn ===props.idx ? "white" : "black")};
  background-color: ${(props) =>
    props.backgroundOn === props.idx ? "rgb(21,64,99)" : null};
   p{
    :hover{
      transform: scale(1.05);
    }
   } 
`;
const Span = styled.span`
  height: 100%;
  border: 1px solid black;
`;
function Reservation({ userInfo }) {
  const [reservationList, setReservationList] = useState([]);
  const [chooseList, setChooseList] = useState(1);
  const [reservationDatas, setReservationDatas] = useState([]);

  const getInfo = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/reservation/${userInfo.user_name}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setReservationDatas([...resp.data.data]);
      });
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  useEffect(() => {
    const nowDate = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace(/[^0-9]/g, "");
    const nowReservations = reservationDatas.filter((data) => {
      return Number(data.date.replace(/[^0-9]/g, "")) > Number(nowDate);
    });
    setReservationList([...nowReservations]);
  }, [reservationDatas]);

  const clickChooseDiv = (data) => {
    setChooseList(data);
    const nowDate = new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace(/[^0-9]/g, "");
    if (data === 1) {
      const nowReservations = reservationDatas.filter((data) => {
        return Number(data.date.replace(/[^0-9]/g, "")) > Number(nowDate);
      });
      setReservationList([...nowReservations]);
    } else if (data === 2) {
      const pastReservations = reservationDatas.filter((data) => {
        return Number(data.date.replace(/[^0-9]/g, "")) < Number(nowDate);
      });
      setReservationList([...pastReservations]);
    }
  };

  return (
    <Container>
      <Div>
        <h2>예약 내역</h2>
      </Div>
      <FlexRow>
        <ChooseDiv idx={1} onClick={() => clickChooseDiv(1)} backgroundOn={chooseList}>
         <p>현재 예약 내역</p>
        </ChooseDiv>
        <ChooseDiv idx={2} onClick={() => clickChooseDiv(2)} backgroundOn={chooseList}>
          <p>이전 예약 내역</p>
        </ChooseDiv>
      </FlexRow>
      <div>
        {reservationList.map((reservate) => (
          <ReservationInfo
            key={reservate.id}
            reservate={reservate}
            isToday={chooseList}
            getInfo={getInfo}
          />
        ))}
      </div>
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Reservation);

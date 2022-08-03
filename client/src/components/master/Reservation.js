import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import Oneday from "./ReservationRoute.js/Oneday";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  margin-left: 25em;
`;

const H2 = styled.h2`
  margin: 1em;
`;

const Div = styled.div``;

const Reservationcontainer = styled.div`
  width: 100%;
`;

const ReservationbyTime = styled.div`
  border: 2px solid rgb(231, 231, 231);
  display: flex;
  flex-direction: row;
`;

const Timediv = styled.div`
  text-align: left;
  margin: 2px;
`;

const ReservationState = styled.div`
  background-color: beige;
  width: 100%;
  margin: 4px;
`;

const Xbutton = styled.button`
  position: absolute;
  transform: translateX(530%);
`;
function Reservation({ userInfo }) {
  const [pickeddate, setPickeddate] = useState("");
  let today = new Date().toISOString().substring(0, 10);
  return (
    <Container>
      <Reservationcontainer>
        <Div>
          <H2>예약 현황</H2>
        </Div>
        <input
          type="date"
          defaultValue={today}
          onChange={(e) => setPickeddate(e.target.value)}
        ></input>
        <Oneday pickeddate={pickeddate}></Oneday>
      </Reservationcontainer>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Reservation);

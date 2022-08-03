import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import Bookmark from "../components/user/Bookmark";
import Notification from "../components/user/Notification";
import Reservation from "../components/user/Reservation";
import Review from "../components/user/Review";
import UserInfo from "../components/user/UserInfo";
import UserDelete from "../components/UserDelete.js";
import Management from "../components/master/Management.js";
import MasterNotification from "../components/master/Notification.js";
import MasterReview from "../components/master/Review.js";
import MasterUserInfo from "../components/master/UserInfo.js";
import MasterReservation from "../components/master/Reservation.js";

const Container = styled.div`
  display: flex;
`;

function Mypage() {
  return (
    <Container>
      <SideBar />
      <Routes>
        <Route path="reservation" element={<Reservation />} />
        <Route path="notification" element={<Notification />} />
        <Route path="bookmark" element={<Bookmark />} />
        <Route path="review" element={<Review />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="userdelete" element={<UserDelete />} />
        <Route path="mastermanagement/*" element={<Management />} />
        <Route path="masterreservation" element={<MasterReservation />} />
        <Route path="masternotification" element={<MasterNotification />} />
        <Route path="masterreview" element={<MasterReview />} />
        <Route path="masteruserinfo" element={<MasterUserInfo />} />
      </Routes>
    </Container>
  );
}

export default Mypage;

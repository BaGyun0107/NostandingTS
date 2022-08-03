import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 25rem;
  background-color: white;
  bottom: 50px;
  position: sticky;
  justify-self: center;
  z-index: 100;
  border: 2px solid black;
  overflow-y: scroll;
`;
const H2 = styled.h2`
  margin: 1rem;
  align-self: center;
`;
const Div = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
`;
const Button = styled.button`
  width: 90px;
  align-self: center;
  justify-self: flex-end;
  margin-bottom: 1rem;
  :hover{
    background-color: tomato;
  }
`;
const Input = styled.input`
  margin-bottom: 1rem;
`;
const Select = styled.select`
  margin-bottom: 2rem;
`;
function ReservationModal({ pickedShop, userInfo, setOpenReservation }) {
  const [date, setdate] = useState("");
  const [menu, setMenu] = useState({});
  const [menuId, setMenuId] = useState("");
  const [businessHour, setBusinessHour] = useState([]);
  const [sendBusinessHour, setSendBusinessHour] = useState([]);
  const [showChooseHour, setShowChooseHour] = useState("");
  const [sendChooseHour, setSendChooseHour] = useState([]);
  useEffect(() => {
    const businessStartEnd = pickedShop.business_hour.split("~");
    let hourArr = [];
    let sendHour = [];
    for (
      let i = Number(businessStartEnd[0]) / 100;
      i < Number(businessStartEnd[1]) / 100;
      i++
    ) {
      if (i / 10 < 1) {
        sendHour.push(`0${i}:00:00`);
      } else {
        sendHour.push(`${i}:00:00`);
      }
      hourArr.push(`${i}:00~${i + 1}:00`);
    }
    setBusinessHour(hourArr);
    setSendBusinessHour(sendHour);
  }, []);
  const onChangeDate = (e) => setdate(e.target.value);
  const clickMenu = (e) => {
    const chooseMenu = pickedShop.Menus.filter((menu) => {
      return Number(menu.id) === Number(e.target.value) ? menu : null;
    });
    setMenu(...chooseMenu);
  };
  const clickHour = (e) => {
    setShowChooseHour(businessHour[e.target.value]);
    setSendChooseHour(sendBusinessHour[e.target.value]);
  };
  const clickReservationBtn = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/reservation/${userInfo.user_name}`,
        {
          shop_name:pickedShop.user.shop_name,
          menu_id: menu.id,
          date: `${date} ${sendChooseHour}`,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        alert('예약 완료')
        setOpenReservation(false)})
        .catch((err)=> {
          alert('에러')
        })
  };

  return (
    <Container>
      <Div>
        <h3>예약 날짜</h3>
        <Input type="date" onChange={onChangeDate} />
        <div>선택한 날짜: {date}</div>
      </Div>
      <Div>
        <div>예약 시간</div>
        <Select onChange={clickHour}>
          <option value="none">=== 선택 ===</option>
          {businessHour.map((hour, idx) => (
            <option key={idx} value={idx}>
              {hour}
            </option>
          ))}
        </Select>
        <div>선택한 시간: {showChooseHour}</div>
      </Div>
      <Div>
        <div>예약 메뉴</div>
        <Select onChange={clickMenu}>
          <option value="none">=== 선택 ===</option>
          {pickedShop.Menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </Select>
        <div>선택한 메뉴: {menu.name}</div>
      </Div>
      <Button onClick={clickReservationBtn}>예약하기</Button>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(ReservationModal);

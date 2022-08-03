import react, { useCallback, useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const OneRes = styled.div`
  border: 2px solid rgb(21, 64, 99);
  border-radius: 10px;
  align-items: center;
  width: 30%;
  display: inline-block;
  text-align: center;
  height: 85%;
  margin: 1em;
  padding: 1em 0.5em;
  justify-content: space-between;
  @media only screen and (max-width: 48rem) {
    font-size: 0.5rem;
  }
`;
const Timebar = styled.div`
  border: 2px solid rgb(21, 64, 99);
  border-radius: 5px;
  height: 10vh;
  align-items: center;
  width: 40vw;
  align-items: center;
  vertical-align: middle;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  padding: 1rem;
`;

const Deletebutton = styled.button`
  position: fixed;
  width: 3em;
  height: 1em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  position: relative;
  float: right;
  top: -150%;
  :hover {
    transform: scale(1.05);
    background-color: aqua;
    font-size: scale(1.05);
  }
  @media only screen and (max-width: 48rem) {
    font-size: 0.5rem;
  }
`;
const Div = styled.div`
  font-size: 50%;
`;
const Oneday = ({ userInfo, pickeddate }) => {
  let pickeddate2 = pickeddate.replace(/[^0-9]/g, "");
  const timeline = [
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ];
  const [reservationlist, setReservationlist] = useState([]);

  const getReservation = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/reservation/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(
          resp.data.data[0]?.date.replace(/[^0-9]/g, "").slice(8, 10)
        );
        console.log(resp.data.data);
        setReservationlist(resp.data.data);

        console.log(realreservationlist);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteReservation = (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/mypage/reservation/${userInfo.user_name}/${id}`,
        { withCredentials: true }
      )
      .then((resp) => {
        getReservation();
        //알림날리는 axios 해야
      });
  };

  useEffect(() => {
    getReservation();
  }, [getReservation]);

  const realreservationlist = reservationlist.filter((list) => {
    return pickeddate2 === list.date.replace(/[^0-9]/g, "").slice(0, 8);
  });
  return (
    <Container>
      {timeline.map((hour, idx) => {
        return (
          <Timebar key={idx}>
            <div>{hour}시</div>
            {realreservationlist.map((el, idx) => {
              console.log(el);
              const time = el.date.replace(/[^0-9]/g, "").slice(8, 10);
              console.log(time);
              return String(time) === hour ? (
                <OneRes key={idx}>
                  <Div>{el.name}</Div>
                  <Div>
                    {time}시{el.date.replace(/[^0-9]/g, "").slice(10, 12)}분
                  </Div>
                  <Deletebutton onClick={() => deleteReservation(el.id)}>
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                  </Deletebutton>
                </OneRes>
              ) : null;
            })}
          </Timebar>
        );
      })}
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Oneday);

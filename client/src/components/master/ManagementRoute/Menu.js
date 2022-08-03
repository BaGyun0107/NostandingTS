import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "react-modal";

const Container = styled.div`
  padding: 0 0 0 10em;
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
  margin: 0px auto;
  h2 {
    margin: 1em;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
`;
const MenuContainer = styled.div`
  padding: 1em;
  border: 2px solid rgb(21, 64, 99);
  border-radius: 10px;
  height: 10%;
  width: 75%;
  margin: 1em;
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  width: 10em;
  height: 5em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  position: relative;

  :hover {
    transform: scale(1.05);
    background-color: aqua;
  }
  margin: 1em;
`;

const DeleteButton = styled.button`
  width: 50%;
  height: 30%;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;

  :hover {
    transform: scale(1.05);
    background-color: aqua;
  }
`;

const Img = styled.img`
  width: 50%;
  height: 5em;
  margin: 1em;
`;

const Menubar = styled.div`
  border: 2px solid black;
  width: 100%;
  height: 100%;
`;
const UserNameDiv = styled.div`
  font-size: larger;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const DateDiv = styled.div`
  font-size: small;
  color: rgb(85, 85, 85);
  margin-bottom: 1rem;
`;
const Div1 = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
`;
const Div2 = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
`;
const Div3 = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Div4 = styled.div`
  text-align: center;
  justify-content: center;
  width: 75%;
`;
const Menu = ({ userInfo }) => {
  const [menu, setMenu] = useState(""); //입력하는 메뉴
  const [img, setImg] = useState([]); //넣는 이미지
  const [price, setPrice] = useState(0); //넣는 가격
  const [shopid, setShopid] = useState(""); //처음에 샵 아이디를 저장하는 스테이트
  const [ismenu, setIsmenu] = useState(false); // 메뉴 모달창 열고닫히는 스테이트 관리
  const [menubar, setMenubar] = useState([]); //맵 렌더링 할 메뉴 저장소
  const [submitFormData, setSubmitFormData] = useState([]);
  const [menuid, setMenuid] = useState(null);
  const [deletenum, setDeletenum] = useState(0);

  const getShopData = useCallback(async () => {
    // 삽 아이디를 뽑아오는 과정(완료)
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/shopinfo/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        setShopid(resp.data.data[0].id);
      });
  }, []);
  const getMenu = useCallback(async () => {
    //메뉴를 나열하기 위한 과정
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/menu/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        const menus = resp.data.data[0].Menus;
        console.log(
          menus
          // menus.map((menu) => {
          //   return menu.image_src;
          // })
        );

        for (let i = 0; i < menus.length; i++) {
          if (menus[i].image_src) {
            menus[i].image_src = JSON.parse(menus[i].image_src);
          }
        }
        console.log(menus);
        setMenubar(menus);
      });
  }, []);
  useEffect(() => {
    getShopData();
    getMenu();
  }, [getShopData, getMenu]);

  const minusMenu = (menu) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/mypage/menu/${userInfo.user_name}/${menu.id}`,

        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        console.log(img);
        console.log(menu);
        const keys = menu.image_src[0].key;

        console.log(keys);

        axios
          .delete(`${process.env.REACT_APP_API_URL}/mypage/${keys}`, {
            withCredentials: true,
          })
          .then((resp) => {
            console.log(resp);
            getMenu();
            getShopData();
          });
      })
      .catch((err) => console.log(err));
  };

  const plusMenu = (idx) => {
    //메뉴이름을 추가하기위한 과정
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/menu/${userInfo.user_name}`,
        {
          shop_id: `${shopid}`,
          name: `${menu}`,
          price: `${price}`,
        },
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp.data.data.menuInfo.id);

        postPhoto(resp.data.data.menuInfo.id);
        setMenu("");
        setPrice("");
        setImg(null);
        setIsmenu(!ismenu);
        getMenu();
      })
      .catch((err) => console.log(err));
  };

  const upLoadImg = (e) => {
    console.log(e.target.files);
    setSubmitFormData(e.target.files);
    const currentImgList = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImg((previmg) => previmg.concat(currentImgList));
    Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
  };

  const postPhoto = (id) => {
    const formData = new FormData();
    for (let i = 0; i < submitFormData.length; i++) {
      formData.append("file", submitFormData[i]);
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/upload/${userInfo.user_name}/${id}`,
        formData,
        { withCredentials: true }
      )
      .then((resp) => {
        getMenu();
        console.log(resp);
      })
      .catch((err) => console.log(err.response.data));
  };
  const renderImg = (el) => {
    return (
      <FlexDiv direction="row">
        {/* {el.map((img, idx) => {
          return (
            <img key={img?.key} src={img?.location} idx={idx} alt=""></img>
          );
        })} */}
      </FlexDiv>
    );
  };

  return (
    <Container>
      <Modal
        ariaHideApp={false}
        isOpen={ismenu}
        onRequestClose={() => setIsmenu(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "30%",
            left: "29%",
            right: "32%",
            bottom: "50%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <div>메뉴추가하기</div>
        <div>이름</div>
        <input onChange={(e) => setMenu(e.target.value)} value={menu}></input>
        <div>가격</div>
        <input onChange={(e) => setPrice(e.target.value)} value={price}></input>
        <input type="file" accept="image/*" onChange={upLoadImg}></input>
        <div>{renderImg(img)}</div>
        <button onClick={() => plusMenu()}>추가하기</button>
      </Modal>
      {menubar.map((menu, idx) => {
        const menuid = menu.id;
        return (
          <MenuContainer key={menuid}>
            <Div1>
              {menu.image_src[0] ? (
                <Img src={menu.image_src[0]?.location}></Img>
              ) : (
                <Img src="../../img/default.png"></Img>
              )}
            </Div1>
            <Div2>
              <UserNameDiv>{menu.name}</UserNameDiv>
              <DateDiv>{menu.price}</DateDiv>
            </Div2>
            <Div3>
              <DeleteButton onClick={() => minusMenu(menu)}>
                삭제하기
              </DeleteButton>
            </Div3>
          </MenuContainer>
        );
      })}
      <Div4>
        <Button onClick={() => setIsmenu(!menu)}>
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </Button>
      </Div4>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Menu);

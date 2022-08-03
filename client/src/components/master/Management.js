import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./ManagementRoute/Menu";
import Photo from "./ManagementRoute/Photo";
import Shopinfo from "./ManagementRoute/Shopinfo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faImage,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  h2 {
    margin: 1em;
  }
`;
const H2 = styled.h2`
  margin: 1em;
  transform: translateX(25%);
`;
const Div = styled.div``;
const Div2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Categoryname = styled.div`
  padding: 1em;
`;

function Management() {
  const [category, setCategory] = useState("");
  const Menubar = styled.div`
    width: 15vw;
    height: 5vw;
    margin: 1rem;
    background-color: ${(props) => (props.idx === category ? "aqua" : "none")};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-radius: 10px;
    font-size: large;
    text-align: center;
    padding: 2vw 0;

    :hover {
      transform: scale(1.05);
      background-color: aqua;
    }
  `;
  const chooseCategory = (el) => {
    setCategory(el);
  };
  return (
    <>
      <Container>
        <Div>
          <H2>내 가게 관리</H2>
        </Div>
        <Div2>
          <Link to="Menu">
            <Menubar idx="1" onClick={() => chooseCategory("1")}>
              <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>
              <Categoryname>메뉴</Categoryname>
            </Menubar>
          </Link>
          <Link to="Photo">
            <Menubar idx="2" onClick={() => chooseCategory("2")}>
              <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
              <Categoryname>사진</Categoryname>
            </Menubar>
          </Link>
          <Link to="Shopinfo">
            <Menubar idx="3" onClick={() => chooseCategory("3")}>
              <FontAwesomeIcon icon={faCircleInfo}></FontAwesomeIcon>
              <Categoryname>가게 정보</Categoryname>
            </Menubar>
          </Link>
        </Div2>
        <Routes>
          <Route exact path="Menu" element={<Menu />}></Route>
          <Route path="Photo" element={<Photo />}></Route>
          <Route path="Shopinfo" element={<Shopinfo />}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default Management;

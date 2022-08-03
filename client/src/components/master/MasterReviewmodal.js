import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";

const Textarea = styled.textarea`
  height: 100%;
  width: 80%;
`;

const Button = styled.button`
  margin: 1em;
  width: 4em;
  height: 2em;
  background-color: rgb(21, 64, 99);
  color: white;
  margin-left: auto;
  border-radius: 0.5rem;

  :hover {
    transform: scale(1.05);
    background-color: tomato;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
  height: 100%;
`;

function MasterReviewmodal({ userInfo, isOpen, reviewId, getReviewInfo }) {
  const [re_review, setRe_review] = useState("");
  
  const controlClose = (val) => {
    isOpen(val);
  };

  const postRereview = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/re_review/${reviewId}/${userInfo.user_name}`,
        { contents: re_review },
        { withCredentials: true }
      )
      .then((resp) => {
        setRe_review("");
        isOpen(false);
        getReviewInfo();
      });
  };
  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={() => controlClose(false)}
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
          top: "5%",
          left: "20%",
          right: "20%",
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
      <FlexDiv direction="column">
        <h2>답글</h2>
        <Textarea
          onChange={(e) => setRe_review(e.target.value)}
          value={re_review}
        ></Textarea>
        <Button onClick={postRereview} className="relpy">
          답글 달기
        </Button>
        <Button onClick={() => isOpen(false)} className="close">
          닫기
        </Button>
      </FlexDiv>
    </Modal>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}

export default connect(mapStateToProps)(MasterReviewmodal);

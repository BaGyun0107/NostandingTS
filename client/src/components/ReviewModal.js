import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  h2 {
    margin: 10px;
  }
`;
const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  align-self: flex-end;
  cursor: pointer;
  :hover {
    font-weight: bold;
  }
`;
const InputContainer = styled.div`
  display: inline-block;
  height: 40px;
  vertical-align: middle;
  width: auto;
  margin-top: 5px;
`;
const InputLabel = styled.label`
  display: inline-block;
  width: auto;
  height: 30px;
  background-color: #999999;
  color: white;
  border-radius: 0.5rem;
  text-align: center;
  padding: 10px 5px;
  :hover {
    transform: scale(1.03);
  }
`;
const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
`;
const Button = styled.button`
  margin: 1em;
  width: 10em;
  height: 3em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  align-self: flex-end;
  :hover {
    transform: scale(1.05);
    background-color: tomato;
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  padding-bottom: 100px;
  text-align: start;
  justify-content: start;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid black;
`;

function ReviewModal({ isOpen, userInfo, shopId, alarmData }) {
  const [writeReview, setWriteReview] = useState("");
  const [imgList, setImgList] = useState([]);
  const [score, setScore] = useState("1");
  const [submitFormData, setSubmitFormData] = useState([]);
  const radioNumber = [1, 2, 3, 4, 5];
  const submitReview = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/review/${userInfo.user_name}/${shopId}`,
        {
          score: score,
          contents: writeReview,
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        const formData = new FormData();

        for (let i = 0; i < submitFormData.length; i++) {
          formData.append("file", submitFormData[i]);
        }

        axios.post(
          `${process.env.REACT_APP_API_URL}/review/upload/${userInfo.user_name}/${shopId}`,
          formData,
          {
            withCredentials: true,
          }
        );
      })
      .then((resp) => {
        if (alarmData) {
          console.log("알람에서 바로");
          axios
            .patch(
              `${process.env.REACT_APP_API_URL}/mypage/notification/reviewpatch/${userInfo.user_name}`,
              {
                id: alarmData.id,
                review: 0,
              },
              {
                withCredentials: true,
              }
            )
            .then((resp) => console.log(resp));
        }
      })
      .then(() => {
        alert("리뷰가 등록되었습니다.");
        isOpen(false);
      });
  };

  const changeTextarea = (e) => {
    setWriteReview(e.target.value);
  };

  const clickExitBtn = () => {
    isOpen(false);
  };

  const changeScore = (e) => setScore(e.target.value);

  const uploadImg = (e) => {
    setSubmitFormData(e.target.files);
    const currentImgList = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImgList((prevImg) => prevImg.concat(currentImgList));
    Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
  };

  const clickImgDelete = (id) => {
    setImgList(imgList.filter((_, index) => index !== id));
  };

  const renderImg = (source) => {
    return source.map((image, idx) => {
      return (
        <div key={idx}>
          <Img src={image} alt="" />
          <button onClick={() => clickImgDelete(idx)}>삭제</button>
        </div>
      );
    });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
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
          left: "30%",
          right: "30%",
          bottom: "45%",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
        },
      }}
    >
      <Container>
        <CloseBtn onClick={clickExitBtn}>X</CloseBtn>
        <h2>리뷰작성</h2>
        <form onSubmit={submitReview}>
          <FlexDiv direction="row">
            {radioNumber.map((val, idx) => (
              <FlexDiv key={val} direction="column">
                {val}점
                <input
                  type="radio"
                  name="score"
                  value={val}
                  onChange={changeScore}
                />
              </FlexDiv>
            ))}
          </FlexDiv>
          <Textarea
            placeholder="리뷰를 작성해주세요."
            onChange={changeTextarea}
            value={writeReview}
          />
          <div>{renderImg(imgList)}</div>
          <InputContainer>
            <InputLabel for="file">사진 등록하기</InputLabel>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={uploadImg}
              id="file"
            />
          </InputContainer>
          <Button>리뷰 등록하기</Button>
        </form>
      </Container>
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}

export default connect(mapStateToProps)(ReviewModal);

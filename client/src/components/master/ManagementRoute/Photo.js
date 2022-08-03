import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  h2 {
    margin: 1em;
  }
  margin: 0px auto;
`;
const Previewimg = styled.img``;
const ImgBox = styled.div`
  height: 100%;
  width: 100%;
  margin-right: 5%;
  border: 2px solid rgb(21, 64, 99);
  border-radius: 10px;
  padding: 1em;
`;
const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: center;
`;
const Plusimgbutton = styled.button`
  width: 10em;
  height: 5em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 0.5rem;
  position: relative;
  float: right;
  :hover {
    transform: scale(1.05);
    background-color: aqua;
  }
  margin: 1em;
`;
const Imgcontainerbox = styled.div`
  height: 50%;
  width: 70%;
  position: relative;
  border-radius: 10px;
  border: 2px solid rgb(21, 64, 99);
`;
const FlexDiv2 = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  height: 100%;
  width: 100%;
  padding: 3rem;
`;
const Img = styled.img`
  height: 10em;
  width: 100%;
`;

const Input = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const Floatbutton = styled.button`
  width: 3em;
  height: 3em;
  background-color: rgb(21, 64, 99);
  color: white;
  border-radius: 50%;
  top: 80%;
  position: absolute;
  float: right;
  :hover {
    transform: scale(1.05);
    background-color: tomato;
  }
`;
const Div = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
  height: 8vh;
  text-align: center;
  padding: 3vh;
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
const InputContainer = styled.div`
  display: inline-block;
  height: 40px;
  vertical-align: middle;
  width: auto;
  margin-top: 5px;
`;
const Photo = ({ userInfo }) => {
  console.log(userInfo);
  const [imgstore, setImgstore] = useState([]);
  const [shopid, setShopid] = useState(null);
  const [submitFormData, setSubmitFormData] = useState("");
  const [previewimg, setPreviewimg] = useState([]);
  const getPhoto = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/img/${userInfo.user_name}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        console.log(resp.data.data[0].image_src);

        const parsing = JSON.parse(resp.data.data[0]?.image_src);
        console.log(parsing);
        if (parsing) {
          setImgstore(parsing);
        }
      })
      .catch((err) => err.response);
  }, []);
  const deletePhoto = (idx) => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/mypage/img/${userInfo.user_name}`,
        { image_number: idx },
        { withCredentials: true }
      )
      .then((resp) => {
        const keys = imgstore.map((el) => el?.key);
        console.log(keys[idx]);
        axios.delete(`${process.env.REACT_APP_API_URL}/mypage/${keys[idx]}`, {
          withCredentials: true,
        });
        getPhoto();
        getShopData();
      })
      .then((resp) => console.log(resp));
  };
  const postPhoto = (e) => {
    e.preventDefault();
    console.log(submitFormData);
    const formData = new FormData();
    for (let i = 0; i < submitFormData.length; i++) {
      formData.append("file", submitFormData[i]);
    }
    console.log(formData);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/mypage/img/${userInfo.user_name}`,
        formData,
        { withCredentials: true }
      )
      .then((resp) => {
        console.log(resp);
        getShopData();
        getPhoto();
      })
      .catch((err) => console.log(err.response.data));
  };
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
  const createPreviewimg = () => {
    setPreviewimg();
    console.log(previewimg);
  };
  const upLoadImg = (e) => {
    previewFiles();
    console.log(imgstore);

    console.log(e.target.files);
    setSubmitFormData(e.target.files);

    console.log(submitFormData);
    const currentImgList = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );

    console.log(previewimg);
    setImgstore((previmg) => {
      previmg.concat(currentImgList);
    });
    console.log(imgstore);
    Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    createPreviewimg();
    getPhoto();
  };

  const renderImg = (el) => {
    return (
      <FlexDiv2 direction="row" className="플렉스디브2">
        {el?.map((img, idx) => {
          if (img) {
            return (
              <>
                <ImgBox className="나냐?">
                  <Img key={idx} src={img?.location} idx={idx} alt=""></Img>
                  <Floatbutton onClick={() => deletePhoto(idx)}>X</Floatbutton>
                </ImgBox>
              </>
            );
          } else {
            return (
              <>
                <ImgBox className="나냐?">
                  <Img
                    key={idx}
                    src={require("../../../img/default.png")}
                    idx={idx}
                    alt=""
                  ></Img>
                  <Floatbutton onClick={() => deletePhoto(idx)}>X</Floatbutton>
                </ImgBox>
              </>
            );
          }
        })}
      </FlexDiv2>
    );
  };
  function previewFiles() {
    var preview = document.querySelector("#preview");
    var files = document.querySelector("input[type=file]").files;

    function readAndPreview(file) {
      // `file.name` 형태의 확장자 규칙에 주의하세요
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        var reader = new FileReader();

        reader.addEventListener(
          "load",
          function () {
            var image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = this.result;
            preview.appendChild(image);
          },
          false
        );

        reader.readAsDataURL(file);
      }
    }

    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  }
  const clickImgDelete = (id) => {
    setPreviewimg(previewimg.filter((_, index) => index !== id));
  };
  const renderImg2 = (source) => {
    console.log(source);
    return source.map((image, idx) => {
      return (
        <div key={idx}>
          <Img src={image.location} alt="" />
          <button onClick={() => clickImgDelete(idx)}>삭제</button>
        </div>
      );
    });
  };

  useEffect(() => {
    getShopData();
    getPhoto();
  }, [getPhoto]);
  return (
    <Container>
      <FlexDiv direction="column">
        <Imgcontainerbox className="이미지 컨테이너">
          <Div>이미지는 4개까지 게시가능합니다. </Div>
          <div> {renderImg(imgstore)} </div>
        </Imgcontainerbox>
        <div id="preview"></div>
        <InputContainer>
          <InputLabel for="file">사진 등록하기</InputLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={upLoadImg}
            id="file"
          ></Input>
        </InputContainer>

        <Plusimgbutton onClick={postPhoto}>추가하기</Plusimgbutton>
      </FlexDiv>
    </Container>
  );
};
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}

export default connect(mapStateToProps)(Photo);

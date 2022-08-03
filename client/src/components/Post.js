import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const Container = styled.div`

`
const Post = ({ setPopup, setAddress }) => {
  const onCompletePost = (data) => {
    setAddress(data);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "70%",
    width: "400px",
    height: "400px",
    border: '2px solid black',
    zIndex: 100,
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={onCompletePost}
      />
    </>
  );
};

export default Post;

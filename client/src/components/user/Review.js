import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReviewInfo from "./ReviewInfo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0px auto;
  h2 {
    margin: 1em;
  }
`;
function Review({ userInfo }) {
  const [reviewData, setReviewData] = useState([]);
  const getReviewData = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/re_review/${userInfo.user_name}`,
        { withCredentials: true }
      )
      .then((resp) => {
        const shopArr = resp.data.shopArr;
        const reviews = resp.data.data.Reviews;
        for (let i = 0; i < reviews.length; i++) {
          for (let j = 0; j < shopArr.length; j++) {
            if (reviews[i].shop_id === shopArr[i].id) {
              reviews[i].shop_name = shopArr[i].user.shop_name;
            }
          }
        }
        setReviewData(reviews);
      });
  }, []);
  useEffect(() => {
    getReviewData();
  }, [getReviewData]);

  return (
    <Container>
      <h2>내가 쓴 후기</h2>
      {reviewData.map((data, index) => (
        <ReviewInfo data={data} getReviewData={getReviewData} key={index} />
      ))}
      {reviewData.length ===0? <div>작성된 후기가 없습니다.</div>:null}
    </Container>
  );
}
function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Review);

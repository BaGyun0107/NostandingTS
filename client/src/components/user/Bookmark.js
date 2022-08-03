import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BookmarkList from "./BookmarkList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0px auto;
  h2{
    margin: 1em;
  }
`;

const ListView = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

function Bookmark({ userInfo }) {
  const [bookmarks, setBookmarks] = useState([]);
  const getShopInfo = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/mypage/bookmark/${userInfo.user_name}`
      , {
        withCredentials:true
      })
      .then((resp) => {
        setBookmarks(resp.data.data);
      });
  }, []);

  useEffect(() => {
    getShopInfo();
  }, [getShopInfo]);
  return (
    <Container>
        <h2>즐겨찾기</h2>
      <ListView>
        {bookmarks.map((shopInfo) => (
          <div key={shopInfo[0].id}>
            <Link to={`/ShopInfo/${shopInfo[0].id}`}>
              <BookmarkList bookmarkInfo={shopInfo[0]} />
            </Link>
          </div>
        ))}
      </ListView>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.loginInfo.userInfo,
  };
}
export default connect(mapStateToProps)(Bookmark);

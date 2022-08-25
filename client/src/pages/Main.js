import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import SearchList from "../components/SearchList";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faUtensils,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 10vh;
  align-items: center;
  margin-top: 1rem;
  div {
    height: 100%;
    width: auto;
    flex-grow: 1;
    text-align: center;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 10px;
  }
`;
const SortDiv = styled.div`
  align-self: flex-end;
  margin-right: 1rem;
  margin-top: 1rem;
  border-radius: 3px;
  width: 100px;
  height: 4vh;
  select {
    color: rgba(66, 66, 66, 0.6);
    font-weight: 500;
    border: 0px;
    width: 100%;
    height: 90%;
    font-size: 15px;
    &:focus {
      outline: none;
    }
  }
`;
const CategoryList = styled.div`
  color: ${(props) =>
    String(props.idx) === props.backgroundOn
      ? "rgb(101,124,241)"
      : "rgb(85,85,85)"};
  transition: 0.4s;
  font-size: 15px;
  font-weight: bold;
  padding-top: 1vh;
  cursor: pointer;
  :hover {
    svg {
      transform: scale(1.1);
    }
    p {
      transform: scale(1.1);
    }
  }
`;
const CategortCityList = styled.div`
  color: ${(props) =>
    String(props.idx) === props.backgroundCity
      ? "rgb(251,176,64)"
      : "rgb(85,85,85)"};
  transition: 0.4s;
  font-size: 15px;
  font-weight: bold;
  padding-top: 1vh;
  cursor: pointer;
  :hover {
    svg {
      transform: scale(1.1);
    }
    p {
      transform: scale(1.1);
    }
  }
`;
const ListView = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const BannerDiv = styled.div``;

function Main({ searchWord }) {
  const category = ["음식점", "카페"];
  const categoryCity = [
    "서울",
    "부산",
    "인천",
    "대구",
    "광주",
    "대전",
    "울산",
    "제주",
  ];
  const [shop, setShop] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chooseCategory, setChooseCategory] = useState("");
  const [chooseCategoryCity, setChooseCategoryCity] = useState("");
  const [backgroundOn, setBackgroundOn] = useState("");
  const [backgroundCity, setBackgroundCity] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [order, setOrder] = useState("");
  const offset = (page - 1) * limit;

  const getShopList = useCallback(async () => {
    if (!chooseCategory && !chooseCategoryCity) {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/?order=${order}`)
        .then((resp) => {
          setShop(resp.data.data);
        });
      setIsLoading(false);
    }
  }, [order, chooseCategory, chooseCategoryCity]);
  useEffect(() => {
    getShopList();
  }, [getShopList]);

  useEffect(() => {
    if (searchWord !== "") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/search?text=${searchWord}`)
        .then((resp) => {
          setShop(resp.data.data.searchList);
        }); //setShop(resp.data.data)
    }
  }, [searchWord]);

  const pickCategory = useCallback(async () => {
    setIsLoading(true);
    if (chooseCategory !== "" && chooseCategoryCity !== "") {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/category?shop_category=${chooseCategory}&shop_category_city=${chooseCategoryCity}&order=${order}`
        )
        .then((resp) => setShop(resp.data.data));
    } else if (chooseCategoryCity !== "") {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/category?shop_category_city=${chooseCategoryCity}&order=${order}`
        )
        .then((resp) => setShop(resp.data.data));
    } else if (chooseCategory !== "") {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/category?shop_category=${chooseCategory}&order=${order}`
        )
        .then((resp) => setShop(resp.data.data));
    } else {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/`)
        .then((resp) => setShop(resp.data.data));
    }
    setIsLoading(false);
  }, [chooseCategory, chooseCategoryCity, order]);

  useEffect(() => {
    pickCategory();
  }, [pickCategory]);

  const clickCategory = (value, idx) => {
    idx = String(idx);
    if (value !== chooseCategory) {
      setChooseCategory(value);
      setBackgroundOn(idx);
    } else {
      setChooseCategory("");
      setBackgroundOn("");
    }
  };

  const clickCategoryCity = (value, idx) => {
    idx = String(idx);
    if (value !== chooseCategoryCity) {
      setChooseCategoryCity(value);
      setBackgroundCity(idx);
    } else {
      setChooseCategoryCity("");
      setBackgroundCity("");
    }
  };

  const changeSort = (e) => {
    setOrder(e.target.value);
  };
  return (
    <>
      <BannerDiv>
        <Banner />
      </BannerDiv>
      <FlexCol>
        <FlexRow>
          {category.map((category, idx) => {
            return (
              <CategoryList
                key={idx}
                idx={idx}
                backgroundOn={backgroundOn}
                onClick={() => clickCategory(category, idx)}
              >
                {idx === 0 ? (
                  <FontAwesomeIcon icon={faUtensils} />
                ) : (
                  <FontAwesomeIcon icon={faMugHot} />
                )}
                <p>{category}</p>
              </CategoryList>
            );
          })}
        </FlexRow>
        <FlexRow>
          {categoryCity.map((category, idx) => {
            return (
              <CategortCityList
                key={idx}
                idx={idx}
                backgroundCity={backgroundCity}
                onClick={() => clickCategoryCity(category, idx)}
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <p>{category}</p>
              </CategortCityList>
            );
          })}
        </FlexRow>
        <SortDiv>
          <select onChange={changeSort}>
            <option value="">가나다 순</option>
            <option value="view">리뷰 순</option>
            <option value="score">별점 순</option>
          </select>
        </SortDiv>
      </FlexCol>
      <ListView>
        {shop.slice(offset, offset + limit).map((shop) => {
          return (
            <div key={shop.id}>
              <Link to={`/ShopInfo/${shop.id}`}>
                <SearchList shopInfo={shop}></SearchList>
              </Link>
            </div>
          );
        })}
        <div>{isLoading && <Loader />}</div>
        <footer>
          <Pagination
            total={shop.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </ListView>
    </>
  );
}
function mapStateToProps(state) {
  return {
    searchWord: state.shopSearch.shopSearchInfo,
  };
}

export default connect(mapStateToProps)(Main);

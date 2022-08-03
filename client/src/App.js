import Header from "./components/Header";
import GlobalStyles from "./GlobalStyles";
import Main from "./pages/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Mypage from "./pages/Mypage";
import Shopinfo from "./pages/ShopInfo";
import Signup from "./pages/SignUp";
import styled from "styled-components";
import CallbackGoogle from "./pages/CallbackGoogle";
import CallbackKakao from "./pages/CallbackKakao";
import FindPassword from "./pages/FindPassword";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Body = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 6vw;
`;

function App() {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Header />
        <Body>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/Mypage/*" element={<Mypage />} />
            <Route path="/Shopinfo/:id" element={<Shopinfo />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/callbackkakao" element={<CallbackKakao />} />
            <Route path="/callbackgoogle" element={<CallbackGoogle />} />
            <Route path="/Findpassword" element={<FindPassword />} />
          </Routes>
        </Body>
      </Router>
    </>
  );
}

export default App;

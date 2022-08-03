import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
    margin:0;
    padding:0;
    
  }
  
  main {
    padding: 100px 0;
    position: relative;
  }
  h1 {
    font-size: 36px;
    font-weight: 600;
    @media only screen and (max-width: 768px) {
      font-size: 28px;
    }
  }
  h2 {
    font-size: 28px;
    font-weight: 600;
    @media only screen and (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
  a {
    text-decoration: none;
    color:inherit;
  }
  button {
    border: none;
  }
  .slick-slider{  
  width: 100%;
  
  background-color: #e9ecef;
  position:relative;

  .slick-arrow {
    position:absolute;
    
  }
  .slick-prev{
      left:100px;
      z-index: 1;
    }
    .slick-next{
      right:100px;
      
    }
  @media only screen and (max-width: 768px) {
    font-size: 13px;
    height:auto;
  }
}
.slick-slide{
  position: relative; 
  width:100%;
  height:350px;
  
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
 
}


.slick-dots{
  bottom:5px;

  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
  li button:before{
    font-size: 15px;
    color: white;   
  }
  li.slick-active button:before {
    opacity: .75;
    color: black;
}
}

  
`;

export default GlobalStyles;

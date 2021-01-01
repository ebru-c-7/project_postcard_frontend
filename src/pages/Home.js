import React from "react";

import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

import SignBox from "../components/home/SignBox";

import houseImg from "../assets/images/garden-house.jpg";
import postboxImg from "../assets/images/svg/postbox.svg";

import "../assets/style/Home.css";

const Home = (props) => {
  return (
    <div style={{ position: "relative", height: "50vh" }}>
      <div style={{ position: "relative" }}>
        <Image id="home-img1" src={houseImg} fluid />
        <Image id="home-img2" src={postboxImg} />
      </div>
      <div id="home-signbox-container">
        {props.isLoading ? (
          <Spinner animation="border" role="status" variant="warning">
            <span className="sr-only">Loading...</span>
          </Spinner>
        ) : null}
        <SignBox className="home-signbox">Let's Start!</SignBox>
      </div>
    </div>
  );
};

export default Home;

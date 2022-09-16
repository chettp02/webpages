import "./HomePage.css";
import myVideo from "../videos/shutup.mp4";
import { Routes, Route, useNavigate } from "react-router-dom";

function HomePage() {
  let navigate = useNavigate();

  const navigateGame = () => {
    let path = "/game";
    navigate(path);
  };

  return (
    <>
      <div className="main">
        <div className="overlay"></div>
        <video src={myVideo} autoPlay loop muted />
        <div className="content">
          <h1>Welcome!</h1>
          <div className="contentButton">
            <button className="homePageButton" onClick={navigateGame}>
              Snake Game
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

/* <div className="main-container-home-page">
  <Grid container alignContent="center" direction="column">
    <Grid item justifyContent="center" xs={9}>
      <h1 style={{ color: "orange" }}>Welcome!</h1>
    </Grid>
    <Grid item container justifyContent="center" xs={3}>
      <div>
        <button className="homePageButton">Click Here</button>
      </div>
    </Grid>
  </Grid>
</div>; */

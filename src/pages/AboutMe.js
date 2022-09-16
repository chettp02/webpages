import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import img1 from "../images/img1.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <>
      <div className="main-container-about-me">
        <h1 className="text-center my-3">About Me Page</h1>
        <Container>
          <Grid container>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              xs={12}
              sm={6}
            >
              <div className="img-container">
                <img src={img1} />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              Hello! My name is Chet Pettingill. I have always been passionate
              about learning and problem-solving. Programming is something that
              first fascinated me while I was going to college and ultimately
              lead me to teaching myself how to program in Python and Java. My
              experience with coding started to leak into the ways I would solve
              complicated problems in school and how I faced challenges at work.
              I used it in my free time to automate prototypes I had created and
              to make money. My desire to learn more brought me to a company
              called Skillstorm that invested three months of their time in
              making me a full-stack software developer with an emphasis on
              Microsoft PowerApps creation. I am currently working as a
              PowerApps Devoloper with a company called ___.
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default AboutMe;

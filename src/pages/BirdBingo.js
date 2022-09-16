import { Grid } from "@material-ui/core";
import { Container } from "react-bootstrap";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import theFam from "../images/theFam.jpg";
import BingoCard from "../components/BingoCard.js";
import "./Projects.css";

function BirdBingo() {
  return (
    <>
      <div className="main-container-projects">
        <h1 className="text-center my-3">Bird Bingo Page</h1>
        <Container>
          <Grid container alignContent="center" spacing={1}>
            <Grid item container justifyContent="center" xs={12} sm={2}>
              <BingoCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={2}>
              <BingoCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={2}>
              <BingoCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={2}>
              <BingoCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={2}>
              <BingoCard />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default BirdBingo;

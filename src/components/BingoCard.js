import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import theFam from "../images/theFam.jpg";

export default function FeederCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="75"
        image={theFam}
        alt="feeder project"
      />
      <CardActions>
        <Button size="small">Seen</Button>
      </CardActions>
    </Card>
  );
}

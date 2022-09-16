import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgFeeder from "../images/feeder.jpg";

export default function FeederCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imgFeeder}
        alt="feeder project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Automated Cat Feeder
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Scripted, modelled, and 3D printed an automated cat feeder that
          dispenses food at regular intervals.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

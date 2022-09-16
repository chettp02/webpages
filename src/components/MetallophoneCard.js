import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgMetallophone from "../images/metallophone.png";

export default function MetallophoneCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imgMetallophone}
        alt="metallophone project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Mechanical Metallophone
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prototyped, designed, and programmed a mechanical metallophone that
          could be played by virtually anyone.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

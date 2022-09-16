import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import imgTemplate from "../images/template.jpg";

export default function TemplateCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={imgTemplate}
        alt="template project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Adobe Illustrator Template
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created custom javascript scripts to automate routine label creation
          to save on time and reduce human error.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

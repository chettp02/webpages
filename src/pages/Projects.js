import { Grid } from "@material-ui/core";
import { Container } from "react-bootstrap";
import FeederCard from "../components/FeederCard";
import MetallophoneCard from "../components/MetallophoneCard";
import TemplateCard from "../components/TemplateCard";
import "./Projects.css";

function Projects() {
  return (
    <>
      <div className="main-container-projects">
        <h1 className="text-center my-3">Projects Page</h1>
        <Container>
          <Grid container alignContent="center" spacing={3}>
            <Grid item container justifyContent="center" xs={12} sm={4}>
              <MetallophoneCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={4}>
              <FeederCard />
            </Grid>
            <Grid item container justifyContent="center" xs={12} sm={4}>
              <TemplateCard />
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default Projects;


import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import HomePage from "./pages/HomePage";
import Game from "./pages/Game";
import BirdBingo from "./pages/BirdBingo";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/game" element={<Game />} />
        <Route path="/birdBingo" element={<BirdBingo />} />
      </Routes>
    </>
  );
}

export default App;

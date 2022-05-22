import {useState} from "react";
import GameContainer from "./components/GameContainer";
import Game2048 from "./components/Game2048";

function App() {
  const [page, setPage] = useState(0);
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    setPage(page - 1);
  };

  return (
    <div className="container" style={{transform: `translateY(-${page * 100}vh)`}}>
      <GameContainer isFirst={true} bgColor="#ADDEC8" previousPage={previousPage} nextPage={nextPage}>
        <Game2048 />
      </GameContainer>
      <GameContainer bgColor="#CA4D4F" previousPage={previousPage} nextPage={nextPage} />
      <GameContainer isLast={true} previousPage={previousPage} nextPage={nextPage} />
    </div>
  );
}

export default App;

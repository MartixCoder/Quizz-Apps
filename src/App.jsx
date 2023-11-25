import "./App.css";
import Quizz from "./Components/Quizz";
import {jsQuiz} from './data/Constants'

function App() {
  return <Quizz questions={jsQuiz} />;
}

export default App;

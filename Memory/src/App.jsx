import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function Photo({ onClick, imageurl, imagename }) {
  return (
    <div className="button">
      <img
        src={imageurl}
        width={100}
        height={100}
        onClick={() => onClick(imagename)}
        alt={imagename}
        className="card"
        title={imagename}
      />
      <p className="pokemon">{imagename}</p>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [count, setCount] = useState(0);
  const [best, setBest] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    let limit = 0;
    switch (difficulty) {
      case "easy":
        limit = 6;
        break;
      case "medium":
        limit = 9;
        break;
      case "hard":
        limit = 12;
        break;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=1`
        );
        const data = await response.json();
        const fetchedImageurl =
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
        const newData = data.results.map((value) => ({
          name: value.name,
          imageurl: `${fetchedImageurl}${getImageId(value.url)}.png`,
        }));
        setData(newData);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    };

    fetchData();
  }, [difficulty]);

  const getImageId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const windowreload = () => {
    window.location.reload();
    setWinner(null);
  };

  const shuffleArray = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setData(shuffled);
  };

  const reset = (winner, count) => {
    setWinner(winner);
    if (count > best) {
      setBest(count);
    }
    setCheck([]);
    setCount(0);
  };

  const checkwin = (difficulty, count) => {
    switch (difficulty) {
      case "easy":
        if (count === 6) reset("you win", count);
        break;
      case "medium":
        if (count === 9) reset("you win", count);
        break;
      case "hard":
        if (count === 12) reset("you win", count);
        break;
      default:
        console.log("keep going");
    }
  };

  const buttonClick = (name) => {
    setWinner(null);

    const lebull = check.includes(name);
    if (lebull) {
      reset("you lose");
    } else {
      setCheck((prevData) => [...prevData, name]);
      setCount((prevCount) => {
        const newCount = prevCount + 1;
        checkwin(difficulty, newCount);
        return newCount;
      });
    }

    shuffleArray(data);
  };

  const handleDifficultchange = (e) => {
    setDifficulty(e.target.value);
  };

  return (
    <>
      <div className="header">
        <h1 onClick={windowreload}>Memory Game</h1>
        <p>
          <span style={{ color: "red" }}>Note:</span> Click the images (don{"'"}
          t click same image twice)
        </p>
        <div className="middle">
          <p>bestScore: {best}</p>
          <p>Score: {count}</p>
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={handleDifficultchange}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
      </div>
      <div className="winner">
        {winner !== null && (
          <p style={{ color: winner === "you win" ? "green" : "red" }}>
            {winner}
          </p>
        )}
      </div>
      <div className="cardholder">
        {data.map((value, index) => (
          <Photo
            key={index}
            imageurl={value.imageurl}
            imagename={value.name}
            onClick={buttonClick}
          />
        ))}
      </div>
    </>
  );
}

Photo.propTypes = {
  imagename: PropTypes.string,
  onClick: PropTypes.func,
  imageurl: PropTypes.string,
};

export default App;

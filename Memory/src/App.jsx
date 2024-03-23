import { useEffect, useState } from "react";

function Photo({ onClick, imageurl, imagename }) {
  return (
    <div className="button">
      <img
        src={imageurl}
        width={200}
        height={200}
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=12&offset=1"
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
  }, []);

  const getImageId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const shuffleArray = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setData(shuffled);
  };

  const buttonClick = (name) => {
    // const lebull = check.filter((tocheck) => tocheck === name).length > 0;
    const lebull = check.includes(name);
    if (lebull) {
      console.log("You lose");
      setBest(Math.max(best, count));
      setCheck([]);
      setCount(0);
    } else {
      // check.push(name);
      setCheck((prevData) => [...prevData, name]);
      console.log("keep going");
      console.log(check);
      setCount(count + 1);
    }

    shuffleArray(data);
  };
  return (
    <>
      <div className="header">
        <h1>Memory Game</h1>
        <p>Click the images (don{"'"}t click same image twice)</p>
        <p>bestScore: {best}</p>
        <p>Score: {count}</p>
      </div>
      <div className="cardholder">
        {/* Render the Pokemon images */}
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

export default App;

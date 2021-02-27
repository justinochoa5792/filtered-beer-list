import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [beer, getBeer] = useState([]);
  const [search, setSearch] = useState("");

  const renderBeer = async () => {
    const response = await axios.get("https://api.punkapi.com/v2/beers");
    console.log(response.data);
    getBeer(response.data);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    renderBeer();
  }, []);

  const filteredBeer = beer.filter((brews) =>
    brews.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Filter Through Beers</h1>
      <div className="form-container">
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="inputPassword2" className="sr-only">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="Filter Beer"
              onChange={handleChange}
            />
          </div>
        </form>
        {filteredBeer.map((brew) => {
          return (
            <ul>
              <img src={brew.image_url} alt={brew.name} className="brew-list" />
              <h4>Beer Name:</h4>
              <li>{brew.name}</li>
              <li>{brew.tagline}</li>
              <h4>Beer Description:</h4>
              <li>{brew.description}</li>
              <li>
                <h4>Food Pairing:</h4>
              </li>
              <li>{brew.food_pairing[0]}</li>
              <li>{brew.food_pairing[1]}</li>
              <li>{brew.food_pairing[2]}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}

export default App;

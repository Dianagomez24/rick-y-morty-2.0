import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get("https://rickandmortyapi.com/api/character?page=1");
        setCharacters(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCharacters();
  }, []);

  useEffect(() => {
    const savedCharacter = localStorage.getItem("selectedCharacter");
    if (savedCharacter) {
      setSelectedCharacter(JSON.parse(savedCharacter));
    }
  }, []);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    localStorage.setItem("selectedCharacter", JSON.stringify(character));
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#fef5e7" }}>
      <h1>Rick & Morty Personajes</h1>
      {selectedCharacter && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "70px",
            borderRadius: "20px",
            marginBottom: "20px",
            backgroundColor: "#fef5e7",
          }}
        >
          <h2>{selectedCharacter.name}</h2>
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            style={{ width: "150px", borderRadius: "30px" }}
          />
          <p>Estado: {selectedCharacter.status}</p>
          <p>Especie: {selectedCharacter.species}</p>
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
        }}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            onClick={() => handleCharacterClick(character)}
            style={{
              cursor: "pointer",
              textAlign: "center",
              border: "1px solid #ddd",
              padding: "10px",
              backgroundColor: "#fef5e7",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "100px", borderRadius: "10px" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{character.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

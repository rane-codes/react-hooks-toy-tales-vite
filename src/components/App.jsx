import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET: load all toys once, on page load
  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // POST: add the new toy to state
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }

  // DELETE: remove the toy from state
  function handleDeleteToy(id) {
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  }

  // PATCH: swap the updated toy in, keeping the original order
  function handleUpdateToy(updatedToy) {
    setToys((toys) =>
      toys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm apiUrl={API_URL} onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        apiUrl={API_URL}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
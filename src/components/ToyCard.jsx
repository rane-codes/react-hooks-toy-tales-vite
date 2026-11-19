import React from "react";

function ToyCard({ toy, apiUrl, onDeleteToy, onUpdateToy }) {
  const { id, name, image, likes } = toy;

  function handleDelete() {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) onDeleteToy(id);
    });
  }

  function handleLike() {
    fetch(`${apiUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((r) => r.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import CreateDeck from "./Decks/CreateDeck.js";
import Deck from "./Decks/Deck.js";
import Study from "./Decks/Study.js";
import EditDeck from "./Decks/EditDeck.js";
import AddCard from "./Decks/Card/AddCard.js";
import EditCard from "./Decks/Card/EditCard.js";
import NotFound from "./Layout/NotFound.js";

function RootRoutes() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/db.json");
      const data = await response.json();
      setDecks(data.decks);
    }
    fetchData();
  }, []);

  const newDeck = (deck) => {
    setDecks((currentDecks) => {
      const updatedDecks = [...currentDecks, deck];
      console.log("Updated decks array:", updatedDecks);
      return updatedDecks;
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Home decks={decks} />} />
      <Route path="/decks/new" element={<CreateDeck newDeck={newDeck} />} />
      <Route path="/decks/:deckId" element={<Deck />}>
        <Route path="study" element={<Study />} />
        <Route path="edit" element={<EditDeck />} />
        <Route path="cards/new" element={<AddCard />} />
        <Route path="cards/:cardId/edit" element={<EditCard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RootRoutes;
import Home from "../components/Home/Home";

import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "UIJP II - Université Internationale Jean Paul II de Bafang",
  description: "Bienvenue sur le site de l'Université Internationale Jean Paul II de Bafang de Bafang, votre destination pour des formations d'excellence en sciences humaines et sociales.",
}


export default function page() {
  return (
    <div>
      <Home />
    </div>
  );
}

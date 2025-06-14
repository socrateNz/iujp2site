import Home from "../components/Home/Home";

import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "IUJP II - Institut Universitaire Jean-Paul II",
  description: "Bienvenue sur le site de l'Institut Universitaire Jean-Paul II de Bafang, votre destination pour des formations d'excellence en sciences humaines et sociales.",
}


export default function page() {
  return (
    <div>
      <Home />
    </div>
  );
}

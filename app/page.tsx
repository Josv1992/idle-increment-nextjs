"use client";

import { useContext } from "react";
import ButtonGrid from "./components/ButtonGrid";
import { StateContext } from "./contexts/StateContext";

export default function Home() {
  const ctx = useContext(StateContext);
  const homeButtons = [
    { label: "Perform Skill Action (mining)", onClick: () => ctx?.performSkillAction('mining', 'mining', 'ore', 10, 500) },
    { label: "Perform Skill Action (woodcutting)", onClick: () => ctx?.performSkillAction('woodcutting', 'woodcutting', 'wood', 10, 500) },
  ];

  return (
    <div className="flex flex-col gap-8 mt-8">
      <ButtonGrid buttons={homeButtons} />
    </div>
  );
}

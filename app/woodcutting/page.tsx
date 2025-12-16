"use client";

import { useContext } from "react";
import ButtonGrid from "../components/ButtonGrid";
import { StateContext } from "../contexts/StateContext";

export default function WoodcuttingPage() {
  const ctx = useContext(StateContext);


  const buttons = [
    { label: "Chop", onClick: () => ctx?.performSkillAction('woodcutting', 'woodcutting', 'wood', 10, 500), variant: "primary" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Woodcutting</h1>

      <div className="mb-8">
      </div>

      <ButtonGrid buttons={buttons} />
    </div>
  );
}

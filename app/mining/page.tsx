"use client";
import { useContext } from "react";
import ButtonGrid from "../components/ButtonGrid";
import { StateContext } from "../contexts/StateContext";

export default function MiningPage() {
  const ctx = useContext(StateContext);

  const handleSkillAction = () => ctx?.performSkillAction('mining', 'mining', 'ore', 10, 500);

  const buttons = [
    { label: "Mine", actionType: "mining", onClick: handleSkillAction, variant: "primary" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Mining</h1>

      <ButtonGrid buttons={buttons} />
    </div>
  );
}

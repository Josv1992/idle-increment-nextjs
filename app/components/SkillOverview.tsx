"use client";

import { useContext } from "react";
import { StateContext } from "../contexts/StateContext";
import { ALL_SKILLS, nextXPThreshold } from "../contexts/state.types";
import Inventory from "./Inventory";

export default function SkillOverview() {
  const ctx = useContext(StateContext);
  if (!ctx) return null;

  const { game } = ctx;

  return (
    <>
    <div className="border p-4 rounded bg-slate-50 dark:bg-slate-800">
      <h2 className="text-2xl font-bold mb-4">Inventory:</h2>
      <Inventory />
    </div>
    <div className="border p-4 rounded bg-slate-50 dark:bg-slate-800 mt-4">
      <h2 className="text-2xl font-bold mb-4">Skills:</h2>

      <div>
        {(() => {
          const skillsFromState = game.skills ?? {};

          const skillsToRender = ALL_SKILLS.map((skillName) => {
            const s = skillsFromState[skillName] ?? { skillName: 'Skill', xp: 0, level: 1 };
            return { skillName, xp: s.xp, level: s.level };
          });

          return skillsToRender.map((skill) => {
            const xpThreshold = nextXPThreshold(skill.level);
            const xpPercent = Math.min(100, (skill.xp / Math.max(1, xpThreshold)) * 100);

            return (
              <div key={skill.skillName} className="my-4">
                <h3 className="text-lg font-semibold mb-2 capitalize">{skill.skillName}</h3>
                <p className="mb-2">Level: {skill.level} / 99</p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-3"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            );
          });
        })()}
      </div>
    </div>  
    </>
  );
}
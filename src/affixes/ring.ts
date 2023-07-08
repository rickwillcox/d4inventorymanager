const rings = {
  implicit: [
    '25% Cold/Fire Resistance',
    '25% Cold/Lightning Resistance',
    '25% Cold/Poison Resistance',
    '25% Cold/Shadow Resistance',
    '25% Fire/Lightning Resistance',
    '25% Fire/Poison Resistance',
    '25% Fire/Shadow Resistance',
    '25% Lightning/Poison Resistance',
    '25% Lightning/Shadow Resistance',
    '25% Poison/Shadow Resistance',
  ],
  explicit: {
    generic: [
      'Critical Strike Chance',
      'Critical Strike Damage',
      'Damage Over Time',
      'Damage to Close Enemies',
      'Damage to Crowd Controlled Enemies',
      'Damage to Distant Enemies',
      'Damage to Injured Enemies',
      'Damage to Slowed Enemies',
      'Damage to Stunned Enemies',
      'Life Regeneration while Not Damaged Recently',
      'Lucky Hit Chance',
      'Maximum Life',
      'Overpower Damage',
      'Resource Generation',
      'Socket',
      'Vulnerable Damage',
    ],
    barbarian: [
      'Damage to Bleeding Enemies',
      'Damage while Berserking',
      'Fortify Generation',
      'Maximum Fury',
      'Physical Damage',
    ],
    druid: [
      'Critical Strike Damage with Earth Skills',
      'Critical Strike Damage with Werewolf Skills',
      'Damage to Poisoned Enemies',
      'Fortify Generation',
      'Lightning Damage',
      'Maximum Spirit',
      'Physical Damage',
      'Poison Damage',
    ],
    necromancer: [
      'Blood Orb Healing',
      'Critical Strike Damage with Bone Skills',
      'Damage for 4 Seconds After Picking Up a Blood Orb',
      'Damage to Affected by Shadow Damage Over Time Enemies',
      'Fortify Generation',
      'Golems Inherit [X]% of Your Thorns',
      'Maximum Essence',
      'Maximum Minion Life',
      'Physical Damage',
      'Shadow Damage',
      'Skeletal Mages Inherit [X]% of Your Thorns',
      'Skeletal Warriors Inherit [X]% of Your Thorns',
    ],
    rogue: [
      'Cold Damage',
      'Critical Strike Damage with Imbued Skills',
      'Damage to Chilled Enemies',
      'Damage to Dazed Enemies',
      'Damage to Enemies Affected by Trap Skills',
      'Damage to Frozen Enemies',
      'Damage to Poisoned Enemies',
      'Imbued Skill Damage',
      'Maximum Energy',
      'Physical Damage',
      'Shadow Damage',
    ],
    sorcerer: [
      'Barrier Generation',
      'Cold Damage',
      'Cracking Energy Damage',
      'Damage to Burning Enemies',
      'Damage to Chilled Enemies',
      'Damage to Frozen Enemies',
      'Fire Damage',
      'Lightning Critical Strike Damage',
      'Lightning Damage',
      'Maximum Mana',
    ],
  },
  aspect: {
    generic: [],
    barbarian: [],
    druid: [],
    necromancer: [],
    rogue: [],
    sorcerer: [],
  },
};

export default rings;
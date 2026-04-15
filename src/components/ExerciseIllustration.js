import React from 'react';

// ── Category color palette ──────────────────────────────────────────
const COLORS = {
  lower_body: { bg: '#EDE6F4', fill: '#4A3669' },
  upper_body: { bg: '#E0F2EC', fill: '#4A9B7F' },
  perineum:   { bg: '#FBEAF0', fill: '#993556' },
  breathing:  { bg: '#E6F1FB', fill: '#185FA5' },
  core:       { bg: '#F5EDE2', fill: '#854F0B' },
  vacuum:     { bg: '#EDE6F4', fill: '#7B5EA7' },
  stretching: { bg: '#EAF3DE', fill: '#3B6D11' },
};

// ── Pose library (viewBox 0 0 120 90) ──────────────────────────────
// Each pose: (fill) => React SVG elements
// Stroke props inherited from parent <g>
// ──────────────────────────────────────────────────────────────────

const P = {};   // pose dictionary

// ── Lower body ──────────────────────────────────────────────────────

P.squat = (f) => <>
  <circle cx="60" cy="21" r="7" fill={f}/>
  <line x1="60" y1="28" x2="62" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="33" x2="48" y2="45" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="33" x2="72" y2="45" strokeWidth="6" stroke={f}/>
  <line x1="58" y1="50" x2="40" y2="67" strokeWidth="8" stroke={f}/>
  <line x1="62" y1="50" x2="80" y2="67" strokeWidth="8" stroke={f}/>
  <line x1="40" y1="67" x2="50" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="67" x2="70" y2="82" strokeWidth="7" stroke={f}/>
</>;

P.squat_sumo = (f) => <>
  <circle cx="60" cy="23" r="7" fill={f}/>
  <line x1="60" y1="30" x2="62" y2="51" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="35" x2="48" y2="45" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="35" x2="72" y2="45" strokeWidth="6" stroke={f}/>
  <line x1="57" y1="51" x2="32" y2="67" strokeWidth="8" stroke={f}/>
  <line x1="63" y1="51" x2="88" y2="67" strokeWidth="8" stroke={f}/>
  <line x1="32" y1="67" x2="44" y2="83" strokeWidth="7" stroke={f}/>
  <line x1="88" y1="67" x2="76" y2="83" strokeWidth="7" stroke={f}/>
</>;

P.lunge = (f) => <>
  <circle cx="53" cy="14" r="7" fill={f}/>
  <line x1="53" y1="21" x2="56" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="53" y1="26" x2="42" y2="41" strokeWidth="6" stroke={f}/>
  <line x1="53" y1="26" x2="64" y2="41" strokeWidth="6" stroke={f}/>
  <line x1="57" y1="48" x2="74" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="74" y1="62" x2="76" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="52" y1="48" x2="38" y2="63" strokeWidth="8" stroke={f}/>
  <line x1="38" y1="63" x2="37" y2="82" strokeWidth="7" stroke={f}/>
</>;

P.lunge_lateral = (f) => <>
  <circle cx="55" cy="14" r="7" fill={f}/>
  <line x1="55" y1="21" x2="55" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="55" y1="27" x2="44" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="55" y1="27" x2="66" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="53" y1="48" x2="28" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="28" y1="58" x2="27" y2="80" strokeWidth="7" stroke={f}/>
  <line x1="57" y1="48" x2="74" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="74" y1="62" x2="73" y2="80" strokeWidth="7" stroke={f}/>
</>;

P.hip_thrust = (f) => <>
  <circle cx="17" cy="70" r="7" fill={f}/>
  <line x1="23" y1="67" x2="32" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="32" y1="62" x2="66" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="66" y1="52" x2="80" y2="38" strokeWidth="8" stroke={f}/>
  <line x1="80" y1="38" x2="92" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="92" y1="60" x2="95" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="62" x2="22" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="20" y1="62" x2="13" y2="82" strokeWidth="7" stroke={f}/>
</>;

P.glute_bridge = (f) => <>
  <circle cx="18" cy="74" r="7" fill={f}/>
  <line x1="24" y1="72" x2="56" y2="63" strokeWidth="8" stroke={f}/>
  <line x1="56" y1="63" x2="70" y2="47" strokeWidth="8" stroke={f}/>
  <line x1="70" y1="47" x2="84" y2="64" strokeWidth="8" stroke={f}/>
  <line x1="84" y1="64" x2="86" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="46" x2="90" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="90" y1="60" x2="93" y2="82" strokeWidth="7" stroke={f}/>
  <line x1="26" y1="68" x2="18" y2="82" strokeWidth="7" stroke={f}/>
</>;

P.hinge = (f) => <>
  <circle cx="34" cy="24" r="7" fill={f}/>
  <line x1="40" y1="22" x2="50" y2="30" strokeWidth="6" stroke={f}/>
  <line x1="50" y1="30" x2="85" y2="40" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="33" x2="60" y2="55" strokeWidth="6" stroke={f}/>
  <line x1="72" y1="36" x2="68" y2="57" strokeWidth="6" stroke={f}/>
  <line x1="80" y1="42" x2="74" y2="74" strokeWidth="8" stroke={f}/>
  <line x1="87" y1="42" x2="82" y2="74" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="74" x2="80" y2="76" strokeWidth="5" stroke={f}/>
  <line x1="80" y1="74" x2="88" y2="76" strokeWidth="5" stroke={f}/>
</>;

P.lying_prone = (f) => <>
  <circle cx="14" cy="26" r="7" fill={f}/>
  <line x1="20" y1="28" x2="30" y2="32" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="32" x2="82" y2="40" strokeWidth="8" stroke={f}/>
  <line x1="40" y1="32" x2="34" y2="20" strokeWidth="6" stroke={f}/>
  <line x1="50" y1="34" x2="44" y2="22" strokeWidth="6" stroke={f}/>
  <line x1="80" y1="40" x2="82" y2="23" strokeWidth="8" stroke={f}/>
  <line x1="87" y1="40" x2="94" y2="32" strokeWidth="7" stroke={f}/>
</>;

P.seated_upright = (f) => <>
  <circle cx="40" cy="16" r="7" fill={f}/>
  <line x1="40" y1="23" x2="42" y2="54" strokeWidth="8" stroke={f}/>
  <line x1="40" y1="28" x2="26" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="40" y1="28" x2="54" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="38" y1="54" x2="90" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="48" y1="54" x2="90" y2="35" strokeWidth="8" stroke={f}/>
  <line x1="57" y1="54" x2="95" y2="44" strokeWidth="8" stroke={f}/>
</>;

P.leg_press = (f) => <>
  <circle cx="16" cy="62" r="7" fill={f}/>
  <line x1="22" y1="60" x2="55" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="38" y1="56" x2="30" y2="76" strokeWidth="6" stroke={f}/>
  <line x1="44" y1="54" x2="38" y2="72" strokeWidth="6" stroke={f}/>
  <line x1="55" y1="48" x2="72" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="68" y1="50" x2="98" y2="26" strokeWidth="8" stroke={f}/>
  <line x1="75" y1="52" x2="102" y2="34" strokeWidth="8" stroke={f}/>
</>;

P.step_up = (f) => <>
  <circle cx="55" cy="13" r="7" fill={f}/>
  <line x1="55" y1="20" x2="57" y2="47" strokeWidth="8" stroke={f}/>
  <line x1="55" y1="25" x2="44" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="55" y1="25" x2="66" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="57" y1="47" x2="72" y2="54" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="54" x2="74" y2="72" strokeWidth="7" stroke={f}/>
  <line x1="54" y1="47" x2="46" y2="72" strokeWidth="8" stroke={f}/>
  <line x1="44" y1="72" x2="52" y2="72" strokeWidth="5" stroke={f}/>
  <line x1="63" y1="72" x2="88" y2="72" strokeWidth="4" stroke={f}/>
  <line x1="88" y1="72" x2="88" y2="82" strokeWidth="4" stroke={f}/>
</>;

P.split_squat = (f) => <>
  <circle cx="52" cy="14" r="7" fill={f}/>
  <line x1="52" y1="21" x2="54" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="52" y1="26" x2="40" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="52" y1="26" x2="64" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="55" y1="48" x2="72" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="60" x2="74" y2="80" strokeWidth="7" stroke={f}/>
  <line x1="52" y1="48" x2="36" y2="55" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="55" x2="40" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="35" y1="66" x2="50" y2="60" strokeWidth="4" stroke={f}/>
</>;

// ── Upper body ───────────────────────────────────────────────────────

P.bench_press = (f) => <>
  <circle cx="17" cy="45" r="7" fill={f}/>
  <line x1="23" y1="45" x2="88" y2="45" strokeWidth="8" stroke={f}/>
  <line x1="50" y1="43" x2="42" y2="26" strokeWidth="7" stroke={f}/>
  <line x1="42" y1="26" x2="38" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="65" y1="43" x2="73" y2="26" strokeWidth="7" stroke={f}/>
  <line x1="73" y1="26" x2="77" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="86" y1="45" x2="92" y2="65" strokeWidth="8" stroke={f}/>
  <line x1="92" y1="65" x2="86" y2="78" strokeWidth="7" stroke={f}/>
</>;

P.pushup = (f) => <>
  <circle cx="16" cy="35" r="7" fill={f}/>
  <line x1="22" y1="36" x2="30" y2="38" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="38" x2="96" y2="43" strokeWidth="8" stroke={f}/>
  <line x1="30" y1="38" x2="26" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="38" x2="36" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="94" y1="43" x2="100" y2="54" strokeWidth="5" stroke={f}/>
  <line x1="97" y1="43" x2="103" y2="53" strokeWidth="5" stroke={f}/>
</>;

P.bent_row = (f) => <>
  <circle cx="28" cy="22" r="7" fill={f}/>
  <line x1="34" y1="20" x2="44" y2="27" strokeWidth="7" stroke={f}/>
  <line x1="44" y1="27" x2="82" y2="38" strokeWidth="8" stroke={f}/>
  <line x1="57" y1="30" x2="52" y2="50" strokeWidth="7" stroke={f}/>
  <line x1="68" y1="33" x2="76" y2="22" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="22" x2="82" y2="30" strokeWidth="6" stroke={f}/>
  <line x1="79" y1="40" x2="72" y2="72" strokeWidth="8" stroke={f}/>
  <line x1="85" y1="40" x2="80" y2="72" strokeWidth="8" stroke={f}/>
  <line x1="70" y1="72" x2="76" y2="74" strokeWidth="5" stroke={f}/>
  <line x1="78" y1="72" x2="84" y2="74" strokeWidth="5" stroke={f}/>
</>;

P.lat_pulldown = (f) => <>
  <circle cx="60" cy="14" r="7" fill={f}/>
  <line x1="60" y1="21" x2="62" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="40" y2="16" strokeWidth="7" stroke={f}/>
  <line x1="40" y1="16" x2="36" y2="24" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="26" x2="80" y2="16" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="16" x2="84" y2="24" strokeWidth="5" stroke={f}/>
  <line x1="56" y1="52" x2="72" y2="52" strokeWidth="6" stroke={f}/>
  <line x1="58" y1="52" x2="50" y2="74" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="52" x2="72" y2="74" strokeWidth="8" stroke={f}/>
</>;

P.seated_row = (f) => <>
  <circle cx="48" cy="14" r="7" fill={f}/>
  <line x1="48" y1="21" x2="52" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="26" x2="30" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="36" x2="24" y2="32" strokeWidth="6" stroke={f}/>
  <line x1="48" y1="26" x2="66" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="66" y1="36" x2="72" y2="32" strokeWidth="6" stroke={f}/>
  <line x1="48" y1="52" x2="76" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="52" x2="42" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="52" x2="68" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.standing_curl = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="46" y2="46" strokeWidth="7" stroke={f}/>
  <line x1="46" y1="46" x2="42" y2="34" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="26" x2="74" y2="42" strokeWidth="7" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="76" x2="55" y2="76" strokeWidth="5" stroke={f}/>
  <line x1="68" y1="76" x2="75" y2="76" strokeWidth="5" stroke={f}/>
</>;

P.overhead_press = (f) => <>
  <circle cx="60" cy="14" r="7" fill={f}/>
  <line x1="60" y1="21" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="27" x2="44" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="44" y1="34" x2="38" y2="16" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="27" x2="76" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="34" x2="82" y2="16" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="76" x2="54" y2="76" strokeWidth="5" stroke={f}/>
  <line x1="68" y1="76" x2="74" y2="76" strokeWidth="5" stroke={f}/>
</>;

P.lateral_raise = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="38" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="38" y1="36" x2="32" y2="46" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="26" x2="82" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="82" y1="36" x2="88" y2="46" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.shrug = (f) => <>
  <circle cx="60" cy="13" r="7" fill={f}/>
  <line x1="60" y1="20" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="24" x2="44" y2="28" strokeWidth="7" stroke={f}/>
  <line x1="44" y1="28" x2="40" y2="46" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="24" x2="76" y2="28" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="28" x2="80" y2="46" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.tricep_pushdown = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="25" x2="47" y2="30" strokeWidth="7" stroke={f}/>
  <line x1="47" y1="30" x2="46" y2="52" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="25" x2="73" y2="30" strokeWidth="7" stroke={f}/>
  <line x1="73" y1="30" x2="74" y2="52" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.dips = (f) => <>
  <circle cx="60" cy="14" r="7" fill={f}/>
  <line x1="60" y1="21" x2="60" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="27" x2="44" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="44" y1="34" x2="42" y2="58" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="27" x2="76" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="34" x2="78" y2="58" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="52" x2="50" y2="72" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="52" x2="70" y2="72" strokeWidth="8" stroke={f}/>
</>;

// ── Périnée ─────────────────────────────────────────────────────────

P.seated_cross = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="46" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="38" x2="40" y2="32" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="26" x2="74" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="74" y1="38" x2="80" y2="32" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="48" x2="36" y2="60" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="60" x2="52" y2="72" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="48" x2="84" y2="60" strokeWidth="7" stroke={f}/>
  <line x1="84" y1="60" x2="68" y2="72" strokeWidth="7" stroke={f}/>
</>;

P.seated_chair = (f) => <>
  <circle cx="45" cy="14" r="7" fill={f}/>
  <line x1="45" y1="21" x2="46" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="45" y1="27" x2="33" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="45" y1="27" x2="57" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="40" y1="52" x2="80" y2="52" strokeWidth="6" stroke={f}/>
  <line x1="50" y1="52" x2="52" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="52" x2="62" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="50" y1="76" x2="56" y2="76" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="76" x2="66" y2="76" strokeWidth="5" stroke={f}/>
</>;

P.standing_belly = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="28" x2="46" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="40" x2="52" y2="46" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="28" x2="74" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="74" y1="40" x2="68" y2="46" strokeWidth="5" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.deep_squat = (f) => <>
  <circle cx="60" cy="25" r="7" fill={f}/>
  <line x1="60" y1="32" x2="62" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="36" x2="50" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="50" y1="44" x2="52" y2="52" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="36" x2="70" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="70" y1="44" x2="68" y2="52" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="52" x2="36" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="62" x2="40" y2="80" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="52" x2="84" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="84" y1="62" x2="80" y2="80" strokeWidth="7" stroke={f}/>
</>;

// ── Respiration ──────────────────────────────────────────────────────

P.lying_belly = (f) => <>
  <circle cx="17" cy="38" r="7" fill={f}/>
  <line x1="23" y1="38" x2="90" y2="42" strokeWidth="8" stroke={f}/>
  <line x1="42" y1="38" x2="38" y2="27" strokeWidth="7" stroke={f}/>
  <line x1="38" y1="27" x2="52" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="39" x2="52" y2="27" strokeWidth="7" stroke={f}/>
  <line x1="52" y1="27" x2="64" y2="35" strokeWidth="6" stroke={f}/>
  <line x1="88" y1="42" x2="92" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="92" y1="62" x2="86" y2="76" strokeWidth="7" stroke={f}/>
</>;

P.seated_breathing = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="27" x2="46" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="42" x2="48" y2="50" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="27" x2="74" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="74" y1="42" x2="72" y2="50" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="50" x2="36" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="62" x2="52" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="50" x2="84" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="84" y1="62" x2="68" y2="74" strokeWidth="7" stroke={f}/>
</>;

P.seated_ribs = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="27" x2="42" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="42" y1="36" x2="46" y2="44" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="27" x2="78" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="78" y1="36" x2="74" y2="44" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="50" x2="36" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="62" x2="52" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="50" x2="84" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="84" y1="62" x2="68" y2="74" strokeWidth="7" stroke={f}/>
</>;

P.seated_heart = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="27" x2="46" y2="34" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="34" x2="50" y2="40" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="27" x2="74" y2="34" strokeWidth="6" stroke={f}/>
  <line x1="74" y1="34" x2="70" y2="40" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="50" x2="36" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="62" x2="52" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="50" x2="84" y2="62" strokeWidth="7" stroke={f}/>
  <line x1="84" y1="62" x2="68" y2="74" strokeWidth="7" stroke={f}/>
</>;

// ── Gainage / Core ───────────────────────────────────────────────────

P.plank_forearm = (f) => <>
  <circle cx="16" cy="37" r="7" fill={f}/>
  <line x1="22" y1="37" x2="30" y2="40" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="40" x2="97" y2="44" strokeWidth="8" stroke={f}/>
  <line x1="24" y1="38" x2="22" y2="50" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="40" x2="34" y2="52" strokeWidth="6" stroke={f}/>
  <line x1="34" y1="50" x2="22" y2="52" strokeWidth="5" stroke={f}/>
  <line x1="95" y1="44" x2="101" y2="54" strokeWidth="5" stroke={f}/>
  <line x1="100" y1="44" x2="106" y2="54" strokeWidth="5" stroke={f}/>
</>;

P.plank_high = (f) => <>
  <circle cx="15" cy="35" r="7" fill={f}/>
  <line x1="21" y1="35" x2="30" y2="38" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="38" x2="97" y2="43" strokeWidth="8" stroke={f}/>
  <line x1="28" y1="38" x2="26" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="34" y1="39" x2="32" y2="55" strokeWidth="7" stroke={f}/>
  <line x1="95" y1="43" x2="100" y2="54" strokeWidth="5" stroke={f}/>
  <line x1="100" y1="43" x2="105" y2="53" strokeWidth="5" stroke={f}/>
</>;

P.side_plank = (f) => <>
  <circle cx="103" cy="36" r="7" fill={f}/>
  <line x1="97" y1="38" x2="14" y2="70" strokeWidth="8" stroke={f}/>
  <line x1="84" y1="44" x2="88" y2="28" strokeWidth="7" stroke={f}/>
  <line x1="88" y1="28" x2="92" y2="20" strokeWidth="5" stroke={f}/>
  <line x1="14" y1="70" x2="12" y2="56" strokeWidth="7" stroke={f}/>
  <line x1="12" y1="56" x2="8" y2="62" strokeWidth="5" stroke={f}/>
</>;

P.side_plank_star = (f) => <>
  <circle cx="100" cy="32" r="7" fill={f}/>
  <line x1="94" y1="34" x2="14" y2="68" strokeWidth="8" stroke={f}/>
  <line x1="80" y1="42" x2="86" y2="22" strokeWidth="7" stroke={f}/>
  <line x1="86" y1="22" x2="94" y2="14" strokeWidth="6" stroke={f}/>
  <line x1="30" y1="60" x2="18" y2="45" strokeWidth="8" stroke={f}/>
  <line x1="14" y1="68" x2="10" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="10" y1="54" x2="6" y2="60" strokeWidth="5" stroke={f}/>
</>;

P.dead_bug = (f) => <>
  <circle cx="60" cy="14" r="7" fill={f}/>
  <line x1="60" y1="21" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="42" y2="16" strokeWidth="7" stroke={f}/>
  <line x1="42" y1="16" x2="36" y2="20" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="26" x2="76" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="56" y1="50" x2="42" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="42" y1="60" x2="36" y2="72" strokeWidth="7" stroke={f}/>
  <line x1="64" y1="50" x2="82" y2="46" strokeWidth="8" stroke={f}/>
  <line x1="82" y1="46" x2="92" y2="40" strokeWidth="7" stroke={f}/>
</>;

P.bird_dog = (f) => <>
  <circle cx="30" cy="30" r="7" fill={f}/>
  <line x1="36" y1="29" x2="48" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="48" y1="34" x2="80" y2="38" strokeWidth="8" stroke={f}/>
  <line x1="52" y1="34" x2="52" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="36" x2="62" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="38" x2="96" y2="36" strokeWidth="8" stroke={f}/>
  <line x1="96" y1="36" x2="106" y2="34" strokeWidth="7" stroke={f}/>
  <line x1="48" y1="34" x2="36" y2="32" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="32" x2="24" y2="28" strokeWidth="6" stroke={f}/>
</>;

P.hollow = (f) => <>
  <circle cx="17" cy="32" r="7" fill={f}/>
  <line x1="23" y1="32" x2="85" y2="42" strokeWidth="8" stroke={f}/>
  <line x1="38" y1="33" x2="32" y2="18" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="35" x2="44" y2="20" strokeWidth="7" stroke={f}/>
  <line x1="83" y1="42" x2="95" y2="32" strokeWidth="8" stroke={f}/>
  <line x1="88" y1="40" x2="100" y2="32" strokeWidth="7" stroke={f}/>
</>;

P.leg_raise = (f) => <>
  <circle cx="17" cy="56" r="7" fill={f}/>
  <line x1="23" y1="54" x2="85" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="55" x2="34" y2="40" strokeWidth="7" stroke={f}/>
  <line x1="48" y1="56" x2="46" y2="40" strokeWidth="7" stroke={f}/>
  <line x1="72" y1="58" x2="74" y2="26" strokeWidth="8" stroke={f}/>
  <line x1="80" y1="58" x2="82" y2="26" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="26" x2="84" y2="26" strokeWidth="6" stroke={f}/>
</>;

P.quadruped = (f) => <>
  <circle cx="28" cy="28" r="7" fill={f}/>
  <line x1="34" y1="27" x2="46" y2="32" strokeWidth="7" stroke={f}/>
  <line x1="46" y1="32" x2="80" y2="36" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="32" x2="48" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="60" y1="34" x2="60" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="36" x2="80" y2="56" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="56" x2="90" y2="58" strokeWidth="6" stroke={f}/>
</>;

P.bear_crawl = (f) => <>
  <circle cx="28" cy="26" r="7" fill={f}/>
  <line x1="34" y1="25" x2="46" y2="30" strokeWidth="7" stroke={f}/>
  <line x1="46" y1="30" x2="80" y2="34" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="30" x2="46" y2="48" strokeWidth="7" stroke={f}/>
  <line x1="60" y1="32" x2="58" y2="50" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="34" x2="78" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="52" x2="90" y2="54" strokeWidth="6" stroke={f}/>
</>;

P.mountain_climber = (f) => <>
  <circle cx="15" cy="33" r="7" fill={f}/>
  <line x1="21" y1="34" x2="30" y2="37" strokeWidth="7" stroke={f}/>
  <line x1="30" y1="37" x2="97" y2="42" strokeWidth="8" stroke={f}/>
  <line x1="28" y1="37" x2="26" y2="53" strokeWidth="7" stroke={f}/>
  <line x1="34" y1="38" x2="32" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="65" y1="41" x2="56" y2="54" strokeWidth="8" stroke={f}/>
  <line x1="56" y1="54" x2="52" y2="66" strokeWidth="7" stroke={f}/>
  <line x1="95" y1="42" x2="100" y2="53" strokeWidth="5" stroke={f}/>
</>;

P.plank_rotation = (f) => <>
  <circle cx="16" cy="32" r="7" fill={f}/>
  <line x1="22" y1="32" x2="88" y2="44" strokeWidth="8" stroke={f}/>
  <line x1="28" y1="35" x2="24" y2="50" strokeWidth="7" stroke={f}/>
  <line x1="34" y1="37" x2="30" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="55" y1="40" x2="62" y2="24" strokeWidth="7" stroke={f}/>
  <line x1="62" y1="24" x2="70" y2="18" strokeWidth="6" stroke={f}/>
  <line x1="86" y1="44" x2="92" y2="54" strokeWidth="5" stroke={f}/>
</>;

P.hypo_crunch = (f) => <>
  <circle cx="20" cy="40" r="7" fill={f}/>
  <line x1="26" y1="38" x2="70" y2="44" strokeWidth="8" stroke={f}/>
  <line x1="38" y1="39" x2="36" y2="26" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="41" x2="48" y2="28" strokeWidth="7" stroke={f}/>
  <line x1="68" y1="44" x2="72" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="74" y1="43" x2="80" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="70" y1="60" x2="68" y2="76" strokeWidth="7" stroke={f}/>
  <line x1="78" y1="58" x2="76" y2="75" strokeWidth="7" stroke={f}/>
</>;

// ── Vacuum ───────────────────────────────────────────────────────────

P.vacuum_stand = (f) => <>
  <circle cx="50" cy="18" r="7" fill={f}/>
  <line x1="50" y1="25" x2="55" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="50" y1="30" x2="38" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="38" y1="42" x2="42" y2="48" strokeWidth="5" stroke={f}/>
  <line x1="50" y1="30" x2="62" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="62" y1="42" x2="58" y2="48" strokeWidth="5" stroke={f}/>
  <line x1="52" y1="48" x2="46" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="57" y1="48" x2="64" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="44" y1="76" x2="50" y2="76" strokeWidth="5" stroke={f}/>
  <line x1="62" y1="76" x2="68" y2="76" strokeWidth="5" stroke={f}/>
</>;

P.vacuum_lying = (f) => <>
  <circle cx="17" cy="46" r="7" fill={f}/>
  <line x1="23" y1="44" x2="88" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="44" x2="32" y2="32" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="45" x2="46" y2="33" strokeWidth="7" stroke={f}/>
  <line x1="86" y1="48" x2="94" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="90" y1="47" x2="100" y2="58" strokeWidth="7" stroke={f}/>
  <line x1="92" y1="62" x2="88" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="98" y1="58" x2="95" y2="72" strokeWidth="7" stroke={f}/>
</>;

// ── Étirements ───────────────────────────────────────────────────────

P.low_lunge = (f) => <>
  <circle cx="48" cy="12" r="7" fill={f}/>
  <line x1="48" y1="19" x2="52" y2="46" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="22" x2="38" y2="14" strokeWidth="6" stroke={f}/>
  <line x1="38" y1="14" x2="32" y2="8" strokeWidth="5" stroke={f}/>
  <line x1="48" y1="22" x2="60" y2="16" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="16" x2="66" y2="10" strokeWidth="5" stroke={f}/>
  <line x1="53" y1="46" x2="72" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="60" x2="74" y2="80" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="46" x2="36" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="60" x2="36" y2="80" strokeWidth="6" stroke={f}/>
  <line x1="30" y1="80" x2="42" y2="80" strokeWidth="5" stroke={f}/>
</>;

P.seated_fold = (f) => <>
  <circle cx="25" cy="32" r="7" fill={f}/>
  <line x1="31" y1="30" x2="50" y2="46" strokeWidth="8" stroke={f}/>
  <line x1="36" y1="26" x2="50" y2="18" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="18" x2="70" y2="30" strokeWidth="6" stroke={f}/>
  <line x1="70" y1="30" x2="86" y2="42" strokeWidth="6" stroke={f}/>
  <line x1="44" y1="50" x2="88" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="88" y1="52" x2="95" y2="54" strokeWidth="5" stroke={f}/>
</>;

P.figure_four = (f) => <>
  <circle cx="22" cy="46" r="7" fill={f}/>
  <line x1="28" y1="44" x2="72" y2="48" strokeWidth="8" stroke={f}/>
  <line x1="40" y1="45" x2="38" y2="32" strokeWidth="7" stroke={f}/>
  <line x1="50" y1="46" x2="48" y2="33" strokeWidth="7" stroke={f}/>
  <line x1="70" y1="48" x2="80" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="80" y1="62" x2="72" y2="78" strokeWidth="7" stroke={f}/>
  <line x1="68" y1="48" x2="50" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="50" y1="58" x2="46" y2="72" strokeWidth="7" stroke={f}/>
</>;

P.butterfly = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="62" y2="44" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="46" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="38" x2="42" y2="30" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="26" x2="74" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="74" y1="38" x2="78" y2="30" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="44" x2="34" y2="56" strokeWidth="7" stroke={f}/>
  <line x1="34" y1="56" x2="60" y2="70" strokeWidth="7" stroke={f}/>
  <line x1="60" y1="44" x2="86" y2="56" strokeWidth="7" stroke={f}/>
  <line x1="86" y1="56" x2="60" y2="70" strokeWidth="7" stroke={f}/>
  <line x1="54" y1="70" x2="66" y2="70" strokeWidth="5" stroke={f}/>
</>;

P.lying_ball = (f) => <>
  <circle cx="42" cy="28" r="7" fill={f}/>
  <line x1="47" y1="31" x2="60" y2="42" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="42" x2="70" y2="56" strokeWidth="8" stroke={f}/>
  <line x1="70" y1="56" x2="56" y2="70" strokeWidth="8" stroke={f}/>
  <line x1="56" y1="70" x2="40" y2="68" strokeWidth="7" stroke={f}/>
  <line x1="40" y1="68" x2="32" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="32" y1="54" x2="38" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="46" y1="24" x2="52" y2="18" strokeWidth="6" stroke={f}/>
  <line x1="52" y1="18" x2="62" y2="24" strokeWidth="6" stroke={f}/>
</>;

P.lying_twist = (f) => <>
  <circle cx="18" cy="44" r="7" fill={f}/>
  <line x1="24" y1="42" x2="78" y2="46" strokeWidth="8" stroke={f}/>
  <line x1="34" y1="43" x2="28" y2="30" strokeWidth="7" stroke={f}/>
  <line x1="52" y1="44" x2="46" y2="30" strokeWidth="7" stroke={f}/>
  <line x1="74" y1="46" x2="82" y2="60" strokeWidth="8" stroke={f}/>
  <line x1="82" y1="60" x2="68" y2="74" strokeWidth="7" stroke={f}/>
  <line x1="74" y1="46" x2="58" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="58" y1="58" x2="50" y2="72" strokeWidth="7" stroke={f}/>
</>;

P.quad_stretch = (f) => <>
  <circle cx="58" cy="12" r="7" fill={f}/>
  <line x1="58" y1="19" x2="59" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="58" y1="25" x2="46" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="46" y1="40" x2="42" y2="36" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="25" x2="70" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="70" y1="36" x2="76" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="76" y1="52" x2="68" y2="36" strokeWidth="6" stroke={f}/>
  <line x1="55" y1="50" x2="50" y2="78" strokeWidth="8" stroke={f}/>
  <line x1="48" y1="78" x2="56" y2="78" strokeWidth="5" stroke={f}/>
</>;

P.cat_pose = (f) => <>
  <circle cx="26" cy="26" r="7" fill={f}/>
  <line x1="32" y1="25" x2="44" y2="32" strokeWidth="7" stroke={f}/>
  <path d="M44,32 Q62,22 80,36" fill="none" strokeWidth="8" stroke={f}/>
  <line x1="44" y1="32" x2="44" y2="54" strokeWidth="7" stroke={f}/>
  <line x1="60" y1="30" x2="60" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="36" x2="80" y2="58" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="58" x2="90" y2="60" strokeWidth="6" stroke={f}/>
</>;

P.child_pose = (f) => <>
  <circle cx="88" cy="44" r="7" fill={f}/>
  <line x1="82" y1="45" x2="58" y2="52" strokeWidth="8" stroke={f}/>
  <line x1="74" y1="50" x2="72" y2="66" strokeWidth="7" stroke={f}/>
  <line x1="68" y1="51" x2="66" y2="66" strokeWidth="7" stroke={f}/>
  <line x1="58" y1="52" x2="24" y2="52" strokeWidth="7" stroke={f}/>
  <line x1="36" y1="52" x2="28" y2="58" strokeWidth="5" stroke={f}/>
  <line x1="24" y1="52" x2="18" y2="58" strokeWidth="5" stroke={f}/>
</>;

P.lateral_stretch = (f) => <>
  <circle cx="58" cy="12" r="7" fill={f}/>
  <path d="M58,19 Q54,36 50,50" fill="none" strokeWidth="8" stroke={f}/>
  <line x1="58" y1="24" x2="72" y2="16" strokeWidth="6" stroke={f}/>
  <line x1="72" y1="16" x2="84" y2="12" strokeWidth="5" stroke={f}/>
  <line x1="58" y1="28" x2="44" y2="38" strokeWidth="6" stroke={f}/>
  <line x1="44" y1="38" x2="42" y2="48" strokeWidth="5" stroke={f}/>
  <line x1="48" y1="50" x2="42" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="53" y1="50" x2="58" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.pigeon = (f) => <>
  <circle cx="60" cy="20" r="7" fill={f}/>
  <line x1="60" y1="27" x2="62" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="32" x2="48" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="32" x2="72" y2="44" strokeWidth="6" stroke={f}/>
  <line x1="60" y1="50" x2="42" y2="58" strokeWidth="8" stroke={f}/>
  <line x1="42" y1="58" x2="24" y2="60" strokeWidth="7" stroke={f}/>
  <line x1="60" y1="50" x2="72" y2="62" strokeWidth="8" stroke={f}/>
  <line x1="72" y1="62" x2="88" y2="68" strokeWidth="7" stroke={f}/>
  <line x1="88" y1="68" x2="96" y2="64" strokeWidth="6" stroke={f}/>
</>;

P.doorway = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="25" x2="40" y2="35" strokeWidth="7" stroke={f}/>
  <line x1="40" y1="35" x2="34" y2="28" strokeWidth="6" stroke={f}/>
  <line x1="34" y1="28" x2="28" y2="36" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="25" x2="80" y2="35" strokeWidth="7" stroke={f}/>
  <line x1="80" y1="35" x2="86" y2="28" strokeWidth="6" stroke={f}/>
  <line x1="86" y1="28" x2="92" y2="36" strokeWidth="5" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

P.shoulder_cross = (f) => <>
  <circle cx="60" cy="12" r="7" fill={f}/>
  <line x1="60" y1="19" x2="60" y2="50" strokeWidth="8" stroke={f}/>
  <line x1="60" y1="26" x2="40" y2="36" strokeWidth="7" stroke={f}/>
  <line x1="40" y1="36" x2="30" y2="34" strokeWidth="6" stroke={f}/>
  <line x1="30" y1="34" x2="28" y2="40" strokeWidth="5" stroke={f}/>
  <line x1="60" y1="26" x2="72" y2="40" strokeWidth="6" stroke={f}/>
  <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={f}/>
  <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={f}/>
</>;

// ── Mapping: exercice ID → pose key ─────────────────────────────────

const EXERCISE_POSE = {
  // Lower body
  squat_barre:        'squat',
  squat_gobelet:      'squat',
  hack_squat:         'squat',
  squat_sumo_barre:   'squat_sumo',
  lunge_db:           'lunge',
  lunge_reverse:      'lunge',
  lunge_lateral:      'lunge_lateral',
  hip_thrust:         'hip_thrust',
  hip_thrust_uni:     'hip_thrust',
  rdl_db:             'hinge',
  rdl_barre:          'hinge',
  good_morning:       'hinge',
  leg_curl:           'lying_prone',
  leg_extension:      'seated_upright',
  abduction_machine:  'seated_upright',
  adduction_machine:  'seated_upright',
  leg_press:          'leg_press',
  glute_bridge_w:     'glute_bridge',
  step_up:            'step_up',
  bulgarian_split:    'split_squat',
  // Upper body
  bench_press_db:     'bench_press',
  bench_press_bar:    'bench_press',
  incline_press:      'bench_press',
  chest_fly:          'bench_press',
  pullover:           'bench_press',
  push_up_weighted:   'pushup',
  db_row:             'bent_row',
  barbell_row:        'bent_row',
  reverse_fly:        'bent_row',
  face_pull:          'bent_row',
  lat_pulldown:       'lat_pulldown',
  seated_row:         'seated_row',
  bicep_curl:         'standing_curl',
  hammer_curl:        'standing_curl',
  barbell_curl:       'standing_curl',
  shoulder_press:     'overhead_press',
  lateral_raise:      'lateral_raise',
  front_raise:        'lateral_raise',
  tricep_pushdown:    'tricep_pushdown',
  assisted_dips:      'dips',
  shrugs:             'shrug',
  // Périnée
  kegel_slow:         'seated_cross',
  kegel_fast:         'seated_cross',
  kegel_hold:         'seated_cross',
  kegel_expire:       'seated_cross',
  kegel_3levels:      'seated_heart',
  reverse_kegel:      'seated_cross',
  elevator_kegel:     'seated_cross',
  kegel_seated:       'seated_chair',
  kegel_standing:     'standing_belly',
  kegel_squat:        'deep_squat',
  // Respiration
  diaphragm_breath:   'lying_belly',
  ventral_breath:     'lying_belly',
  breath_478:         'seated_breathing',
  coherence:          'seated_heart',
  breath_4462:        'seated_breathing',
  complete_breath:    'seated_breathing',
  box_breathing:      'seated_breathing',
  long_expire:        'seated_breathing',
  costal_breath:      'seated_ribs',
  belt_sync_breath:   'seated_breathing',
  // Gainage / Core
  plank_elbows:       'plank_forearm',
  plank_hands:        'plank_high',
  side_plank:         'side_plank',
  side_plank_star:    'side_plank_star',
  dead_bug:           'dead_bug',
  bird_dog:           'bird_dog',
  hypo_crunch:        'hypo_crunch',
  vacuum_ab:          'vacuum_stand',
  mountain_climber_slow: 'mountain_climber',
  hollow_hold:        'hollow',
  leg_raise:          'leg_raise',
  bridge_plank:       'glute_bridge',
  plank_rotation:     'plank_rotation',
  bear_crawl_static:  'bear_crawl',
  // Vacuum
  vacuum_standing:    'vacuum_stand',
  vacuum_seated:      'seated_cross',
  vacuum_quadruped:   'quadruped',
  vacuum_lying:       'vacuum_lying',
  vacuum_forced:      'vacuum_stand',
  vacuum_pulsed:      'vacuum_stand',
  vacuum_perineum:    'seated_cross',
  vacuum_bridge:      'glute_bridge',
  vacuum_dynamic:     'vacuum_stand',
  vacuum_postpartum:  'lying_belly',
  // Étirements
  psoas_stretch:      'low_lunge',
  hamstring_stretch:  'seated_fold',
  figure_four:        'figure_four',
  butterfly_stretch:  'butterfly',
  back_ball:          'lying_ball',
  spinal_twist:       'lying_twist',
  quad_stretch:       'quad_stretch',
  cat_cow:            'cat_pose',
  child_pose:         'child_pose',
  lateral_stretch:    'lateral_stretch',
  pigeon_pose:        'pigeon',
  pec_doorway:        'doorway',
  shoulder_cross:     'shoulder_cross',
};

// ── Main component ───────────────────────────────────────────────────

export default function ExerciseIllustration({
  exerciseId,
  category,
  width = 120,
  height = 90,
  borderRadius = 12,
  style = {},
}) {
  const colors = COLORS[category] || COLORS.core;
  const poseKey = EXERCISE_POSE[exerciseId];
  const PoseFn = poseKey ? P[poseKey] : null;

  return (
    <svg
      viewBox="0 0 120 90"
      width={width}
      height={height}
      style={{ display: 'block', ...style }}
    >
      <rect width="120" height="90" fill={colors.bg} rx={borderRadius} />
      <g strokeLinecap="round" strokeLinejoin="round" fill="none">
        {PoseFn ? PoseFn(colors.fill) : (
          // Fallback: simple standing figure
          <>
            <circle cx="60" cy="13" r="7" fill={colors.fill}/>
            <line x1="60" y1="20" x2="60" y2="50" strokeWidth="8" stroke={colors.fill}/>
            <line x1="60" y1="27" x2="46" y2="44" strokeWidth="6" stroke={colors.fill}/>
            <line x1="60" y1="27" x2="74" y2="44" strokeWidth="6" stroke={colors.fill}/>
            <line x1="56" y1="50" x2="50" y2="76" strokeWidth="8" stroke={colors.fill}/>
            <line x1="64" y1="50" x2="70" y2="76" strokeWidth="8" stroke={colors.fill}/>
          </>
        )}
      </g>
    </svg>
  );
}

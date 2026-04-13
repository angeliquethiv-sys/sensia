/* ═══════════════════════════════════════
   SENSIA — Programmes 4 semaines
   Un programme par profil
═══════════════════════════════════════ */

/* ── Types visuels ── */
export const SESSION_TYPES = {
  breathing:  { label: 'Respiration', emoji: '🌬️', color: '#8BA7FF', bg: 'rgba(139,167,255,.12)' },
  strength:   { label: 'Renforcement', emoji: '💪', color: '#9B8DC8', bg: 'rgba(155,141,200,.12)' },
  perineum:   { label: 'Périnée',     emoji: '💜', color: '#7B6BA8', bg: 'rgba(123,107,168,.12)' },
  mobility:   { label: 'Mobilité',    emoji: '🧘', color: '#3DD68C', bg: 'rgba(61,214,140,.12)' },
  full:       { label: 'Complet',     emoji: '🔥', color: '#F0B429', bg: 'rgba(240,180,41,.12)' },
  rest:       { label: 'Repos',       emoji: '😴', color: '#BEB8D0', bg: 'rgba(190,184,208,.12)' },
};

const S = (day, label, type, title, minutes, exIds, intensity = 1) => ({
  day, label, type, title, minutes, exercises: exIds, intensity, isRest: type === 'rest',
});
const R = (day, label) => S(day, label, 'rest', 'Repos', 0, [], 0);

/* ═══════════ POST-PARTUM ═══════════ */
const postpartum = {
  id: 'postpartum',
  name: 'Programme Post-Partum',
  subtitle: 'Récupération progressive · 4 semaines',
  emoji: '🤱',
  color: '#9B8DC8',
  description: 'Programme dédié à la récupération après l\'accouchement. Chaque séance est guidée par la ceinture SENSIA pour protéger et rééduquer ton périnée.',
  weeks: [
    {
      num: 1,
      theme: 'Éveil & reconnexion',
      subtitle: 'Reprends contact avec ton corps en douceur',
      color: '#E8E4F0',
      sessions: [
        S(1,'Lun','breathing',  'Respiration & coordination',     15, ['coordination','breathing_4462'],        1),
        R(2,'Mar'),
        S(3,'Mer','perineum',   'Activation périnée — kegel',     12, ['kegel_basic'],                          1),
        R(4,'Jeu'),
        S(5,'Ven','mobility',   'Mobilité douce — hanches & dos', 18, ['cat_cow','hip_stretch'],                1),
        R(6,'Sam'),
        R(7,'Dim'),
      ],
    },
    {
      num: 2,
      theme: 'Consolidation',
      subtitle: 'Renforce les bases périnéales',
      color: '#DDD4F5',
      sessions: [
        S(1,'Lun','perineum',   'Kegel endurance',                18, ['kegel_endurance','coordination'],       1),
        R(2,'Mar'),
        S(3,'Mer','strength',   'Abduction couché + périnée',     20, ['abduction','kegel_basic'],              1),
        R(4,'Jeu'),
        S(5,'Ven','breathing',  'Respiration SENSIA 4-4-6-2',     15, ['breathing_4462','cardiac_coherence'],   1),
        S(6,'Sam','mobility',   'Yoga périnée',                   15, ['hip_stretch','cat_cow'],                1),
        R(7,'Dim'),
      ],
    },
    {
      num: 3,
      theme: 'Renforcement léger',
      subtitle: 'Introduction des exercices de force',
      color: '#CFC6EB',
      sessions: [
        S(1,'Lun','strength',   'Squat guidé + respiration',      20, ['squat','coordination'],                 2),
        R(2,'Mar'),
        S(3,'Mer','full',       'Dead Bug + Vacuum',              18, ['dead_bug','vacuum'],                    2),
        R(4,'Jeu'),
        S(5,'Ven','strength',   'Pont fessier guidé',             22, ['hip_thrust','kegel_endurance'],         2),
        S(6,'Sam','mobility',   'Étirements récupération',        15, ['cat_cow','hip_stretch'],                1),
        R(7,'Dim'),
      ],
    },
    {
      num: 4,
      theme: 'Consolidation',
      subtitle: 'Programme complet post-partum',
      color: '#B9AEDF',
      sessions: [
        S(1,'Lun','strength',   'Hip Thrust + Squat',             25, ['hip_thrust','squat'],                   2),
        R(2,'Mar'),
        S(3,'Mer','full',       'Gainage complet',                22, ['dead_bug','bird_dog','vacuum'],         2),
        R(4,'Jeu'),
        S(5,'Ven','full',       'Séance complète post-partum',    30, ['hip_thrust','squat','kegel_endurance'], 2),
        S(6,'Sam','breathing',  'Récupération & cohérence',       15, ['cardiac_coherence','coordination'],     1),
        R(7,'Dim'),
      ],
    },
  ],
};

/* ═══════════ DÉBUTANTE ═══════════ */
const beginner = {
  id: 'beginner',
  name: 'Programme Débutante',
  subtitle: 'Fondamentaux · 4 semaines',
  emoji: '🌱',
  color: '#3DD68C',
  description: 'Programme pour découvrir le périnée et la respiration. À ton rythme, avec le guidage complet de la ceinture SENSIA.',
  weeks: [
    {
      num: 1,
      theme: 'Fondamentaux respiratoires',
      subtitle: 'Apprends à respirer correctement',
      color: '#E6FBF3',
      sessions: [
        S(1,'Lun','breathing',  'Respiration abdominale',         15, ['coordination','breathing_4462'],        1),
        R(2,'Mar'),
        S(3,'Mer','perineum',   'Découverte du périnée',          12, ['kegel_basic'],                          1),
        R(4,'Jeu'),
        S(5,'Ven','mobility',   'Mobilité & étirements',          20, ['cat_cow','hip_stretch'],                1),
        R(6,'Sam'),
        R(7,'Dim'),
      ],
    },
    {
      num: 2,
      theme: 'Activation du corps',
      subtitle: 'Premiers exercices de renforcement',
      color: '#C8F0DE',
      sessions: [
        S(1,'Lun','perineum',   'Kegel & coordination',           18, ['kegel_basic','coordination'],           1),
        R(2,'Mar'),
        S(3,'Mer','strength',   'Squat guidé débutant',           20, ['squat','abduction'],                    1),
        R(4,'Jeu'),
        S(5,'Ven','strength',   'Fente & abduction',              20, ['lunge','abduction'],                    1),
        S(6,'Sam','breathing',  'Cohérence cardiaque',            10, ['cardiac_coherence'],                    1),
        R(7,'Dim'),
      ],
    },
    {
      num: 3,
      theme: 'Renforcement progressif',
      subtitle: 'Construis ta force en douceur',
      color: '#A8EAC8',
      sessions: [
        S(1,'Lun','strength',   'Lower body — squat & fente',     22, ['squat','lunge'],                        2),
        R(2,'Mar'),
        S(3,'Mer','full',       'Gainage débutant',               18, ['dead_bug','bird_dog'],                  2),
        R(4,'Jeu'),
        S(5,'Ven','strength',   'Hip Thrust introduction',        22, ['hip_thrust','kegel_basic'],             2),
        S(6,'Sam','mobility',   'Récupération active',            15, ['cat_cow','hip_stretch'],                1),
        R(7,'Dim'),
      ],
    },
    {
      num: 4,
      theme: 'Programme complet',
      subtitle: 'Tu es prête pour la suite !',
      color: '#88E0B8',
      sessions: [
        S(1,'Lun','full',       'Lower body complet',             25, ['hip_thrust','squat','lunge'],           2),
        R(2,'Mar'),
        S(3,'Mer','full',       'Gainage & périnée',              22, ['dead_bug','vacuum','kegel_endurance'],  2),
        R(4,'Jeu'),
        S(5,'Ven','full',       'Séance test semaine 4',          28, ['squat','hip_thrust','bird_dog'],        2),
        S(6,'Sam','breathing',  'Récupération',                   15, ['cardiac_coherence','breathing_4462'],   1),
        R(7,'Dim'),
      ],
    },
  ],
};

/* ═══════════ INTERMÉDIAIRE ═══════════ */
const intermediate = {
  id: 'intermediate',
  name: 'Programme Intermédiaire',
  subtitle: 'Performance & sécurité · 4 semaines',
  emoji: '💪',
  color: '#00C4B0',
  description: 'Pour les pratiquantes de sport ou de fitness. Optimise tes performances tout en protégeant ton périnée sous charge.',
  weeks: [
    {
      num: 1,
      theme: 'Synchronisation',
      subtitle: 'Maîtrise la respiration sous effort',
      color: '#E0FBF8',
      sessions: [
        S(1,'Lun','strength',   'Lower body + respiration',       25, ['squat','rdl','coordination'],           2),
        S(2,'Mar','breathing',  'Technique respiratoire',         15, ['breathing_4462','coordination'],        1),
        S(3,'Mer','full',       'Gainage avancé',                 22, ['plank','dead_bug','bird_dog'],          2),
        R(4,'Jeu'),
        S(5,'Ven','strength',   'Hip Thrust progressif',          25, ['hip_thrust','lunge'],                   2),
        S(6,'Sam','mobility',   'Récupération',                   15, ['cat_cow','hip_stretch'],                1),
        R(7,'Dim'),
      ],
    },
    {
      num: 2,
      theme: 'Force périnéale',
      subtitle: 'Performe en toute sécurité',
      color: '#BCEEE9',
      sessions: [
        S(1,'Lun','full',       'Lower body intensif',            28, ['squat','rdl','hip_thrust'],             3),
        S(2,'Mar','perineum',   'Kegel avancé + hypopressif',     20, ['kegel_endurance','hypopressive'],       2),
        S(3,'Mer','full',       'Gainage + upper body',           25, ['plank','pushup_modified','row_elastic'],2),
        R(4,'Jeu'),
        S(5,'Ven','full',       'Full body guidé',                30, ['squat','hip_thrust','dead_bug'],        3),
        S(6,'Sam','breathing',  'Récupération & cohérence',       15, ['cardiac_coherence'],                    1),
        R(7,'Dim'),
      ],
    },
    {
      num: 3,
      theme: 'Intensification',
      subtitle: 'Monte en charge progressivement',
      color: '#98E3DC',
      sessions: [
        S(1,'Lun','strength',   'Squat lourd + Deadlift',         30, ['squat','rdl'],                          3),
        S(2,'Mar','full',       'Gainage intégral',               22, ['plank','bird_dog','vacuum'],            2),
        S(3,'Mer','strength',   'Hip Thrust + Fente',             28, ['hip_thrust','lunge'],                   3),
        R(4,'Jeu'),
        S(5,'Ven','full',       'Full body performance',          35, ['squat','hip_thrust','dead_bug','plank'],3),
        S(6,'Sam','breathing',  'Récupération',                   15, ['coordination','cardiac_coherence'],     1),
        R(7,'Dim'),
      ],
    },
    {
      num: 4,
      theme: 'Semaine test',
      subtitle: 'Évalue ta progression',
      color: '#70D8CF',
      sessions: [
        S(1,'Lun','full',       'Test lower body',                30, ['squat','rdl','lunge'],                  3),
        S(2,'Mar','full',       'Test gainage',                   25, ['plank','dead_bug','vacuum'],            3),
        R(3,'Mer'),
        S(4,'Jeu','full',       'Test full body',                 35, ['hip_thrust','squat','pushup_modified'], 3),
        S(5,'Ven','perineum',   'Périnée sous charge',            20, ['hypopressive','kegel_endurance'],       2),
        S(6,'Sam','mobility',   'Récupération complète',          20, ['cat_cow','hip_stretch'],                1),
        R(7,'Dim'),
      ],
    },
  ],
};

/* ═══════════ DÉJÀ TOUCHÉE ═══════════ */
const injured = {
  id: 'injured',
  name: 'Programme Rééducation',
  subtitle: 'Douceur & progression · 4 semaines',
  emoji: '🌸',
  color: '#F0B429',
  description: 'Programme adapté aux problèmes périnéaux. Chaque exercice est sélectionné pour ne jamais aggraver les symptômes. Consulte un professionnel de santé en parallèle.',
  weeks: [
    {
      num: 1,
      theme: 'Rééducation pure',
      subtitle: 'Respiration et conscience corporelle uniquement',
      color: '#FFF8E1',
      sessions: [
        S(1,'Lun','breathing',  'Respiration abdominale',         12, ['coordination'],                         1),
        R(2,'Mar'),
        S(3,'Mer','perineum',   'Kegel de base ultra-doux',       10, ['kegel_basic'],                          1),
        R(4,'Jeu'),
        S(5,'Ven','breathing',  'Cohérence cardiaque',            10, ['cardiac_coherence'],                    1),
        R(6,'Sam'),
        R(7,'Dim'),
      ],
    },
    {
      num: 2,
      theme: 'Mobilité & conscience',
      subtitle: 'Mobilise en douceur',
      color: '#FAEBC0',
      sessions: [
        S(1,'Lun','perineum',   'Coordination périnée-respiration',15, ['coordination','kegel_basic'],          1),
        R(2,'Mar'),
        S(3,'Mer','mobility',   'Chat-Vache & hanches',           18, ['cat_cow','hip_stretch'],                1),
        R(4,'Jeu'),
        S(5,'Ven','perineum',   'Kegel progression douce',        15, ['kegel_basic','kegel_endurance'],        1),
        S(6,'Sam','breathing',  'Respiration SENSIA',             12, ['breathing_4462'],                       1),
        R(7,'Dim'),
      ],
    },
    {
      num: 3,
      theme: 'Introduction exercices',
      subtitle: 'Premiers mouvements adaptés',
      color: '#F5DE90',
      sessions: [
        S(1,'Lun','perineum',   'Kegel endurance + vacuum',       18, ['kegel_endurance','vacuum'],             2),
        R(2,'Mar'),
        S(3,'Mer','strength',   'Dead Bug doux',                  15, ['dead_bug'],                             1),
        R(4,'Jeu'),
        S(5,'Ven','strength',   'Abduction couché',               15, ['abduction','kegel_basic'],              1),
        S(6,'Sam','mobility',   'Étirements doux',                15, ['cat_cow','hip_stretch'],                1),
        R(7,'Dim'),
      ],
    },
    {
      num: 4,
      theme: 'Progression adaptée',
      subtitle: 'Renforcement en sécurité',
      color: '#F0D060',
      sessions: [
        S(1,'Lun','full',       'Lower body adapté',              20, ['abduction','lunge'],                    2),
        R(2,'Mar'),
        S(3,'Mer','full',       'Gainage adapté',                 18, ['dead_bug','bird_dog','vacuum'],         2),
        R(4,'Jeu'),
        S(5,'Ven','full',       'Séance bilan semaine 4',         22, ['abduction','dead_bug','kegel_endurance'],2),
        S(6,'Sam','breathing',  'Récupération',                   12, ['cardiac_coherence','coordination'],     1),
        R(7,'Dim'),
      ],
    },
  ],
};

export const PROGRAMS = { postpartum, beginner, intermediate, injured };

export const getProgramForProfile = (profileId) =>
  PROGRAMS[profileId] || PROGRAMS.postpartum;

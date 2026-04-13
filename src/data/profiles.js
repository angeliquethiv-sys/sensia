/* ══════════════════════════════════════════════
   SENSIA v2 — Profils utilisatrices
══════════════════════════════════════════════ */

export const PROFILES = {
  postpartum: {
    id: 'postpartum',
    name: 'Post-partum',
    emoji: '👶',
    color: '#A689C4',
    badge: 'Post-partum',
    welcomeMessage: "Ton corps a accompli quelque chose d'extraordinaire. On y va doucement.",
    welcomeSub: "Chaque jour est une victoire. Ta récupération est unique.",
    heroColor: 'linear-gradient(165deg,#4A3669 0%,#2D1F4A 100%)',
    programWeeks: 12,
    restrictedExercises: [
      'bench_press_bar','push_up_weighted','barbell_row','rdl_barre','hack_squat',
      'bulgarian_split','good_morning','assisted_dips','plank_elbows','plank_hands',
      'side_plank','side_plank_star','hollow_hold','plank_rotation','hypo_crunch',
      'mountain_climber_slow','leg_raise','bear_crawl_static','hip_thrust','hip_thrust_uni',
    ],
    restrictionLabel: '⚠️ Non recommandé avant 6 semaines post-partum',
    affirmations: [
      "Ton corps a porté la vie. Il mérite toute ton attention.",
      "Chaque contraction compte, même la plus petite.",
      "Tu n'entraînes pas seulement ton corps, tu te reconnectes à lui.",
      "La récupération n'est pas une pause, c'est un entraînement à part entière.",
      "Ton périnée a travaillé 9 mois. Aujourd'hui, c'est toi qui travailles pour lui.",
      "Douce avec toi-même comme tu l'es avec ton bébé.",
      "Les plus grands changements viennent des plus petits gestes répétés.",
      "Ton corps sait ce dont il a besoin. Écoute-le.",
      "La force n'est pas l'absence de douleur, c'est ce qu'on fait malgré elle.",
      "Aujourd'hui tu as fait quelque chose pour toi. C'est immense.",
    ],
    weeklyAdvice: [
      { week: 1, title: "Semaine 1-2 : Le repos actif", content: "Respiration diaphragmatique et Kegel doux uniquement. Le corps récupère de l'intérieur. La science montre que ces premiers exercices sont plus importants que vous ne pensez." },
      { week: 3, title: "Semaine 3-4 : Reconnexion", content: "Ajoutez la bascule de bassin et le pont fessier doux. La reconnexion avec les abdominaux profonds commence. Pas encore de gainage classique." },
      { week: 6, title: "Semaine 6-8 : Reprise progressive", content: "Après le feu vert médical, ajoutez progressivement des exercices de bas du corps légers. Écoutez toujours votre corps." },
      { week: 9, title: "Semaine 9-12 : Construction", content: "Progressivité dans les charges. La synchronisation périnée-respiration devient automatique. Le core se reconstruit de l'intérieur vers l'extérieur." },
    ],
    goals: ['Récupération périnéale', 'Sangle abdominale', 'Reprise douce', 'Bien-être général'],
  },

  beginner: {
    id: 'beginner',
    name: 'Débutante en muscu',
    emoji: '🌱',
    color: '#4A9B7F',
    badge: 'Débutante',
    welcomeMessage: "Bienvenue dans ton nouveau mode de vie. On commence par les bases.",
    welcomeSub: "La technique avant tout. Le reste suivra naturellement.",
    heroColor: 'linear-gradient(165deg,#1A4A3A 0%,#0D2E25 100%)',
    programWeeks: 8,
    restrictedExercises: [
      'bench_press_bar','barbell_row','rdl_barre','hack_squat','bulgarian_split',
      'good_morning','push_up_weighted','assisted_dips','hip_thrust_uni',
    ],
    restrictionLabel: '⚡ Technique à maîtriser d\'abord — niveau avancé',
    affirmations: [
      "La technique aujourd'hui, la force demain.",
      "Chaque répétition bien faite vaut 10 mal exécutées.",
      "Bienvenue dans le monde de celles qui s'entraînent intelligemment.",
      "Tu bâtis les fondations d'un corps solide pour la vie.",
      "Le périnée actif dans chaque exercice : ton super-pouvoir caché.",
      "Tu es au bon endroit, au bon moment.",
      "Les débutantes qui apprennent bien deviennent les meilleures.",
      "Chaque séance, tu deviens plus forte, plus sûre, plus toi.",
    ],
    weeklyAdvice: [
      { week: 1, title: "Semaine 1-2 : Les fondamentaux", content: "Squat, fente, pompe. Les mouvements de base qui constituent 80% de l'efficacité. La synchronisation périnée s'apprend dès maintenant." },
      { week: 3, title: "Semaine 3-4 : Ajouter du volume", content: "Les mêmes exercices mais avec plus de séries. La technique doit être parfaite avant d'augmenter la charge." },
      { week: 5, title: "Semaine 5-6 : Premiers défis", content: "Introduction aux exercices avec haltères. La charge légère permet de sentir le mouvement avant de performer." },
      { week: 7, title: "Semaine 7-8 : Consolidation", content: "Votre base est solide. Vous êtes prête pour le niveau intermédiaire dans quelques semaines." },
    ],
    goals: ['Apprendre les bases', 'Développer la force', 'Synchronisation périnée', 'Cardio santé'],
  },

  intermediate: {
    id: 'intermediate',
    name: 'Intermédiaire',
    emoji: '🔥',
    color: '#C4986A',
    badge: 'Intermédiaire',
    welcomeMessage: "Tu sais déjà t'entraîner. On va affiner, protéger et optimiser.",
    welcomeSub: "Les erreurs silencieuses font la différence entre progresser et stagner.",
    heroColor: 'linear-gradient(165deg,#4A3010 0%,#2E1C08 100%)',
    programWeeks: 8,
    restrictedExercises: [],
    restrictionLabel: '',
    affirmations: [
      "Corriger une erreur c'est faire un bond en avant.",
      "La respiration bloquée est l'ennemi silencieux de ta progression.",
      "Chaque rep avec périnée actif est une rep qui compte double.",
      "Tu n'entraînes pas juste tes muscles, tu entraînes ton système.",
      "Les charges augmentent quand la technique est parfaite.",
      "Performance et santé périnéale ne sont pas opposées — elles se renforcent.",
      "Tu es là pour durer. Entraîne-toi en conséquence.",
      "Les pros inspirent avant de descendre et expirent en montant. Toujours.",
    ],
    weeklyAdvice: [
      { week: 1, title: "Focus : L'audit respiratoire", content: "Cette semaine, concentre-toi uniquement sur ta respiration. Bloque-tu ? Pousse-tu vers le bas sous charge ? La ceinture te dira la vérité." },
      { week: 3, title: "Focus : Charges lourdes et périnée", content: "Les charges lourdes exigent une synchronisation parfaite. Hip thrust, squat, deadlift : timing de contraction pour chaque mouvement." },
      { week: 5, title: "Focus : Défis avancés", content: "30 jours hip thrust parfait. 14 jours sans blocage respiratoire. Tes records personnels avec technique parfaite." },
      { week: 7, title: "Focus : Optimisation", content: "Tu as intégré les bases avancées. Place aux records personnels avec une technique irréprochable." },
    ],
    goals: ['Technique parfaite', 'Charges maximales', 'Périnée sous charge', 'Records personnels'],
  },

  injured: {
    id: 'injured',
    name: 'Déjà touchée',
    emoji: '💙',
    color: '#8BA7FF',
    badge: 'Rééducation',
    welcomeMessage: "Tu n'es pas seule. Des milliers de femmes vivent la même chose. On va réparer ensemble.",
    welcomeSub: "La douceur est une force. Chaque progrès, même minime, compte.",
    heroColor: 'linear-gradient(165deg,#1A2A4A 0%,#0D1929 100%)',
    programWeeks: 12,
    restrictedExercises: [
      'bench_press_bar','barbell_row','rdl_barre','hack_squat','bulgarian_split',
      'good_morning','push_up_weighted','assisted_dips','mountain_climber_slow',
      'plank_elbows','plank_hands','side_plank','side_plank_star','hollow_hold',
      'plank_rotation','hypo_crunch','leg_raise','bear_crawl_static',
      'hip_thrust','hip_thrust_uni','squat_barre','squat_sumo_barre',
    ],
    restrictionLabel: '💙 Déconseillé — consulte un·e kiné périnéal·e d\'abord',
    affirmations: [
      "Ton corps n'est pas cassé. Il a juste besoin d'attention.",
      "La rééducation est un cadeau que tu fais à ton futur corps.",
      "Chaque séance douce est un acte d'amour envers toi-même.",
      "Tu n'es pas seule dans ce chemin. Vous êtes des milliers.",
      "Le progrès se mesure en semaines et mois, pas en jours.",
      "La patience d'aujourd'hui est la force de demain.",
      "Écoute ton corps. Il te parle, apprends son langage.",
      "Demander de l'aide est le premier acte de guérison.",
    ],
    weeklyAdvice: [
      { week: 1, title: "Phase 1 : Connexion douce", content: "Uniquement respiration et Kegel très doux. L'objectif est de prendre conscience du périnée sans le forcer. Consulte un·e kiné périnéal·e si tu ne l'as pas encore fait." },
      { week: 3, title: "Phase 1 : Approfondissement", content: "Relâchement périnéal — aussi important que la contraction. Si tu ressens des fuites ou douleurs pendant l'exercice, arrête et consulte." },
      { week: 6, title: "Phase 2 : Progression douce", content: "Exercices au sol progressifs. Bascule de bassin, pont fessier doux. La ceinture guide chaque mouvement." },
      { week: 9, title: "Phase 3 : Construction", content: "Si les symptômes ont diminué, introduction progressive de nouveaux exercices. Toujours avec l'accord de ton professionnel de santé." },
    ],
    goals: ['Rééducation périnéale', 'Réduire les symptômes', 'Renforcement doux', 'Qualité de vie'],
    symptomJournal: true,
    medicalAlerts: [
      "Si tu ressens des fuites pendant l'exercice, arrête et note-le.",
      "Des douleurs pelviennes inhabituelles nécessitent une consultation.",
      "Une pression vers le bas persistante peut indiquer un prolapsus.",
    ],
  },
};

export const DAILY_AFFIRMATIONS = [
  "Ton corps a porté la vie. Il mérite toute ton attention.",
  "Chaque contraction compte, même la plus petite.",
  "Tu n'entraînes pas seulement ton corps, tu te reconnectes à lui.",
  "La régularité bat l'intensité, toujours.",
  "Prendre soin de son périnée, c'est prendre soin de sa vie entière.",
  "Inspire et laisse partir ce qui ne te sert plus.",
  "Ton corps est plus fort que tu ne le penses.",
  "La douceur n'est pas une faiblesse, c'est une sagesse.",
  "Chaque séance te rapproche de la femme que tu deviens.",
  "Tu mérites de te sentir bien dans ton corps.",
  "Le progrès n'est pas toujours visible, mais il est toujours réel.",
  "Ton périnée te remerciera dans 20 ans.",
  "Commence là où tu en es. C'est le seul endroit où l'on peut commencer.",
  "L'excellence n'est pas la perfection, c'est la progression.",
  "Respire. Tout commence par là.",
];

export const BADGES = [
  { id:'first_session',  name:'Première séance',       emoji:'🌟', desc:'Tu as commencé ton voyage SENSIA',           condition:'sessions >= 1' },
  { id:'week_1',         name:'7 jours de suite',       emoji:'🔥', desc:'7 jours consécutifs d\'entraînement',       condition:'streak >= 7' },
  { id:'month_1',        name:'Un mois de régularité',  emoji:'🏆', desc:'30 séances complétées',                     condition:'sessions >= 30' },
  { id:'kegel_master',   name:'Maîtresse Kegel',        emoji:'💜', desc:'50 séances de périnée complétées',         condition:'perineum_sessions >= 50' },
  { id:'breath_master',  name:'Maîtresse Respiration',  emoji:'🌬️', desc:'20 séances de respiration',               condition:'breathing_sessions >= 20' },
  { id:'vacuum_start',   name:'Première vacuum',        emoji:'🌀', desc:'Premier stomach vacuum réussi',            condition:'vacuum_sessions >= 1' },
  { id:'streak_14',      name:'14 jours de feu',        emoji:'⚡', desc:'14 jours consécutifs',                     condition:'streak >= 14' },
  { id:'streak_30',      name:'30 jours invincible',    emoji:'💎', desc:'30 jours consécutifs',                     condition:'streak >= 30' },
  { id:'score_50',       name:'Score 50',               emoji:'🎯', desc:'Score SENSIA de 50 atteint',               condition:'score >= 50' },
  { id:'score_80',       name:'Score 80',               emoji:'🌈', desc:'Score SENSIA de 80 atteint',               condition:'score >= 80' },
];

export const CHALLENGES = [
  { id:'7days_breath',   name:'7 jours de respiration',      emoji:'🌬️', duration:7,  desc:'7 jours consécutifs de séance respiration' },
  { id:'14days_noapnea', name:'14 jours sans blocage',       emoji:'💨',  duration:14, desc:'14 jours avec respiration fluide certifiée' },
  { id:'30days_hip',     name:'30 jours Hip Thrust parfait', emoji:'🍑',  duration:30, desc:'Hip thrust avec périnée engagé 30 jours' },
  { id:'21days_vacuum',  name:'21 jours de vacuum matin',    emoji:'🌀',  duration:21, desc:'Vacuum abdominal chaque matin pendant 21 jours' },
  { id:'7days_kegel',    name:'7 jours Kegel',               emoji:'💜',  duration:7,  desc:'7 séances périnée consécutives' },
];

export const getProfile = (profileId) => PROFILES[profileId] || PROFILES.postpartum;

export const getDailyAffirmation = (profileId) => {
  const profile = PROFILES[profileId];
  const affs = profile?.affirmations || DAILY_AFFIRMATIONS;
  const dayIdx = Math.floor(Date.now() / 86400000) % affs.length;
  return affs[dayIdx];
};

export const isExerciseRestricted = (exerciseId, profileId) => {
  const profile = PROFILES[profileId];
  if (!profile) return false;
  return profile.restrictedExercises.includes(exerciseId);
};

import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { useProfile } from '../context/ProfileContext';

const MODULES = [
  {
    id: 'perineum_basics',
    emoji: '💜',
    title: 'Le périnée, c\'est quoi ?',
    subtitle: 'Anatomie & rôle essentiel',
    duration: '3 min',
    color: '#7B5EA7',
    bg: '#EDE6F4',
    tag: 'Fondamentaux',
    content: {
      intro: "Le périnée est un groupe de muscles en forme de losange qui ferme le bas du bassin. Souvent ignoré, il joue un rôle central dans ta santé, ta posture et ta performance sportive.",
      sections: [
        {
          title: "📍 Où est-il ?",
          text: "Imagine un hamac musculaire tendu entre ton pubis à l'avant, ton coccyx à l'arrière et tes ischions sur les côtés. Ce hamac soutient la vessie, l'utérus et le rectum.",
        },
        {
          title: "🎯 Ses rôles",
          text: "1. Support des organes pelviens\n2. Contrôle sphinctérien (urine, gaz, selles)\n3. Stabilisation du bassin et du dos\n4. Fonction sexuelle\n5. Absorption des chocs lors de la course",
        },
        {
          title: "⚠️ Pourquoi se fragilise-t-il ?",
          text: "Grossesse (9 mois de pression), accouchement, hormones, sports à impact (course, saut), mauvaise respiration chronique, toux chronique, surpoids.",
        },
        {
          title: "✅ Comment le sentir",
          text: "Imagine que tu essaies de retenir les urines ou un gaz — ce sont tes muscles périnéaux qui travaillent. Entraîne-toi allongée d'abord, puis assise, puis debout.",
        },
        {
          title: "🔬 Ce que dit la science",
          text: "Une étude de 2023 (BJOG) montre que 1 femme sur 3 présente une dysfonction du plancher pelvien. La rééducation précoce réduit le risque de 70%.",
        },
      ],
      keyPoints: ['Le périnée se contracte ET se relâche', 'Le relâchement est aussi important que la contraction', 'Intégrable dans TOUS les exercices sportifs'],
    },
  },
  {
    id: 'breathing_pressure',
    emoji: '🫁',
    title: 'Respiration & pressions',
    subtitle: 'Pourquoi bloquer est dangereux',
    duration: '3 min',
    color: '#8BA7FF',
    bg: '#EEF2FF',
    tag: 'Respiration',
    content: {
      intro: "Bloquer sa respiration pendant l'effort est l'erreur la plus commune et la plus dangereuse pour le plancher pelvien. Voici pourquoi — et comment faire autrement.",
      sections: [
        {
          title: "🔴 Le problème de la manœuvre de Valsalva",
          text: "Quand tu bloques ta respiration en poussant (Valsalva), la pression intra-abdominale monte brutalement et pousse vers le bas sur le périnée. Sur le long terme : affaiblissement, fuites, prolapsus.",
        },
        {
          title: "🔄 La mécanique inspire/expire/périnée",
          text: "INSPIRE → diaphragme descend → périnée descend (il se relâche)\nEXPIRE → diaphragme remonte → périnée remonte (il se contracte)\nCette coordination est naturelle — il faut juste la rééduquer.",
        },
        {
          title: "💪 Application en musculation",
          text: "Pour un squat : inspire en descendant, expire en montant (l'effort). Pour un hip thrust : inspire en bas, expire en poussant les hanches vers le haut. Règle universelle : expire à l'effort.",
        },
        {
          title: "❌ Les 3 erreurs les plus communes",
          text: "1. Bloquer en montant une charge lourde\n2. Expire trop fort (poussée brutale vers le bas)\n3. Dissocier la respiration du mouvement",
        },
      ],
      keyPoints: ['Expire toujours à l\'effort', 'Le périnée remonte avec l\'expiration', 'La ceinture SENSIA détecte les blocages'],
    },
  },
  {
    id: 'core_anatomy',
    emoji: '🔥',
    title: 'La sangle abdominale',
    subtitle: 'Transverse, diastasis & gainage',
    duration: '3 min',
    color: '#F0B429',
    bg: '#FFF8E1',
    tag: 'Gainage',
    content: {
      intro: "Tous les abdos ne sont pas égaux. Comprendre le transverse change tout — surtout après la grossesse.",
      sections: [
        {
          title: "🏗️ Transverse vs droits abdominaux",
          text: "Le TRANSVERSE est le muscle profond — il s'enroule comme une ceinture, stabilise la colonne et comprime les organes vers l'intérieur. Les DROITS (le 6-pack) sont superficiels — ils fléchissent le tronc.",
        },
        {
          title: "🚫 Pourquoi les crunchs classiques sont contre-indiqués post-partum",
          text: "Les crunchs activent les droits et augmentent la pression intra-abdominale. Post-partum, avec un diastasis potentiel et un périnée fragilisé, c'est contre-productif et peut aggraver la situation.",
        },
        {
          title: "🌬️ Le gainage hypopressif",
          text: "Technique qui vide les poumons et aspire le ventre sous les côtes. La pression abdominale BAISSE. Le plancher pelvien remonte naturellement. À l'inverse des crunchs qui poussent vers le bas.",
        },
        {
          title: "📅 Quand reprendre les abdos",
          text: "Post-partum : Dead bug et Bird dog dès J15. Planche sur genoux après 6 semaines (feu vert médical). Crunchs classiques : seulement si pas de diastasis, après 3 mois minimum.",
        },
      ],
      keyPoints: ['Transverse d\'abord, droits après', 'Gainage > crunchs pour le post-partum', 'Stomach vacuum = réduction de taille ET santé périnéale'],
    },
  },
  {
    id: 'muscu_perineum',
    emoji: '💪',
    title: 'Musculation & périnée',
    subtitle: 'Ce que personne ne t\'a appris',
    duration: '4 min',
    color: '#00C4B0',
    bg: '#E0FBF8',
    tag: 'Musculation',
    content: {
      intro: "Tu t'entraînes depuis des mois ou des années sans avoir intégré le périnée ? Ce module va changer ta façon de t'entraîner pour toujours.",
      sections: [
        {
          title: "🎯 Le timing de contraction",
          text: "SQUAT : inspire en descendant (périnée relâché), expire en remontant (périnée qui remonte)\nHIP THRUST : inspire en bas (périnée relâché), expire en poussant (périnée actif), squeeze en haut\nDEADLIFT : inspire avant, brace (pas Valsalva), expire en montant",
        },
        {
          title: "⚠️ Les charges lourdes et le plancher pelvien",
          text: "Au-delà de 60-70% du max, la pression est significative sur le périnée. Sans coordination respiratoire parfaite, les charges lourdes répétées fragilisent progressivement le plancher pelvien.",
        },
        {
          title: "✅ Checklist avant une séance de muscu",
          text: "1. Warmup périnée (10 Kegel doux)\n2. Respiration diaphragmatique 2 min\n3. Activation transverse (bird dog ou dead bug)\n4. Rappel : expire à l'effort\n5. Ceinture SENSIA connectée",
        },
        {
          title: "🏆 La bonne nouvelle",
          text: "Les femmes qui intègrent le périnée dans leur musculation rapportent : meilleure performance, moins de fuites, meilleure posture, et des fessiers plus engagés sur le hip thrust !",
        },
      ],
      keyPoints: ['Expire à l\'effort — toujours', 'Kegel avant la séance', 'La ceinture détecte les erreurs en temps réel'],
    },
  },
  {
    id: 'postpartum_truth',
    emoji: '👶',
    title: 'Post-partum : la vérité',
    subtitle: 'Ce que personne ne dit',
    duration: '4 min',
    color: '#A689C4',
    bg: '#F0EDF8',
    tag: 'Post-partum',
    content: {
      intro: "L'accouchement est un événement traumatique pour le corps — même quand il se passe bien. Ce module te donne les vraies informations sur la récupération.",
      sections: [
        {
          title: "🤰 Ce qui se passe pendant l'accouchement",
          text: "Le périnée peut s'étirer jusqu'à 3× sa longueur normale. Les muscles, nerfs et fascias sont étirés, parfois déchirés. La récupération complète prend 6 à 12 mois — pas 6 semaines.",
        },
        {
          title: "📅 La récupération semaine par semaine",
          text: "J0-J15 : repos total, Kegel très doux si pas de douleur\nS2-S6 : respiration, bascule de bassin, pont doux\nS6 : bilan médical AVANT de reprendre le sport\nS6-S12 : reprise progressive AVEC rééducation périnéale",
        },
        {
          title: "⏰ Quand reprendre le sport VRAIMENT",
          text: "Marche légère : 2-4 semaines\nYoga doux, natation : après 6 semaines (feu vert médical)\nMuscu légère : 8-12 semaines\nCourse à pied, HIIT : 12 semaines MINIMUM (après bilan périnéal)\nCertaines femmes attendent 6 mois — c'est normal et sage.",
        },
        {
          title: "🚨 Signaux d'alarme",
          text: "Fuites urinaires pendant l'effort → consultation kiné\nPression vers le bas → bilan prolapsus\nDouleurs lors des rapports → consultation\nDouleurs au périnée à l'effort → arrêt immédiat",
        },
      ],
      keyPoints: ['6 semaines = début, pas fin', 'Rééducation périnéale AVANT reprise sportive', 'Les signaux d\'alarme ne doivent jamais être ignorés'],
    },
  },
  {
    id: 'vacuum_technique',
    emoji: '🌀',
    title: 'Stomach Vacuum : la technique',
    subtitle: 'Guide complet + programme 30 jours',
    duration: '3 min',
    color: '#7B5EA7',
    bg: '#EDE6F4',
    tag: 'Vacuum',
    content: {
      intro: "Le stomach vacuum est l'exercice de taille le plus efficace qui existe. Pratiqué le matin à jeun, il transforme la silhouette en 21 jours.",
      sections: [
        {
          title: "📖 Origine & bienfaits",
          text: "Technique des bodybuilders des années 70 (Arnold Schwarzenegger). Cible le transverse (muscle profond), réduit le tour de taille, améliore la posture, renforce le plancher pelvien.",
        },
        {
          title: "🎯 Technique pas à pas",
          text: "1. Expire TOUT l'air (poumons complètement vides)\n2. Sans inspirer, rentre le ventre vers l'intérieur et vers le haut\n3. Comme si tu voulais toucher ta colonne avec ton nombril\n4. Maintiens 5-20 secondes en apnée\n5. Relâche en inspirant doucement",
        },
        {
          title: "❌ Erreurs courantes",
          text: "Contracter les fessiers (mouvement isolé au ventre)\nPousser le périnée vers le bas (neutre)\nForcer trop tôt (progressive)\nFaire après le repas (à jeun seulement)",
        },
        {
          title: "📅 Programme progressif 30 jours",
          text: "J1-J7 : 3× 5 secondes, 3 fois/jour\nJ8-J14 : 3× 10 secondes, 2 fois/jour\nJ15-J21 : 3× 15 secondes, matin\nJ22-J30 : 3× 20 secondes, matin à jeun",
        },
      ],
      keyPoints: ['À jeun le matin pour les meilleurs résultats', 'Progrès visibles à 21 jours', 'Contre-indiqué pendant la grossesse'],
    },
  },
  {
    id: 'pelvic_issues',
    emoji: '💙',
    title: 'Fuites, prolapsus, douleurs',
    subtitle: 'Comprendre et ne plus souffrir en silence',
    duration: '4 min',
    color: '#8BA7FF',
    bg: '#EEF2FF',
    tag: 'Santé',
    content: {
      intro: "1 femme sur 3 vit avec des troubles pelviens. Le silence et la honte empêchent de chercher de l'aide. Ce module dédramatise et donne les clés pour agir.",
      sections: [
        {
          title: "💧 Les fuites urinaires",
          text: "Fuites à l'effort (toux, éternuement, course) : périnée qui ne tient plus les chocs → rééducation efficace à 80%\nFuites par urgence (envie soudaine) : hyperactivité vésicale → rééducation + techniques comportementales",
        },
        {
          title: "🫘 Les prolapsus",
          text: "Descente d'organe(s) pelvien(s) en raison d'un manque de soutien. Ressenti comme 'quelque chose qui descend'. Trois grades de sévérité. Rééducation efficace aux grades 1 et 2. La chirurgie reste une option si nécessaire.",
        },
        {
          title: "🔴 Ce qui aide",
          text: "Rééducation périnéale avec kiné spécialisée (remboursée)\nExercices adaptés (Kegel, relâchement)\nGestion des pressions (respiration, pas de poussée)\nRéduction de la constipation (facteur aggravant)",
        },
        {
          title: "⚕️ Quand consulter absolument",
          text: "Fuites qui impactent la qualité de vie\nSensation de pression pelvienne permanente\nDouleurs lors des rapports sexuels\nDéclenchement de symptômes à l'effort",
        },
      ],
      keyPoints: ['Tu n\'es pas seule', 'La rééducation est efficace et remboursée', 'Consulter un·e kiné périnéal·e : premier acte de guérison'],
    },
  },
  {
    id: 'cycle_sport',
    emoji: '🌙',
    title: 'Cycle menstruel & sport',
    subtitle: 'Entraîne-toi selon ton cycle',
    duration: '3 min',
    color: '#3DD68C',
    bg: '#E6FBF3',
    tag: 'Cycle',
    content: {
      intro: "Ton cycle est un super-pouvoir ignoré. Les 4 phases du cycle hormonal influencent directement tes performances, ta récupération et ton énergie.",
      sections: [
        {
          title: "🌱 Phase folliculaire (J1-J14) : Construction",
          text: "Estrogènes en hausse → énergie maximale → force au top\nIdéal pour : charges lourdes, HIIT, records personnels\nTon périnée est plus tonique — profites-en !",
        },
        {
          title: "🌕 Phase ovulatoire (J12-J16) : Pic",
          text: "Pic d'estrogènes → force maximale, coordination au top\nMais attention : laxité ligamentaire augmentée (risque blessure)\nIdéal pour : performance max mais technique parfaite",
        },
        {
          title: "🍂 Phase lutéale (J15-J28) : Récupération",
          text: "Progestérone monte → fatigue, eau retenue\nLe corps récupère mieux (anabolisme nocturne)\nIdéal pour : volume modéré, yoga, respiration, Kegel",
        },
        {
          title: "🌊 Phase menstruelle (J1-J5) : Douceur",
          text: "Hormones basses → fatigue normale → écoute ton corps\nCrampes : respiration anti-douleur (box breathing 4s)\nIdéal pour : marche, yoga doux, étirements, Kegel très doux",
        },
      ],
      keyPoints: ['Phase folliculaire = force maximale', 'Phase menstruelle = douceur obligatoire', 'SENSIA adapte automatiquement avec le mode cycle activé'],
    },
  },
  {
    id: 'muscu_basics',
    emoji: '🌱',
    title: 'Les bases de la muscu féminine',
    subtitle: 'Mythes, nutrition, progression',
    duration: '4 min',
    color: '#4A9B7F',
    bg: '#E0F2EC',
    tag: 'Débutante',
    content: {
      intro: "Des mythes tenaces entourent la musculation féminine. Voici ce que dit vraiment la science — et comment progresser intelligemment dès le début.",
      sections: [
        {
          title: "🚫 Mythes vs Réalités",
          text: "MYTHE : \"La musculation rend les femmes masculines\" → FAUX. Les femmes ont 15x moins de testostérone. La muscu donne un corps tonique et fort, pas masculin.\n\nMYTHE : \"Les poids légers tonifient, les lourds font grossir\" → FAUX. La tonicité = muscle développé. Pour développer, il faut progresser en charge.\n\nVRAI : La musculation protège le périnée à long terme si bien pratiquée — stabilité du bassin, meilleure coordination.",
        },
        {
          title: "🥗 Nutrition pour la muscu",
          text: "PROTÉINES : 1.6 à 2g par kg de poids de corps par jour. Sources : œufs, poulet, poisson, légumineuses, tofu.\n\nRÉCUPÉRATION : repas protéiné dans les 2h post-séance. Le muscle se construit pendant le repos, pas pendant l'entraînement.\n\nHYDRATATION : 2-3L d'eau par jour. La déshydratation réduit la force de 10%.",
        },
        {
          title: "📈 Plan de progression 8 semaines",
          text: "Semaines 1-2 : Corps au poids uniquement. Squat, fente, pompe, pont fessier. Focus : technique parfaite.\n\nSemaines 3-4 : Haltères légers (2-5 kg). Mêmes mouvements + curl, élévations. Ajouter 1 série par semaine.\n\nSemaines 5-6 : Haltères moyens (5-10 kg). Introduire hip thrust avec haltère, rowing penché.\n\nSemaines 7-8 : Barre pour squat et deadlift (10-20 kg). Tu es prête pour le niveau intermédiaire.",
        },
        {
          title: "😴 Récupération et sommeil",
          text: "Le muscle se construit pendant le sommeil (phases de sommeil profond = pic de GH). 7-9h par nuit minimum.\n\nÉtirements post-séance : 5-10 min. Réduisent les courbatures, maintiennent la souplesse, détendent le périnée.\n\nJours de repos : au moins 1-2 jours entre deux séances du même groupe musculaire.",
        },
      ],
      keyPoints: ['La muscu ne masculinise pas — elle sculpte', 'Protéines + sommeil = progression garantie', 'Technique d\'abord, charges après'],
    },
  },
  {
    id: 'prolapse_leaks',
    emoji: '💙',
    title: 'Comprendre fuites, prolapsus, douleurs',
    subtitle: 'Sans tabou, sans dramatiser',
    duration: '5 min',
    color: '#E8A0B8',
    bg: '#FBEAF0',
    tag: 'Rééducation',
    content: {
      intro: "1 femme sur 3 est concernée par des dysfonctions pelviennes. Ce n'est pas une fatalité. C'est une condition médicale traitable. Voici ce que tu as besoin de savoir.",
      sections: [
        {
          title: "💙 Tu n'es pas seule",
          text: "33% des femmes souffrent de fuites urinaires. 50% des femmes ayant accouché présentent un prolapsus (même léger). Pourtant 80% n'en parlent jamais à leur médecin, par honte ou ignorance.\n\nCes chiffres te montrent que ce n'est pas un problème rare ou anormal — c'est une condition médicale comme une autre, qui se traite.",
        },
        {
          title: "📖 Le prolapsus expliqué simplement",
          text: "Quand les muscles du périnée s'affaiblissent, les organes pelviens (vessie, utérus, rectum) peuvent descendre légèrement dans le vagin.\n\nLes symptômes typiques : sensation de boule ou de pression vers le bas, fuites, inconfort lors des rapports.\n\nLe prolapsus est classé en 4 stades. Les stades 1 et 2 (les plus fréquents) se traitent très bien avec la rééducation.",
        },
        {
          title: "✅ Ce qui aide vs ❌ ce qui aggrave",
          text: "AIDE : Rééducation périnéale avec kiné spécialisée · Exercices de relâchement · Gestion des pressions intra-abdominales · Traiter la constipation · Activités sans impact (natation, yoga, marche)\n\nAGGRAVE : Pousser vers le bas lors de l'effort · Apnée sous charge · Abdominaux hyperpressifs (crunchs) · Surpoids · Toux chronique non traitée",
        },
        {
          title: "⚕️ Les traitements qui existent",
          text: "1. Kinésithérapie périnéale : remboursée 100% par la Sécu (8 séances en post-partum, plus si nécessaire). Traitement de première intention, efficace à 70%.\n\n2. Pessaires : dispositif médical inséré dans le vagin pour soutenir les organes. Très efficace pour maintenir une activité physique.\n\n3. Chirurgie : dernier recours, seulement pour les stades avancés. Les techniques actuelles ont de très bons résultats.",
        },
        {
          title: "🌟 Elles ont récupéré",
          text: "\"Après mon 2e accouchement, je fuyais en riant ou en toussant. 6 mois de kiné périnéale et je cours un 10km sans problème.\" — Marine, 34 ans\n\n\"Mon prolapsus stade 2 s'est complètement stabilisé avec la rééducation et les exercices SENSIA. Je n'ai plus aucun symptôme.\" — Camille, 41 ans\n\n\"J'ai mis 2 ans à en parler à mon médecin. La honte m'a retardée. Ne faites pas comme moi.\" — Isabelle, 52 ans",
        },
      ],
      keyPoints: ['La rééducation est efficace et remboursée', 'Parler à un professionnel : acte de courage, pas de faiblesse', 'Ces problèmes se traitent — tu n\'as pas à subir'],
    },
  },
  {
    id: 'belt_v2',
    emoji: '⌚',
    title: 'Comprendre ma ceinture SENSIA',
    subtitle: 'Zones, LED et vibrations expliquées',
    duration: '4 min',
    color: '#9B8DC8',
    bg: '#EDE6F4',
    tag: 'Ceinture',
    content: {
      intro: "La ceinture SENSIA est un compagnon intelligent qui lit ton corps en temps réel. Voici comment elle fonctionne et pourquoi chaque zone, couleur et vibration a été pensée pour toi.",
      sections: [
        {
          title: "🗺️ Les 4 zones et leur rôle",
          text: "ZONE CENTRALE (violet) : placée sur ton nombril, elle mesure l'engagement de ta sangle abdominale profonde (transverse). Elle s'allume en violet quand tu gainas bien.\n\nZONES LATÉRALES (bleu) : elles encadrent tes côtes et mesurent l'expansion thoracique. Bleues à l'inspiration — elles te guident vers une respiration diaphragmatique.\n\nZONE BASSE (vert/orange) : en V sous le nombril, elle détecte la pression périnéale. Verte = relâchement correct. Orange = attention, pression trop forte.\n\nZONE DORSALE (orange) : au dos, elle surveille les tensions lombaires. Elle t'alerte si tu te cambre ou si tu perds la posture neutre.",
        },
        {
          title: "💡 La lumière diffuse — esthétique ET fonctionnelle",
          text: "Les LED de la ceinture utilisent une technologie de diffusion douce qui crée un halo lumineux subtil plutôt qu'une lumière crue.\n\nPourquoi ? Pour que le feedback lumineux soit perçu en vision périphérique sans te distraire de ton exercice. Tu vois la couleur sans regarder la ceinture.\n\nChaque zone est indépendante — tu peux savoir d'un coup d'œil si la respiration (côtés), le gainage (centre) ou le périnée (bas) est en phase.",
        },
        {
          title: "📳 Les vibrations localisées",
          text: "Contrairement à un téléphone qui vibre dans ta main, la ceinture vibre dans la zone concernée :\n\n1 vibration courte côté = Commence à inspirer\n2 vibrations côté = Commence à expirer\n1 vibration longue centre = Bravo, bon gainage détecté\nVibration forte répétée = Erreur — corrige ta position immédiatement\n\nCes vibrations permettent un feedback sans bruit et sans regarder un écran.",
        },
        {
          title: "🎓 Comment apprendre avec la ceinture",
          text: "Semaine 1 : concentre-toi uniquement sur les LED bleues (respiration). Ignore les autres.\n\nSemaine 2 : ajoute les LED violettes (gainage). L'objectif : bleu + violet ensemble.\n\nSemaine 3 : intègre les LED vertes (périnée). Le graal : les 3 couleurs actives en même temps = synchronisation parfaite.\n\nUtilise le Mode Découverte (/belt-discovery) pour t'entraîner sans pression, avec un guidage audio.",
        },
      ],
      keyPoints: ['4 zones = 4 informations simultanées', 'LED diffuse = visible en vision périphérique', 'Vibrations localisées = feedback sans distraction'],
    },
  },
];

const TAG_COLORS = {
  'Fondamentaux': { bg:'#EDE6F4', color:'#7B5EA7' },
  'Ceinture':     { bg:'#EDE6F4', color:'#9B8DC8' },
  'Respiration':  { bg:'#EEF2FF', color:'#8BA7FF' },
  'Gainage':      { bg:'#FFF8E1', color:'#C4986A' },
  'Musculation':  { bg:'#E0FBF8', color:'#00C4B0' },
  'Post-partum':  { bg:'#F0EDF8', color:'#A689C4' },
  'Vacuum':       { bg:'#EDE6F4', color:'#7B5EA7' },
  'Santé':        { bg:'#EEF2FF', color:'#8BA7FF' },
  'Cycle':        { bg:'#E6FBF3', color:'#3DD68C' },
  'Débutante':    { bg:'#E0F2EC', color:'#4A9B7F' },
  'Rééducation':  { bg:'#FBEAF0', color:'#E8A0B8' },
};

// Modules recommandés par profil
const PROFILE_MODULES = {
  postpartum:   ['postpartum_truth', 'perineum_basics', 'belt_v2'],
  beginner:     ['muscu_basics', 'breathing_pressure', 'belt_v2'],
  intermediate: ['muscu_perineum', 'breathing_pressure', 'belt_v2'],
  injured:      ['prolapse_leaks', 'perineum_basics', 'belt_v2'],
};

const PROFILE_MODULE_LABEL = {
  postpartum:   { label: 'Post-partum', color: '#4A9B7F', bg: '#E0F2EC', emoji: '👶' },
  beginner:     { label: 'Débutante',   color: '#A689C4', bg: '#EDE6F4', emoji: '🌱' },
  intermediate: { label: 'Intermédiaire', color: '#C4986A', bg: '#F5EDE2', emoji: '🔥' },
  injured:      { label: 'Rééducation', color: '#E8A0B8', bg: '#FBEAF0', emoji: '💙' },
};

export default function LearnScreen() {
  const [selectedModule, setSelectedModule] = useState(null);
  const { profileId } = useProfile();

  const recommendedIds = PROFILE_MODULES[profileId] || PROFILE_MODULES.postpartum;
  const recommendedModules = recommendedIds.map(id => MODULES.find(m => m.id === id)).filter(Boolean);
  const profileMeta = PROFILE_MODULE_LABEL[profileId] || PROFILE_MODULE_LABEL.postpartum;

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={() => setSelectedModule(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        padding: '52px 20px 20px',
        background: 'linear-gradient(175deg,#F0EDF8 0%,#F3EDE5 100%)',
        position: 'sticky', top: 0, zIndex: 50,
        boxShadow: '0 1px 0 rgba(155,141,200,.12)',
      }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 30, color: '#2C2118', fontWeight: 400, marginBottom: 4 }}>
          Apprendre
        </h1>
        <p style={{ fontSize: 14, color: '#9C8A78' }}>{MODULES.length} modules · ~35 min au total</p>
      </div>

      {/* ── Pour toi : modules recommandés par profil ── */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 16 }}>{profileMeta.emoji}</span>
          <p style={{ fontSize: 11, fontWeight: 700, color: profileMeta.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Pour toi — {profileMeta.label}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, marginBottom: 16, scrollbarWidth: 'none' }}>
          {recommendedModules.map(mod => {
            const tagStyle = TAG_COLORS[mod.tag] || { bg:'#EDE6F4', color:'#7B5EA7' };
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                style={{
                  flexShrink: 0, width: 160,
                  background: '#FDFBF8', borderRadius: 18, cursor: 'pointer',
                  border: `2px solid ${profileMeta.color}40`,
                  boxShadow: `0 4px 16px ${profileMeta.color}20`,
                  padding: '14px 14px 12px',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{mod.emoji}</div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#2C2118', lineHeight: 1.3, marginBottom: 6 }}>{mod.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: tagStyle.color, background: tagStyle.bg, borderRadius: 50, padding: '2px 8px', fontWeight: 700 }}>{mod.tag}</span>
                  <span style={{ fontSize: 10, color: '#9C8A78' }}>{mod.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured module */}
      <div style={{ padding: '0 16px 0' }}>
        <div
          onClick={() => setSelectedModule(MODULES[0])}
          style={{
            borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
            background: 'linear-gradient(135deg,#4A3669,#7B5EA7)',
            marginBottom: 16, position: 'relative',
            boxShadow: '0 8px 32px rgba(74,54,105,.3)',
          }}
        >
          <div style={{ padding: '22px 20px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{MODULES[0].emoji}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(196,152,106,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
              MODULE ESSENTIEL
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, color: '#fff', fontWeight: 400, marginBottom: 6, lineHeight: 1.2 }}>
              {MODULES[0].title}
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 14 }}>{MODULES[0].subtitle}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>⏱ {MODULES[0].duration}</span>
              <div style={{
                padding: '7px 18px', borderRadius: 50,
                background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.25)',
                fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer',
              }}>
                Lire →
              </div>
            </div>
          </div>
        </div>

        {/* Module grid */}
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9C8A78', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          Tous les modules
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MODULES.slice(1).map(mod => {
            const tagStyle = TAG_COLORS[mod.tag] || { bg:'#EDE6F4', color:'#7B5EA7' };
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                style={{
                  background: '#FDFBF8', borderRadius: 20, cursor: 'pointer',
                  border: '1.5px solid rgba(196,152,106,.15)',
                  boxShadow: '0 2px 12px rgba(44,33,24,.06)',
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                  transition: 'transform .15s, box-shadow .15s',
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(.99)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(.99)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Emoji icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: mod.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {mod.emoji}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                      color: tagStyle.color, background: tagStyle.bg,
                      borderRadius: 50, padding: '2px 8px',
                    }}>
                      {mod.tag}
                    </span>
                    <span style={{ fontSize: 11, color: '#9C8A78' }}>⏱ {mod.duration}</span>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#2C2118', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {mod.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#9C8A78', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {mod.subtitle}
                  </div>
                </div>
                <div style={{ fontSize: 18, color: '#BEB8D0', flexShrink: 0 }}>›</div>
              </div>
            );
          })}
        </div>

        {/* Bottom tip */}
        <div style={{
          background: 'linear-gradient(135deg,#4A3669,#2D1F4A)',
          borderRadius: 20, padding: '16px 18px', marginTop: 18,
          boxShadow: '0 8px 26px rgba(45,31,74,.25)',
        }}>
          <p style={{ fontSize: 10, color: 'rgba(196,152,106,.9)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
            💡 Le saviez-vous ?
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.6 }}>
            Les modules SENSIA sont mis à jour chaque mois avec les dernières études scientifiques sur la santé périnéale féminine.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

/* ── Module Detail ── */
function ModuleDetail({ module: mod, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F3EDE5', paddingBottom: 40, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(165deg,${mod.color} 0%,${mod.color}CC 100%)`,
        padding: '52px 20px 28px',
        position: 'relative',
      }}>
        <button
          onClick={onBack}
          style={{ background: 'rgba(255,255,255,.2)', border: 'none', borderRadius: 50, padding: '8px 16px', color: '#fff', fontSize: 13, cursor: 'pointer', marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}
        >
          ← Retour
        </button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{mod.emoji}</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.7)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>
          {mod.tag} · {mod.duration}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 30, color: '#fff', fontWeight: 400, lineHeight: 1.2, marginBottom: 8 }}>
          {mod.title}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,.8)' }}>{mod.subtitle}</p>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px 0' }}>
        {/* Intro */}
        <div style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 14, boxShadow: '0 2px 10px rgba(44,33,24,.06)' }}>
          <p style={{ fontSize: 15, color: '#2C2118', lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'var(--font-heading)' }}>
            "{mod.content.intro}"
          </p>
        </div>

        {/* Sections */}
        {mod.content.sections.map((section, i) => (
          <div key={i} style={{ background: '#FDFBF8', borderRadius: 20, padding: '16px 18px', marginBottom: 12, boxShadow: '0 2px 10px rgba(44,33,24,.06)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#2C2118', marginBottom: 10 }}>{section.title}</h3>
            {section.text.split('\n').map((line, j) => (
              <p key={j} style={{ fontSize: 13, color: '#6B5744', lineHeight: 1.65, marginBottom: j < section.text.split('\n').length - 1 ? 6 : 0 }}>
                {line}
              </p>
            ))}
          </div>
        ))}

        {/* Key points */}
        <div style={{
          background: `${mod.color}15`,
          border: `1.5px solid ${mod.color}40`,
          borderRadius: 20, padding: '16px 18px', marginBottom: 16,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: mod.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            ✨ Points clés à retenir
          </p>
          {mod.content.keyPoints.map((point, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: i < mod.content.keyPoints.length - 1 ? 8 : 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, background: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#fff', fontWeight: 700, marginTop: 2 }}>
                {i + 1}
              </div>
              <p style={{ fontSize: 13, color: '#2C2118', fontWeight: 600, lineHeight: 1.4, paddingTop: 2 }}>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

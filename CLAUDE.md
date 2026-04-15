# SENSIA — CLAUDE.md

Ce fichier est lu par Claude Code à chaque session. Il contient toutes les instructions, le contexte produit, les règles de développement et les priorités du projet SENSIA.

---

## RÈGLE DE COMMUNICATION
Ne jamais afficher le contenu complet des fichiers dans le terminal.
Afficher uniquement un résumé en 2-3 lignes de ce qui a été modifié, puis pousser directement sur GitHub.
Cela économise les tokens et accélère le travail.

---

## 1. CONTEXTE PRODUIT

SENSIA est une application mobile connectée à une ceinture fitness intelligente dédiée au périnée féminin. Ce n'est pas une app fitness classique — c'est un écosystème complet qui combine un dispositif physique premium et une application éducative, sensorielle et connectée.

**Mission :** Permettre aux femmes de s'entraîner correctement et en sécurité en protégeant leur périnée, en guidant leur respiration et en améliorant leur gainage — sans qu'elles aient à réfléchir.

**Positionnement :** Premium, féminin, bienveillant. Ambiance spa, pas fitness agressif.

**Taglines :**
- FR : "La première app qui protège ton périnée pendant que tu t'entraînes"
- EN : "The first app that protects your pelvic floor while you train"
- ES : "La primera app que protege tu suelo pélvico mientras entrenas"
- IT : "La prima app che protegge il tuo pavimento pelvico mentre ti alleni"

---

## 2. LA CEINTURE SENSIA V2

### Zones fonctionnelles
- **Zones latérales** : respiration et expansion (capteurs côtés)
- **Zone centrale** : contrôle et gainage, texture grain (capteur centre)
- **Zone basse en V** : protection périnée (capteur bas)
- **Zone dos** : maintien et stabilité (capteur dos)

### Fonctionnalités connectées V2
- Capteurs de pression : centre, côtés, bas, dos
- Vibrations localisées selon la zone d'erreur (pas générales — localisées)
- Lumière diffuse intégrée : bleu (inspire), neutre, orange (expire) — effet tissu lumineux, pas LEDs visibles
- Connexion Bluetooth Low Energy (BLE)
- Autonomie : ~8h de séance continue
- Recharge : USB-C, ~2h pour charge complète

### Codes vibration
- 1 vibration courte = Inspire
- 2 vibrations courtes = Expire
- 1 vibration longue = Bravo, bonne exécution
- Vibrations fortes répétées = Erreur détectée

### Codes lumière
- Bleu doux = Phase inspiration
- Orange chaud = Phase expiration
- Vert = Bonne position
- Rouge = Correction nécessaire

### Matériaux
- Néoprène + nylon/spandex + mesh respirant
- Double velcro ajustable
- Design minimal, premium, féminin

---

## 3. LES 4 PROFILS UTILISATRICES

### Profil 1 — Post-partum
- Message d'accueil : "Ton corps a accompli quelque chose d'extraordinaire. On y va doucement."
- Badge : "Post-partum · Semaine X" — couleur verte (#4A9B7F) sur fond (#E0F2EC)
- Programme : Reprise semaine par semaine (S1 à S12)
- Exercices : Uniquement doux en phase 1 (respiration, périnée, étirements, gainage léger)
- Alertes : "Cet exercice n'est pas recommandé avant 6 semaines post-partum"
- Rapport PDF : Exportable pour sage-femme ou kiné chaque mois
- Spécifique : Champ "Semaines post-partum" dans le profil

### Profil 2 — Débutante en muscu
- Message d'accueil : "Bienvenue dans ton nouveau mode de vie. On commence par les bases."
- Badge : "Débutante · Semaine X" — couleur violet clair (#A689C4) sur fond (#EDE6F4)
- Programme : Fondamentaux techniques sur 8 semaines
- Focus : Apprendre les bons gestes avant de charger
- Spécifique : Checklist technique avant chaque exercice, progression des charges suggérée semaine par semaine, module "Les bases de la muscu féminine"

### Profil 3 — Intermédiaire fitness/muscu
- Message d'accueil : "Tu sais déjà t'entraîner. On va affiner, protéger et optimiser."
- Badge : "Intermédiaire · Mois X" — couleur dorée (#C4986A) sur fond (#F5EDE2)
- Programme : Optimisation technique + intégration périnée dans les charges lourdes
- Focus : Corriger les erreurs silencieuses (blocage respiration, poussée vers le bas)
- Spécifique : Tous les exercices débloqués, suivi des records personnels, défis avancés, analyse ceinture pendant charges lourdes

### Profil 4 — Déjà touchée (périnée fragilisé)
- Message d'accueil : "Tu n'es pas seule. Des milliers de femmes vivent la même chose. On va réparer ensemble."
- Badge : "Rééducation · Phase X" — couleur rose (#F4C0D1) sur fond (#FBEAF0)
- Programme : Rééducation progressive (Phase 1 ultra-douce → Phase 2 progressive → Phase 3 retour normal)
- Spécifique : Journal des symptômes, mode "Mauvais jour" 5 min, alertes sur exercices risqués, rapport PDF pour professionnel de santé, conseil médical intégré

---

## 4. DESIGN SYSTEM — RÈGLES STRICTES

### Palette de couleurs
```
Fond principal :     #F3EDE5  (beige chaud)
Fond cards :         #FAF7F3  (beige clair)
Blanc chaud :        #FDFBF8
Violet principal :   #7B5EA7
Violet clair :       #A689C4
Violet doux fond :   #EDE6F4
Violet profond :     #4A3669  (hero sections)
Texte sombre :       #2C2118
Texte moyen :        #6B5744
Texte clair :        #9C8A78
Doré accent :        #C4986A
Doré fond doux :     #F5EDE2
Teal gainage :       #4A9B7F
Teal fond doux :     #E0F2EC
Rouge alerte :       #E24B4A
LED inspire bleu :   #85B7EB
LED expire orange :  #EF9F27
LED ok vert :        #5DCAA5
```

### Typographie
- Titres : Cormorant Garamond (300 et 400), italic pour les mots émotionnels
- Corps : DM Sans (300, 400, 500)
- Timer/mono : DM Mono
- Importer depuis Google Fonts

### Règles de design
- Coins arrondis : 14px (éléments), 20px (cards), 36px (phone frame)
- Ombres : légères et douces uniquement (`box-shadow: 0 4px 16px rgba(44,33,24,0.06)`)
- PAS de gradients agressifs
- PAS de néon
- PAS de bleu électrique
- PAS de fond noir ou violet foncé sur toute la page (uniquement dans les blocs hero)
- Animations : fadeIn, slideUp, pulse lent (respiration)
- Lumières ceinture : halos diffus SVG (filter blur), pas de points LED

### Layout mobile
- Max-width : 430px centré avec margin auto
- Fond autour : #F3EDE5 (jamais noir)
- Navigation fixe en bas : 5 onglets
- Tous les boutons : minimum 44x44px
- Pas de hover states (mobile first)

---

## 5. ARCHITECTURE DES ÉCRANS

### Navigation principale (5 onglets fixes en bas)
```
Accueil     /home
Séance      /my-session
Apprendre   /learn
Musique     /playlist
Profil      /profile
```

### Écrans complets
```
/                     → Redirect vers /onboarding ou /home
/onboarding           → 5 étapes (splash, profil, objectifs, ceinture, recap)
/auth/login           → Connexion email/mdp + Google
/auth/register        → Inscription
/auth/forgot-password → Mot de passe oublié
/home                 → Accueil personnalisé par profil
/my-session           → Bibliothèque exercices + créer séance
/exercise/:id         → Lecteur exercice (illustration, instructions, timer)
/session              → Séance guidée en temps réel
/session-analysis     → Analyse post-séance ceinture
/learn                → Modules éducatifs
/playlist             → Playlist musicale
/profile              → Profil utilisatrice
/pricing              → Tarifs Free/Premium
/belt                 → Ma ceinture (statut, capteurs, batterie)
/belt-tutorial        → Tutoriel pose ceinture (5 étapes)
/belt-discovery       → Mode découverte libre 3 min
/belt-calibration     → Calibration capteurs
/belt-progress        → La ceinture qui apprend
/pre-session          → Vérification pré-séance 30 sec
/bad-day              → Mode mauvais jour (profil déjà touchée)
/notifications        → Centre de notifications
/no-belt              → Mode sans ceinture
```

---

## 6. FONCTIONNALITÉS PRINCIPALES

### Guidage respiratoire en temps réel
- Cycle : INSPIRE (4 sec) → MAINTIENS (2 sec) → EXPIRE (4 sec) → REPOS (2 sec)
- Cercle animé qui grandit/rétrécit selon la phase
- Barre de progression qui se remplit/vide
- Coach texte qui change à chaque phase
- Synchronisation avec lumière ceinture

### Alertes intelligentes ceinture V2
- Blocage respiratoire : capteurs côtés < 20 → "Tu bloques ta respiration"
- Poussée vers le bas : capteur bas > 80 → "Tu pousses vers le bas"
- Gainage absent : capteur centre < 30 → "Gaine légèrement"
- Bonne exécution : tous capteurs OK → "Parfait ! Continue"
- Les alertes sont localisées : c'est la zone concernée qui vibre, pas toute la ceinture

### Score de séance
- Respiration : /10
- Gainage : /100
- Périnée : /100
- Score global SENSIA : /100

### Progression & gamification
- Streak de jours consécutifs (points animés)
- Défis : "7 jours respiration", "14 jours sans blocage", "30 jours Hip Thrust parfait"
- Badges débloquables
- Bilan mensuel automatique (PDF exportable)
- Timeline "Mon histoire" depuis le jour 1

### Fonctionnalités spéciales
- Mode cycle menstruel (programme adapté)
- Mode grossesse (prénatal)
- Mode mauvais jour (5 min ultra-doux)
- Séance en 3 questions (générée automatiquement)
- Affirmations du jour (change chaque matin)
- Journal de bord (énergie, douleur, moral)
- Rapport PDF mensuel (sage-femme / kiné)

---

## 7. BIBLIOTHÈQUE D'EXERCICES

### Catégories et filtres
Tous / Bas du corps / Haut du corps / Périnée / Respiration / Gainage / Stomach Vacuum / Étirements

### Exercices par catégorie
**Bas du corps :** Squat barre, Squat gobelet, Squat sumo barre, Leg press, Fente avant haltères, Fente inversée haltères, Fente latérale, Hip thrust barre ♡♡, Hip thrust unilatéral ♡♡, Romanian deadlift haltères ♡, Soulevé de terre roumain barre ♡, Leg curl couché, Leg extension, Abduction machine, Adduction machine, Glute bridge lesté ♡♡, Step up haltères ♡, Hack squat ♡, Bulgarian split squat ♡, Good morning

**Haut du corps :** Développé couché haltères, Développé couché barre, Développé incliné haltères, Écarté couché haltères, Pompes lestées, Rowing haltère unilatéral, Rowing barre, Tirage vertical machine, Tirage horizontal câble, Pull-over haltère, Curl biceps haltères, Curl marteau, Curl barre, Extension triceps poulie, Dips assistés, Développé militaire haltères, Élévations latérales, Élévations frontales, Oiseau haltères, Face pull câble, Shrugs haltères

**Périnée :** Contraction lente, Contraction rapide, Relâchement progressif, Contraction en expiration, Périnée assis, Périnée debout, Périnée pendant squat, Contraction 3 niveaux, Respiration inversée périnée, Ascenseur périnéal

**Respiration :** Respiration diaphragmatique, Respiration 4-7-8, Respiration 4-4-6-2, Cohérence cardiaque 5-5, Respiration ventrale, Respiration costale, Respiration complète 3 temps, Respiration en carré 4-4-4-4, Expiration longue anti-stress, Respiration synchronisée ceinture

**Gainage :** Planche avant coudes, Planche avant mains, Planche latérale, Planche latérale étoile, Dead bug, Bird dog, Crunch hypopressif, Mountain climber lent, Hollow body, Relevé de jambes allongé, Vacuum abdominal, Gainage pont, Planche avec rotation, Bear crawl statique

**Stomach Vacuum :** Vacuum debout, Vacuum assis, Vacuum à quatre pattes, Vacuum allongé, Vacuum en expiration forcée, Vacuum pulsé, Vacuum avec contraction périnée ♡♡, Vacuum en position pont ♡♡, Vacuum dynamique 3 temps, Vacuum post-partum doux

**Étirements :** Étirement psoas fente basse, Étirement ischio-jambiers, Étirement fessier figure 4, Étirement adducteurs papillon, Étirement lombaires boule, Torsion dorsale allongée, Étirement quadriceps debout, Chat-vache, Étirement épaules croisées, Étirement pectoraux porte, Posture de l'enfant, Étirement latéral debout, Ouverture de hanches pigeon

*(♡ = synchronisation périnée recommandée / ♡♡ = synchronisation périnée essentielle)*

### Illustrations SVG par catégorie
```
Bas du corps :   fond #EDE6F4  silhouette #4A3669
Haut du corps :  fond #E0F2EC  silhouette #4A9B7F
Périnée :        fond #FBEAF0  silhouette #993556
Respiration :    fond #E6F1FB  silhouette #185FA5
Gainage :        fond #F5EDE2  silhouette #854F0B
Vacuum :         fond #EDE6F4  silhouette #7B5EA7
Étirements :     fond #EAF3DE  silhouette #3B6D11
```
Composant : `src/components/ExerciseIllustration.js` (42 poses SVG uniques)

---

## 8. MODULES ÉDUCATIFS

1. Le périnée, c'est quoi ?
2. Respiration et pressions abdominales
3. La sangle abdominale
4. Musculation et périnée
5. Post-partum : ce que personne ne dit
6. Stomach Vacuum : la technique complète
7. Comprendre fuites, prolapsus, douleurs (profil déjà touchée)
8. Cycle menstruel et sport
9. Les bases de la muscu féminine (profil débutante)
10. Musculation et périnée : ce que personne ne t'a appris (profil intermédiaire)
11. Comprendre ma ceinture SENSIA

---

## 9. TECH STACK

### Frontend
- React (create-react-app), React Router v6
- i18next (FR, EN, ES, IT) — `src/lib/i18n.js`, `src/locales/`
- React.lazy() + Suspense sur toutes les routes
- CSS-in-JS (styles inline) — pas de CSS modules

### Backend & Base de données
- Supabase (PostgreSQL + Auth + Storage) — `src/lib/supabase.js`
- Row Level Security activée sur toutes les tables
- Tables : users, sessions, progression, symptoms_journal, subscriptions, challenges, streaks
- Schéma : `supabase/schema.sql`

### Paiements
- Stripe (abonnements récurrents) — `src/lib/stripe.js`
- Plans : Free / Premium Mensuel 12,99€ / Premium Annuel 89,99€

### Analytics
- Mixpanel — `src/lib/analytics.js` (no-op si token absent)

### Hébergement
- Railway
- Build : `npm run build` / Start : `npx serve -s build`
- Variables d'environnement dans Railway (jamais dans le code)

### Variables d'environnement (`.env.local`)
```
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
REACT_APP_STRIPE_PUBLIC_KEY=
REACT_APP_STRIPE_PRICE_MONTHLY=
REACT_APP_STRIPE_PRICE_YEARLY=
REACT_APP_MIXPANEL_TOKEN=
```

### Pattern mode démo
Toutes les fonctionnalités Supabase/Stripe dégradent gracieusement si les variables sont absentes.
Guards : `isSupabaseConfigured`, `isStripeConfigured`.
LocalStorage utilisé en fallback : `sensia_profile`, `sensia_subscription`, `sensia_voice`, `sensia_morpho`, `sensia_lang`.

---

## 10. PERFORMANCES OBLIGATOIRES

- Chargement initial : < 2 secondes sur mobile
- LCP : < 2.5s / FID : < 100ms / CLS : < 0.1
- Bundle principal : < 200kb gzippé
- Toutes les routes : `React.lazy()` + `Suspense` ✅ (déjà en place dans App.js)
- Toutes les images : `loading="lazy"`
- WakeLock uniquement pendant séance active
- BLE polling : toutes les 500ms (pas en continu)
- Mode offline : séances fonctionnent sans connexion (IndexedDB)
- Synchronisation Supabase : groupée toutes les 15 minutes max

---

## 11. INTERNATIONALISATION

4 langues : FR (défaut) / EN / ES / IT

- Détection automatique langue téléphone au premier lancement
- Sélecteur dans Profil → Paramètres → Langue (🇫🇷 🇬🇧 🇪🇸 🇮🇹)
- Langue sauvegardée dans `sensia_lang` (localStorage) et Supabase (`users.langue`)
- Structure : `src/locales/fr/translation.json`, `en/`, `es/`, `it/`
- Initialisation : `src/lib/i18n.js` importé dans `src/index.js`

---

## 12. SÉCURITÉ

- Row Level Security (RLS) sur toutes les tables Supabase
- Tokens Stripe jamais côté client
- Toutes les clés API dans variables d'environnement
- HTTPS obligatoire (Railway)
- Sanitization de tous les inputs utilisateur

---

## 13. RÈGLES DE DÉVELOPPEMENT

### Git
```
git add <fichiers> && git commit -m "description claire" && git push
```
- Committer après chaque fonctionnalité complète
- Messages de commit descriptifs (français ou anglais)
- Ne jamais committer `.env` ou `.env.local`

### Code
- Composants React fonctionnels uniquement (pas de classes)
- Un fichier par composant
- Styles inline (CSS-in-JS) — cohérence avec l'existant
- Noms de variables en français pour le contenu SENSIA
- Noms de fonctions et composants en anglais camelCase

### Images & Illustrations
- Toutes les illustrations d'exercices : `ExerciseIllustration` SVG (silhouette féminine épurée)
- Pas de photos Unsplash en production (uniquement prototype)
- Fallback SVG si illustration non disponible
- Toujours spécifier `width` et `height` pour éviter le CLS

### Accessibilité
- Tous les boutons ont un `aria-label`
- Contraste minimum 4.5:1
- Focus visible sur tous les éléments interactifs
- `alt` sur toutes les images

---

## 14. PRIORITÉS DE DÉVELOPPEMENT

### Priorité 1 — CRITIQUE (doit être parfait au lancement)
- Onboarding complet 5 étapes
- Authentification Supabase (login, signup, session persistante)
- Accueil personnalisé par profil
- Séance guidée avec cycle respiratoire animé en temps réel
- Connexion ceinture Bluetooth (interface simulée jusqu'à V2 hardware)
- Paiement Stripe (Free vs Premium)

### Priorité 2 — IMPORTANT
- Bibliothèque exercices avec illustrations SVG ✅
- Modules éducatifs
- Profil et progression
- Mode offline pour les séances
- Notifications intelligentes

### Priorité 3 — SOUHAITABLE
- Playlist musicale
- Rapport PDF mensuel
- Mode cycle menstruel
- Internationalisation EN/ES/IT
- Analytics Mixpanel

---

## 15. CE QUE SENSIA N'EST PAS / EST

**SENSIA N'EST PAS :**
- Une app fitness classique
- Un gadget
- Un produit médical froid
- Agressif ou compétitif
- Réservé aux femmes qui ont accouché (toutes les femmes sont concernées)

**SENSIA EST :**
- Une app éducative qui explique le corps féminin
- Un coach bienveillant qui guide sans juger
- Un écosystème physique + digital cohérent
- Une expérience premium et rassurante
- La première solution qui connecte sport et protection périnéale

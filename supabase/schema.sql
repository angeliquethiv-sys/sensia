-- ═══════════════════════════════════════════
-- SENSIA — Schéma base de données Supabase
-- ═══════════════════════════════════════════

-- Table utilisatrices
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  prenom TEXT,
  profil TEXT CHECK (profil IN ('post-partum', 'debutante', 'intermediaire', 'deja-touchee')),
  semaines_post_partum INTEGER,
  tour_de_taille TEXT,
  diastasis TEXT,
  chirurgie TEXT,
  langue TEXT DEFAULT 'fr',
  created_at TIMESTAMP DEFAULT now()
);

-- Table séances
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT now(),
  duree_minutes INTEGER,
  score_respiration INTEGER,
  score_gainage INTEGER,
  score_perinee INTEGER,
  erreurs_detectees JSONB,
  exercices JSONB,
  avec_ceinture BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Table progression hebdomadaire
CREATE TABLE progression (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  semaine INTEGER,
  score_respiration INTEGER,
  score_gainage INTEGER,
  score_perinee INTEGER,
  nb_erreurs INTEGER,
  created_at TIMESTAMP DEFAULT now()
);

-- Table journal symptômes (profil déjà touchée)
CREATE TABLE journal_symptomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT now(),
  douleur INTEGER CHECK (douleur BETWEEN 1 AND 5),
  pression INTEGER CHECK (pression BETWEEN 1 AND 5),
  fuites INTEGER CHECK (fuites BETWEEN 1 AND 5),
  energie INTEGER CHECK (energie BETWEEN 1 AND 5),
  moral INTEGER CHECK (moral BETWEEN 1 AND 5),
  notes TEXT
);

-- Table abonnements
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT CHECK (plan IN ('free', 'monthly', 'yearly')),
  status TEXT,
  current_period_end TIMESTAMP,
  trial_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Table défis
CREATE TABLE defis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  nom TEXT,
  progression INTEGER DEFAULT 0,
  objectif INTEGER,
  termine BOOLEAN DEFAULT false,
  started_at TIMESTAMP DEFAULT now()
);

-- Table streak
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT now(),
  seance_faite BOOLEAN DEFAULT true
);

-- ── Row Level Security ──
ALTER TABLE users           ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions        ENABLE ROW LEVEL SECURITY;
ALTER TABLE progression     ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_symptomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE defis           ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks         ENABLE ROW LEVEL SECURITY;

-- Policies : chaque utilisatrice ne voit que ses propres données
CREATE POLICY "own_data" ON users           FOR ALL USING (auth.uid() = id);
CREATE POLICY "own_data" ON sessions        FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON progression     FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON journal_symptomes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON subscriptions   FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON defis           FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "own_data" ON streaks         FOR ALL USING (auth.uid() = user_id);

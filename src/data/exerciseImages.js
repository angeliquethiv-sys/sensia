/* ═══════════════════════════════════════════════════════════════════
   SENSIA — Exercise Image Mapping
   98 exercices · 7 catégories

   HOW TO USE:
   1. Run each MIDJOURNEY_PROMPTS[id] through Midjourney
   2. Upload resulting image to your CDN / Supabase Storage
   3. Replace the URL in exerciseImages[id]

   MIDJOURNEY BASE STYLE (append to every prompt):
   "natural soft window light, neutral warm cream background,
   realistic diverse female body type, premium wellness photography,
   mindful and caring atmosphere, no filters --ar 4:3 --style raw
   --v 6.1 --q 2"
   ═══════════════════════════════════════════════════════════════════ */

// ─── Midjourney prompts ─────────────────────────────────────────────
// Run these through Midjourney, then replace the URLs below

export const MIDJOURNEY_PROMPTS = {

  // ── BAS DU CORPS ──────────────────────────────────────────────────
  squat_barre:
    'Woman in beige linen sports bra and high-waist leggings performing a barbell back squat at parallel depth, neutral spine, controlled descent, light gym with warm cream walls, soft side lighting, realistic body, focused calm expression --ar 4:3 --style raw --v 6.1 --q 2',

  squat_gobelet:
    'Woman holding a kettlebell at chest height in a goblet squat position, knees tracking over toes, beige minimal activewear, warm neutral studio floor, soft natural overhead light, mid-movement, serene concentration --ar 4:3 --style raw --v 6.1 --q 2',

  squat_sumo_barre:
    'Woman with wide stance sumo barbell squat, toes turned out, barbell on upper back, beige workout wear, warm cream gym background, graceful powerful posture, natural diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  leg_press:
    'Woman seated on leg press machine, feet shoulder-width on platform, mid-press position, white and beige activewear, clean minimal gym background, calm focused expression, soft warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  lunge_db:
    'Woman performing a forward lunge holding light dumbbells at her sides, front knee at 90 degrees, back knee near floor, beige seamless activewear, neutral cream studio, graceful posture, warm natural light --ar 4:3 --style raw --v 6.1 --q 2',

  lunge_reverse:
    'Woman stepping backward into a reverse lunge with dumbbells, controlled movement captured mid-step, nude-tone workout set, soft warm cream background, elegant and strong posture, diffused natural lighting --ar 4:3 --style raw --v 6.1 --q 2',

  lunge_lateral:
    'Woman in a lateral side lunge to the right, one leg extended, knee bent and tracking forward, holding dumbbells, beige activewear, warm neutral yoga studio floor, soft window light from the side --ar 4:3 --style raw --v 6.1 --q 2',

  hip_thrust:
    'Woman performing a barbell hip thrust on a padded bench, hips fully extended at the top position, barbell across hip crease with foam pad, beige sports bra and leggings, gym mat, warm side lighting, calm expression --ar 4:3 --style raw --v 6.1 --q 2',

  hip_thrust_uni:
    'Woman doing a single-leg hip thrust with one leg extended, body bridged high, nude-beige activewear, exercise mat, warm cream background, strong yet graceful posture, natural soft light --ar 4:3 --style raw --v 6.1 --q 2',

  rdl_db:
    'Woman performing a Romanian deadlift with dumbbells, hinged at hips, flat back, dumbbells skimming down the legs, beige linen workout set, clean neutral gym backdrop, mindful movement, soft warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  rdl_barre:
    'Woman performing a barbell Romanian deadlift, hinged forward, neutral spine, barbell close to body, white and beige gym wear, warm minimal gym background, focused calm energy, diffused natural light --ar 4:3 --style raw --v 6.1 --q 2',

  leg_curl:
    'Woman lying face down on a leg curl machine, mid-curl with heels drawn toward glutes, beige sports bra and leggings, clean gym background, serene focused expression, soft overhead studio lighting --ar 4:3 --style raw --v 6.1 --q 2',

  leg_extension:
    'Woman seated on leg extension machine, legs extended at top position, beige workout wear, light minimal gym setting, calm confident posture, warm side lighting --ar 4:3 --style raw --v 6.1 --q 2',

  abduction_machine:
    'Woman seated on hip abduction machine, legs pressing outward, nude-beige activewear, modern clean gym interior, soft warm lighting, serene expression --ar 4:3 --style raw --v 6.1 --q 2',

  adduction_machine:
    'Woman seated on hip adduction machine, pressing knees together, beige sports set, light airy gym background, relaxed powerful posture, soft diffused lighting --ar 4:3 --style raw --v 6.1 --q 2',

  glute_bridge_w:
    'Woman performing a weighted glute bridge on a mat, hips raised, dumbbell resting on hip crease, knees bent, beige linen activewear, warm cream yoga studio floor, mindful posture, natural window light from above --ar 4:3 --style raw --v 6.1 --q 2',

  step_up:
    'Woman stepping up onto a plyo box with dumbbells at sides, mid-step with one leg on box, beige and white workout wear, warm minimal gym studio, graceful controlled movement, soft overhead light --ar 4:3 --style raw --v 6.1 --q 2',

  hack_squat:
    'Woman on a hack squat machine, mid-squat with back against pad, beige activewear, clean gym backdrop, focused calm expression, warm diffused lighting --ar 4:3 --style raw --v 6.1 --q 2',

  bulgarian_split:
    'Woman performing a Bulgarian split squat, rear foot elevated on bench, front knee at 90 degrees, holding dumbbells, beige linen set, warm neutral gym studio, elegant strength, soft side lighting --ar 4:3 --style raw --v 6.1 --q 2',

  good_morning:
    'Woman performing a good morning exercise with barbell on upper back, hinging forward at hips, flat back, beige workout wear, cream minimal gym background, mindful movement quality, warm natural light --ar 4:3 --style raw --v 6.1 --q 2',

  // ── HAUT DU CORPS ─────────────────────────────────────────────────
  bench_press_db:
    'Woman lying on flat workout bench pressing dumbbells, elbows at 45 degrees, mid-press, beige sports bra, clean minimal gym, warm diffused light, calm focused expression, natural body proportions --ar 4:3 --style raw --v 6.1 --q 2',

  bench_press_bar:
    'Woman on flat bench with barbell chest press, controlled lowering phase, beige and white gym wear, warm cream gym interior, graceful strength, soft overhead studio lighting --ar 4:3 --style raw --v 6.1 --q 2',

  incline_press:
    'Woman on incline bench pressing dumbbells upward, chest and upper body engaged, beige linen activewear, clean gym background, serene powerful expression, warm natural light --ar 4:3 --style raw --v 6.1 --q 2',

  chest_fly:
    'Woman lying on flat bench doing a dumbbell chest fly, arms wide open in stretch position, beige sports bra, minimal light gym, soft warm lighting, mindful controlled movement --ar 4:3 --style raw --v 6.1 --q 2',

  push_up_weighted:
    'Woman in weighted push-up position with weight plate on upper back, perfect plank alignment, beige activewear, warm cream yoga mat on wooden floor, strong confident posture, natural window light --ar 4:3 --style raw --v 6.1 --q 2',

  db_row:
    'Woman performing a single-arm dumbbell row, knee and hand on bench for support, back parallel to floor, pulling dumbbell to hip, beige workout set, warm studio gym, focused and strong, soft diffused lighting --ar 4:3 --style raw --v 6.1 --q 2',

  barbell_row:
    'Woman bent over performing a barbell row, hinged at hips, pulling bar to lower ribcage, beige sports wear, neutral gym backdrop, powerful controlled posture, warm side lighting --ar 4:3 --style raw --v 6.1 --q 2',

  lat_pulldown:
    'Woman seated at lat pulldown machine, pulling bar down to upper chest, arms wide, beige activewear, clean gym, calm focused expression, soft overhead studio light --ar 4:3 --style raw --v 6.1 --q 2',

  seated_row:
    'Woman seated at cable row machine, pulling handle to lower chest, back straight, beige and white gym wear, warm neutral gym, graceful pulling motion, natural diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  pullover:
    'Woman lying on bench doing a dumbbell pullover, arms extended overhead and arcing back, beige sports bra, warm minimal studio, elegant stretch position, soft warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  bicep_curl:
    'Woman standing performing alternating dumbbell bicep curls, mid-curl with arm contracted, beige linen activewear, warm cream gym wall behind, strong and graceful, natural window light --ar 4:3 --style raw --v 6.1 --q 2',

  hammer_curl:
    'Woman performing hammer curls with dumbbells, neutral grip, mid-movement, beige workout wear, minimal warm gym background, calm confident posture, soft diffused lighting --ar 4:3 --style raw --v 6.1 --q 2',

  barbell_curl:
    'Woman standing with barbell curl at peak contraction, biceps engaged, beige sports set, clean neutral gym, focused expression, warm natural overhead light --ar 4:3 --style raw --v 6.1 --q 2',

  tricep_pushdown:
    'Woman at cable machine performing a tricep pushdown, arms extended at bottom, elbows pinned to sides, beige activewear, airy gym studio, composed expression, soft warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  assisted_dips:
    'Woman on assisted dip machine, pushing down in bottom position, beige sports wear, clean modern gym, strong yet mindful posture, warm diffused lighting --ar 4:3 --style raw --v 6.1 --q 2',

  shoulder_press:
    'Woman seated performing dumbbell overhead shoulder press at top position, arms extended, beige workout set, neutral cream studio gym, calm empowered expression, natural warm light --ar 4:3 --style raw --v 6.1 --q 2',

  lateral_raise:
    'Woman performing lateral dumbbell raises, arms at shoulder height forming a T, beige linen activewear, warm minimal gym interior, graceful controlled posture, soft diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  front_raise:
    'Woman performing alternating front dumbbell raises, one arm raised to shoulder height, beige sports bra and leggings, clean neutral gym background, focused serene expression, natural lighting --ar 4:3 --style raw --v 6.1 --q 2',

  reverse_fly:
    'Woman bent over with dumbbells performing reverse flyes, arms extended wide like wings at shoulder height, beige activewear, warm cream gym, elegant rear delt engagement, soft warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  face_pull:
    'Woman at cable machine performing face pulls, rope handle at face level, elbows high and wide, beige workout wear, airy gym studio, focused posture, soft overhead light --ar 4:3 --style raw --v 6.1 --q 2',

  shrugs:
    'Woman standing performing dumbbell shoulder shrugs at top contraction, beige sports set, warm neutral gym interior, strong composed expression, natural diffused window light --ar 4:3 --style raw --v 6.1 --q 2',

  // ── PÉRINÉE ───────────────────────────────────────────────────────
  kegel_slow:
    'Woman seated cross-legged on a beige yoga mat, hands resting gently on knees, eyes softly closed, serene inward focus, light linen beige yoga wear, warm cream meditation room, natural morning light through sheer curtains, mindful pelvic floor awareness --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_fast:
    'Woman sitting upright on yoga mat in comfortable seated position, slight gentle tension in posture suggesting active engagement, soft smile, beige activewear, warm neutral studio, dappled natural light --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_hold:
    'Woman lying comfortably on her back on a beige yoga mat, arms relaxed at sides, legs slightly apart, eyes closed, deep relaxation and body awareness, linen beige wear, warm cream ceiling light, peaceful atmosphere --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_expire:
    'Woman seated on yoga mat with one hand on lower belly, mouth slightly open in gentle exhale, focused on breath and pelvic floor, beige linen outfit, soft window light, serene wellness photography --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_seated:
    'Woman sitting upright on the edge of a yoga block, feet flat on floor, hands on thighs, neutral spine, internal focus, beige and white minimal yoga wear, warm cream interior, natural diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_standing:
    'Woman standing tall with feet hip-width apart, hands gently resting on lower abdomen, eyes downcast in internal focus, beige linen activewear, warm neutral minimal background, grounded and mindful, soft natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_squat:
    'Woman in a deep squat position with hands in prayer at chest, toes angled out, upright torso, beige yoga wear, warm wooden yoga studio floor, mindful pelvic awareness posture, soft overhead natural light --ar 4:3 --style raw --v 6.1 --q 2',

  kegel_3levels:
    'Woman seated in meditation pose on yoga mat, one hand on lower belly, visualizing three levels of pelvic floor engagement, serene concentrated expression, beige linen wear, warm cream studio, soft candle-adjacent lighting --ar 4:3 --style raw --v 6.1 --q 2',

  reverse_kegel:
    'Woman lying on back with knees bent and feet flat on mat, arms relaxed alongside body, conscious of belly expansion during inhale, pelvic floor release, beige activewear, warm neutral light, peaceful body scan pose --ar 4:3 --style raw --v 6.1 --q 2',

  elevator_kegel:
    'Woman in comfortable seated meditation, visualizing gentle elevator lift inside, subtle awareness in face suggesting deep internal focus, hands folded in lap, beige linen loungewear, soft warm window light, tranquil wellness studio --ar 4:3 --style raw --v 6.1 --q 2',

  // ── RESPIRATION ───────────────────────────────────────────────────
  diaphragm_breath:
    'Woman lying on her back on a beige yoga mat, one hand on belly and one on chest, belly gently rising on inhale, eyes closed, serene relaxation, linen beige wear, warm cream ceiling, natural morning light --ar 4:3 --style raw --v 6.1 --q 2',

  breath_478:
    'Woman seated in easy cross-legged pose, head slightly tilted back, eyes closed, mid-exhale with parted lips counting silently, beige minimal yoga wear, warm cream meditation room, soft candlelit atmosphere, nighttime wellness --ar 4:3 --style raw --v 6.1 --q 2',

  breath_4462:
    'Woman seated upright on yoga mat in breathing exercise, one hand on chest one on abdomen, aware of breath phases, beige linen outfit, warm light airy studio, serene focused expression, diffused natural light --ar 4:3 --style raw --v 6.1 --q 2',

  coherence:
    'Woman seated comfortably in chair, both hands over heart, eyes gently closed, peaceful serene expression, coherence breathing practice, soft pink and beige palette room, warm natural light, wellness and heart coherence --ar 4:3 --style raw --v 6.1 --q 2',

  ventral_breath:
    'Woman lying on back with a small smooth stone balanced on her belly, watching it rise and fall with belly breathing, eyes closed, beige linen wear, warm cream room, morning light, mindful breathing --ar 4:3 --style raw --v 6.1 --q 2',

  costal_breath:
    'Woman seated with both hands wrapped around lower ribcage feeling ribs expand laterally, eyes closed, awareness of lateral breath, beige activewear, warm neutral studio, soft side natural light --ar 4:3 --style raw --v 6.1 --q 2',

  complete_breath:
    'Woman seated tall in meditation, hands resting in lap, full three-part breath visible in posture — belly then ribs then chest expansion, beige linen wear, warm cream light studio, serene complete awareness --ar 4:3 --style raw --v 6.1 --q 2',

  box_breathing:
    'Woman seated in sukhasana, index fingers counting breath phases, calm focused expression, box breathing practice, beige minimal wear, light warm square window light behind creating a subtle geometric composition, mindful wellness --ar 4:3 --style raw --v 6.1 --q 2',

  long_expire:
    'Woman seated leaning slightly forward in slow exhale through pursed lips, shoulders dropping, tension visibly releasing, beige linen loungewear, warm afternoon light, stress relief breathing, serene expression --ar 4:3 --style raw --v 6.1 --q 2',

  belt_sync_breath:
    'Woman wearing a slim beige pelvic floor wellness belt around waist, hands resting on it, seated in breathing exercise, eyes closed syncing breath with biofeedback, soft technology meets wellness, warm cream studio, natural light --ar 4:3 --style raw --v 6.1 --q 2',

  // ── GAINAGE ───────────────────────────────────────────────────────
  plank_elbows:
    'Woman in forearm plank on a beige yoga mat, body in perfect straight line from head to heels, elbows under shoulders, calm composed expression, beige sports bra and minimal leggings, warm cream studio floor, soft overhead natural light --ar 4:3 --style raw --v 6.1 --q 2',

  plank_hands:
    'Woman in high plank on hands, arms straight and strong, body in perfect alignment, beige activewear, warm cream minimal yoga studio, mindful core engagement, natural diffused side light --ar 4:3 --style raw --v 6.1 --q 2',

  side_plank:
    'Woman in a side plank on one forearm, body in a strong diagonal line, other arm raised upward, beige linen sports bra, natural warm light casting a gentle shadow, neutral cream floor, graceful strength --ar 4:3 --style raw --v 6.1 --q 2',

  side_plank_star:
    'Woman in a star side plank with top leg and arm both raised in a star formation, impressive strength pose, beige activewear, warm cream studio floor, soft warm side lighting, empowered beautiful posture --ar 4:3 --style raw --v 6.1 --q 2',

  dead_bug:
    'Woman lying on back performing dead bug exercise, opposite arm extended overhead and leg extended near floor while maintaining low back contact with mat, beige activewear, warm cream ceiling, natural morning light --ar 4:3 --style raw --v 6.1 --q 2',

  bird_dog:
    'Woman on all fours performing bird dog exercise, opposite arm and leg extended in a straight line parallel to floor, neutral spine, beige yoga wear, warm cream wooden studio floor, soft natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  hypo_crunch:
    'Woman lying on back doing a hypopressive crunch, ribcage lift with hollowed abdomen, beige sports bra, warm cream yoga mat, mindful core technique visible in subtle body shape, soft diffused overhead light --ar 4:3 --style raw --v 6.1 --q 2',

  mountain_climber_slow:
    'Woman in high plank performing a slow mountain climber, one knee drawn slowly toward chest, controlled mindful pace, beige activewear, warm cream floor, natural warm lighting --ar 4:3 --style raw --v 6.1 --q 2',

  hollow_hold:
    'Woman in hollow body hold position, legs and shoulders lifted off mat, lower back pressed down, arms reaching overhead, graceful curved body shape, beige sports bra, warm cream yoga mat, soft diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  leg_raise:
    'Woman lying flat on back with legs raised to 90 degrees, lower back pressed into mat, hands under tailbone, beige activewear, warm cream mat on wooden floor, soft natural overhead light, controlled core work --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_ab:
    'Woman standing performing an abdominal vacuum, ribs slightly flared, belly drawn deeply inward and upward under ribcage, hands on knees, exhaled lungs, beige linen outfit, warm cream neutral background, side natural light --ar 4:3 --style raw --v 6.1 --q 2',

  bridge_plank:
    'Woman in a reverse plank bridge position, sitting on mat then lifting hips to form a flat tabletop with body, arms supporting behind, beige activewear, warm studio floor, natural diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  plank_rotation:
    'Woman in high plank rotating into a side plank with arm reaching upward, mid-rotation twist, beige sports bra and leggings, warm cream yoga studio, dynamic graceful movement, soft natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  bear_crawl_static:
    'Woman in bear crawl hover position — on hands and toes with knees lifted 3 inches off floor, back flat as a table, beige activewear, warm wooden yoga studio floor, focused and strong, natural warm light --ar 4:3 --style raw --v 6.1 --q 2',

  // ── VACUUM ────────────────────────────────────────────────────────
  vacuum_standing:
    'Woman standing with feet hip-width, leaning slightly forward with hands on thighs, performing deep abdominal vacuum — belly visibly hollowed inward, post-exhale posture, beige linen activewear, warm cream background, natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_seated:
    'Woman seated cross-legged, torso slightly forward, hands on knees, deep abdominal vacuum — belly drawn under ribcage, focused inward expression, beige yoga wear, warm neutral meditation room, soft diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_quadruped:
    'Woman on all fours in table-top position, back flat, performing abdominal vacuum with belly drawn upward toward spine, beige linen activewear, warm cream wooden floor, natural window light from side --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_lying:
    'Woman lying on back on yoga mat, knees bent, hands at sides, performing gentle vacuum with belly hollowed inward, beige activewear, warm cream ceiling above, soft morning light, restorative and mindful atmosphere --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_forced:
    'Woman leaning forward hands on thighs mid-strong exhale, maximum abdominal compression, ribcage definition visible, powerful vacuum technique, beige linen wear, warm cream background, dramatic soft side lighting --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_pulsed:
    'Woman in standing vacuum with belly pulsing inward in rhythmic contractions, hands hovering over abdomen in awareness gesture, beige activewear, warm neutral studio, natural overhead light, mindful technique --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_perineum:
    'Woman seated in lotus, one hand on belly one at pelvic floor level, combined pelvic-abdominal vacuum, meditative inward focus, beige linen clothing, warm amber-cream meditation space, candle-like soft light --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_bridge:
    'Woman in glute bridge position on mat with hips raised and abdominal vacuum — belly drawn in at top of bridge, beige sports bra, warm cream yoga mat, natural soft overhead light, graceful body awareness --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_dynamic:
    'Woman standing demonstrating 3-phase abdominal vacuum — sequence visible in one layered photographic frame showing exhale, vacuum, and release, beige minimal wear, warm cream studio, artistic wellness photography --ar 4:3 --style raw --v 6.1 --q 2',

  vacuum_postpartum:
    'Woman in gentle restorative posture, perhaps semi-reclined with knees bent, performing very soft abdominal re-connection exercise post-birth, hands cradling lower belly with care, warm soft beige linen wear, golden morning light, ultra-gentle caring atmosphere --ar 4:3 --style raw --v 6.1 --q 2',

  // ── ÉTIREMENTS ────────────────────────────────────────────────────
  psoas_stretch:
    'Woman in a deep low lunge, back knee on mat, front knee at 90 degrees, arms raised overhead in a long stretch, hip flexors open, beige linen yoga wear, warm cream studio floor, graceful and expansive posture, natural overhead light --ar 4:3 --style raw --v 6.1 --q 2',

  hamstring_stretch:
    'Woman in seated hamstring stretch, one leg extended forward and gently folding forward over it, hands reaching for foot, beige yoga wear, warm wooden floor, serene calm expression, soft natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  figure_four:
    'Woman lying on back in figure-four stretch, one ankle crossed over opposite thigh, gentle pull of the bent knee, glute opening visible, beige activewear, warm cream mat, peaceful restorative pose, natural diffused light --ar 4:3 --style raw --v 6.1 --q 2',

  butterfly_stretch:
    'Woman in butterfly pose, seated with soles of feet pressed together, knees falling to the sides, gently folding forward, beige linen yoga wear, warm wooden yoga studio, mindful inner thigh opening, soft overhead natural light --ar 4:3 --style raw --v 6.1 --q 2',

  back_ball:
    'Woman curled into a ball on her side on yoga mat, knees hugged to chest, lower back in gentle traction, beige activewear, warm cream cushioned floor, peaceful fetal position stretch, soft ambient light --ar 4:3 --style raw --v 6.1 --q 2',

  spinal_twist:
    'Woman lying on back in a supine spinal twist, one knee crossed over the body to the floor, arms extended to sides in a T, gentle rotation, beige yoga wear, warm cream mat, natural overhead light, restorative pose --ar 4:3 --style raw --v 6.1 --q 2',

  quad_stretch:
    'Woman standing on one foot, other heel pulled toward glute in quad stretch, free hand lightly touching a wall for balance, beige linen activewear, warm cream interior background, graceful and balanced, natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  cat_cow:
    'Woman on all fours transitioning through cat-cow, spine arching upward in cat pose with chin tucked, beige yoga wear, warm wooden studio floor, flowing movement captured in a graceful single moment, soft natural side light --ar 4:3 --style raw --v 6.1 --q 2',

  shoulder_cross:
    'Woman standing with one arm drawn across chest, other hand gently pressing on elbow for shoulder stretch, relaxed but focused expression, beige activewear, warm cream studio, natural window light, simple mindful stretch --ar 4:3 --style raw --v 6.1 --q 2',

  pec_doorway:
    'Woman standing in a doorway with arms at 90 degrees pressing gently into the frame, chest open and stretched forward, beige linen clothes, warm light interior doorway, expansive open-chest posture, soft natural hall light --ar 4:3 --style raw --v 6.1 --q 2',

  child_pose:
    'Woman in childs pose on beige yoga mat, arms extended forward, forehead resting gently on mat, completely surrendered and restoring, beige linen yoga wear, warm cream wooden floor, soft natural light from the side, ultimate recovery pose --ar 4:3 --style raw --v 6.1 --q 2',

  lateral_stretch:
    'Woman standing with one arm overhead in a long lateral side stretch, other hand on hip, long graceful curve of the side body, beige activewear, warm cream minimal background, natural warm side light, fluid graceful pose --ar 4:3 --style raw --v 6.1 --q 2',

  pigeon_pose:
    'Woman in yoga pigeon pose, front knee bent and back leg extended, upper body folded forward over front shin, deep hip opener, beige linen yoga wear, warm wooden yoga studio, meditative surrender pose, soft natural overhead light --ar 4:3 --style raw --v 6.1 --q 2',
};

// ─── Image URL mapping ───────────────────────────────────────────────
// PLACEHOLDER URLs from picsum.photos (stable per seed, always available)
// → Replace each with your Midjourney-generated URL once images are ready
// CDN pattern: https://your-cdn.com/exercises/{id}.jpg
//   or Supabase: https://xxx.supabase.co/storage/v1/object/public/exercises/{id}.jpg

export const exerciseImages = {

  // ── BAS DU CORPS ──────────────────────────────────────────────────
  squat_barre:         'https://picsum.photos/seed/squat_barre/400/300',
  squat_gobelet:       'https://picsum.photos/seed/squat_gobelet/400/300',
  squat_sumo_barre:    'https://picsum.photos/seed/squat_sumo_barre/400/300',
  leg_press:           'https://picsum.photos/seed/leg_press/400/300',
  lunge_db:            'https://picsum.photos/seed/lunge_db/400/300',
  lunge_reverse:       'https://picsum.photos/seed/lunge_reverse/400/300',
  lunge_lateral:       'https://picsum.photos/seed/lunge_lateral/400/300',
  hip_thrust:          'https://picsum.photos/seed/hip_thrust/400/300',
  hip_thrust_uni:      'https://picsum.photos/seed/hip_thrust_uni/400/300',
  rdl_db:              'https://picsum.photos/seed/rdl_db/400/300',
  rdl_barre:           'https://picsum.photos/seed/rdl_barre/400/300',
  leg_curl:            'https://picsum.photos/seed/leg_curl/400/300',
  leg_extension:       'https://picsum.photos/seed/leg_extension/400/300',
  abduction_machine:   'https://picsum.photos/seed/abduction_machine/400/300',
  adduction_machine:   'https://picsum.photos/seed/adduction_machine/400/300',
  glute_bridge_w:      'https://picsum.photos/seed/glute_bridge_w/400/300',
  step_up:             'https://picsum.photos/seed/step_up/400/300',
  hack_squat:          'https://picsum.photos/seed/hack_squat/400/300',
  bulgarian_split:     'https://picsum.photos/seed/bulgarian_split/400/300',
  good_morning:        'https://picsum.photos/seed/good_morning/400/300',

  // ── HAUT DU CORPS ─────────────────────────────────────────────────
  bench_press_db:      'https://picsum.photos/seed/bench_press_db/400/300',
  bench_press_bar:     'https://picsum.photos/seed/bench_press_bar/400/300',
  incline_press:       'https://picsum.photos/seed/incline_press/400/300',
  chest_fly:           'https://picsum.photos/seed/chest_fly/400/300',
  push_up_weighted:    'https://picsum.photos/seed/push_up_weighted/400/300',
  db_row:              'https://picsum.photos/seed/db_row/400/300',
  barbell_row:         'https://picsum.photos/seed/barbell_row/400/300',
  lat_pulldown:        'https://picsum.photos/seed/lat_pulldown/400/300',
  seated_row:          'https://picsum.photos/seed/seated_row/400/300',
  pullover:            'https://picsum.photos/seed/pullover/400/300',
  bicep_curl:          'https://picsum.photos/seed/bicep_curl/400/300',
  hammer_curl:         'https://picsum.photos/seed/hammer_curl/400/300',
  barbell_curl:        'https://picsum.photos/seed/barbell_curl/400/300',
  tricep_pushdown:     'https://picsum.photos/seed/tricep_pushdown/400/300',
  assisted_dips:       'https://picsum.photos/seed/assisted_dips/400/300',
  shoulder_press:      'https://picsum.photos/seed/shoulder_press/400/300',
  lateral_raise:       'https://picsum.photos/seed/lateral_raise/400/300',
  front_raise:         'https://picsum.photos/seed/front_raise/400/300',
  reverse_fly:         'https://picsum.photos/seed/reverse_fly/400/300',
  face_pull:           'https://picsum.photos/seed/face_pull/400/300',
  shrugs:              'https://picsum.photos/seed/shrugs/400/300',

  // ── PÉRINÉE ───────────────────────────────────────────────────────
  kegel_slow:          'https://picsum.photos/seed/kegel_slow/400/300',
  kegel_fast:          'https://picsum.photos/seed/kegel_fast/400/300',
  kegel_hold:          'https://picsum.photos/seed/kegel_hold/400/300',
  kegel_expire:        'https://picsum.photos/seed/kegel_expire/400/300',
  kegel_seated:        'https://picsum.photos/seed/kegel_seated/400/300',
  kegel_standing:      'https://picsum.photos/seed/kegel_standing/400/300',
  kegel_squat:         'https://picsum.photos/seed/kegel_squat/400/300',
  kegel_3levels:       'https://picsum.photos/seed/kegel_3levels/400/300',
  reverse_kegel:       'https://picsum.photos/seed/reverse_kegel/400/300',
  elevator_kegel:      'https://picsum.photos/seed/elevator_kegel/400/300',

  // ── RESPIRATION ───────────────────────────────────────────────────
  diaphragm_breath:    'https://picsum.photos/seed/diaphragm_breath/400/300',
  breath_478:          'https://picsum.photos/seed/breath_478/400/300',
  breath_4462:         'https://picsum.photos/seed/breath_4462/400/300',
  coherence:           'https://picsum.photos/seed/coherence/400/300',
  ventral_breath:      'https://picsum.photos/seed/ventral_breath/400/300',
  costal_breath:       'https://picsum.photos/seed/costal_breath/400/300',
  complete_breath:     'https://picsum.photos/seed/complete_breath/400/300',
  box_breathing:       'https://picsum.photos/seed/box_breathing/400/300',
  long_expire:         'https://picsum.photos/seed/long_expire/400/300',
  belt_sync_breath:    'https://picsum.photos/seed/belt_sync_breath/400/300',

  // ── GAINAGE ───────────────────────────────────────────────────────
  plank_elbows:        'https://picsum.photos/seed/plank_elbows/400/300',
  plank_hands:         'https://picsum.photos/seed/plank_hands/400/300',
  side_plank:          'https://picsum.photos/seed/side_plank/400/300',
  side_plank_star:     'https://picsum.photos/seed/side_plank_star/400/300',
  dead_bug:            'https://picsum.photos/seed/dead_bug/400/300',
  bird_dog:            'https://picsum.photos/seed/bird_dog/400/300',
  hypo_crunch:         'https://picsum.photos/seed/hypo_crunch/400/300',
  mountain_climber_slow: 'https://picsum.photos/seed/mountain_climber_slow/400/300',
  hollow_hold:         'https://picsum.photos/seed/hollow_hold/400/300',
  leg_raise:           'https://picsum.photos/seed/leg_raise/400/300',
  vacuum_ab:           'https://picsum.photos/seed/vacuum_ab/400/300',
  bridge_plank:        'https://picsum.photos/seed/bridge_plank/400/300',
  plank_rotation:      'https://picsum.photos/seed/plank_rotation/400/300',
  bear_crawl_static:   'https://picsum.photos/seed/bear_crawl_static/400/300',

  // ── VACUUM ────────────────────────────────────────────────────────
  vacuum_standing:     'https://picsum.photos/seed/vacuum_standing/400/300',
  vacuum_seated:       'https://picsum.photos/seed/vacuum_seated/400/300',
  vacuum_quadruped:    'https://picsum.photos/seed/vacuum_quadruped/400/300',
  vacuum_lying:        'https://picsum.photos/seed/vacuum_lying/400/300',
  vacuum_forced:       'https://picsum.photos/seed/vacuum_forced/400/300',
  vacuum_pulsed:       'https://picsum.photos/seed/vacuum_pulsed/400/300',
  vacuum_perineum:     'https://picsum.photos/seed/vacuum_perineum/400/300',
  vacuum_bridge:       'https://picsum.photos/seed/vacuum_bridge/400/300',
  vacuum_dynamic:      'https://picsum.photos/seed/vacuum_dynamic/400/300',
  vacuum_postpartum:   'https://picsum.photos/seed/vacuum_postpartum/400/300',

  // ── ÉTIREMENTS ────────────────────────────────────────────────────
  psoas_stretch:       'https://picsum.photos/seed/psoas_stretch/400/300',
  hamstring_stretch:   'https://picsum.photos/seed/hamstring_stretch/400/300',
  figure_four:         'https://picsum.photos/seed/figure_four/400/300',
  butterfly_stretch:   'https://picsum.photos/seed/butterfly_stretch/400/300',
  back_ball:           'https://picsum.photos/seed/back_ball/400/300',
  spinal_twist:        'https://picsum.photos/seed/spinal_twist/400/300',
  quad_stretch:        'https://picsum.photos/seed/quad_stretch/400/300',
  cat_cow:             'https://picsum.photos/seed/cat_cow/400/300',
  shoulder_cross:      'https://picsum.photos/seed/shoulder_cross/400/300',
  pec_doorway:         'https://picsum.photos/seed/pec_doorway/400/300',
  child_pose:          'https://picsum.photos/seed/child_pose/400/300',
  lateral_stretch:     'https://picsum.photos/seed/lateral_stretch/400/300',
  pigeon_pose:         'https://picsum.photos/seed/pigeon_pose/400/300',
};

// ─── Helper ─────────────────────────────────────────────────────────
const FALLBACK = 'https://picsum.photos/seed/sensia_default/400/300';

export function getExerciseImage(exerciseId) {
  return exerciseImages[exerciseId] || FALLBACK;
}

export default exerciseImages;

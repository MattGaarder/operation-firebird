<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="medical_services" class="project-icon code-journal-icon" />
        <div class="project-info">
          <div class="project-title">med-jp</div>
        </div>
      </q-card-section>

      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline">
        A local, privacy-first "broken-notes → meaning" engine for Japanese ⇄ English medical interpreting.
        <q-separator class="invisi" />
        Takes the half-spelled, half-heard, typed-in-a-hurry romaji of a Japanese patient's sentence, works out what was <strong>actually said</strong> through deterministic linguistic analysis and vector semantics, and hands a clean reconstruction to an on-device LLM for literal translation.
        <q-separator class="separator invisi" />
        <div class="text-caption text-weight-medium q-mb-xs" style="color: var(--caption-text, #43A28F);">
          <code>Node.js (ESM)</code> · <code>WanaKana</code> · <code>Fuse.js</code> · <code>SQLite</code> · <code>HNSW (hnswlib)</code> · <code>Qwen3 embeddings (4096-d)</code> · <code>Ollama (Qwen3.5)</code> · <code>JMdict</code> · <code>MeSH</code>
        </div>
        <q-separator class="separator invisi" />
        <em>
          "Deterministic first, semantic second: cheap, explainable, rule-based methods generate and prune hypotheses, while 4096-d embeddings arbitrate between the survivors."
        </em>
      </div>

      <!-- Code Snippets (expandable with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info">
              Code Snippets
            </h1>
          </div>
        </template>

        <q-separator />

        <!-- Carousel for Code Snippets -->
        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel
              v-model="codeSlide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              arrows
              navigation
              navigation-position="top"
              height="auto"
              width="100%"
              class="rounded-borders"
            >
              <!-- Slide 1: Pipeline Architecture & Worked Trace -->
              <q-carousel-slide :name="1" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>1. Pipeline Architecture & Worked Clinical Trace</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="pipelineSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: Positional Typo Alignment (buildHiraToRawMap) -->
              <q-carousel-slide :name="2" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Positional Typo Alignment (buildHiraToRawMap)</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="alignmentSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 3: Variant Factory & Corruption Detection -->
              <q-carousel-slide :name="3" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Variant Factory & Corruption Detection Heuristics</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="variantFactorySnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 4: Deinflection & Dictionary POS Legality Oracle -->
              <q-carousel-slide :name="4" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>4. Recursive Deinflector & Dictionary POS Legality Oracle</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 4 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="deinflectSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 5: Semantic Reranking with HNSW Vector Space -->
              <q-carousel-slide :name="5" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>5. Semantic Reranking with Empirical Noise Floor & HNSW</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 5 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="rerankSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 6: Canonical Scoring Model (linguistics.js) -->
              <q-carousel-slide :name="6" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>6. Canonical 3-Stage Scoring Model (linguistics.js)</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 6 / 6</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="scoringSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info">
              More Information
            </h1>
          </div>
        </template>

        <q-separator />

        <!-- Carousel for More Information -->
        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel
              v-model="infoSlide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              arrows
              navigation
              navigation-position="bottom"
              height="auto"
              width="100%"
              class="rounded-borders"
            >
              <!-- Slide 1: Clinical Motivation, Privacy & Architecture -->
              <q-carousel-slide :name="1" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>1. Clinical Motivation, Privacy & Architecture</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>The Interpreting Dilemma:</strong>
                        Japanese medical interpreting requires listening to fast, agglutinative speech while typing real-time romaji notes. Grammatical suffixes stack heavily (<code>tabe-rare-nakatta</code>, "was not able to eat"), producing hurried, corrupted notes with dropped vowels, swapped consonants, and fused tokens (<code>kitsueninshu tabako ha arimasu ka</code>).
                      </li>
                      <li>
                        <strong>The LLM Hallucination Hazard:</strong>
                        Feeding broken romaji directly to translators or LLMs yields confident, dangerous nonsense: e.g. turning <code>shinda hou ga mashi</code> ("I'd be better off dead") into a sentence about taking the subway. In clinical healthcare, such failures are unviable.
                      </li>
                      <li>
                        <strong>100% On-Device Privacy:</strong>
                        Patient health information (PHI) must never leave the machine. The entire engine runs locally via Ollama (Qwen3.5 LLM + Qwen3 embeddings), an on-disk HNSW vector index, and SQLite.
                      </li>
                      <li>
                        <strong>Deterministic First, Semantic Second:</strong>
                        Cheap, explainable, rule-based linguistic methods generate and prune candidates first. 4096-d embeddings only arbitrate between the survivors, rather than asking the LLM to guess unconstrained text.
                      </li>
                      <li>
                        <strong>Data Layer Architecture:</strong>
                        Builds on <code>vocab-v3.jsonl</code> (18 GB canonical store with 4096-d embeddings), <code>vocab.db</code> (94 MB SQLite storing 204,561 entries + grammar tables), and <code>hnsw.index</code> (3.4 GB native binary graph for O(1) vector access).
                      </li>
                    </ul>
                  </div>
                  <q-card-section v-if="images && images[1]" class="project-demo">
                    <q-img :src="images[1]" class="project-gif" />
                  </q-card-section>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: Candidate Engine, Deinflector & Typo Alignment -->
              <q-carousel-slide :name="2" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Candidate Engine, Deinflector & Typo Alignment</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Corruption Detection & Repair:</strong>
                        A correctly typed romaji string converted to kana leaves zero Latin letters. Leftover characters (e.g. <code>okiagru</code> → <code>おきあgる</code>) provide an exact fingerprint of missing vowels, triggering synthesized vowel insertions (<code>okiagaru</code>).
                      </li>
                      <li>
                        <strong>Phonetic Mutation Synthesis:</strong>
                        Generates variants for dropped geminates / っ / ん (<code>hanou</code> → <code>hannou</code>), voiced/unvoiced dakuten swaps (<code>k↔g</code>, <code>s↔z</code>, <code>t↔d</code>), and WanaKana canonical round-tripping (<code>jya</code> → <code>ja</code>, <code>si</code> → <code>shi</code>).
                      </li>
                      <li>
                        <strong>Recursive Deinflection Engine:</strong>
                        Implements breadth-first unwinding over Japanese verbs/adjectives, recording reason chains (<code>Potential → Negative → Past</code>). Translates JMdict POS tags into bitmasks (<code>v1</code>, <code>v5*</code>, <code>vk</code>, <code>vs</code>, <code>adj-i</code>) to serve as a legality check: the grammar proposes, the dictionary vetoes.
                      </li>
                      <li>
                        <strong>Strong Verb Gate:</strong>
                        Detects long, validly conjugated verbs (e.g. <code>taberarenakatta</code> → <code>taberu</code>) and short-circuits them early before expensive beam segmentation.
                      </li>
                      <li>
                        <strong>Positional Alignment (buildHiraToRawMap):</strong>
                        Connects hiragana character indices back to original raw romaji indices via Uint8Array mapping. Beam search navigates clean kana syllables while scoring against authentic user typos.
                      </li>
                    </ul>
                  </div>
                  <q-card-section v-if="images && images[2]" class="project-demo">
                    <q-img :src="images[2]" class="project-gif" />
                  </q-card-section>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 3: Viterbi Beam Search, Suffix Peeling & MeSH Ontology -->
              <q-carousel-slide :name="3" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Viterbi Beam Search, Suffix Peeling & MeSH Ontology</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Viterbi-Style Beam Search:</strong>
                        When fused chunks fail whole-token matching (e.g. <code>kitsueninshu</code>), dynamic programming explores competing segmentations over hiragana with beam width 3, memoisation, and an expensive passthrough fallback (<code>8000 - 50·len</code>).
                      </li>
                      <li>
                        <strong>Grammar Suffix Peeling & Orphan Merging:</strong>
                        Loads 817 sentence-pattern anchors (from an EPUB grammar dictionary) to peel endings like <code>から</code>, <code>たり</code>, <code>ように</code> off stems. Post-beam passes detect multi-token patterns and re-merge low-confidence orphans across whitespace when scores improve by &gt; 20%.
                      </li>
                      <li>
                        <strong>MeSH 2026 Clinical Ontology Annotation:</strong>
                        Annotated 8,793 dictionary entries against MeSH descriptor trees (<code>C → disease</code>, <code>D → drug</code>, <code>F → psychiatric</code>). Graded token importance and multi-token coherence prevent false hits, injecting clinical weights that resolve ambiguous homophones (e.g. <code>zensoku</code> → asthma).
                      </li>
                      <li>
                        <strong>Semantic Reranking in HNSW Vector Space:</strong>
                        Averages the stored 4096-d vectors of ±3 neighboring winners blended with sentence embedding. An empirical noise floor (<code>cosSim &gt; 0.60</code>) and exact-match protection ceilings prevent loose fuzzy candidates from overtaking valid terms.
                      </li>
                      <li>
                        <strong>RAG Injection & Few-Shot Prompting:</strong>
                        Builds queries using the stored <code>combined_text</code> of top candidates, runs hybrid ANN retrieval (0.7 semantic + 0.3 lexical + 0.2 anchor), filters out grammar noise, and streams literal 1st-person translations via Ollama.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 4: Evaluation Harness, Safety Lessons & Multilingual Future -->
              <q-carousel-slide :name="4" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>4. Evaluation Harness, Safety Lessons & Multilingual Future</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 4 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>15-Case Evaluation Harness:</strong>
                        Maintains an automated test suite of 15 realistic, messy clinical cases (fused words, dropped vowels, katakana substance names, mental-health screening). Generates timestamped diff reports tracking token decisions, RAG hits, and LLM translations.
                      </li>
                      <li>
                        <strong>Crucial Safety Finding:</strong>
                        Identified safety-critical failure modes such as suicidal-ideation screening idioms (<code>shinda hou ga mashi</code>) and homophones (<code>sesshu</code> inoculation vs ingestion). Clearly demonstrates that this tool is designed for human-in-the-loop interpreter decision support, never unmonitored translation.
                      </li>
                      <li>
                        <strong>Vector Space Engineering Lessons:</strong>
                        Embeddings are only comparable when drawn from the same space (neighbour-vs-candidate, not word-vs-sentence). Descriptive <code>combined_text</code> embedding (romaji + kanji + kana + POS + glosses) clustered clinical semantics far more reliably than bare words.
                      </li>
                      <li>
                        <strong>The "Ultimate Autocomplete" Vision:</strong>
                        Generalizes the medical interpreter pipeline into an on-device, multilingual intent recovery engine for multilingual typists. Formulates typing as a noisy-channel model: <code>P(typed | intended) × P(intended | context)</code>.
                      </li>
                      <li>
                        <strong>Compact On-Device Roadmap:</strong>
                        Matryoshka dimension truncation (4096 → 256 dims) and product quantization reduce the 3.4 GB index to ~50 MB, fitting a cross-lingual, code-switching keyboard engine directly onto mobile devices without privacy compromises.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
      <div class="bumper"></div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  containerWidth: {
    type: Number,
    default: 0
  }
});

const isNarrow = computed(() => props.containerWidth > 0 && props.containerWidth < 700);

const codeSlide = ref(1);
const infoSlide = ref(1);

// Snippet 1: End-to-End Pipeline & Real Worked Trace
const pipelineSnippet = `/* =========================================================================
 * 1. PIPELINE ARCHITECTURE & WORKED CLINICAL TRACE
 * Three phases: Generate hypotheses → Score & Prune → Viterbi-style Selection.
 * Augmented by RAG & translated 100% locally with Ollama (Qwen3.5).
 * ========================================================================= */

Raw broken romaji: "kitsueninshu tabako arimasu ka"
  │
  ▼
[Chunking] ── split on whitespace / punctuation
  ├── Chunk 1: "kitsueninshu" (whole-chunk score < 1100, fails verb gate)
  │     └── [Beam Search over Hiragana] "きつえにんしゅ"
  │           ├── WanaKana greedy read: 'n' + 'i' becomes 'に' (n-ambiguity)
  │           ├── buildHiraToRawMap preserves original raw romaji typos
  │           ├── Winning path: きつえ (kitsuen, smoking) | にんしゅ (inshu, drinking)
  │           │   final_cost: 4928  (vs 7665 passthrough fallback)
  │           └── Rejected: きつえにんしゅ (whole passthrough), きつえに|んしゅ
  │
  ├── Chunk 2: "tabako" ── Exact dictionary hit (score > 1100, short-circuit)
  │
  ├── Chunk 3: "arimasu" ── Strong Verb Gate:
  │     └── [Verb Gate Triggered] "arimasu" -> "aru" (steps: 1, dist: 0.00)
  │
  └── Chunk 4: "ka" ── PARTICLE_MAP -> か (question particle)

[Cross-Token Grammar Collapse]
  └── Orphan merge & multi-token pattern validation (grammarPeel.js)

[HNSW Semantic Rerank (4096-d Vector Space)]
  └── Cosine similarity vs ±3 neighbor context vectors + sentence embedding
  └── kitsuen & inshu boosted above 0.60 noise floor by tobacco/alcohol context

[RAG Injection & Local LLM Translation]
  ├── Query: Stored combined_text of winning candidate tokens
  ├── ANN Search -> Clinical Glossary: [kitsuen: smoking, inshu: drinking]
  └── Ollama (Qwen3.5, temp 0, literal 1st-person):
      "I have a history of smoking tobacco and drinking alcohol."`;

// Snippet 2: Positional Typo Alignment (buildHiraToRawMap)
const alignmentSnippet = `/* =========================================================================
 * 2. POSITIONAL TYPO ALIGNMENT: buildHiraToRawMap
 * From: src/preprocessor.js
 *
 * Problem: Beam search explores hiragana space (where syllable boundaries are
 * well-defined), but matchers must score what the user ACTUALLY typed (because
 * typos live in the raw romaji). The two strings don't align 1-to-1 ('shi'=3
 * letters, 1 kana; 'kk'=2 letters, 1 'っ').
 *
 * Solution: Map each kana character back to its raw romaji index so prefix
 * windows [j, i) slice the authentic original spelling, preserving all typos.
 * ========================================================================= */

export function buildHiraToRawMap(rawChunk, hiraChunk) {
  const hiraToRaw = new Uint8Array(hiraChunk.length + 1);
  let hIdx = 0;

  for (let rIdx = 0; rIdx < rawChunk.length; rIdx++) {
    // Convert progressively growing raw prefixes
    const subH = wanakana.toHiragana(rawChunk.slice(0, rIdx + 1));
    
    // Any newly emitted kana points to this exact raw letter index
    while (hIdx < subH.length) {
      hiraToRaw[hIdx] = rIdx;
      hIdx++;
    }
  }

  // Anchor the end-of-string boundary
  hiraToRaw[hiraChunk.length] = rawChunk.length - 1;
  return hiraToRaw;
}

// Usage inside beam search prefix evaluation:
// const rawSegment = rawChunk.slice(hiraToRaw[j], hiraToRaw[i] + 1);
// -> Evaluates authentic typos while segmenting in clean kana space!`;

// Snippet 3: Variant Factory & Corruption Detection
const variantFactorySnippet = `/* =========================================================================
 * 3. VARIANT FACTORY & CORRUPTION DETECTION
 * From: src/preprocessor.js
 *
 * Hypothesis generation: Encodes the typical ways a rushed medical
 * interpreter corrupts romaji notes under intense clinical time pressure.
 * ========================================================================= */

export function generateVariants(chunk) {
  const variants = new Map();
  variants.set(chunk, { type: 'original', penalty: 0 });

  // 1. CORRUPTION DETECTION (Fingerprint dropped vowels)
  // A correct romaji string converted to kana leaves ZERO Latin letters.
  // Any leftover Latin character pinpoints the exact typo site!
  const hiraganaRaw = wanakana.toHiragana(chunk); // e.g. 'okiagru' -> 'おきあgる'
  if (/[a-z]/.test(hiraganaRaw)) {
    // Locate the stuck consonant cluster and synthesize vowel insertions:
    for (const v of ['a', 'i', 'u', 'e', 'o']) {
      const repaired = insertVowelAtError(chunk, v); // -> 'okiagaru'
      variants.set(repaired, { type: 'exact:repair', penalty: 50 });
    }
  }

  // 2. CONSONANT DOUBLING (Recover dropped geminates / っ / ん)
  // Rushed typing often misses doubled consonants: 'hanou' -> 'hannou'
  for (const c of ['k', 's', 't', 'p', 'c', 'n']) {
    const doubled = doubleConsonant(chunk, c);
    if (doubled) variants.set(doubled, { type: 'exact:doubling', penalty: 100 });
  }

  // 3. DAKUTEN / PHONETIC SWAPS (Voiced <-> unvoiced confusions)
  // 'k' <-> 'g', 's' <-> 'z', 't' <-> 'd', 'h' <-> 'b'
  const swapped = swapPhonetics(chunk);
  for (const s of swapped) {
    variants.set(s, { type: 'exact:phonetic', penalty: 100 });
  }

  // 4. WANAKANA ROUND-TRIP (Collapse non-Hepburn romanizations)
  // 'si' -> 'shi', 'tu' -> 'tsu', 'jya' -> 'ja', 'ou' -> 'oo'
  const normalized = wanakana.toRomaji(wanakana.toHiragana(chunk));
  if (normalized !== chunk) {
    variants.set(normalized, { type: 'normalized', penalty: 20 });
  }

  return variants;
}`;

// Snippet 4: Deinflection & Dictionary POS Legality Oracle
const deinflectSnippet = `/* =========================================================================
 * 4. RECURSIVE DEINFLECTION & DICTIONARY POS LEGALITY ORACLE
 * From: src/deinflect.js & src/preprocessor.js
 *
 * Unwinds multi-layer conjugations (e.g. 'taberarenakatta' -> 'taberu')
 * breadth-first, recording reason chains. Uses JMdict POS bitmasks to veto
 * grammatically invalid morphological hypotheses.
 * ========================================================================= */

// Rule table: [from-ending, to-ending, fromType, toType, reasons, weight]
const DEINFLECTION_RULES = [
  ['かった',      'い', Initial,   IAdj,     ['Past'],              1.0], // ...katta -> ...i
  ['ければ',      'い', Initial,   IAdj,     ['Ba'],                1.0], // ...kereba -> ...i
  ['ませんでした', '',   Initial,   MasuStem, ['PolitePastNeg'],     1.0],
  ['られ',        'る', Initial,   Ichidan,  ['Potential/Passive'], 1.0], // ...rare -> ...ru
  ['なかっ',      'い', Initial,   IAdj,     ['Negative'],          1.0], // ...nakat -> ...i
  ['た',          'る', TaTeStem,  Ichidan,  ['Past'],              1.0]
];

// Bit-flag verb/adjective classes:
// IchidanVerb (v1) | GodanVerb (v5*) | KuruVerb (vk) | SuruVerb (vs) | IAdj (adj-i)

export function deinflectWord(surfaceKana, dictLookup) {
  const candidates = bfsExpandRules(surfaceKana, DEINFLECTION_RULES);

  for (const candidate of candidates) {
    const wordEntry = dictLookup.get(candidate.rootRomaji);
    if (!wordEntry) continue;

    // THE CLEVER BIT: The grammar engine proposes, the dictionary vetoes!
    const dictVerbClass = mapPosToVerbClass(wordEntry.pos);
    const isLegal = (dictVerbClass & candidate.requiredType) !== 0;

    if (!isLegal) continue; // POS in JMdict is incompatible with this inflection!

    return {
      root: wordEntry.romaji,
      reasons: candidate.reasons, // e.g. ["Potential", "Negative", "Past"]
      confidence: candidate.totalWeight
    };
  }
}`;

// Snippet 5: Semantic Reranking with HNSW Vector Space
const rerankSnippet = `/* =========================================================================
 * 5. SEMANTIC RERANKING IN HNSW VECTOR SPACE
 * From: src/preprocessor.js
 *
 * Uses 4096-d Qwen3-embeddings stored in native HNSW memory to resolve
 * ambiguous homophones (e.g. 'kitsuen' smoking vs 'kotsuen' osteitis)
 * based on surrounding clinical context.
 * ========================================================================= */

export function rerankTrace(tokens, queryEmbedding, hnswIndex) {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.candidates.length <= 1) continue;

    // 1. Build context vector from ±3 neighbor winner vectors + sentence query
    const neighborVectors = getNeighborVectors(tokens, i, 3);
    const contextVector = blendVectors(neighborVectors, queryEmbedding);

    for (const cand of token.candidates) {
      // 2. O(1) native retrieval from hnsw.index
      const candVector = hnswIndex.getPoint(cand.label);
      const cosSim = cosineSimilarity(candVector, contextVector);

      // 3. Empirical noise floor: cosine < 0.60 is noise for Qwen3-Embedding
      if (cosSim > 0.60) {
        const ratio = Math.min(1.0, (cosSim - 0.60) / 0.15);
        const rawBoost = MAX_BOOST * ratio; // MAX_BOOST = 450
        const typoPenaltyDecay = Math.max(0, 1 - cand.distance * 3);
        cand.semanticBoost = rawBoost * typoPenaltyDecay;
        cand.finalScore += cand.semanticBoost;
      }

      // 4. Safety Protection Rules:
      // Exact hits require cosSim >= 0.95 from a competitor to be flipped!
      if (token.winner.isExact && cosSim < 0.95) {
        cand.finalScore = Math.min(cand.finalScore, token.winner.finalScore - 1);
      }
    }

    // Re-sort token candidates with semantic arbitrations applied
    token.candidates.sort((a, b) => b.finalScore - a.finalScore);
    if (token.candidates[0] !== token.winner) {
      console.log(\`⭐ [FLIP TRIGGERED] \${token.surface} -> \${token.candidates[0].romaji}\`);
      token.winner = token.candidates[0];
    }
  }
}`;

// Snippet 6: Canonical Scoring Model (linguistics.js)
const scoringSnippet = `/* =========================================================================
 * 6. CANONICAL SCORING MODEL (linguistics.js)
 * From: src/config/linguistics.js
 *
 * One unified scoring function used by runtime preprocessor, ANN search,
 * and offline builder to rank hypotheses deterministically.
 * ========================================================================= */

export function calculateCandidateScore(cand, inputSurface, isBeam = false) {
  // STAGE 1: Lexical Desirability (Is this a word I'd expect in clinic?)
  let lexical = cand.freqTier; // Core-6k: 100, 90, 80... or JMdict nfBand
  lexical += cand.priorityBonus; // ichi1 (+40), news1 (+30), spec1 (+50)
  lexical += getMeshDomainBonus(cand.meshDomains); 
  // mesh_disease (+100), mesh_drug (+90), mesh_psychiatric (+80), anatomy (+40)

  // STAGE 2: Match Reliability (How did I find it, how far off was it?)
  // Tiers: EXACT (1000) | GRAMMAR_PEEL (980) | NORMALIZED (950) | FUZZY (800)
  let tier = MATCH_TIERS[cand.matchType] - cand.variantPenalty;
  const decay = Math.max(0, 1 - Math.pow(3 * cand.fuzzyDistance, 2));
  const typoPenalty = Math.pow(cand.fuzzyDistance, 2) * 250 * 5;
  const lengthPenalty = cand.isDeinflected ? 0 : 80 * Math.abs(inputSurface.length - cand.romaji.length);

  let confidence = tier + (lexical * decay) - typoPenalty - lengthPenalty;

  // STAGE 3: Segmentation Fitness (Dynamic programming cost adjustments)
  if (isBeam) {
    if (cand.isExact) confidence += 400 + (50 * cand.romaji.length);
    confidence += 150 * Math.log2(cand.romaji.length + 1); // Anti-fragmentation
    if (cand.romaji.length === 1 && !cand.isExact) confidence -= 500;
  }

  return Math.round(confidence);
}`;
</script>

<style scoped>
/* Scoped adjustments for med-jp */
</style>

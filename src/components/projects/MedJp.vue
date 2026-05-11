<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
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
        Hybrid Japanese medical-language preprocessing and retrieval pipeline designed to normalize noisy romaji
        input into linguistically coherent Japanese token streams.
        <q-separator class="invisi" />

        Combines fuzzy retrieval, recursive deinflection, beam-search segmentation, grammar peeling,
        contextual semantic reranking, and vector-based candidate resurrection into a unified NLP pipeline
        specialised for Japanese medical terminology and grammar ambiguity resolution.

        <q-separator class="separator invisi" />

        <em>
          "A custom Japanese NLP engine combining IME-style normalization, grammatical reasoning,
          semantic reranking, and typo-tolerant medical language retrieval."
        </em>
      </div>

      <!-- Code Snippets (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info">
              Pipeline
            </h1>
          </div>
        </template>

        <q-separator />

        <!-- Code block -->
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
      <code class="language-js" :textContent="exampleCode"></code>
      </pre>
          </q-scroll-area>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable) -->
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

        <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">

          <div class="project-body-left">
            <ul class="feature-list">

              <li>
                <strong>Romaji ↔ Kana Canonicalization:</strong>
                Built a typo-tolerant normalization layer using
                <code>WanaKana</code>,
                phonetic mutation systems,
                consonant doubling synthesis,
                dakuten swaps,
                and corruption repair heuristics to stabilize noisy romaji input.
              </li>

              <li>
                <strong>Recursive Deinflection Engine:</strong>
                Implemented weighted conjugation-chain traversal capable of resolving
                Japanese verb/adjective inflections through legality-aware grammatical peeling,
                verb-class masking,
                canonical suffix recovery,
                and fuzzy suffix matching.
              </li>

              <li>
                <strong>Beam Search Tokenization:</strong>
                Designed a Viterbi-style segmentation engine that evaluates competing token paths
                using cumulative linguistic costs,
                grammar-aware beam insertion,
                contextual confidence scoring,
                and dynamic prefix exploration.
              </li>

              <li>
                <strong>Grammar Peel System:</strong>
                Developed anchored grammar suffix extraction capable of identifying and separating
                constructions such as
                <code>から</code>,
                <code>たり</code>,
                <code>ように</code>,
                and other multi-token grammatical patterns before reinserting them into beam evaluation.
              </li>

              <li>
                <strong>Fuse.js Candidate Retrieval:</strong>
                Integrated fuzzy lexical retrieval with weighted candidate scoring,
                edit-distance-aware ranking,
                frequency priors,
                and exact-match safety ceilings to reduce hallucinated matches.
              </li>

              <li>
                <strong>Semantic Reranking:</strong>
                Implemented HNSW vector reranking with neighbor-context semantic boosting,
                cosine-similarity scoring,
                and contextual candidate resurrection to improve ambiguity resolution
                within dense medical vocabulary.
              </li>

              <li>
                <strong>Architecture:</strong>
                Combines concepts from IMEs,
                morphological analyzers,
                fuzzy search engines,
                deinflectors,
                semantic retrieval systems,
                and grammar parsers into a unified Japanese medical NLP pipeline.
              </li>

            </ul>
          </div>



        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
      <div class="bumper"></div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue';
import codeExample from '../../assets/snippets/med-jp-pipeline.txt?raw';

const exampleCode = ref(codeExample);


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

console.log('containerWidth:', props.containerWidth)
watch(isNarrow, v => console.log('isNarrow changed:', v))

console.log('CodeJournal props.images:', props.images);

</script>

<style scoped>

</style>

<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="translate" class="project-icon" />
        <div class="project-info">
          <div class="project-title">
            ANKIFY TOOLBAR
            <span class="sub">(Electron / Vue / AnkiConnect)</span>
          </div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        An Electron tray/toolbar app for Japanese learners: paste Japanese text, run it through
        <code>kuromoji</code> morphology analysis, cherry-pick content words, and turn them into
        structured Anki notes with a couple of clicks.
        <q-separator class="invisi" />
        The renderer is a small Vue/Quasar UI that tokenizes input, deduplicates lemmas into
        clickable chips, fans out Jisho lookups for selected terms, and lets you pick which
        senses become card backs. A dedicated Electron main process provides IPC endpoints for
        dictionary lookups, AnkiConnect calls, and <code>kuromoji</code> tokenization, all behind
        a minimal tray popover.
        <q-separator class="separator invisi" />
        <em>
          “Paste once, pick your kanji, and instantly grow your Anki deck — a focused Japanese
          study flow living in your menu bar.”
        </em>
      </div>

      <!-- Code Snippets heading -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info-code">Code Snippets</h1>
      <q-separator class="separator" />

      <div class="carousel-wrapper">
        <q-carousel
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          control-color="black"
          navigation
          height="auto"
          width="100%"
          class="rounded-borders"
          navigation-position="bottom"
        >
          <!-- Slide 1: Renderer – token chips + Jisho lookup + Anki add -->
          <q-carousel-slide :name="1" class="column no-wrap">
            <!-- Code block -->
            <q-card-section class="project-code">
              <q-scroll-area class="code-container">
                <pre v-prism class="prism-block">
<code class="language-js" :textContent="ankifyRendererCode"></code>
                </pre>
              </q-scroll-area>
            </q-card-section>

            <!-- Further Information -->
            <q-separator class="separator" />
            <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
            <q-separator class="separator-info separator-info-exception" />

            <q-card-section
              class="project-body-exception"
              :class="{ 'stacked-layout': isNarrow }"
            >
              <div class="project-body-left">
                <ul class="feature-list">
                  <li>
                    <strong>Tokenization Flow:</strong>
                    User input is analyzed via <code>window.ankify.tokenize()</code>, which calls into
                    the Electron side to run <code>kuromoji</code> over the text and return a full
                    token list.
                  </li>
                  <li>
                    <strong>Content-Word Filtering:</strong>
                    Tokens are filtered down to content words
                    (<code>['名詞','動詞','形容詞']</code>) and normalized to
                    <code>basic_form</code> or <code>surface_form</code> before being deduplicated
                    into <code>uniqueTokens</code>.
                  </li>
                  <li>
                    <strong>Chip-Based Selection:</strong>
                    Each unique term becomes a clickable <code>&lt;q-chip&gt;</code>; selection is
                    tracked in a <code>Set</code> and can be toggled, or bulk-set via “All/None”
                    controls.
                  </li>
                  <li>
                    <strong>Jisho Fan-Out:</strong>
                    <code>lookupSelected()</code> fans out requests via
                    <code>window.ankify.dictLookup</code> (IPC into main), normalizes results with
                    <code>normalizeItem()</code>, and flattens/dedupes by <code>headword</code>.
                  </li>
                  <li>
                    <strong>ResultList Component:</strong>
                    Each result card shows a headword + gloss, an “Add to Anki” button, and an
                    expansion section where the user can toggle individual senses via checkboxes,
                    with a small chip showing <code>selected/total</code> sense counts.
                  </li>
                  <li>
                    <strong>Learned:</strong>
                    Vue 3 composition API for async flows, representing selection with
                    <code>Set</code> + forced reactivity, and designing a compact yet expressive
                    UX for token-based vocabulary extraction.
                  </li>
                </ul>
              </div>
              <q-card-section class="project-demo">
                <video
                  :src="ankifyDemo"
                  class="project-video"
                  autoplay
                  loop
                  muted
                  playsinline
                ></video>
              </q-card-section>
            </q-card-section>
          </q-carousel-slide>

          <!-- Slide 2: Electron main – tray window + IPC bridges + kuromoji -->
          <q-carousel-slide :name="2" class="column no-wrap">
            <!-- Code block -->
            <q-card-section class="project-code">
              <q-scroll-area class="code-container">
                <pre v-prism class="prism-block">
<code class="language-js" :textContent="ankifyMainCode"></code>
                </pre>
              </q-scroll-area>
            </q-card-section>

            <!-- Further Information -->
            <q-separator class="separator" />
            <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
            <q-separator class="separator-info separator-info-exception" />

            <q-card-section
              class="project-body-exception"
              :class="{ 'stacked-layout': isNarrow }"
            >
              <div class="project-body-left">
                <ul class="feature-list">
                  <li>
                    <strong>Tray Popover Window:</strong>
                    The Electron <code>BrowserWindow</code> is frameless, always-on-top, and
                    positioned under the tray icon (macOS) or above the taskbar (Windows) for a
                    quick “summon, paste, close” workflow.
                  </li>
                  <li>
                    <strong>Global Shortcut:</strong>
                    A global <code>CommandOrControl+Shift+F</code> shortcut toggles the popover,
                    letting you bring Ankify into focus from anywhere to paste text and create cards.
                  </li>
                  <li>
                    <strong>IPC for Jisho:</strong>
                    <code>ipcMain.handle('dict:lookup')</code> wraps the Jisho REST API and surfaces
                    results as <code>{ ok, data }</code> so the renderer only sees a clean JSON
                    contract.
                  </li>
                  <li>
                    <strong>AnkiConnect Bridge:</strong>
                    <code>ipcMain.handle('ankiconnect:invoke')</code> wraps the AnkiConnect HTTP
                    protocol using Node’s <code>http.request</code>, handling timeouts, JSON
                    parsing, and error propagation for actions like <code>addNote</code>.
                  </li>
                  <li>
                    <strong>Centralized Morphology:</strong>
                    The main process builds a single <code>kuromoji</code> tokenizer instance and
                    exposes <code>'morph:tokenize'</code>, so all tokenization is fast and
                    centralized with a cached dictionary.
                  </li>
                  <li>
                    <strong>Learned:</strong>
                    Electron main/renderer separation, IPC design, tray UX patterns, and wrapping
                    external HTTP APIs (Jisho + AnkiConnect) behind a focused language-learning UI.
                  </li>
                </ul>
              </div>
              <q-card-section class="project-demo">
                <q-img
                  :src="props.images[1]"
                  class="project-gif"
                  alt="Ankify toolbar popover demo"
                />
              </q-card-section>
            </q-card-section>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue';

// Snippet text files (renderer + Electron main). Adjust paths/names as needed.
import ankifyRenderer from '../../assets/snippets/ankify-renderer.txt?raw';
import ankifyMain from '../../assets/snippets/ankify-main.txt?raw';
// import ankifyDemo from '../../assets/animations/ankify-demo.mp4';

const ankifyRendererCode = ref(ankifyRenderer);
const ankifyMainCode = ref(ankifyMain);

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

const isNarrow = computed(
  () => props.containerWidth > 0 && props.containerWidth < 700
);

const slide = ref(1);

// Optional debugging, matching your existing style
console.log('Ankify props.images:', props.images);
watch(isNarrow, v => console.log('Ankify isNarrow changed:', v));
</script>

<style scoped>
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: 0.8rem;
  margin-bottom: 0.1rem;
  padding: 0;
}

.info-code {
  font-size: 0.9rem;
  color: black;
  padding: 0;
  padding-left: 1.2rem;
}

.info-exception {
  margin-left: 1rem;
}

.sub {
  color: #6b7c94;
  font-size: small;
  font-weight: 400;
  padding-left: 0.6rem;
}

.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

.projects-wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgb(253, 253, 253);
}

.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: white;
  margin: 0.6rem;
  padding: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* header: icon + info, wrapping when too narrow */
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--q-color-grey-1);
  margin-top: 0.7rem;
}

.project-icon {
  height: auto;
  border-radius: 4px;
  color: #2b6caf;
  font-size: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.4rem;
}

.project-info {
  flex: 1 1 auto;
  min-width: 0;
}

.project-title {
  font-size: 1.55rem;
  font-weight: 600;
  margin-top: auto;
  margin-left: 0.3rem;
}

.project-tagline {
  padding: 1.5rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.q-card__section--vert {
  padding: 8px;
}

/* feature list section */
.project-body-exception {
  padding-left: 1rem;
  display: flex;
  gap: 1rem;
}

.project-body-left {
  flex: 0 1 50%;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* demo GIF / video */
.project-demo {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}

.project-gif {
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.project-video {
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
}

.separator-info-exception {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.project-code {
  background-color: #ecf2f8;
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

/* scrollable code */
.code-container {
  height: 350px;
  margin-top: -0.5rem;
  font-size: 0.7rem;
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}

/* stack text + video on small screens */
@media (max-width: 600px) {
  .project-body-exception {
    flex-direction: column;
    padding-top: 0;
  }

  .project-video {
    align-self: center;
    width: 100%;
    max-width: 100%;
    margin-top: -1rem;
  }
}

.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ecf2f8;
}

.carousel-wrapper {
  width: 102.1%;
  margin-left: -0.8rem;
}

.q-carousel__slide,
.q-carousel .q-carousel--padding {
  padding: 0px;
}

.stacked-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stacked-layout .project-body-left,
.stacked-layout .project-demo {
  flex: 0 0 auto;
  width: 100%;
  margin-top: -1rem;
  margin-bottom: 2rem;
}

.stacked-layout .project-body-left,
.stacked-layout .project-video {
  width: 100%;
  margin-bottom: 0.5rem;
}

.stacked-layout .project-demo {
  padding: 0rem;
  width: 104%;
  margin-bottom: 1rem;
  margin-left: -0.5rem;
}
</style>
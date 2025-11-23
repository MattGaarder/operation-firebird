<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="code" class="project-icon" />
        <div class="project-info">
          <div class="project-title">CODE JOURNAL</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        A minimalist, browser-based Markdown journal built with vanilla JavaScript and the Web Storage API.
        <q-separator class="invisi" />
        Users can create, edit, preview, and delete journal entries entirely offline — with all data persisted
        locally in <code>localStorage</code>. Featuring a custom Markdown-to-HTML parser supporting headings,
        lists, inline code, fenced code blocks, and rich text formatting, the project emphasizes simplicity,
        privacy, and total client-side functionality.
        <q-separator class="separator invisi" />
        <em>
          "Write, format, and preserve your coding notes directly in the browser — your private Markdown notebook
          powered by pure JavaScript and persistent local storage."
        </em>
      </div>

      <!-- Code Snippets heading -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info-code">Code Snippets</h1>
      <q-separator class="separator" />

      <!-- Code block -->
      <q-card-section class="project-code">
        <q-scroll-area class="code-container">
          <pre v-prism class="prism-block">
            <code class="language-js" :textContent="exampleCode"></code>
          </pre>
        </q-scroll-area>
      </q-card-section>

      <!-- Further Information -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
      <q-separator class="separator-info separator-info-exception" />
      <q-card-section class="project-body-exception" :class="{ 'stacked-layout': isNarrow }">
        <!-- Left column: bullet list -->
        <div class="project-body-left">
          <ul class="feature-list">
            <li>
              <strong>Local Persistence:</strong> Entries are stored in <code>localStorage</code> with a defined data
              model:
              <code>{ id, title, date, content }</code>.
            </li>
            <li>
              <strong>Markdown Parser:</strong> Custom <code>markdownToHtml()</code> function supports headings,
              bold/italic,
              lists, code blocks, links, and inline code without third-party libraries.
            </li>
            <li>
              <strong>Dynamic Preview:</strong> Live conversion from Markdown to HTML — toggle seamlessly between editor
              and preview modes.
            </li>
            <li>
              <strong>Entry Management:</strong> Create, edit, search, and delete entries with real-time updates to the
              UI.
            </li>
            <li>
              <strong>Offline-First Design:</strong> All functionality runs client-side — no dependencies, accounts, or
              network calls required.
            </li>
            <li>
              <strong>Learned:</strong> Deep understanding of browser storage APIs, Markdown parsing logic, regex
              patterns,
              and UI state management with pure JavaScript.
            </li>
          </ul>
        </div>
        <div class="project-demo">
          <!-- Right column: video demo -->
          <video :src="codeJournalVideo" class="project-video" autoplay loop muted playsinline></video>
        </div>
      </q-card-section>
    </q-card>
    <q-card bordered class="project-card">

      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="cloud" class="project-icon" />
        <div class="project-info">
          <div class="project-title">WEATHER DASHBOARD<span class="sub">(jQuery / JavaScript)</span></div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        Two versions of this weather dashboard were built — both practically identical in functionality and UI:
        the first written in <strong>jQuery</strong>, and the second fully <strong>refactored in modern
          JavaScript</strong>
        to remove dependencies and improve readability.
        <q-separator class="separator invisi" />
        <em>
          Check future weather instantly: persistent city history buttons, 5-day forecast cards,
          and live API responses — all powered by pure jQuery and client-side memory.
        </em>
      </div>
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info-code">Code Snippets</h1>
      <q-separator class="separator" />
      <div class="carousel-wrapper">
        <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
          control-color="black" navigation height="auto" width="100%" class="rounded-borders"
          navigation-position="bottom">
          <q-carousel-slide :name="1" class="column no-wrap">

            <!-- Code block -->
            <q-card-section class="project-code">
              <q-scroll-area class="code-container">
                <pre v-prism class="prism-block">
            <code class="language-js" :textContent="WeatherDashboard1"></code>
          </pre>
              </q-scroll-area>
            </q-card-section>

            <!-- Further Information -->
            <q-separator class="separator" />
            <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
            <q-separator class="separator-info separator-info-exception" />
            <q-card-section class="project-body-exception" :class="{ 'stacked-layout': isNarrow }">
              <div class="project-body-left">
                <ul class="feature-list">
                  <li><strong>Geolocation:</strong> City coords via OpenWeather Geo API</li>
                  <li><strong>Forecast:</strong> 5-day forecast & dates formatted via <code>moment.js</code></li>
                  <li><strong>History:</strong> Cities stored in <code>localStorage</code> as clickable recall buttons
                  </li>
                  <li><strong>UI:</strong> jQuery builds DOM cards & uses <code>data-attributes</code> for state</li>
                  <li><strong>Prototyped With:</strong> Postman for debugging API requests</li>
                  <li><strong>Learned:</strong> Persistent states, AJAX chaining & dataset access</li>
                </ul>
              </div>
              <q-card-section class="project-demo">
                <q-img :src="props.images[2]" class="project-gif" alt="Weather Dashboard logo" />
              </q-card-section>
            </q-card-section>
          </q-carousel-slide>
          <q-carousel-slide :name="2" class="column no-wrap">

            <!-- Code block -->
            <q-card-section class="project-code">
              <q-scroll-area class="code-container">
                <pre v-prism class="prism-block">
                <code class="language-js" :textContent="weatherDashboard2"></code>
                </pre>
              </q-scroll-area>
            </q-card-section>

            <!-- Further Information -->
            <q-separator class="separator" />
            <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
            <q-separator class="separator-info separator-info-exception" />
            <q-card-section class="project-body-exception" :class="{ 'stacked-layout': isNarrow }">
              <div class="project-body-left">
                <ul class="feature-list">
                  <li><strong>Functionality:</strong> Mostly identical just written more concisely and with JavaScript
                  </li>
                  <li><strong>Forecast:</strong> 5-day forecast & dates formatted via <code>moment.js</code></li>
                </ul>
              </div>
              <q-card-section class="project-demo">
                <q-img :src="props.images[2]" class="project-gif" alt="Weather Dashboard logo" />
              </q-card-section>
            </q-card-section>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </q-card>
    <!-- Demo Image -->
    <q-separator class="separator" />
    <!-- POST-WORK EXPENSES (replaces duplicated Weather card) ------------- -->
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="receipt_long" class="project-icon" />
        <div class="project-info">
          <div class="project-title">POST-WORK EXPENSES<span class="sub">(Node.js CLI)</span></div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        A Node.js command-line tool that transforms raw CSV exports from your financial software into a clean,
        human-readable monthly expense report for internal operations staff.
        <q-separator class="invisi" />
        The script validates input, parses each line into structured expense objects, aggregates totals by category,
        and writes a neatly aligned text report to a <code>reports/expenses_report.txt</code> file placed alongside the
        original CSV — ready to be shared, archived, or audited without ever opening a spreadsheet.
        <q-separator class="separator invisi" />
        <em>
          "Drop in a CSV, get back a formatted monthly expense report — predictable totals, readable rows, and
          zero manual spreadsheet wrangling."
        </em>
      </div>

      <!-- Code Snippets heading -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info-code">Code Snippets</h1>
      <q-separator class="separator" />

      <!-- Code block for the CLI script -->
      <q-card-section class="project-code">
        <q-scroll-area class="code-container">
          <pre v-prism class="prism-block">
            <code class="language-js" :textContent="expenseFormatterCode"></code>
          </pre>
        </q-scroll-area>
      </q-card-section>

      <!-- Further Information -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
      <q-separator class="separator-info separator-info-exception" />

      <q-card-section class="project-body-exception" :class="{ 'stacked-layout': isNarrow }">
        <div class="project-body-left">
          <ul class="feature-list">
            <li>
              <strong>Input Validation:</strong> Verifies a <code>.csv</code> file and exits with clear errors on bad
              input.
            </li>
            <li>
              <strong>Structured Parsing:</strong> Maps each row to
              <code>{ date, description, amount, category }</code> with sensible fallbacks.
            </li>
            <li>
              <strong>Safe Number Handling:</strong> Skips invalid amounts so category totals and the grand total never
              become <code>NaN</code>.
            </li>
            <li>
              <strong>Category Totals:</strong> Groups expenses by category and computes an overall monthly total.
            </li>
            <li>
              <strong>Output Location:</strong> Writes <code>reports/expenses_report.txt</code> alongside the source
              CSV.
            </li>
            <li>
              <strong>Learned:</strong> CLI args, <code>path</code> utilities, robust parsing, and readable reporting
              from raw data.
            </li>
          </ul>
        </div>

        <!-- Optional: demo image on the right, using props.images[2] like the others -->
        <q-card-section class="project-demo">
          <video :src="expensesFormatter" alt="Post-work expenses report output preview" class="project-video" autoplay
            loop muted playsinline></video>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from 'vue';
import codeExample from '../../assets/snippets/journal-example-code.txt?raw';
import weatherDash1 from '../../assets/snippets/dash-1.txt?raw';
import codeJournalVideo from '../../assets/animations/code-journal-demo.mp4';
import expensesFormatter from '../../assets/animations/expensesFormatter.mp4';
import weatherDash2 from '../../assets/snippets/dash-2.txt?raw';
import expenseFormatterCode from '../../assets/snippets/expensesFormatter.txt?raw';

const exampleCode = ref(codeExample);
const WeatherDashboard1 = ref(weatherDash1);
const weatherDashboard2 = ref(weatherDash2);

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
const slide = ref(1)
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
  color: #6B7C94;
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
  color: #2B6CAF;
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
.project-body {
  padding: 1rem;
  padding-top: 1.8rem;
}

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

/* demo GIF */
.project-demo {
  flex: 1 1 0;
  /* take remaining space */
  display: flex;
  /* center the image inside */
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}

.project-gif {
  width: 100%;
  /* fill the flex column */
  max-width: 100%;
  aspect-ratio: 16 / 9;
  /* keep a nice video-ish shape */
  height: auto;
  /* let height follow width */
  object-fit: cover;
  /* can crop a bit but looks good */
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.project-video {
  width: 100%;
  /* fill the flex column */
  max-width: 100%;
  aspect-ratio: 16 / 9;
  /* keep a nice video-ish shape */
  height: auto;
  /* let height follow width */
  object-fit: cover;
  /* can crop a bit but looks good */
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
  background-color: #ECF2F8;
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

/* stack text + video on small screens (match other component) */
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
  background-color: #ECF2F8;
}

.carousel-wrapper {
  width: 102.5%;
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

/* children inside the stacked container: just flow one after the other */
.stacked-layout .project-body-left,
.stacked-layout .project-demo {
  flex: 0 0 auto;
  /* no flex-basis magic */
  width: 100%;
  /* take full width */
  margin-top: -1rem;
  margin-bottom: 2rem;
  /* optional */
}

.stacked-layout .project-body-left,
.stacked-layout .project-video {

  width: 100%;
  /* take full width */
  margin-bottom: 0.5rem;
}

.stacked-layout .project-demo {

  padding: 0rem;
  width: 104%;
  /* take full width */
  margin-bottom: 1rem;
  margin-left: -0.5rem;

}
</style>
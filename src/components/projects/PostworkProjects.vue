<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="code" class="project-icon code-journal-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">CODE JOURNAL</div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        A browser-based Markdown journal built with vanilla JavaScript and Web Storage API.
        <q-separator class="invisi" />
        Users can create, edit, preview, and delete journal entries entirely offline — with data persisted
        in <code>localStorage</code>. Features a custom Markdown-to-HTML parser that supports headings,
        lists, inline code, fenced code blocks, and rich text formatting.
        <q-separator class="separator invisi" />
        <em>
          "Write, format, and preserve your coding notes directly in the browser — your private Markdown notebook
          powered by pure JavaScript and persistent local storage."
        </em>
      </div>

      <!-- Code Snippets (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              Code Snippets
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
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              More Information
            </h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
          <div class="project-body-left ">
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
                <strong>Dynamic Preview:</strong> Live conversion from Markdown to HTML — toggle seamlessly between
                editor
                and preview modes.
              </li>
              <li>
                <strong>Entry Management:</strong> Create, edit, search, and delete entries with real-time updates to
                the
                UI.
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
      </q-expansion-item>
      <q-separator class="separator" />
    </q-card>


    <!-- WEATHER DASHBOARD -------------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="cloud" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">
            WEATHER DASHBOARD<span class="sub">(jQuery / JavaScript)</span>
          </div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        Two versions of this weather dashboard were built — both practically identical in functionality:
        the first written in <strong>jQuery</strong>, and the second <strong>refactored with
          JavaScript</strong>
        to remove dependencies and improve readability.
        <q-separator class="separator invisi" />
        <em>
          "Check future weather instantly: persistent city history buttons, 5-day forecast cards,
          and live API responses — powered by OpenWeather API and client-side memory."
        </em>
      </div>

      <!-- Code Snippets (expandable, with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              Code Snippets
            </h1>
          </div>
        </template>
        <q-separator />

        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
              control-color="grey" navigation height="auto" width="100%" class="rounded-borders"
              navigation-position="bottom">
              <!-- Slide 1: jQuery version code -->
              <q-carousel-slide :name="1" class="column no-wrap">
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block">
                  <code class="language-js" :textContent="WeatherDashboard1"></code>
                </pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: JS refactor code -->
              <q-carousel-slide :name="2" class="column no-wrap">
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block">
                  <code class="language-js" :textContent="weatherDashboard2"></code>
                </pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable, with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              More Information
            </h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
              control-color="grey" navigation height="auto" width="100%" class="rounded-borders"
              navigation-position="bottom">
              <!-- Slide 1: jQuery version info -->
              <q-carousel-slide :name="1" class="column no-wrap">
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li><strong>Geolocation:</strong> City coords via OpenWeather Geo API.</li>
                      <li><strong>Forecast:</strong> 5-day forecast & dates formatted via <code>moment.js</code>.</li>
                      <li><strong>History:</strong> Cities stored in <code>localStorage</code> as clickable recall
                        buttons.
                      </li>
                      <li><strong>UI:</strong> jQuery builds DOM cards & uses <code>data-attributes</code> for state.
                      </li>
                      <li><strong>Prototyped With:</strong> Postman for debugging API requests.</li>
                      <li><strong>Learned:</strong> Persistent states, AJAX chaining & dataset access.</li>
                    </ul>
                  </div>
                  <q-card-section class="project-demo">
                    <q-img :src="props.images[2]" class="project-gif" alt="Weather Dashboard logo" />
                  </q-card-section>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: JS refactor info -->
              <q-carousel-slide :name="2" class="column no-wrap">
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Refactor:</strong> Functionality remains identical but rewritten in modern JavaScript
                        for
                        clarity and maintainability.
                      </li>
                      <li>
                        <strong>Forecast:</strong> Still uses OpenWeather + <code>moment.js</code> for dates and
                        formatting.
                      </li>
                    </ul>
                  </div>
                  <q-card-section class="project-demo">
                    <q-img :src="props.images[2]" class="project-gif" alt="Weather Dashboard logo" />
                  </q-card-section>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>

    <!-- POST-WORK EXPENSES -->
    <q-separator class="separator" />
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="receipt_long" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">
            POSTWORK EXPENSES<span class="sub">(Node.js CLI)</span>
          </div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        A Node.js command-line tool that transforms raw CSV exports from your financial software into a clean,
        human-readable monthly expense report.
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

      <!-- Code Snippets (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              Code Snippets
            </h1>
          </div>
        </template>
        <q-separator />

        <!-- Code block for the CLI script -->
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
          <code class="language-js" :textContent="expenseFormatterCode"></code>
        </pre>
          </q-scroll-area>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              More Information
            </h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
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
                <strong>Safe Number Handling:</strong> Skips invalid amounts so category totals and the grand total
                never
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
          <q-card-section class="project-demo">
            <video :src="expensesFormatter" alt="Post-work expenses report output preview" class="project-video"
              autoplay loop muted playsinline></video>
          </q-card-section>
        </q-card-section>
      </q-expansion-item>
      <q-separator class="separator" />
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
.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ECF2F8;
}
</style>
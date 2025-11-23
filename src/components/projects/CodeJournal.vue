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
        <q-separator class="invisi"/>
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
      <q-card-section class="project-body-exception">
        <!-- Left column: bullet list -->
        <div class="project-body-left">
          <ul class="feature-list">
            <li>
              <strong>Local Persistence:</strong> Entries are stored in <code>localStorage</code> with a defined data model:
              <code>{ id, title, date, content }</code>.
            </li>
            <li>
              <strong>Markdown Parser:</strong> Custom <code>markdownToHtml()</code> function supports headings, bold/italic,
              lists, code blocks, links, and inline code without third-party libraries.
            </li>
            <li>
              <strong>Dynamic Preview:</strong> Live conversion from Markdown to HTML — toggle seamlessly between editor
              and preview modes.
            </li>
            <li>
              <strong>Entry Management:</strong> Create, edit, search, and delete entries with real-time updates to the UI.
            </li>
            <li>
              <strong>Offline-First Design:</strong> All functionality runs client-side — no dependencies, accounts, or
              network calls required.
            </li>
            <li>
              <strong>Learned:</strong> Deep understanding of browser storage APIs, Markdown parsing logic, regex patterns,
              and UI state management with pure JavaScript.
            </li>
          </ul>
        </div>

        <!-- Right column: video demo -->
        <video
          :src="codeJournalVideo"
          class="project-video"
          autoplay
          loop
          muted
          playsinline
        ></video>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import codeExample from '../../assets/snippets/journal-example-code.txt?raw';
import codeJournalVideo from '../../assets/animations/code-journal-demo.mp4'

const exampleCode = ref(codeExample);

// const props = defineProps({
//   images: {
//     type: Array,
//     required: true
//   }
// });
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
  padding: 1rem;
  padding-top: 1.8rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.project-body-left {
  flex: 1 1 0;
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
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

.project-video {
  flex: 0 0 1;
  width: 40%;
  height: auto;
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
</style>
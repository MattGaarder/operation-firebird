<template>

    <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
        <q-card-section class="project-body">
            <div class="project-info">
                <div class="project-title">Code Journal</div>
                <div class="project-tagline">
                A minimalist, browser-based Markdown journal built with vanilla JavaScript and the Web Storage API.
                Users can create, edit, preview, and delete journal entries entirely offline — with all data persisted
                locally in <code>localStorage</code>. Featuring a custom Markdown-to-HTML parser supporting headings, 
                lists, inline code, fenced code blocks, and rich text formatting, the project emphasizes simplicity, 
                privacy, and total client-side functionality.
                <br><br>
                <em>"Write, format, and preserve your coding notes directly in the browser — your private Markdown notebook powered by pure JavaScript and persistent local storage."</em>
            </div>
        </div>
        </q-card-section>
        <q-card-section class="project-code">
            <q-scroll-area class="code-container" >
                <pre v-prism><code class="language-js" :textContent="exampleCode"></code></pre>
            </q-scroll-area>
        </q-card-section>

        <q-card-section class="project-body">
        <ul class="feature-list">
            <li>
            <strong>Local Persistence:</strong> Entries are stored in <code>localStorage</code> with a defined data model:
            <code>{ id, title, date, content }</code>.
            </li>
            <li>
            <strong>Markdown Parser:</strong> Custom <code>markdownToHtml()</code> function supports headings, bold/italic, lists, code blocks, links, and inline code without third-party libraries.
            </li>
            <li>
            <strong>Dynamic Preview:</strong> Live conversion from Markdown to HTML — toggle seamlessly between editor and preview modes.
            </li>
            <li>
            <strong>Entry Management:</strong> Create, edit, search, and delete entries with real-time updates to the UI.
            </li>
            <li>
            <strong>Offline-First Design:</strong> All functionality runs client-side — no dependencies, accounts, or network calls required.
            </li>
            <li>
            <strong>Learned:</strong> Deep understanding of browser storage APIs, Markdown parsing logic, regex patterns, and UI state management with pure JavaScript.
            </li>
        </ul>
        </q-card-section>
        <q-img :src="props.images[1]" class="project-gif" alt="Code Journal screenshot"/>
    </q-card>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import codeExample from '../../assets/journal-example-code.txt?raw';

const exampleCode = ref(codeExample);

const props = defineProps({
  images: {
    type: Array,
    required: true
  }});
</script>

<style scoped>
.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* if you want some padding inside your draggable window */
  padding: 1rem;
}

/* each card will try to be at least 300px wide,
   but grow to fill available space */
.project-card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
  background: white;
}

/* header: icon + info, wrapping when too narrow */
.project-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  gap: 0.75rem;
  background: var(--q-color-grey-1);
  padding: 1rem;
}

.project-icon {
  flex: 0 0 174px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.readme-icon {
  color: var(--q-color-blue-6);
}

.project-info {
  flex: 1 1 auto;
  min-width: 0; /* allow text to wrap */
}

.project-title {
  font-size: 1.7rem;
  font-weight: 600;
  margin-left: auto;
  margin-top: auto;
}

.project-tagline {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: var(--q-color-grey-7);
  line-height: 1.4;
}

/* feature list section */
.project-body {
  padding: 0.75rem 1rem;
  background: var(--q-color-grey-2);
  flex-grow: 1;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
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
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
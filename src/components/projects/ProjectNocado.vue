<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <!-- You can swap this for the logo image if you like -->
        <!-- <q-img src="/src/assets/logos/project_logos/Nocado_Logo_white.svg" alt="Nocado Logo" class="project-icon" contain /> -->
        <q-icon name="receipt_long" class="project-icon" />
        <div class="project-info">
          <div class="project-title">NOCADO</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        This project syncs ingredient data between a PDF (your Ocado grocery shopping receipt), MongoDB, and Notion.
        <q-separator class="invisi"/>
        The backend uses Express with Mongoose models to store ingredients, exposes REST routes, and integrates with
        Notion via its API to create/update pages and reconcile missing entries. The frontend uploads a PDF, extracts
        and cleans ingredient names, posts them to the server, and triggers Notion synchronization.
        <q-separator class="separator invisi" />
        <em>
          Upload your Ocado PDF receipts and instantly extract ingredients into a synced
          “Fridge, Cupboard &amp; Freezer” Notion database. Powered by Multer &amp; Express file upload, PDF.js text
          extraction, PapaParse + FoundationFoods lookup, MongoDB persistence and two-way sync with Notion via the
          Notion API.
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
            <code class="language-js" :textContent="nocadoCode">
            </code></pre>
        </q-scroll-area>
      </q-card-section>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li>
            <strong>File upload:</strong> Multer + Express endpoint at <code>POST /uploads</code>, stores PDFs under
            <code>/uploads</code>.
          </li>
          <li>
            <strong>PDF parsing:</strong> PDF.js reads &amp; tokenizes each page into strings for downstream cleaning.
          </li>
          <li>
            <strong>Ingredient lookup:</strong> PapaParse loads the FoundationFoods CSV → in-memory array; matches food
            names, handles plurals &amp; adjectives.
          </li>
          <li>
            <strong>Location tagging:</strong> regex tracks “Fridge”, “Cupboard”, “Freezer” sections as you scan PDF
            text.
          </li>
          <li>
            <strong>Sync pipeline:</strong> client sync → <code>/api/v1/ingredients</code> writes to MongoDB; then
            <code>/api/v1/notion/sync</code> mirrors to Notion database pages.
          </li>
          <li>
            <strong>Notion integration:</strong> <code>@notionhq/client</code> creates pages with multi_select storage,
            stores back Notion IDs in Mongo.
          </li>
          <li>
            <strong>Learned:</strong> advanced stream parsing, two-way API orchestration, data deduplication and state
            reconciliation.
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import nocado_code from '../../assets/snippets/nocado_s1.txt?raw';

const nocadoCode = ref(nocado_code);

</script>

<style scoped>
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: -1rem;
  padding: 0;
}

.info-code {
  font-size: 0.9rem;
  color: black;
  padding: 0;
  padding-left: 1.2rem;
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

/* separators */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
}

/* code section */
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

.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ECF2F8;
}
</style>
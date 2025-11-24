<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="receipt_long" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">NOCADO</div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        This project syncs ingredient data between a PDF (your Ocado grocery shopping receipt), <strong>MongoDB</strong>, and Notion.
        <q-separator class="separator invisi" />
        The backend uses <strong>Express</strong> with <strong>Mongoose</strong> models to store ingredients, exposes REST routes, and integrates with
        Notion via its API to create/update pages and reconcile missing entries. The frontend uploads a PDF, extracts
        and cleans ingredient names, posts them to the server, and triggers Notion synchronization.
        <q-separator class="separator invisi" />
        <em>
          "Upload your Ocado PDF receipts and instantly extract ingredients into a synced
          'Fridge, Cupboard &amp; Freezer' Notion database. Powered by <strong>Multer</strong> &amp; Express file upload, <strong>PDF.js</strong> text
          extraction, <strong>PapaParse</strong> + FoundationFoods lookup, MongoDB persistence and two-way sync with Notion via the
          Notion API."
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

        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
      <code class="language-js" :textContent="nocadoCode"></code>
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

        <q-card-section class="project-body">
          <ul class="feature-list">
            <li>
              <strong>File upload:</strong> Multer + Express endpoint at <code>POST /uploads</code>, stores PDFs under
              <code>/uploads</code>.
            </li>
            <li>
              <strong>PDF parsing:</strong> PDF.js reads &amp; tokenizes each page into strings for downstream cleaning.
            </li>
            <li>
              <strong>Ingredient lookup:</strong> PapaParse loads the FoundationFoods CSV → in-memory array; matches
              food names, handles plurals &amp; adjectives.
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
              <strong>Notion integration:</strong> <code>@notionhq/client</code> creates pages with multi_select
              storage, stores back Notion IDs in Mongo.
            </li>
            <li>
              <strong>Learned:</strong> advanced stream parsing, two-way API orchestration, data deduplication and state
              reconciliation.
            </li>
          </ul>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import nocado_code from '../../assets/snippets/nocado_s1.txt?raw';

const nocadoCode = ref(nocado_code);
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
<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <q-img
          src="/src/assets/logos/project_logos/Nocado_Logo_white.svg"
          alt="Nocado Logo"
          class="project-icon"
          contain
        />
        <div class="project-info">
          <div class="project-title">Nocado</div>
          <div class="project-tagline">
            Upload your Ocado PDF receipts and instantly extract ingredients into a synced “Fridge, Cupboard & Freezer” inventory.  
            Powered by Multer & Express file-upload, PDF.js text extraction, PapaParse + FoundationFoods lookup,  
            MongoDB persistence and two-way sync with Notion via the Notion API.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li>
            <strong>File upload:</strong> Multer + Express endpoint at <code>POST /uploads</code>, stores PDFs under <code>/uploads</code>
          </li>
          <li>
            <strong>PDF parsing:</strong> PDF.js reads & tokenizes each page into strings for downstream cleaning
          </li>
          <li>
            <strong>Ingredient lookup:</strong> PapaParse loads the FoundationFoods CSV → in-memory array; matches food names, handles plurals & adjectives
          </li>
          <li>
            <strong>Location tagging:</strong> regex tracks “Fridge”, “Cupboard”, “Freezer” sections as you scan PDF text
          </li>
          <li>
            <strong>Sync pipeline:</strong> client sync → <code>/api/v1/ingredients</code> writes to MongoDB; then <code>/api/v1/notion/sync</code> mirrors to Notion database pages
          </li>
          <li>
            <strong>Notion integration:</strong> @notionhq/client creates pages with multi_select storage, stores back Notion IDs in Mongo
          </li>
          <li>
            <strong>Learned:</strong> advanced stream parsing, two-way API orchestration, data deduplication and state reconciliation
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
// purely presentational
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
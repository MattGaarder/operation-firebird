<template>
  <div class="projects-wrapper">
    <!-- PROJECT GENERATOR -------------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="folder" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">
            PROJECT GENERATOR <span class="sub">(Google Form)</span>
          </div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        Automate your folder-structure creation with a Google Form-driven Apps Script.
        <q-separator class="separator invisi" />
        Fill in course name, version, location & type → on submit the script parses your answers,
        validates inputs, then copies a matching template tree into the correct Drive folder.
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

        <!-- First code block -->
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
      <code class="language-js" :textContent="formTrigger"></code>
    </pre>
          </q-scroll-area>
        </q-card-section>

        <q-separator class="separator" />

        <!-- Second code block -->
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
      <code class="language-js" :textContent="folderGenerator"></code>
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

        <q-card-section class="project-body ">
          <ul class="feature-list">
            <li>
              <strong>Trigger:</strong> Form submission fires an <code>onFormSubmit(e)</code> Apps Script bound to your
              spreadsheet.
            </li>
            <li>
              <strong>Response parsing:</strong> <code>extractFormResponses(e)</code> reads questions “Course Name”,
              “Location”, “Type”, and uses RegEx to split the “ v#” version suffix.
            </li>
            <li>
              <strong>Validation:</strong> Ensures name, location &amp; type are present and match allowed options
              before
              proceeding.
            </li>
            <li>
              <strong>Drive API:</strong> <code>determineTargetFolderId()</code> &amp;
              <code>determineSourceFolderId()</code> pick your destination & template folders.
            </li>
            <li>
              <strong>Template copy:</strong> <code>copyCourseFolderStructure()</code> creates (or finds) the base
              folder,
              then recursively clones every subfolder via <code>copyFolder()</code>.
            </li>
            <li>
              <strong>Versioning:</strong> Auto‐creates a “CourseName vX” folder, prevents duplicate versions, and logs
              “already exists”.
            </li>
            <li>
              <strong>Learned:</strong> Google Apps Script event objects, DriveApp folder operations, recursive folder
              cloning & user‐friendly form tooling.
            </li>
          </ul>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>

    <!-- FILE LISTER -------------------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="description" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">
            FILE LISTER<span class="sub">(Google Drive)</span>
          </div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        Apps Script project that incrementally crawls Google Drive — checkpointing progress to dodge execution limits —
        and exports a comprehensive file-path report into Sheets for use in Power BI for migration auditing (to
        SharePoint).
        <q-separator class="separator invisi" />
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
          <code class="language-js" :textContent="fileLister"></code>
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
              <strong>Incremental crawl:</strong> Uses a top-level snapshot + path array in
              <code>PropertiesService</code>
              to resume folder traversal after time-out.
            </li>
            <li>
              <strong>Progress table:</strong> Logs folder name, ID, index &amp; processed flag in a side-table so you
              can
              pick up where you left off.
            </li>
            <li>
              <strong>File export:</strong> Appends clickable <code>HYPERLINK</code> rows ([File Name, Full Path]) for
              every Drive file.
            </li>
            <li>
              <strong>Timeout workaround:</strong> Batches work into slices, checkpointing every N files/folders to
              survive Apps Script’s 6-minute limit.
            </li>
            <li>
              <strong>Migration QA:</strong> Feeds the output into Power BI to compare Google Drive vs SharePoint sets
              and
              catch missing or mismatched items.
            </li>
            <li>
              <strong>Learned:</strong> Advanced GAS recursion, state persistence with <code>PropertiesService</code>,
              efficient sheet I/O and BI-driven validation.
            </li>
          </ul>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>

    <!-- TOOLBAR COMPONENTS ------------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="settings" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">
            TOOLBAR COMPONENTS<span class="sub">(Google Docs)</span>
          </div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        Adds a 'Components' menu to Google Docs for one-click insertion of Face-to-Face, Digital, Video & Assessment
        templates — streamlining document assembly with reusable content blocks.
        <q-separator class="separator invisi" />
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
          <code class="language-js" :textContent="templateInserter"></code>
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
            <li><strong>Menu Integration:</strong> Creates a 'Components' toolbar with four template actions.</li>
            <li>
              <strong>Template Insertion:</strong> Fetches docs by ID and inserts paragraphs, lists, tables & images at
              the cursor.
            </li>
            <li>
              <strong>Cursor & Index Handling:</strong> Locates insertion point or alerts if none selected.
            </li>
            <li>
              <strong>Learned:</strong> DocumentApp UI menus, body child iteration, element copying, and cursor
              management.
            </li>
          </ul>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>
  </div>
</template>

<script setup>
import formTrigger from '../../assets/snippets/form-trigger.txt?raw';
import folderGenerator from '../../assets/snippets/folder-generator.txt?raw';
import fileLister from '../../assets/snippets/file-lister.txt?raw';
import templateInserter from '../../assets/snippets/template-inserter.txt?raw';
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
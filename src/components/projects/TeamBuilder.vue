<template>
  <div class="projects-wrapper">
    <!-- TEAM BUILDER CARD -->
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-img
          :src="teambuildertitle"
          alt="Team Builder Logo"
          class="project-icon"
        />
        <div class="project-info">
          <div class="project-title">TEAM BUILDER</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        A Node.js CLI tool that builds a styled HTML roster for your engineering team.
        Answer prompts for Manager, Engineers &amp; Interns and get a single-page summary
        with each member's name, role, ID, email (clickable) and role-specific details.
        <q-separator class="separator invisi" />
        <em>
          Streamline project documentation and team overviews with a customizable Node.js CLI suite
          that both generates a professional, styled HTML roster and produces a badge-topped,
          sectioned <code>README.md</code> with interactive prompts.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li><strong>Prompts for:</strong> Manager, Engineer, Intern.</li>
          <li><strong>Uses:</strong> <code>inquirer</code> for CLI prompts, ES6 classes for each role.</li>
          <li><strong>Output:</strong> Bootstrap-styled HTML team roster via a custom template.</li>
          <li><strong>Tested with:</strong> Jest unit tests to validate role classes and rendering logic.</li>
        </ul>
      </q-card-section>

      <!-- Demo GIF -->
      <q-separator class="separator" />
      <q-card-section class="project-demo">
        <q-img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif"
          alt="Team Builder Demo"
          class="project-gif"
          ratio="16/9"
          contain
        />
      </q-card-section>
    </q-card>

    <!-- README.md GENERATOR CARD -->
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="book" class="project-icon readme-icon" />
        <div class="project-info">
          <div class="project-title">README.MD GENERATOR</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        A Node.js CLI that prompts for Title, Description, Installation, Usage, Screenshots,
        Contribution, License &amp; Contact — then spits out a badge-topped
        <code>README.md</code> in your project folder.
        <q-separator class="separator invisi" />
        <em>
          Turn rough project notes into a polished, badge-rich README with a guided CLI flow that
          standardizes sections, links, and formatting for any repository.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li>
            <strong>Interactive prompts:</strong> Title, Description, Installation, Usage, Screenshots,
            Contribution, License, Contact.
          </li>
          <li>
            <strong>Under the hood:</strong> <code>inquirer</code>, a
            <code>generateMarkdown()</code> utility, and Node’s <code>fs.writeFile</code>.
          </li>
          <li>
            <strong>Files:</strong> <code>index.js</code>, <code>utils/generateMarkdown.js</code>,
            <code>questions.js</code>.
          </li>
          <li>
            <strong>Output:</strong> Badge-rich, sectioned README with Table of Contents, code blocks, and links.
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import teambuildertitle from 'src/assets/logos/team-builder-crop.svg';
</script>

<style scoped>
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: -1rem;
  padding: 0;
}

/* main wrapper */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgb(253, 253, 253);
}

/* card layout */
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

/* header band */
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
  font-size: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.4rem;
}

.readme-icon {
  color: #2b6caf;
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

/* tagline block */
.project-tagline {
  padding: 1.5rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* invisible spacer separator between main text and <em> */
.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

/* feature list section */
.q-card__section--vert {
  padding: 8px;
}

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

/* separators (full-width look inside padded card) */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
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

/* tiny screens */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
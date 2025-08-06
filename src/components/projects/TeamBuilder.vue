<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <q-img
          :src="teambuildertitle"
          alt="Team Builder Logo"
          class="project-icon"
        />
        <div class="project-title">Team Builder</div>
        <div class="project-info">

          <div class="project-tagline">
            A Node.js CLI tool that builds a styled HTML roster for your engineering team.
            Answer prompts for Manager, Engineers &amp; Interns and get a single-page summary
            with each member's name, role, ID, email (clickable) and role-specific details.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li><strong>Prompts for:</strong> Manager, Engineer, Intern</li>
          <li><strong>Uses:</strong> Inquirer (CLI), ES6 classes for roles</li>
          <li><strong>Output:</strong> Bootstrap-styled HTML via custom template</li>
          <li><strong>Tested with:</strong> Jest unit tests</li>
        </ul>
      </q-card-section>

      <q-separator />

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

    <!-- README.md Generator -->
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <q-icon name="book" size="64px" class="project-icon readme-icon" />
        <div class="project-title">README.md Generator</div>
        <div class="project-info">
          
          <div class="project-tagline">
            A Node.js CLI that prompts for Title, Description, Installation, Usage, Screenshots,
            Contribution, License &amp; Contact — then spits out a badge-topped
            <code>README.md</code> in your project folder.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li>
            <strong>Interactive prompts:</strong> Title, Description, Installation, Usage,
            Screenshots, Contribution, License, Contact
          </li>
          <li>
            <strong>Under the hood:</strong> <code>inquirer</code>, a
            <code>generateMarkdown()</code> util, and Node’s <code>fs.writeFile</code>
          </li>
          <li>
            <strong>Files:</strong> <code>index.js</code>, <code>utils/generateMarkdown.js</code>,
            <code>questions.js</code>
          </li>
          <li>
            <strong>Output:</strong> Badge-rich, sectioned README with Table of Contents,
            code blocks & links
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
  flex: 0 0 104px;
  height: auto;
  border-radius: 4px;
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
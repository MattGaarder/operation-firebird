<template>
  <div class="projects-wrapper">
    <!-- README.md GENERATOR CARD -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="book" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">README.md GENERATOR</div>
        </div>
      </q-card-section>
      <q-separator class="separator" />
      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        A Node.js CLI that prompts for Title, Description, Installation, Usage, Screenshots,
        Contribution, License &amp; Contact — then spits out a badge-topped
        <code>README.md</code> in your project folder.
        <q-separator class="separator invisi" />
        <em>
          Turn rough project notes into a polished, badge-rich README with a guided CLI flow that
          standardizes sections, links, and formatting for any repository.
        </em>
      </div>

      <!-- More Information -->
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

        <q-card-section class="project-code read-me-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
      <code class="language-js" :textContent="readmeGenerator"></code>
    </pre>
          </q-scroll-area>
        </q-card-section>
      </q-expansion-item>
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
          <!-- Left column: bullet list -->
          <div class="project-body-left">
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
          </div>
          <div class="project-demo">
            <!-- Right column: video demo -->
            <video :src="readmeVideo" class="project-video" autoplay loop muted playsinline></video>
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>

    <!-- VIBELY -------------------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm vibely-project-header">
        <div class="vibely-logo" v-html="vibelyLogo"></div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        This is a React single-page app using Firebase for authentication and real-time data.
        It wraps routes in a hash router and shares the current user via context. The NavBar
        adapts based on login state. Home subscribes to Firestore “posts” collections with
        real-time updates, rendering them as post cards. Users can create new “vibes” which
        are saved to Firestore. Material UI supplies layout/components and Firebase Auth tracks
        signed-in state.
        <q-separator class="separator invisi" />
        <em>
          Share vibes in real time: post updates, react to the community, and watch your feed
          update live with Firebase-powered auth and Firestore streams.
        </em>
      </div>

      <!-- Code Snippets -->
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
          <code class="language-js" :textContent="vibelyHome"></code>
        </pre>
          </q-scroll-area>
        </q-card-section>

        <q-separator class="separator" />
      </q-expansion-item>

      <!-- More Information -->
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
                <strong>UI:</strong> React with Material UI components for fast, accessible layouts.
              </li>
              <li>
                <strong>Routing &amp; State:</strong> React Router + Context API to manage user session and route
                visibility.
              </li>
              <li>
                <strong>Authentication:</strong> Firebase Auth for email/password sign-up and sign-in flows.
              </li>
              <li>
                <strong>Data Backend:</strong> Firestore for live posts, profile data, and “vibe” voting.
              </li>
              <li>
                <strong>Real-Time:</strong> <code>onSnapshot</code> listeners to instantly reflect new posts and votes
                in
                the UI.
              </li>
              <li>
                <strong>Responsive:</strong> Flex/Grid layouts that adapt across desktop and mobile breakpoints.
              </li>
            </ul>
          </div>

          <div class="project-demo">
            <q-img :src="props.images[2]" class="project-gif" alt="Vibely logo" />
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>

    <!-- TEAM BUILDER CARD --------------------------------------------- -->
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="build" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">TEAM BUILDER</div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
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

      <!-- Code Snippets -->
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
          <code class="language-js" :textContent="employeeTest"></code>
        </pre>
          </q-scroll-area>
        </q-card-section>

        <q-separator class="separator" />
      </q-expansion-item>

      <!-- More Information -->
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
              <li><strong>Prompts for:</strong> Manager, Engineer, Intern.</li>
              <li><strong>Uses:</strong> <code>inquirer</code> for CLI prompts, ES6 classes for each role.</li>
              <li><strong>Output:</strong> Bootstrap-styled HTML team roster via a custom template.</li>
              <li><strong>Tested with:</strong> Jest unit tests to validate role classes and rendering logic.</li>
            </ul>
          </div>

          <div class="project-demo">
            <q-img :src="teambuildertitle" alt="Team Builder Logo" class="project-icon team-builder-img" />
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import readmeVideo from '../../assets/animations/readme-demo.mp4';
import vibelyHome from '../../assets/snippets/vibely-home.txt?raw';
import employeeTest from '../../assets/snippets/employee-test.txt?raw';
import readmeGenerator from '../../assets/snippets/readme-generator.txt?raw';



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
import teambuildertitle from 'src/assets/logos/team-builder-crop.svg';
import vibelyLogo from 'src/assets/logos/project_logos/vibely-logo-v2.svg?raw';

const isNarrow = computed(() => props.containerWidth > 0 && props.containerWidth < 700);
</script>

<style scoped>
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  overflow:hidden;
}

.read-me-code {
  height: 230px;
}

.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ECF2F8;
}

:deep(.vibely-logo svg path) {
  transition: fill 0.3s ease;
}

.vibely-project-header {
  background-color: #263442; 
  margin-left: -16px;
  margin-right: -16px;
  margin-top: -16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 122px;
  border-left: 2px;
  border-color: black;
  border-width: 2px;

}

.vibely-logo {
  width: 660px;
  margin-top: 0rem;
  margin-bottom: -1rem;
  position: absolute;
}
</style>
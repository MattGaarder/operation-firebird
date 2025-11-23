<template>
  <div class="projects-wrapper">
    <!-- README.md GENERATOR CARD -->
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="book" class="project-icon readme-icon" />
        <div class="project-info">
          <div class="project-title">README.md GENERATOR</div>
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
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <!-- <q-icon name="chat" class="project-icon" />
        <div class="project-info">
          <div class="project-title">VIBELY</div>
        </div> -->
        <div class="vibely-logo" v-html="vibelyLogo"></div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
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

      <!-- Further Information -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
      <q-separator class="separator-info" />
      <q-card-section class="project-body-exception" :class="{'stacked-layout': isNarrow}">

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
              <strong>Real-Time:</strong> <code>onSnapshot</code> listeners to instantly reflect new posts and votes in
              the UI.
            </li>
            <li>
              <strong>Responsive:</strong> Flex/Grid layouts that adapt across desktop and mobile breakpoints.
            </li>
          </ul>
        </div>


        <q-img :src="props.images[2]" class="project-gif" alt="Vibely logo" />

      </q-card-section>

      <!-- Demo / Logo Image -->

    </q-card>
    <!-- TEAM BUILDER CARD -->
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="build" class="project-icon readme-icon" />
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
      <h1 class="text-h5 text-weight-bold info info-exception">Further Information</h1>
      <q-separator class="separator-info separator-info-exception" />
      <q-card-section class="project-body-exception" :class="{'stacked-layout': isNarrow}">

        <div class="project-body-left">
          <ul class="feature-list">
            <li><strong>Prompts for:</strong> Manager, Engineer, Intern.</li>
            <li><strong>Uses:</strong> <code>inquirer</code> for CLI prompts, ES6 classes for each role.</li>
            <li><strong>Output:</strong> Bootstrap-styled HTML team roster via a custom template.</li>
            <li><strong>Tested with:</strong> Jest unit tests to validate role classes and rendering logic.</li>
          </ul>
        </div>
        <q-img :src="teambuildertitle" alt="Team Builder Logo" class="project-icon team-builder-img" />
      </q-card-section>

      <!-- Demo GIF -->
      <!-- <q-separator class="separator" />
      <q-card-section class="project-demo">
        <q-img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif"
          alt="Team Builder Demo"
          class="project-gif"
          ratio="16/9"
          contain
        />
      </q-card-section> -->
    </q-card>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

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
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: 0rem;
  margin-bottom: 0.1rem;
  padding: 0;
}

.info-exception {
  margin-left: 1rem;
  margin-top: 0.8rem;
}

.vibelyLogo {
  height: 150px;
  filter: brightness(0%) saturate(100%);
}

.vibely-logo {
  width: 100%;
  /* responsive height via aspect ratio, tweak to taste */
  aspect-ratio: 3 / 1;
  /* wide banner style */
  overflow: hidden;
  /* crop anything outside */
  display: flex;
  align-items: center;
  /* vertically center SVG content */
  justify-content: center;
  /* horizontally center */
  margin-top: -2rem;
  margin-bottom: -2rem;
}

:deep(.vibely-logo svg) {
  width: 120%;
  /* > 100% = zoom in / allow cropping */
  height: 120%;
}

:deep(.vibely-logo svg path) {
  fill: #2b6caf !important;
  /* Ensures black even if paths have default white */
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


.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

/* feature list section */
.q-card__section--vert {
  padding: 8px;
}

.project-body-exception {
  padding: 1rem;
  padding-top: 1.8rem;
  display: flex;

  align-items: flex-start;
  gap: 1.5rem;
  align-items: center;
}

.project-body-left {
  flex: 1 1 0;
}

.team-builder-img {
  flex: 0 0 auto;
  height: auto;
  width: 220px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
  justify-items: flex-start;
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

.separator-info-exception {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

/* demo GIF */
.project-demo {
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 50%;
  height: auto;
  border-radius: 4px;

}

/* tiny screens */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 600px) {
  .project-body-exception {
    flex-direction: column;
    padding-top: 0;
  }

  .team-builder-img {
    align-self: center;
    width: 100%;
    margin-top: -1rem;
  }

  .project-gif {
    width: 100%;
  }

  .vibely-logo {
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
}

.stacked-layout {
  display: flex;
  flex-direction: column;
}

.stacked-layout .project-body-left,
.stacked-layout .project-icon,
.stacked-layout .project-gif {
  flex: 0 0 auto;  /* no flex-basis magic */
  width: 100%;     /* take full width */
  margin-top: -1.5rem;

}
</style>
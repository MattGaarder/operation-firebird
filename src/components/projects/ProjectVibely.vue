<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="chat" class="project-icon" />
        <div class="project-info">
          <div class="project-title">VIBELY</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        This is a React single-page app using Firebase for authentication and real-time data.
        It wraps routes in a hash router and shares the current user via context. The NavBar
        adapts based on login state. Home subscribes to Firestore “posts” collections with
        real-time updates, rendering them as post cards. Users can create new “vibes” which
        are saved to Firestore. Material UI supplies layout/components and Firebase Auth tracks
        signed-in state. Overall: client-side routing, real-time DB sync, and auth integration.
        <q-separator class="separator invisi" />
        <em>
          Share vibes in real time: post updates, react to the community, and watch your feed
          update live with Firebase-powered auth and Firestore streams.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li>
            <strong>UI:</strong> React with Material UI components for fast, accessible layouts.
          </li>
          <li>
            <strong>Routing &amp; State:</strong> React Router + Context API to manage user session and route visibility.
          </li>
          <li>
            <strong>Authentication:</strong> Firebase Auth for email/password sign-up and sign-in flows.
          </li>
          <li>
            <strong>Data Backend:</strong> Firestore for live posts, profile data, and “vibe” voting.
          </li>
          <li>
            <strong>Real-Time:</strong> <code>onSnapshot</code> listeners to instantly reflect new posts and votes in the UI.
          </li>
          <li>
            <strong>Responsive:</strong> Flex/Grid layouts that adapt across desktop and mobile breakpoints.
          </li>
        </ul>
      </q-card-section>

      <!-- Demo / Logo Image -->
      <q-separator class="separator" />
      <q-card-section class="project-demo">
        <q-img :src="props.images[1]" class="project-gif" alt="Vibely logo" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
});
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

/* demo image */
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
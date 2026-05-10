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

      <!-- More Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">More Information</h1>
        <q-separator class="separator-info" />
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
/* component-specific adjustments if any */
</style>
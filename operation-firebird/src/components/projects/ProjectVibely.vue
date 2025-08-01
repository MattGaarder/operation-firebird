<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-body">
        <div class="project-info">
          <div class="project-title">Vibely</div>
          <div class="project-tagline">
            This is a React single-page app using Firebase for authentication and real-time data. It wraps routes in a hash router and shares the current user via context. The NavBar adapts based on login state. Home subscribes to Firestore “posts” collections with real-time updates, rendering them as post cards. Users can create new “vibes” which are saved to Firestore. Material UI supplies layout/components and Firebase Auth tracks signed-in state. Overall: client-side routing, real-time DB sync, and auth integration.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li><strong>UI:</strong> React with Material UI components for fast, accessible layouts</li>
          <li><strong>Routing & State:</strong> React Router + Context API to manage user session</li>
          <li><strong>Authentication:</strong> Firebase Auth for email/password sign-up & sign-in flows</li>
          <li><strong>Data Backend:</strong> Firestore for live posts, profile data & “vibe” voting</li>
          <li><strong>Real-Time:</strong> onSnapshot listeners to instantly reflect new posts & votes</li>
          <li><strong>Responsive:</strong> Flex/Grid layouts adapt across desktop and mobile</li>
        </ul>
      </q-card-section>
      <q-img :src="props.images[1]" class="project-gif" alt="Vibely logo"/> 
    </q-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true
  }});
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
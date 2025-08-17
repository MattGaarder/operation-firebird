<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-body">
        <div class="project-info">
          <div class="project-title">Moovie Match</div>
          <div class="project-tagline">
            This project is a jQuery-based film comparison UI. Clicking “find” AJAX-requests movie data from OMDB, renders a discover panel with poster/details, then queries YouTube’s API for a trailer and instantiates the YouTube iframe player. Users can mark titles as “seen” or “watch,” which are persisted in localStorage and shown in dynamic lists. Event delegation handles interactions (activate, delete, move), and layout tweaking functions adjust presentation. Core tech: jQuery, OMDB API, YouTube IFrame API, and browser localStorage.

            'Compare and manage movie trailers effortlessly: view side-by-side previews and key film details, then save your picks to persistent Watch or Seen lists—your personalized cinematic dashboard for smarter, stress-free movie decisions.',
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li><strong>Movie Data:</strong> Fetches film details from OMDB API via AJAX</li>
          <li><strong>Trailers:</strong> Integrates YouTube iFrame API to embed trailers</li>
          <li><strong>Lists:</strong> “Watch” & “Seen” arrays persisted in localStorage</li>
          <li><strong>Dynamic UI:</strong> jQuery generates and updates cards, buttons & event handlers</li>
          <li><strong>State Management:</strong> data-attributes & click handlers rehydrate selected movie info</li>
          <li><strong>Learned:</strong> chaining API calls, DOM manipulation & clean UX for list-based navigation</li>
        </ul>
      </q-card-section>
      <q-img :src="props.images[1]" class="project-gif" alt="Moovie Match logo"/> 
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
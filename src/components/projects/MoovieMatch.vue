<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="movie" class="project-icon" />
        <div class="project-info">
          <div class="project-title">MOOVIE MATCH</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        This project is a jQuery-based film comparison UI. Clicking “find” AJAX-requests movie data from OMDB,
        renders a discover panel with poster/details, then queries YouTube’s API for a trailer and instantiates
        the YouTube iframe player. Users can mark titles as “seen” or “watch,” which are persisted in
        <code>localStorage</code> and shown in dynamic lists. Event delegation handles interactions (activate,
        delete, move), and layout tweaking functions adjust presentation. Core tech: jQuery, OMDB API,
        YouTube IFrame API, and browser localStorage.
        <q-separator class="separator invisi" />
        <em>
          Compare and manage movie trailers effortlessly: view side-by-side previews and key film details,
          then save your picks to persistent Watch or Seen lists — your personalized cinematic dashboard for
          smarter, stress-free movie decisions.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li>
            <strong>Movie Data:</strong> Fetches film details from OMDB API via AJAX.
          </li>
          <li>
            <strong>Trailers:</strong> Integrates YouTube iFrame API to embed trailers.
          </li>
          <li>
            <strong>Lists:</strong> “Watch” &amp; “Seen” arrays persisted in <code>localStorage</code>.
          </li>
          <li>
            <strong>Dynamic UI:</strong> jQuery generates and updates cards, buttons &amp; event handlers.
          </li>
          <li>
            <strong>State Management:</strong> <code>data-*</code> attributes &amp; click handlers rehydrate selected movie info.
          </li>
          <li>
            <strong>Learned:</strong> Chaining API calls, DOM manipulation &amp; clean UX for list-based navigation.
          </li>
        </ul>
      </q-card-section>

      <!-- Screenshot / Logo -->
      <q-img :src="props.images[1]" class="project-gif" alt="Moovie Match screenshot" />
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

.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

.projects-wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgb(253, 253, 253);
}

.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: white;
  margin: 0.6rem;
  /* no padding here so separators can go full-width via negative margins */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* header: icon + info, wrapping when too narrow */
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
  color: #2b6caf;
  font-size: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.4rem;
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

.project-tagline {
  padding: 1.5rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.q-card__section--vert {
  padding: 8px;
}

/* feature list section */
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

/* separators */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
}

/* demo / screenshot */
.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
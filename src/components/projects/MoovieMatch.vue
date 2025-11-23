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
        renders a discover panel with poster/details, then queries YouTube’s API for a trailer. Users can mark titles
        as “seen” or “watch,” which are persisted in <code>localStorage</code> and shown in dynamic lists.
        <q-separator class="separator invisi" />
        <em>
          Compare trailers side by side and save films to persistent Watch/Seen lists — your personalized cinematic
          dashboard for smarter movie decisions.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info ">Further Information</h1>
      <q-separator class="separator-info" />

      <!-- Text + GIF layout -->
      <q-card-section
        class="project-body-exception"
        :class="{ 'stacked-layout': isNarrow }"
      >
        <!-- Left: feature bullets -->
        <div class="project-body-left">
          <ul class="feature-list">
            <li><strong>Movie Data:</strong> Fetches film details from OMDB API via AJAX.</li>
            <li><strong>Trailers:</strong> Uses YouTube IFrame API for embedded playback.</li>
            <li><strong>Lists:</strong> Watch &amp; Seen arrays persisted in <code>localStorage</code>.</li>
            <li><strong>Dynamic UI:</strong> jQuery generates cards, buttons &amp; click handlers.</li>
            <li><strong>State Mgmt:</strong> <code>data-*</code> attributes rehydrate selections.</li>
            <li><strong>Learned:</strong> API chaining, DOM manipulation &amp; list-based UX.</li>
          </ul>
        </div>

        <!-- Right: screenshot / GIF -->
        <q-card-section class="project-demo">
          <q-img
            :src="props.images[1]"
            class="project-gif"
            alt="Moovie Match screenshot"
          />
        </q-card-section>
      </q-card-section>
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

// same pattern as your other project components
const isNarrow = computed(
  () => props.containerWidth > 0 && props.containerWidth < 700
);
</script>

<style scoped>
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: 0.5rem;     /* was -1rem */
  margin-bottom: 0rem;  /* match other cards */
  padding: 0;
  padding-left: 1.8rem;
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
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* Header */
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--q-color-grey-1);
  margin-top: 0.7rem;
}

.project-icon {
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
  margin-left: 0.3rem;
}

/* Tagline – tiny tweak on bottom padding if you want it tighter */
.project-tagline {
  padding: 0.5rem 1.7rem 0.6rem;  /* was 0.7rem */
  font-size: 0.95rem;
  line-height: 1.4;
}

/* separators */
.separator {
  margin-left: 0rem;
  margin-right: -0rem;
}

.separator-info {
  /* margin-left: -1.8rem;
  margin-right: -1.8rem; */
  margin-top: 0.5rem;
}

/* layout row for text + gif */
.project-body-exception {
  padding-left: 1rem;
  padding-right: 1rem;      /* slight balance */
  padding-top: 0.5rem;      /* gives breathing room below separator */
  display: flex;
  gap: 1rem;
  align-items: center;
}

.project-body-left {
  flex: 0 1 50%;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;         /* was 1.5rem */
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* gif container */
.project-demo {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* image */
.project-gif {
  width: 100%;
  max-width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

/* stack header on tiny devices */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}

/* responsive stacking using isNarrow */
.stacked-layout {
  flex-direction: column;
  align-items: center;
}

.stacked-layout .project-body-left,
.stacked-layout .project-demo {
  width: 100%;
  margin-bottom: 1rem;
}
</style>
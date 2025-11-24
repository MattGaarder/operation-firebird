<template>
  <div class="projects-wrapper">
<!-- MOVIE DISCOVERY / WATCHLIST PROJECT CARD -->
<q-card bordered class="project-card q-pa-md q-ma-sm">
  <!-- Header -->
  <q-card-section class="project-header q-mt-sm">
    <q-icon name="movie" class="project-icon q-pl-md q-pt-md" />
    <div class="project-info">
      <div class="project-title">
        MOVIE DISCOVERY<span class="sub">(OMDb / YouTube / jQuery)</span>
      </div>
    </div>
  </q-card-section>
  <q-separator class="separator" />

  <!-- Tagline -->
  <div class="project-tagline q-mx-lg q-my-lg">
    A jQuery-powered movie discovery tool that pulls metadata from the OMDb API, embeds YouTube
    trailers via the IFrame Player API, and lets you manage <code>Seen</code> and <code>Watch</code>
    lists persisted in <code>localStorage</code>.
    <q-separator class="invisi" />
    <em>
      “Search a film, watch the trailer in-place, and file it straight into your Seen or Watch
      lists — all driven by chained API calls and client-side state.”
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

    <!-- Code block -->
    <q-card-section class="project-code">
      <q-scroll-area class="code-container">
        <pre v-prism class="prism-block">
        <code class="language-js" :textContent="movieAppSnippet"></code>
        </pre>
      </q-scroll-area>
    </q-card-section>
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
            <strong>OMDb Integration:</strong> <code>OMDBInfoRequest()</code> fetches title metadata from
            OMDb based on the user’s search input.
          </li>
          <li>
            <strong>YouTube Trailers:</strong> <code>getTrailer()</code> queries the YouTube Data API
            for trailers and feeds the videoId into the IFrame Player API.
          </li>
          <li>
            <strong>Dynamic “Discover” Cards:</strong> <code>displayInfo()</code> builds a composite
            “discover” panel with poster, details, and controls using jQuery DOM generation.
          </li>
          <li>
            <strong>Seen / Watch Lists:</strong> <code>moveToList()</code>, <code>createSeenArray()</code>,
            and <code>createWatchArray()</code> maintain localStorage-backed arrays rendered into
            <code>#seenList</code> and <code>#watchList</code>.
          </li>
          <li>
            <strong>Rehydrate From Lists:</strong> Clicking an info icon recreates the discover view for
            a stored movie via <code>infoFromListEl()</code>.
          </li>
          <li>
            <strong>Learned:</strong> Chaining multiple APIs (OMDb + YouTube), managing localStorage,
            and coordinating dynamic DOM updates with jQuery event delegation.
          </li>
        </ul>
      </div>
      <div class="project-demo">
        
        <q-img :src="props.images[1]" class="project-gif" alt="Movie Search Demo"></q-img>
      </div>
    </q-card-section>
  </q-expansion-item>

  <q-separator class="separator" />
</q-card>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import movieAppSnippet from '../../assets/snippets/moovie-search.txt?raw';


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

const isNarrow = computed(
  () => props.containerWidth > 0 && props.containerWidth < 700
);
</script>

<style scoped>

.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ECF2F8;
}

</style>
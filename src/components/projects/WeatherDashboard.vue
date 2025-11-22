<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="cloud" class="project-icon" />
        <div class="project-info">
          <div class="project-title">WEATHER DASHBOARD</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        This is a jQuery-based weather dashboard. The user enters a city, which is geocoded via
        OpenWeather’s Geocoding API to get coordinates; those are saved to localStorage and
        rendered as history buttons. Clicking a city or searching fetches the 5-day forecast,
        extracts midday data, and updates the DOM with temperature, humidity, wind, and icons.
        <q-separator class="separator invisi" />
        <em>
          Check future weather instantly: persistent city history buttons, 5-day forecast cards,  
          and live API responses — all powered by pure jQuery and client-side memory.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li><strong>Geolocation:</strong> City coords via OpenWeather Geo API</li>
          <li><strong>Forecast:</strong> 5-day forecast & dates formatted via <code>moment.js</code></li>
          <li><strong>History:</strong> Cities stored in <code>localStorage</code> as clickable recall buttons</li>
          <li><strong>UI:</strong> jQuery builds DOM cards & uses <code>data-attributes</code> for state</li>
          <li><strong>Prototyped With:</strong> Postman for debugging API requests</li>
          <li><strong>Learned:</strong> Persistent states, AJAX chaining & dataset access</li>
        </ul>
      </q-card-section>

      <!-- Demo Image -->
      <q-separator class="separator" />
      <q-card-section class="project-demo">
        <q-img :src="props.images[1]" class="project-gif" alt="Weather Dashboard logo" />
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
/* 🔶 TITLE TEXT */
.project-title {
  font-size: 1.55rem;
  font-weight: 600;
  margin-top: auto;
  margin-left: 0.3rem;
  text-transform: uppercase;
}

.info {
  font-size: 0.9rem;
  color: black;
  margin-top: -1rem;
}

/* 🔶 WRAPPER */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  background: rgb(253, 253, 253);
}

/* 🔶 CARD BASE */
.project-card {
  display: flex;
  flex-direction: column;
  margin: 0.6rem;
  padding: 0.8rem;
  border-radius: 6px;
  background: white;
  border-color: rgb(207, 207, 207);
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* 🔶 HEADER (icon + title band) */
.project-header {
  display: flex;
  align-items: baseline;
  background: var(--q-color-grey-1);
  margin-top: 0.7rem;
}

.project-icon {
  font-size: 1.8rem;
  padding: 0 0.4rem 0 0.5rem;
  color: #2b6caf;
}

/* 🔶 TAGLINE */
.project-tagline {
  padding: 1.5rem 1.2rem 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

/* 🔶 FURTHER INFORMATION */
.project-body {
  padding: 1rem;
  padding-top: 1.8rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
}

.feature-list li {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

/* 🔶 SEPARATORS (full width) */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}
.separator-info {
  margin: 0.5rem -1.8rem 0;
}

/* 🔶 DEMO IMAGE */
.project-gif {
  width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* 🔶 MOBILE */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
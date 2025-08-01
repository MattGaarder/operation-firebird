<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <!-- <q-img src="/src/assets/logos/project_logos/SVG/SVG/cloud-day.svg" alt="Weather Dashboard Logo" class="project-icon" contain/> -->
        <div class="project-info">
          <div class="project-title">Weather Dashboard</div>
          <div class="project-tagline">
            This is a jQuery-based weather dashboard. The user enters a city, which is geocoded via OpenWeather’s Geocoding API to get coordinates; those are saved to localStorage and rendered as history buttons. Clicking a city or searching fetches the 5-day forecast, extracts midday data, and updates the DOM with temperature, humidity, wind, and icons. Moment.js formats dates. Reused buttons support recall, and localStorage avoids duplicate entries. Core tech: jQuery AJAX, OpenWeather APIs, Moment.js, DOM manipulation, and client-side persistence.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li><strong>Geolocation:</strong> fetch city coords via OpenWeather Geo API</li>
          <li><strong>Forecast:</strong> 5-day & current data via forecast endpoint, dates formatted with <code>moment.js</code></li>
          <li><strong>History:</strong> saved cities stored in <code>localStorage</code> & rendered as clickable buttons</li>
          <li><strong>UI:</strong> jQuery builds and updates cards, buttons & data-attributes for state</li>
          <li><strong>Prototyped with:</strong> Postman for API request crafting and debugging</li>
          <li><strong>Learned:</strong> chaining AJAX calls, dataset usage, and persistent state management</li>
        </ul>
      </q-card-section>
      <q-img :src="props.images[1]" class="project-gif" alt="Weather Dashboard logo"/> 
    </q-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

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
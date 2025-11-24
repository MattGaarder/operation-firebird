<template>
  <div class="projects-wrapper">

  </div>
</template>

<script setup>
// import { defineProps } from 'vue';

// const props = defineProps({
//   images: {
//     type: Array,
//     required: true
//   }
// });
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
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
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

/* 🔶 More INFORMATION */
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
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

/* 🔶 MOBILE */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
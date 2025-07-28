<template>
  <q-card flat class="q-mb-none project-section">
    <q-card-section class="q-pa-sm q-pl-sm">
      <div class="wrapper flex flex-center flex-column q-pl-none" :class="id">
        
        <img
          v-if="images.length"
          :src="images[0]"
          :alt="`Logo for ${title}`"
          class="project-logo q-mr-md"
          :to="deployed"
        />
        <div class="tech-list">
          <q-img
            v-for="tech in technology"
            :key="tech.name"
            :src="tech.logo"                     
            :alt="tech.name"
            class="tech-logo"
          />
        </div>
        <div class="text-caption q-pt-lg  project-summary q-pa-md" :to="repo">{{ summary }}</div>


      
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const { id, title, images, deployed, repo, summary, technology } = defineProps({
  id:         { type: String, required: true },
  title:      { type: String, required: true },
  images:     { type: Array,  default: () => [] },
  deployed:   { type: String,  default: '' },
  repo:       { type: String,  default: '' },
  summary:    { type: String,  default: '' },
  technology: { type: Array,   default: () => [] }
})
</script>

<style scoped>
  .tech-list {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-auto-flow: column;
  }

  .tech-logo {
    filter: grayscale(100%) brightness(1.2);
    opacity: 0.4;
    transition: filter 0.3s ease, opacity 0.3s ease;
    width: 2rem;
    height: auto;
    margin-top: 0.8rem;

    margin-left: 0.7rem;

  }

  .tech-logo:hover {
    filter: none;
    opacity: 1;
  }


  .project-logo {
    max-width: 15rem;
    max-height: 8rem;
    min-height: 8rem;
    object-fit: contain;
    opacity: 0.4;
  }

  

  .project-logo,
  .project-summary,
  .technology {
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  .project-section:hover .project-logo,
  .project-section:hover .project-summary,
  .project-section:hover {
    opacity: 1;
    color: white;
  }
</style>
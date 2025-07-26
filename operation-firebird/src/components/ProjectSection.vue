<template>
  <q-card flat class="q-mb-none">
    <q-card-section class="q-pa-sm q-pl-sm">
                <div class="wrapper flex flex-center flex-column q-pl-none" :class="id">
                  <img
                    v-if="images.length"
                    :src="images[0]"
                    :alt="`Logo for ${title}`"
                    class="project-logo"
                    :to="deployed"
                  />
                  <div class="text-caption q-pt-lg  project-summary" :to="repo">{{ summary }}</div>
                  <ul class="q-pl-none technology">
                        <li v-for="(tech, i) in technology" :key="i">{{ tech }}</li>
                  </ul>
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
  .project-logo {
    max-width: 15rem;
    max-height: 8rem;
    min-height: 7rem;
    object-fit: contain;
    opacity: 0.4;
  }

  .technology {
    display: flex;
    list-style: none;
    li {
      padding-left: 2rem;
    }
  }





  .project-logo,
  .project-summary,
  .technology li {
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  .project-section:hover .project-logo,
  .project-section:hover .project-summary,
  .project-section:hover .technology li {
    opacity: 1;
    color: white;
  }
</style>
<template>
  <q-card flat class="q-mb-none project-section">
    <q-card-section class="q-pa-sm q-pl-sm">
      <div class="wrapper flex flex-center q-pl-none" >
        <q-img
          v-if="images.length"
          :src="images[0]"
          :alt="`Logo for ${title}`"
          class="project-logo"
          :class="id"
          :to="deployed"
        />
        <div class="tech-list">
          <div class="tech-items" v-for="tech in technology" :key="tech.name">
            <q-img
              fit
              :src="tech.logo"                     
              :alt="tech.name"
              class="tech-logo"
              ratio="1"
            />
            <q-tooltip anchor="top right" self="top left" class="my-tooltip">
              {{ tech.name }}
            </q-tooltip>
          </div>
        </div> 
        <div class="text-caption q-pt-lg project-summary q-pr-xl q-pl-md" :to="repo">{{ summary }}</div>  
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
  });
</script>

<style scoped>
  .tech-items {
    position: relative; 
    display: inline-block;
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
  }

  .tech-list {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-auto-flow: column;
    gap: 0.1rem;
    min-height: 130px;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;  
  }

  .tech-logo {
    filter: grayscale(100%) brightness(1.2);
    opacity: 0.4;
    transition: filter 0.3s ease, opacity 0.3s ease;
    width: 1.7rem;
    height: auto;
    object-fit:fill;
    margin-top: 0.2rem;
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
    min-width: 344px;
    opacity: 0.4;
  }



  :deep(.project5onafa) .q-img__image {
    object-fit: none !important;
    object-position: center !important;
  }

  :deep(.project4pwc) .q-img__image {
    object-fit:cover !important;
    object-position: 30% 70%  !important;
    margin-left: 2rem;
    
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

  @media (max-width: 400px) {
  .wrapper {
    text-align: center;
  }
  .project-logo {
    width: 100%;
    max-width: none;
    min-width: 100vw;
    height: auto;
    margin-bottom: 1.2rem;
  }

  .tech-list {
    display: flex;
    min-height: auto;
  }

  :deep(.project-summary) {
    padding-right: 0;
    padding-left: 0 !important;
  }

  .project4pwc {
    max-width: none !important;
    max-height: none !important;
    margin-top: -5rem;
    margin-left: -0.4rem;
  }

  .project6teamb, .project1weatherd, .project3moviem {
    max-height: 11rem;
  }

  .project2vibely {
    margin-left: -0.75rem;
  }

  .project5onafa {
    margin-left: -1rem;
  }
}
</style>
<template>
  <q-card flat class="q-mb-none project-section">
    <q-card-section class="q-pa-sm q-pl-sm qward">
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
      <div class="wrapper flex flex-center q-pl-md" >
        <q-img
          v-if="images.length"
          :src="images[0]"
          :alt="`Logo for ${title}`"
          class="project-logo"
          :class="id"
          :to="deployed"
        />
        <div class="text-caption q-pt-md project-summary q-pr-none q-pl-sm" :to="repo">{{ summary }}</div>
        
          
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
  .tech-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .wrapper {
    display: flex;
    flex-direction: column;

   
  }

  .tech-logo {
    filter: grayscale(100%) brightness(1.2);
    opacity: 0.4;
    transition: filter 0.3s ease, opacity 0.3s ease;
    width: 1.6rem;
    height: auto;
    object-fit:fill;
    margin-top: 0.2rem;
    margin-left: 0.4rem;
  }

  .tech-logo:hover {
    filter: none;
    opacity: 1;
  }

  .project-logo {
    max-width: 20rem;
    max-height: 6.1rem;
    min-height: 5rem;
    opacity: 0.4;
  }



  :deep(.project5onafa) .q-img__image {
    object-fit: contain !important;
  
    height: 90%;
  
  }

  :deep(.project4pwc) .q-img__image {
    object-fit: cover !important;
    margin-left: 1.5rem;

   
  }


  :deep(.project2vibely) .q-img__image {
    object-fit:cover !important;
    height: 105%;
    margin-top: 0.3rem;
  }


  .project-logo,
  .project-summary,
  .technology {
    opacity: 0.4;
    transition: opacity 0.3s ease;
  }

  .project-summary {
    max-width: 25rem;
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

  .qward {
    display: flex;
    flex-direction: row;
  }
</style>
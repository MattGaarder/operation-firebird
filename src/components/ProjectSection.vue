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
        <div class="text-caption q-pt-md project-summary q-pr-none q-pl-xs" :to="repo">{{ summary }}</div>
        <ul v-if="summaryBullets.length" class="summary-bullets">
          <li v-for="item in summaryBullets" :key="item">
            {{ item }}
          </li>
        </ul>
        
          
      </div>
      
    </q-card-section>
  </q-card>
</template>

<script setup>
  const { id, title, images, deployed, repo, summary, summaryBullets, technology } = defineProps({
    id:         { type: String, required: true },
    title:      { type: String, required: true },
    images:     { type: Array,  default: () => [] },
    deployed:   { type: String,  default: '' },
    repo:       { type: String,  default: '' },
    summary:    { type: String,  default: '' },
    summaryBullets: {
      type: Array,
      default: () => []
    },
    technology: { type: Array,   default: () => [] }
  });
</script>

<style scoped>
  .tech-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 2.5rem;
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
    max-height: 6.5rem;
    min-height: 5rem;
    opacity: 0.4;
    margin-right: 1.8rem;
  }





  :deep(.project4pwc) .q-img__image {
    object-fit: cover !important;
    margin-left: 1.5rem;
  }


  :deep(.project2vibely) .q-img__image {
    object-fit: cover !important;
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
    max-width: 23rem;
    
  }

  .summary-bullets {
    max-width: 21rem;
    padding-left: 0rem;
    margin: 0;
    margin-top: 0.5rem;
    list-style: disc;
  }

  .summary-bullets li {
    opacity: 0.4;
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .summary-bullets li:first-child {
    list-style-type: none; 
    font-weight: 600;      
    margin-left: -0.7rem;       
  }

  .project-section:hover .project-logo,
  .project-section:hover .project-summary,
  .project-section:hover .summary-bullets li {
    opacity: 1;
    color: white;
  }

  @media (max-width: 400px) {
    :deep(.project-summary) {
      padding-right: 2rem;
      padding-left: 0 !important;
    }

    .tech-list {
      flex-direction: row;
      position: absolute;
      margin-top: -5rem;
      margin-left: 2.4rem;
    }

    .summary-bullets {
      max-width: 19rem;

      list-style: disc;
    }

    .summary-bullets li {
      opacity: 0.4;
      font-size: 0.75rem;
      margin-left: -1.7rem;
      max-width: 18rem;
    }

    .summary-bullets li:first-child {    
      margin-left: -2rem;       
    }

    .project-logo {
      margin-left: -0.3rem;
    }
  }

  .qward {
    display: flex;
    flex-direction: row;
  }
</style>
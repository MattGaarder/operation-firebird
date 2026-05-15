<template>
  <q-card flat class="project-section">
    <q-card-section class="project-flex">
      <div class="tech-list">
          <div v-for="tech in technology" :key="tech.name">
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
      <div class="wrapper flex-center" >
        <q-img
          v-if="images.length"
          :src="images[0]"
          :alt="`Logo for ${title}`"
          class="project-logo"
          :class="id"
          :to="deployed"
        />
        <div class="text-caption project-summary" :to="repo" v-html="summary"></div>
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
    gap: 0.5rem;
    z-index: 2000;
    margin-right: 12px;
    margin-left: -13px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    /* background-color: #ececec; */
  }

 .tech-logo {
    transition: filter 0.3s ease, opacity 0.3s ease;
    width: 1.5rem;
    height: auto;
    object-fit: fill;
  }

  .tech-logo:hover {
    filter: none;
    opacity: 1;
  }

  .project-logo,
  .project-summary,
  .technology {
    /* opacity: 0.4; */
    transition: opacity 0.3s ease;
    padding: 1rem 1rem 1rem 1rem;
  }

  /* .summary-bullets {
    list-style: disc;
    padding-left: 0%;
  }

  .summary-bullets li {

    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .summary-bullets li:first-child {
    list-style-type: none;
    font-weight: 600;
    margin-left: -0.7rem;
  } */

  .project-section:hover .project-logo,
  .project-section:hover .project-summary,
  .project-section:hover .summary-bullets li {
    opacity: 1;
    color: var(--site-text);
  }

  @media (max-width: 400px) {
    .tech-list {
      padding: 7px 5px 0px 5px !important;
      margin-right: 0px;
      margin-left: 0px;
    }

    .summary-bullets li {
      font-size: 0.7rem;


    }
  }

  .project-flex {
    display: flex;
    flex-direction: row;
    justify-content: center;

  }
</style>

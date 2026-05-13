<template>
    <q-page padding class="projects-page">
        <div class="row project-row bg-primary" :class="{ 'three-col': !leftDrawerOpen }">
            <div v-for="(project, idx) in projects" :key="project.id"
                :ref="el => setCardRef(el, idx)"
                class="col-12 col-md-6 col-lg-4 cursor-pointer project-card-wrapper"
                :class="{ 'mobile-focused': focusedIndex === idx && isMobile }"
                @click="openProject(project)">
                <ProjectSection v-bind="project" :images="[getProjectLogo(project), ...project.images.slice(1)]" class="bg-primary q-pt-xl" />
            </div>
        </div>
        <teleport to="body">
            <div class="windows-layer" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
                <draggable-resizable-vue v-for="(win, i) in windows" :key="win.uid" v-model:x="win.x" v-model:y="win.y"
                    v-model:h="win.height" v-model:w="win.width" v-model:active="win.active" :minWidth="120"
                    :minHeight="64" :style="{ zIndex: win.zIndex }" :drag-handle="'.window-handle'"
                    @mousedown="bringToFront(i)" :parent="true">

                    <q-card class="window-card bg-primary" bordered>
                        <q-card-section
                            class="window-handle window-handle-header bg-primary row items-center text-white q-pa-none">
                            <div class="col project-title-window">{{ win.project.title }}</div>
                            <q-space />
                            <q-btn flat icon="close" @click="closeWindow(i)" />
                        </q-card-section>
                        <q-card-section class="project-body" style="overflow:auto; height:calc(100% - 60px)">
                            <!-- <p>{{ win.project.summary }}</p> <br /> -->
                            <div class="window-body">
                                <component :is="win.project.component" :images="win.project.images"
                                    :container-width="win.width"></component>
                            </div>
                        </q-card-section>
                        <div class="row window-handle window-handle-footer">
                            <q-btn flat icon="code" label="GitHub" :disable="!win.project.repo[0]"
                                :href="win.project.repo[1]" target="_blank"/>
                            <q-btn flat icon="launch" label="Live" :disable="!win.project.deployed[0]"
                                :href="win.project.deployed[1]" target="_blank" />
                        </div>
                    </q-card>
                </draggable-resizable-vue>
            </div>
        </teleport>
    </q-page>
</template>

<script setup>
import { ref, markRaw, inject, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useQuasar } from 'quasar';

import DraggableResizableVue from 'draggable-resizable-vue3';

import ProjectSection from 'src/components/ProjectSection.vue';
// import ProjectVibely from 'src/components/projects/ProjectVibely.vue';
import TeamBuilder from 'src/components/projects/EdXProjects.vue';

import ProjectNocado from 'src/components/projects/ProjectNocado.vue';
import PwCProjects from 'src/components/projects/PwCProjects.vue';
// import WeatherDashboard from 'src/components/projects/WeatherDashboard.vue';
import ProjectOnafa from 'src/components/projects/ProjectOnafa.vue';
import ThisPortfolio from 'src/components/projects/ThisPortfolio.vue';
import CodeJournal from 'src/components/projects/PostworkProjects.vue';
import ProjectAnkify from 'src/components/projects/ProjectAnkify.vue';
import MedJp from 'src/components/projects/MedJp.vue';

const leftDrawerOpen = inject('leftDrawerOpen');

// ── Mobile scroll-focus system ──────────────────────────────────
const focusedIndex = ref(0);
const isMobile = ref(false);
const cardRefs = ref([]);
let observer = null;
let mql = null;

function setCardRef(el, idx) {
  if (el) cardRefs.value[idx] = el;
}

function setupObserver() {
  if (observer) { observer.disconnect(); observer = null; }
  if (!isMobile.value) return;

  // Build a dense threshold array so we get granular ratio updates
  const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

  const ratios = new Map();

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => ratios.set(e.target, e.intersectionRatio));

      // Find the card with the highest visibility ratio
      let bestIdx = 0;
      let bestRatio = 0;
      cardRefs.value.forEach((el, idx) => {
        const r = ratios.get(el) || 0;
        if (r > bestRatio) { bestRatio = r; bestIdx = idx; }
      });
      focusedIndex.value = bestIdx;
    },
    { threshold: thresholds }
  );

  cardRefs.value.forEach(el => { if (el) observer.observe(el); });
}

function onMediaChange(e) {
  isMobile.value = e.matches;
  nextTick(() => setupObserver());
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 600px)');
  isMobile.value = mql.matches;
  mql.addEventListener('change', onMediaChange);
  nextTick(() => setupObserver());
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  if (mql) mql.removeEventListener('change', onMediaChange);
});
const isDark = inject('isDark');

const $q = useQuasar();
const portfolioFilter = computed(() => isDark.value ? 'none' : 'invert(1)');
const windows = ref([]);

let topZ = 2001;

function getWindowConfig() {
    const w = $q.screen.width
    const h = $q.screen.height

    // Default desktop factors
    let widthFactor = 0.4
    let heightFactor = 0.9

    // Responsive overrides for mobile and small screens
    if ($q.screen.lt.sm) {
        widthFactor = 0.9
        heightFactor = 0.85
    } else if ($q.screen.lt.md) {
        widthFactor = 0.7
        heightFactor = 0.85
    }

    const width = Math.floor(w * widthFactor)
    const height = Math.floor(h * heightFactor)

    // center the window
    const x = Math.floor((w - width) / 2)
    const y = Math.floor((h - height) / 2)

    return {
        width,
        height,
        x,
        y
    }
}

function openProject(proj) {
    const cfg = getWindowConfig()
    windows.value.push({
        uid: Date.now() + Math.random(),
        project: proj,
        x: cfg.x,
        y: cfg.y,
        width: cfg.width,
        height: cfg.height,
        active: true,
        zIndex: ++topZ,
    })
}

function bringToFront(i) {
    windows.value[i].zIndex = ++topZ
    windows.value[i].active = true
}

// PROJECT ARRAY
function closeWindow(i) {
    windows.value.splice(i, 1)
}
function loadProjectLogo(name, ext = 'svg') {
    return new URL(`/src/assets/logos/project_logos/${name}.${ext}`, import.meta.url).href;
}
function loadTechLogo(relativePath) {
    return new URL(`/src/assets/tech_logos/${relativePath}`, import.meta.url).href;
}
function getProjectLogo(project) {
    if (!project.logo) return project.images[0]
    const logoName = isDark.value ? project.logo.dark : project.logo.light
    return loadProjectLogo(logoName)
}
const projects = [
  {
        id: 'med-jp',
        title: 'med-jp',
        logo: {
            light: 'med-jp-light',
            dark: 'med-jp-dark',
        },
        images: [
            null,
            'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnFmcmc0Z2xlZ3RudTE5aWF3anNidGJtM3kxcncwZWV1bnZiaGRkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JgYrWwBoJ06MYTvMPS/giphy.gif',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif',
        ],
        deployed: [false, 'https://code-journal.netlify.app'],
        repo: 'https://github.com/MattGaarder/med-jp-logo-dark',
        summary: 'Japanese NLP pipeline combines fuzzy matching, deinflection, beam-search segmentation, RAG semantic reranking to normalize noisy romaji input into coherent Japanese token streams.',
        technology: [
            { name: 'Ollama', logo: loadTechLogo('ollama.svg') },
            { name: 'Qwen 3', logo: loadTechLogo('qwen-color.svg') },
            { name: 'SQLite', logo: loadTechLogo('sqlite-icon.svg') },
        ],
        component: markRaw(MedJp),
    },
    {
        id: 'postwork',
        title: 'Postwork',
        logo: {
            light: 'postwork-light_1',
            dark: 'postwork-dark',
        },
        images: [
            null,
            'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnFmcmc0Z2xlZ3RudTE5aWF3anNidGJtM3kxcncwZWV1bnZiaGRkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JgYrWwBoJ06MYTvMPS/giphy.gif',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif',
        ],
        deployed: [true, 'https://code-journal.netlify.app'],
        repo: 'https://github.com/MattGaarder/postwork-journal',
        summary: 'Hands-on coding across varied technical domains to create high-quality datasets used in the training of frontier AI systems.',

        technology: [
          { name: 'Postman', logo: loadTechLogo('postman-icon-svgrepo-com.svg') },
            { name: 'JavaScript', logo: loadTechLogo('javascript-logo-svgrepo-com.svg') },
            { name: 'HTML', logo: loadTechLogo('html-5-logo-svgrepo-com.svg') },
            { name: 'CSS', logo: loadTechLogo('Official_CSS_Logo.svg') },
            // { name: 'OpenWeatherAPI', logo: loadTechLogo('openweather-logo.svg') },
            // { name: 'Momentjs', logo: loadTechLogo('momentjs-svgrepo-com.svg') },

        ],
        component: markRaw(CodeJournal),
    },
    {
        id: 'pwc',
        title: 'PwC',
        logo: {
            light: 'PricewaterhouseCoopers_Logo',
            dark: 'PricewaterhouseCoopers_light',
        },
        images: [
            null,
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFkZjk4NzUwYzBmMDI1YzgzYzQ5YzQxMTE2ZTg4NjVmYjI2ZTg1ZCZjdD1n/pgvPIQVTNPtA2nL1S1/giphy.gif'
        ],
        deployed: [false],
        repo: [false],
        summary: 'PwC projects include custom Storyline functionality with JavaScript triggers, VBA with Excel for data analysis, and Apps Script automations to streamline repetitive tasks.',
        technology: [
            { name: 'GoogleAppsScript', logo: loadTechLogo('Google_AppsScript.svg') },
            { name: 'ArticulateStoryline', logo: loadTechLogo('Articulate.svg') },
            { name: 'Azure', logo: loadTechLogo('Azure.svg') },
            { name: 'Alteryx', logo: loadTechLogo('alteryx.svg') },
            { name: 'CSharp', logo: loadTechLogo('csharp.svg') },
            { name: 'CreativeCloud', logo: loadTechLogo('adobe-creative-cloud-1.svg') },
        ],
        component: markRaw(PwCProjects),
    },
    {
        id: 'edx',
        title: 'edX Trinity Skills',
        images: [
            loadProjectLogo('edx-1'),
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjg4YTUxNDUzMTFjOTZlMTZlZjU3MjlkMjc0YmEzMjZhZmMzODkxYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/W59zLvbEsDbE9Q7iMQ/giphy.gif',
        ],
        deployed: [false],
        repo: [true, 'https://github.com/MattGaarder/team-profile-generator'],
        summary: "Trinity Skills Bootcamp in Web Development — 16-week online bootcamp covering key front-end technologies and modern web-development practices.",

        technology: [
            { name: 'Nodejs', logo: loadTechLogo('nodejs-icon.svg') },
            { name: 'Jest', logo: loadTechLogo('jest-js-icon.svg') },
            // { name: 'Inquirer', logo: loadTechLogo('inquirer_readme.svg') },
            { name: 'MaterialUI', logo: loadTechLogo('material-ui-1.svg') },
            { name: 'Firebase', logo: loadTechLogo('firebase-icon.svg') },
            { name: 'React', logo: loadTechLogo('react-2.svg') },
            { name: 'jQuery', logo: loadTechLogo('j-query.svg') },
            { name: 'Git', logo: loadTechLogo('Git-Icon-1788C.svg') },

        ],
        component: markRaw(TeamBuilder),
    },
    {
        id: 'nocado',
        title: 'Nocado',
        logo: {
            light: 'ncado-light_1',
            dark: 'ncado-dark',
        },
        images: [
            null,
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: [false, 'https://github.com/MattGaarder/team-profile-generator'],
        repo: [true, 'https://github.com/MattGaarder/ocado-helper-frontend'],
        summary: 'Upload your Ocado receipt — "sync" and all purchased items are arranged into “Fridge, Cupboard & Freezer” sections in your Notion database for all your shopping-listing needs.',
        technology: [

            { name: 'MongoDB', logo: loadTechLogo('mongodb-svgrepo-com.svg') },
            { name: 'Expressjs', logo: loadTechLogo('express.svg') },
            { name: 'PDFjs', logo: loadTechLogo('Pdf-js_logo.svg') },
        ],
        component: markRaw(ProjectNocado),
    },
    {
        id: 'ankipi',
        title: 'Ankipi',
        images: [
            loadProjectLogo('ankipi_nobndr'),
            'https://yourdomain.com/path/to/demo-gif.gif'  // placeholder
        ],
        deployed: [false, 'https://github.com/MattGaarder/jsanki-toolbar'],
        repo: [true, 'https://github.com/MattGaarder/ankify'],
        summary: 'Electron toolbar app: paste Japanese text, extract kanji plus readings/meanings and instantly add them to your Anki deck on click. Zero friction between reading and flashcard creation.',
        technology: [
            { name: 'Electron', logo: loadTechLogo('Electron.svg') },
            { name: 'Vue3', logo: loadTechLogo('Vue.js_Logo_2.svg') },
            { name: 'AnkiConnect', logo: loadTechLogo('Anki-icon.svg') }
        ],
        component: markRaw(ProjectAnkify),
    },
    {
        id: 'onafa',
        title: 'Onafã',
        logo: {
            light: 'onafa-light_1',
            dark: 'onafa-dark-v2',
        },
        images: [
            null,
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTdjOGI2MjRmMmI4Y2NmNGIyMzU2NTIwZjI4YjA0M2MyNTYwYjhlZiZjdD1n/mTkFZnQ8EvNSXfV9xP/giphy.gif'
        ],
        deployed: [false, 'https://mattgaarder.github.io/password-generator/'],
        repo: [false, 'https://github.com/MattGaarder/password-generator'],
        summary: 'View my design iteration process — assets created with Adobe software — plus dynamic, parallax-scroll transforms, infinite scrolling galleries, and more.',
        technology: [
            { name: 'Premiere', logo: loadTechLogo('Adobe_Premiere_Pro.svg') },
            { name: 'Illustrator', logo: loadTechLogo('Adobe_Illustrator.svg') },
            { name: 'Photoshop', logo: loadTechLogo('Adobe_Photoshop.svg') },
        ],
        component: markRaw(ProjectOnafa),
    },
    {
        id: 'portfolio',
        title: 'this.portfolio',
        images: [
            loadProjectLogo('this_portfolio'),
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGM3MDVmYTRiZDkyMDM4YmQ5OWQzNWUzMWY1NzA5MmRjYjA2Yjg5ZSZjdD1n/HbVX9TkQKmc0mOLV4C/giphy.gif'
        ],
        deployed: [true, 'https://gaarder.netlify.app/#/'],
        repo: 'https://github.com/MattGaarder/operation-firebird',
        summary: 'Vue3/Quasar portfolio with dynamic theme switching, Masonry illustration gallery, responsive layout, smart internal/external link handling, CV download, and interactive contact integration. Thanks for checking it out!',
        technology: [
            { name: 'Quasar', logo: loadTechLogo('Quasar.svg') },
            { name: 'Prism', logo: loadTechLogo('prism.svg') },
        ],
        component: markRaw(ThisPortfolio),
    },
];
</script>

<style scoped>
:deep(.project7) {
    filter: v-bind(portfolioFilter);
}

.window-card {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 7px 7px 0px 0px rgba(0, 0, 0, 0.55);
}

:v-deep .drv-active,
.drv,
:v-deep .drv-draggable {
    &::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}

.project-body {
    padding: 0px !important;
}



@media (min-width: 600px) and (max-width: 1550px) {
    .project-row>.col-lg-4 {
        flex: 0 0 50%;
        max-width: 50%;
        padding-left: 1rem;
    }
}

@media (min-width: 1100px) and (max-width: 1550px) {
    .three-col.project-row>.col-lg-4 {
        flex: 0 0 33.3333% !important;
        max-width: 33.3333% !important;
        padding-left: 1rem;
    }
}

@media (min-width: 1800px) {
    .three-col.project-row>.col-lg-4 {
        flex: 0 0 25% !important;
        max-width: 25% !important;
        padding-left: 1rem;
    }
}



.windows-layer {
    position: fixed;
    inset: 0;
    z-index: 2000;
    pointer-events: none;
}

.windows-layer > * {
    pointer-events: auto;
}

.projects-page {
  margin-top: -184px !important;
  z-index: 2000;
}

@media (max-width: 900px) {
  .projects-page {
    margin-top: -144px !important;
  }
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE SCROLL-FOCUS — Scale cards based on viewport proximity
   ═══════════════════════════════════════════════════════════════ */
@media (max-width: 600px) {
  .project-card-wrapper {
    transition:
      transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.4s ease !important;
    transform-origin: center center;
  }

  /* Unfocused (resting) state — slightly smaller & dimmed */
  .project-card-wrapper:not(.mobile-focused) {
    transform: scale(0.92);
    opacity: 0.65;
  }

  /* Focused state — full size with a subtle lift */
  .project-card-wrapper.mobile-focused {
    transform: scale(1.02);
    opacity: 1;
  }

  /* Disable desktop hover/active transforms on mobile */
  .project-card-wrapper :deep(.project-section.q-card:hover) {
    transform: none !important;
  }
  .project-card-wrapper :deep(.project-section.q-card:active) {
    transform: scale(0.97) !important;
    transition-duration: 0.12s !important;
  }
}

</style>

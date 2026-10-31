<template>
    <q-page padding class="projects-page">
        <div class="row project-row bg-primary" :class="{ 'three-col': !leftDrawerOpen }">
            <div v-for="(project, idx) in projects" :key="project.id"
                :ref="el => setCardRef(el, idx)"
                class="col-12 col-md-6 col-lg-4 cursor-pointer project-card-wrapper"
                :class="{ 'is-locked': isMobile && lockedIndex === idx }"
                @click="handleCardClick(project, idx)">
                <ProjectSection v-bind="project" :images="[getProjectLogo(project), ...project.images.slice(1)]"
                    :technology="getProjectTechnologies(project)"
                    class="bg-primary" :style="cardStyles[idx]" />
            </div>
            <!-- <q-btn
              v-back-to-top.animate="{offset: 300, duration: 200}"
              round
              color="primary"
              class="fixed-bottom-center animate-pop"
              style="margin: 0 15px 15px 0"
            >
              <q-icon name="keyboard_arrow_up" />
            </q-btn> -->
          </div>
          <div class="page-padding mobile-bottom-spacer" style="height: 200px;"></div>
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
                            <q-btn flat class="close-btn" icon="close" @click="closeWindow(i)" />
                        </q-card-section>
                        <q-card-section class="window-scroll-body" style="overflow:auto; height:calc(100% - 60px)">
                            <!-- <p>{{ win.project.summary }}</p> <br /> -->
                            <div class="window-body">
                                <component :is="win.project.component" :images="win.project.images"
                                    :container-width="win.width"></component>
                            </div>
                        </q-card-section>
                        <div class="row window-handle window-handle-footer">
                            <q-btn flat class="github-btn" icon="code" label="GitHub" :disable="!win.project.repo[0]"
                                :href="win.project.repo[1]" target="_blank"/>
                            <q-btn flat class="launch-btn" icon="launch" label="Live" :disable="!win.project.deployed[0]"
                                :href="win.project.deployed[1]" target="_blank" />
                        </div>
                    </q-card>
                </draggable-resizable-vue>
            </div>
        </teleport>
    </q-page>
</template>

<script setup>
import { ref, markRaw, inject, onMounted, onUnmounted, nextTick } from 'vue';
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
import EmployMe from 'src/components/projects/EmployMe.vue';
import ProjectFortship from 'src/components/projects/ProjectFortship.vue';

const leftDrawerOpen = inject('leftDrawerOpen');

// ── Mobile scroll-locking & focus system ─────────────────────────
const isMobile = ref(false);
const cardRefs = ref([]);
const cardStyles = ref([]);
const lockedIndex = ref(0);
let mql = null;
let scrollParent = null;
let rafId = null;
let scrollTimeout = null;
let isUserTouching = false;
let isLocking = false;

// Tuning knobs for mobile legibility and snap threshold
const TRIGGER_POSITION = 0.50; // exact 50% vertical center of viewport
const FALLOFF_PX = 240;        // smooth proximity fade distance
const SCALE_MIN = 0.93;        // high minimum scale for crisp font legibility
const SCALE_MAX = 1.0;         // full 100% scale at center lock
const OPACITY_MIN = 0.55;      // comfortable readable contrast for inactive cards
const OPACITY_MAX = 1.0;       // 100% solid opacity for locked card

function setCardRef(el, idx) {
  if (el) cardRefs.value[idx] = el;
}

function updateFocus() {
  if (!isMobile.value) { cardStyles.value = []; return; }

  const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const triggerY = window.innerHeight * TRIGGER_POSITION;
  let closestIdx = 0;
  let minDistance = Infinity;

  cardStyles.value = cardRefs.value.map((el, idx) => {
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const dist = Math.abs(cardCenter - triggerY);

    if (dist < minDistance) {
      minDistance = dist;
      closestIdx = idx;
    }

    // Keep the top card fully active and focused when at page start
    if (currentY <= 60 && idx === 0) {
      return {
        transform: 'scale(1.0000)',
        opacity: '1.000',
      };
    }

    const proximity = Math.max(0, 1 - dist / FALLOFF_PX);
    const eased = proximity * proximity * (3 - 2 * proximity); // smoothstep

    const scale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * eased;
    const opacity = OPACITY_MIN + (OPACITY_MAX - OPACITY_MIN) * eased;

    return {
      transform: `scale(${scale.toFixed(4)})`,
      opacity: opacity.toFixed(3),
    };
  });

  lockedIndex.value = closestIdx;
}

function lockToProject(idx) {
  if (!isMobile.value || idx < 0 || idx >= cardRefs.value.length) return;
  const targetEl = cardRefs.value[idx];
  if (!targetEl) return;

  const triggerY = window.innerHeight * TRIGGER_POSITION;
  const rect = targetEl.getBoundingClientRect();
  const cardCenter = rect.top + rect.height / 2;
  const offsetDiff = cardCenter - triggerY;

  const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const targetY = Math.max(0, Math.round(currentY + offsetDiff));

  isLocking = true;
  lockedIndex.value = idx;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth'
  });

  if (scrollParent && scrollParent !== window && scrollParent.scrollHeight > scrollParent.clientHeight) {
    scrollParent.scrollTo({
      top: Math.max(0, scrollParent.scrollTop + offsetDiff),
      behavior: 'smooth'
    });
  }

  setTimeout(() => {
    isLocking = false;
    updateFocus();
  }, 400);
}

function lockToNearestProject() {
  if (!isMobile.value || isLocking || windows.value.length > 0) return;

  const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  // If at the very top of the page, remain flush at the top
  if (currentY <= 60) return;

  const triggerY = window.innerHeight * TRIGGER_POSITION;
  let nearestIdx = -1;
  let minDist = Infinity;

  cardRefs.value.forEach((el, idx) => {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cardCenter = rect.top + rect.height / 2;
    const dist = Math.abs(cardCenter - triggerY);
    if (dist < minDist) {
      minDist = dist;
      nearestIdx = idx;
    }
  });

  if (nearestIdx === -1 || minDist < 3) return; // already centered

  lockToProject(nearestIdx);
}

function scheduleLock(delay = 120) {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    if (!isUserTouching && !isLocking && isMobile.value && windows.value.length === 0) {
      lockToNearestProject();
    }
  }, delay);
}

function onScroll() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updateFocus();
    rafId = null;
  });

  if (!isLocking) {
    scheduleLock(130);
  }
}

function onTouchStart() {
  isUserTouching = true;
  isLocking = false;
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
    scrollTimeout = null;
  }
}

function onTouchEnd() {
  isUserTouching = false;
  scheduleLock(90);
}

function onScrollEnd() {
  if (!isUserTouching && !isLocking) {
    lockToNearestProject();
  }
}

function handleCardClick(project, idx) {
  if (isMobile.value) {
    // If the card is already locked at center, open project window
    if (lockedIndex.value === idx) {
      openProject(project);
    } else {
      // Otherwise, lock and center this project first
      lockToProject(idx);
    }
  } else {
    openProject(project);
  }
}

function setupScrollListener() {
  teardownScrollListener();
  if (!isMobile.value) return;

  scrollParent = document.querySelector('.q-page-container') || window;
  scrollParent.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('scrollend', onScrollEnd, { passive: true });

  updateFocus();
}

function teardownScrollListener() {
  if (scrollParent && scrollParent !== window) {
    scrollParent.removeEventListener('scroll', onScroll);
  }
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchend', onTouchEnd);
  window.removeEventListener('scrollend', onScrollEnd);
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  if (scrollTimeout) { clearTimeout(scrollTimeout); scrollTimeout = null; }
}

function onMediaChange(e) {
  isMobile.value = e.matches;
  nextTick(() => setupScrollListener());
}

onMounted(() => {
  mql = window.matchMedia('(max-width: 600px)');
  isMobile.value = mql.matches;
  mql.addEventListener('change', onMediaChange);
  nextTick(() => setupScrollListener());
});

onUnmounted(() => {
  teardownScrollListener();
  if (mql) mql.removeEventListener('change', onMediaChange);
});
const isDark = inject('isDark');

const $q = useQuasar();
// const portfolioFilter = computed(() => isDark.value ? 'none' : 'invert(1)');
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
    return loadProjectLogo(logoName, project.logo.ext || 'svg')
}
function getProjectTechnologies(project) {
    return project.technology.map(tech => {
        if (tech.logo && typeof tech.logo === 'object') {
            const logoName = isDark.value ? tech.logo.dark : tech.logo.light
            return { ...tech, logo: loadTechLogo(logoName) }
        }
        return tech
    })
}
const projects = [
  {
        id: 'fortship',
        title: 'Fortship',
        logo: {
            light: 'Logo-Claro-Fortship',
            dark: 'Logo-Claro-Fortship',
            ext: 'png',
        },
        images: [
            null,
        ],
        deployed: [false],
        repo: [true, 'https://github.com/MattGaarder/fortship'],
        summary: 'Take raw port schedules from an <span class="pop-yellow">Excel</span> spreadsheet, structure the data for <span class="pop-yellow">mobile and desktop</span>, and generate a clean, responsive <span class="pop-yellow">HTML email</span>.',
        technology: [
            { name: 'Nodejs', logo: loadTechLogo('nodejs-icon.svg') },
            { name: 'Expressjs', logo: loadTechLogo('express.svg') },
            { name: 'Azure', logo: loadTechLogo('Azure.svg') },
            { name: 'OpenWeather', logo: loadTechLogo('openweather-logo.svg') },
            { name: 'HTML5', logo: loadTechLogo('html-5-logo-svgrepo-com.svg') },
        ],
        component: markRaw(ProjectFortship),
    },
  {
        id: 'employ-me',
        title: 'employ-me',
        logo: {
            light: 'employ-me',
            dark: 'employ-me',
            ext: 'jpg',
        },
        images: [
            null,
        ],
        deployed: [false],
        repo: [true, 'https://github.com/MattGaarder/employ-me'],
        summary: 'An <span class="pop-yellow">AI</span>-assisted job search pipeline that finds relevant <span class="pop-yellow">LinkedIn</span> roles, and then uses an autonomous browser agent to fill in the application form.',
        technology: [
            { name: 'LinkedIn', logo: loadTechLogo('linkedin.svg') },
            { name: 'Gemini', logo: loadTechLogo('gemini-color.svg') },
            { name: 'LangChain', logo: loadTechLogo('langchain-color.svg') },
            { name: 'SQLite', logo: loadTechLogo('sqlite-icon.svg') },
            { name: 'Nodejs', logo: loadTechLogo('nodejs-icon.svg') },
        ],
        component: markRaw(EmployMe),
    },
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
        repo: [true, 'https://github.com/MattGaarder/med-jp-logo-dark'],
        summary: 'A local <span class="pop-yellow">NLP</span> engine for Japanese ⇄ English medical interpreting. Reconstructs hurried romaji via <span class="pop-yellow">Viterbi beam search</span>, and <span class="pop-yellow">HNSW</span> vector <span class="pop-yellow">RAG</span> for local <span class="pop-yellow">Ollama</span> translation.',
        technology: [
            { name: 'Ollama', logo: { light: 'ollama.svg', dark: 'ollama_dark.svg' } },
            { name: 'Qwen 3', logo: loadTechLogo('qwen-color.svg') },
            { name: 'SQLite', logo: loadTechLogo('sqlite-icon.svg') },
            { name: 'Nodejs', logo: loadTechLogo('nodejs-icon.svg') },
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
        repo: [true, 'https://github.com/MattGaarder/postwork-journal'],
        summary: 'Coding projects across varied technical domains used in the training of frontier AI systems. <span class="pop-yellow">Node.js</span> CLI tools, text-parsing, <span class="pop-yellow">API</span> integrations.',

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
        summary: 'Custom <span class="pop-yellow">Storyline</span> functionality with <span class="pop-yellow">JavaScript</span> triggers, <span class="pop-yellow">VBA</span> and <span class="pop-yellow">Alteryx</span> for data analysis, <span class="pop-yellow">Google Apps Script</span> and <span class="pop-yellow">Power Automate</span> for workflow automation.',
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
        summary: "Vibely, <span class=\"pop-yellow\">social media App</span> where you can Vibe, or not. Movie-match, compare options side-by-side, and save to persistent watch or seen lists. ",

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
        summary: 'Upload your shopping receipt pdf, "sync" and groceries are arranged into “Fridge, Cupboard & Freezer” sections in your <span class="pop-yellow">Notion databases</span> for your shopping-list needs.',
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
        summary: '<span class="pop-yellow">Electron</span> toolbar app, paste Japanese text, extract kanji plus readings/meanings and instantly add them to your <span class="pop-yellow">Anki</span> deck on click. Zero friction between reading and flashcard creation.',
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
        summary: 'View my design iteration process — assets created with <span class="pop-yellow">Adobe software</span> — plus dynamic, parallax-scroll transforms, infinite scrolling galleries, and more.',
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
        logo: {
            light: 'thisportfolio_light',
            dark: 'thisportfolio_dark',
        },
        images: [
            // loadProjectLogo('this_portfolio'),
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGM3MDVmYTRiZDkyMDM4YmQ5OWQzNWUzMWY1NzA5MmRjYjA2Yjg5ZSZjdD1n/HbVX9TkQKmc0mOLV4C/giphy.gif'
        ],
        deployed: [true, 'https://gaarder.netlify.app/#/'],
        repo: [true, 'https://github.com/MattGaarder/operation-firebird'],
        summary: 'A <span class="pop-yellow">Vue.js 3</span> and <span class="pop-yellow">Quasar</span> portfolio, theme switching, Masonry gallery, responsive layout. Thanks for checking me out!',
        technology: [
            { name: 'Quasar', logo: loadTechLogo('Quasar.svg') },
            { name: 'Prism', logo: loadTechLogo('prism.svg') },
        ],
        component: markRaw(ThisPortfolio),
    },
];
</script>

<style scoped>
/* :deep(.project7) {
    filter: v-bind(portfolioFilter);
} */

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

.window-scroll-body {
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
  padding-top: 0 !important;
  z-index: 2000;
}

@media (max-width: 900px) {
  .projects-page {
    margin-top: -144px !important;
    padding-top: 0 !important;
  }
}

/* ═══════════════════════════════════════════════════════════════
   MOBILE SCROLL-FOCUS — Continuous proximity-based scaling
   Scale + opacity are set as inline styles by JS; CSS just
   handles the transition easing and active press state.
   ═══════════════════════════════════════════════════════════════ */
@media (max-width: 600px) {
  .projects-page {
    margin-top: -144px !important;
    padding-top: 0 !important;
  }

  .project-row {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .project-card-wrapper :deep(.project-section) {
    padding-top: 0 !important;
  }

  .mobile-bottom-spacer {
    height: 120px !important;
    min-height: 120px;
  }

  .project-card-wrapper {
    margin-bottom: 24px;
    scroll-snap-align: center;
    scroll-snap-stop: normal;
  }

  .project-card-wrapper :deep(.project-section.q-card) {
    transition:
      transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity 0.28s ease,
      box-shadow 0.28s ease,
      border-color 0.28s ease !important;
    transform-origin: center center;
    will-change: transform, opacity;
  }

  /* Locked project card focus emphasis */
  .project-card-wrapper.is-locked :deep(.project-section.q-card) {
    border-color: rgba(156, 220, 254, 0.45) !important;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.6),
      0 0 16px rgba(156, 220, 254, 0.16) !important;
  }

  .theme-light .project-card-wrapper.is-locked :deep(.project-section.q-card) {
    border-color: rgba(0, 16, 128, 0.35) !important;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.18),
      0 0 16px rgba(0, 16, 128, 0.12) !important;
  }

  /* Disable desktop hover lift on mobile */
  .project-card-wrapper :deep(.project-section.q-card:hover) {
    transform: none !important;
  }
  .project-card-wrapper :deep(.project-section.q-card:active) {
    transform: scale(0.97) !important;
    transition-duration: 0.12s !important;
  }
}

</style>

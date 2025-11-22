<template>
  <q-page padding class="projects">
    <div class="text-h8 text-weight-bold top-border q-mb-lg q-mr-xl q-pt-lg q-ml-lg">PROJECTS</div>
    


    <div class="row project-row bg-primary" :class="{ 'three-col': !leftDrawerOpen }">
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6 col-lg-4 cursor-pointer" @click="openProject(project)">
        <ProjectSection v-bind="project" class="bg-primary q-pt-xl project-section"/>
      </div>
    </div>
    <teleport to="body">
        <div class="windows-layer">
            <draggable-resizable-vue 
                v-for="(win, i) in windows"
                :key="win.uid"
                v-model:x="win.x"
                v-model:y="win.y"
                v-model:h="win.height"
                v-model:w="win.width"
                v-model:active="win.active"
                :minWidth="212" 
                :minHeight="100"
                :style="{ zIndex: win.zIndex }"
                :drag-handle="'.window-handle'"
                @mousedown="bringToFront(i)"
                :parent="true"
            >

                <q-card class="window-card bg-white text-black" bordered>
                    <q-card-section class="window-handle window-handle-header bg-primary row items-center text-white">
                        <div class="col project-title">{{ win.project.title }}</div>
                        <q-btn dense flat round icon="close" @click="closeWindow(i)"/>
                    </q-card-section>
                    <q-card-section class="project-body" style="overflow:auto; height:calc(100% - 48px)">
                        <!-- <p>{{ win.project.summary }}</p> <br /> -->
                        <div class="window-body">
                            <component :is="win.project.component" :images="win.project.images"></component>
                        </div>
                    </q-card-section>
                    <div class="row window-handle q-py-xs">
                        <q-btn  flat icon="code" label="GitHub" :disable="!win.project.repo[0]" :href="win.project.repo[1]"  target="_blank" class="q-pl-sm p- bordered"/>
                        <q-btn  flat icon="launch" label="Live" :disable="!win.project.deployed[0]" :href="win.project.deployed[1]" target="_blank" />
                    </div>
                </q-card>
            </draggable-resizable-vue>
        </div>
    </teleport>
  </q-page>
</template>

<script setup>
    import { ref, markRaw, inject } from 'vue';
    import { useQuasar } from 'quasar';
    import ProjectSection from 'src/components/ProjectSection.vue';
    import DraggableResizableVue from 'draggable-resizable-vue3';
    import TeamBuilder from 'src/components/projects/TeamBuilder.vue';
    import ProjectVibely from 'src/components/projects/ProjectVibely.vue';
    import MoovieMatch from 'src/components/projects/MoovieMatch.vue';
    import ProjectNocado from 'src/components/projects/ProjectNocado.vue';
    import PwCProjects from 'src/components/projects/PwCProjects.vue';
    import WeatherDashboard from 'src/components/projects/WeatherDashboard.vue';
    import ProjectOnafa from 'src/components/projects/ProjectOnafa.vue';
    import ThisPortfolio from 'src/components/projects/ThisPortfolio.vue';
    import CodeJournal from 'src/components/projects/CodeJournal.vue';

    const leftDrawerOpen = inject('leftDrawerOpen');


    
    const $q = useQuasar();
    const windows = ref([]);

    let topZ = 2001;

    function getWindowConfig() {
        const w = $q.screen.width
        const h = $q.screen.height

        const factor = $q.screen.lt.md ? 0.9 : 0.7

        const width  = Math.floor(w * factor)
        const height = Math.floor(h * factor)

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
        uid:     Date.now() + Math.random(),  
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
    function closeWindow( i) {
    windows.value.splice(i, 1)
    }
    function loadProjectLogo(name, ext = 'svg') {
        return new URL(`/src/assets/logos/project_logos/${name}.${ext}`, import.meta.url).href;
    }
    function loadTechLogo(relativePath) {
        return new URL(`/src/assets/tech_logos/${relativePath}`, import.meta.url).href;
    }
    const projects = [
    {
        id:       'project4pwc',
        title:    'PwC',
        images:   [
        loadProjectLogo('PwC_Logo_white'),
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFkZjk4NzUwYzBmMDI1YzgzYzQ5YzQxMTE2ZTg4NjVmYjI2ZTg1ZCZjdD1n/pgvPIQVTNPtA2nL1S1/giphy.gif'
        ],
        deployed: [false],
        repo:     [false],
        summary:  'I architect Google Apps Script automations to streamline repetitive tasks. This project section highlights a form-driven folder generator, a custom Word UI element that applies templates to documents, and a Google Drive "document-logger" - more interesting than it sounds, promise!',
        technology: [
            { name: 'GoogleAppsScript', logo: loadTechLogo('Google_AppsScript.svg')},
            { name: 'ArticulateStoryline',logo: loadTechLogo('Articulate.svg')},
            { name: 'Azure', logo: loadTechLogo('Azure.svg')}, 
            { name: 'Alteryx', logo: loadTechLogo('alteryx.svg')}, 
            { name: 'CSharp', logo: loadTechLogo('csharp.svg')},
            { name: 'CreativeCloud', logo: loadTechLogo('adobe-creative-cloud-1.svg')},  
        ],
        component: markRaw(PwCProjects),
    },
    {
        id:       'project12nocado',
        title:    'Nocado',
        images:   [
        loadProjectLogo('Nocado'),
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: [false, 'https://github.com/MattGaarder/team-profile-generator'],
        repo:     [true, 'https://github.com/MattGaarder/ocado-helper-frontend'],
        summary:  'Upload your Ocado receipt, "sync", and have all the items purchased arranged into neat “Fridge, Cupboard & Freezer” sections in your Notion database for all your shopping-listing needs. Never forget those carrots at the back of the fridge, or buy your 10th can of lentils ever again! ',
        technology: [
            
            { name: 'MongoDB', logo: loadTechLogo('mongodb-svgrepo-com.svg')},
            { name: 'Expressjs', logo: loadTechLogo('express.svg')},
            { name: 'PDFjs',logo: loadTechLogo('Pdf-js_logo.svg')},
        ],
        component: markRaw(ProjectNocado),
    },
    {
        id:       'project2vibely',
        title:    'Vibely',
        images:   [
        loadProjectLogo('vibely-logo-v2'),
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjg4YTUxNDUzMTFjOTZlMTZlZjU3MjlkMjc0YmEzMjZhZmMzODkxYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/W59zLvbEsDbE9Q7iMQ/giphy.gif'
        ],
        deployed: [true, 'https://main--endearing-sundae-33b843.netlify.app/'],
        repo:     [true, 'https://github.com/MattGaarder/vibely'],
        summary:  'A real-time, circle-centric social feed where you “Vibe” or “Not a Vibe” to posts. Live updates using React and Firebase so you never miss an opportunity to vibe with your friends again.',
        technology: [
            { name: 'MaterialUI', logo: loadTechLogo('material-ui-1.svg')},
            { name: 'Firebase', logo: loadTechLogo('firebase-icon.svg')}, 
            { name: 'React',logo: loadTechLogo('react-2.svg')}, 
        ],
        component: markRaw(ProjectVibely),
    },
    {
        id:       'project3moviem',
        title:    'Moovie Match',
        images:   [
        loadProjectLogo('cow-white'),
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdkNjkyN2FiNmMxODUzMTVkN2ExOWRiOTZhMzYyODkxYmMwMDBlNiZjdD1n/32AslOrbvFhGKaEO4Q/giphy.gif'
        ],
        deployed: [true, 'https://mattgaarder.github.io/moovie-search/'],
        repo:     [true, 'https://github.com/MattGaarder/moovie-search'],
        summary:  'Spend forever picking what to watch? Go through the process every time? Compare options side-by-side with trailers, key details, and save your picks to persistent Watch or Seen lists — don\'t start from scratch next time.',
        technology: [
            { name: 'jQuery', logo: loadTechLogo('j-query.svg')},
            { name: 'Git',    logo: loadTechLogo('Git-Icon-1788C.svg')},
            { name: 'iFrameYoutubeAPI',logo: loadTechLogo('iframe-svgrepo-com.svg')},  
        ],
        component: markRaw(MoovieMatch),
    },
    {
        id:       'project6teamb',
        title:    'Team Builder',
        images:   [
        loadProjectLogo('EdX_newer_logo'),
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: [false],
        repo:     [true, 'https://github.com/MattGaarder/team-profile-generator'],
        summary:  "My Node.js CLI suite. Project documentation a chore? Run this generator and seamlessly produce customizable badge-topped, sectioned README.md with interactive prompts. (Also can create styled HTML roster for your team).",
        technology: [
            { name: 'Nodejs', logo: loadTechLogo('nodejs-icon.svg')},
            { name: 'Jest',    logo: loadTechLogo('jest-js-icon.svg')},
            { name: 'Inquirer',logo: loadTechLogo('inquirer_readme.svg')},
           
        ],
        component: markRaw(TeamBuilder),
    },
    {
        id:       'project1weatherd',
        title:    'Weather Dashboard',
        images:   [
        loadProjectLogo('cloud-day'),
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif'
        ],
        deployed: [true, 'https://mattgaarder.github.io/weather-dashboard/'],
        repo:     [true, 'https://github.com/MattGaarder/weather-dashboard'],
        summary:  'Save and revisit your favorite cities with ease—enter a location to pull current conditions and a five-day forecast from the OpenWeather API, then build a persistent, personalized dashboard of weather insights.',
        technology: [
            { name: 'OpenWeatherAPI', logo: loadTechLogo('openweather-logo.svg')},
            { name: 'Momentjs', logo: loadTechLogo('momentjs-svgrepo-com.svg')}, 
            { name: 'Postman',logo: loadTechLogo('postman-icon-svgrepo-com.svg')}, 
        ],
        component: markRaw(WeatherDashboard),
    },
    {
        id:       'project5onafa',
        title:    'Onafã',
        images:   [
        loadProjectLogo('onafa-white-v3'),
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTdjOGI2MjRmMmI4Y2NmNGIyMzU2NTIwZjI4YjA0M2MyNTYwYjhlZiZjdD1n/mTkFZnQ8EvNSXfV9xP/giphy.gif'
        ],
        deployed: [false, 'https://mattgaarder.github.io/password-generator/'],
        repo:     [false, 'https://github.com/MattGaarder/password-generator'],
        summary:  'Dynamic, parallax-scroll transforms, infinite scrolling galleries - view my design iteration process — assets hand-crafted in Photoshop & Illustrator for immersive browsing experience.',
        technology: [
            { name: 'Premiere', logo: loadTechLogo('Adobe_Premiere_Pro.svg')},
            { name: 'Illustrator', logo: loadTechLogo('Adobe_Illustrator.svg')}, 
            { name: 'Photoshop',logo: loadTechLogo('Adobe_Photoshop.svg')}, 
        ],
        component: markRaw(ProjectOnafa),
    },
    {
        id:       'project7',
        title:    'this.portfolio',
        images:   [
        loadProjectLogo('this_portfolio'),
        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGM3MDVmYTRiZDkyMDM4YmQ5OWQzNWUzMWY1NzA5MmRjYjA2Yjg5ZSZjdD1n/HbVX9TkQKmc0mOLV4C/giphy.gif'
        ],
        deployed: [true, 'https://gaarder.netlify.app/#/'],
        repo:     'https://github.com/MattGaarder/operation-firebird',
        summary:  'Vue3/Quasar portfolio with dynamic theme switching, Masonry illustration gallery, responsive layout, smart internal/external link handling, CV download, and interactive contact integration. Thanks for checking it out!',
        technology: [
            { name: 'Vue3', logo: loadTechLogo('Vue.js_Logo_2.svg')},
            { name: 'Quasar', logo: loadTechLogo('Quasar.svg')}, 
            { name: 'Prism',logo: loadTechLogo('prism.svg')}, 
        ],
        component: markRaw(ThisPortfolio),
    },
    {
        id:       'project8journal',
        title:    'postwork.journal',
        images:   [
        loadProjectLogo('postwork'),
        'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnFmcmc0Z2xlZ3RudTE5aWF3anNidGJtM3kxcncwZWV1bnZiaGRkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JgYrWwBoJ06MYTvMPS/giphy.gif'
        ],
        deployed: [true, 'https://code-journal.netlify.app'],
        repo:     'https://github.com/MattGaarder/postwork-journal',
        summary:  'Code Journal supports Markdown formatting allowing users to document code snippets easily - as well as headings, lists, inline code, bold/italic, and links. Entries are stored in browser localStorage. No backend and no external data libraries required.',
        technology: [
            { name: 'JavaScript', logo: loadTechLogo('javascript-logo-svgrepo-com.svg')},
            { name: 'HTML',logo: loadTechLogo('html-5-logo-svgrepo-com.svg')}, 
            { name: 'CSS', logo: loadTechLogo('Official_CSS_Logo.svg')}, 
            
        ],
        component: markRaw(CodeJournal),
    },
    ];
</script>

<style scoped>
    .window-card {
        width: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: 7px 7px 0px 0px rgba(0,0,0,0.55);
    }



    :v-deep .drv-active, .drv,
    :v-deep .drv-draggable {
        &::-webkit-scrollbar {
            display: none ;
        }
        -ms-overflow-style: none !important; 
        scrollbar-width: none !important;
    }



    .window-handle {
        cursor: move;
        font-weight: bolder;
        border-top: 1px black solid;
    }

    .window-handle-header {
        padding: 0.5rem !important;
    }

    .window-body {
        overflow-y: none; 
    }

    .project-title {
        padding-left: 0.6rem;
    }

    .project-body {
        padding: 0px !important;
    }



    @media (min-width: 600px) and (max-width: 1550px) {
        .project-row > .col-lg-4 {
            flex: 0 0 50%;
            max-width: 50%;
            padding-left: 1rem;
        }
    }

    @media (min-width: 1100px) and (max-width: 1550px) { 
        .three-col.project-row > .col-lg-4 {
            flex: 0 0 33.3333% !important;
            max-width: 33.3333% !important;
            padding-left: 1rem;
        }
    }

    @media (min-width: 1800px) { 
        .three-col.project-row > .col-lg-4 {
            flex: 0 0 25% !important;
            max-width: 25% !important;
            padding-left: 1rem;
        }
    }

    .disabled {
        opacity: 0.4 !important;
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
</style>
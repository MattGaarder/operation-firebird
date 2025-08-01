<template>
  <q-page padding class="bg-primary text-white" >
    <div class="text-h8 text-weight-bold top-border q-mb-lg q-mr-xl q-pt-lg q-ml-lg">PROJECTS</div>
    


    <div class="row project-row bg-primary" :class="{ 'three-col': !leftDrawerOpen }">
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6 col-lg-4 cursor-pointer" @click="openProject(project)">
        <ProjectSection v-bind="project" class="bg-primary q-pt-xl"/>
      </div>
    </div>
    <teleport to="body">
    <!-- <q-dialog v-model="dialogOpen" no-backdrop persistent> -->
        <draggable-resizable-vue 
        v-for="(win, i) in windows"
        :key="win.uid"
        v-model:x="win.x"
        v-model:y="win.y"
        v-model:h="win.height"
        v-model:w="win.width"
        v-model:active="win.active"
        :minWidth="360" 
        :minHeight="135"

        :style="{ zIndex: win.zIndex }"
        :drag-handle="'.window-handle'"
        @mousedown="bringToFront(i)"
        :parent="false"
        >

            <q-card class="window-card bg-white text-black" bordered>
                <q-card-section class="window-handle bg-primary row items-center text-white">
                    <div class="col">{{ win.project.title }}</div>
                    <q-btn dense flat round icon="close" @click="closeWindow(i)"/>
                </q-card-section>
                <q-card-section style="overflow:auto; height:calc(100% - 48px)">
                    <!-- <p>{{ win.project.summary }}</p> <br /> -->
                     <div class="window-body">
                        <component :is="win.project.component" :images="win.project.images"></component>
                     </div>
                    
                     
                    
                </q-card-section>
                <div class="row window-handle">
                    <q-btn  flat icon="code" label="GitHub" :disable="!win.project.repo[0]" :href="win.project.repo[1]"  target="_blank" class="q-pl-sm q-prlgl bordered"/>
                    <q-btn  flat icon="launch" label="Live" :disable="!win.project.deployed[0]" :href="win.project.deployed[1]" target="_blank" />
                        
                </div>
            </q-card>
        </draggable-resizable-vue>
        </teleport>
    <!-- </q-dialog> -->

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

    // const leftDrawerOpen = inject('leftDrawerOpen', ref(true))

    const leftDrawerOpen = inject('leftDrawerOpen');


    
    const $q = useQuasar();
    const windows = ref([]);

    let topZ = 2001;

    function getWindowConfig() {
        const w = $q.screen.width;
       
        if (w < 400) {
            return { width: (w - 15), x: 0, y: -3056 }
        }
        else if (w < 1129) {
            return { width: (w - 15), x: 0, y: -1415 }
        }
        else if (w < 1513) {
            return { width: (w - 470), x: 356, y: -1506 }
        } else {
            return { width: (w - 625), x: 525, y: -1226 }
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

    function closeWindow( i) {
    windows.value.splice(i, 1)
    }

    const projects = [
        // COMPLETE
    {
        id:       'project4',
        title:    'PwC',
        images:   [
        '/src/assets/logos/project_logos/PwC_Logo_white.svg',
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFkZjk4NzUwYzBmMDI1YzgzYzQ5YzQxMTE2ZTg4NjVmYjI2ZTg1ZCZjdD1n/pgvPIQVTNPtA2nL1S1/giphy.gif'
        ],
        deployed: [false],
        repo:     [false],
        summary:  'I architect Google Apps Script automations to streamline repetitive tasks — building form-driven folder generators, custom UI elements to parse and validate document data into Sheets, auto-apply templates to documents, and much more!',
        technology: [
            { name: 'GoogleAppsScript',    logo: '/src/assets/deprecated-logos/SVG/Google_AppsScript.svg'},
            { name: 'ArticulateStoryline',logo: '/src/assets/deprecated-logos/Articulate_idnfwbsbzM_1.svg'},
            { name: 'Azure', logo: '/src/assets/deprecated-logos/Azure.svg'}, 
            { name: 'Alteryx', logo: '/src/assets/deprecated-logos/SVG/alteryx.svg'}, 
            { name: 'CSharp', logo: '/src/assets/deprecated-logos/SVG/csharp.svg'},
            { name: 'CreativeCloud', logo: '/src/assets/deprecated-logos/adobe-creative-cloud-1.svg'},  
        ],
        component: markRaw(PwCProjects),
    },
        // COMPLETE
    {
        id:       'project12',
        title:    'Nocado',
        images:   [
        '/src/assets/logos/project_logos/Nocado_Logo_white.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: [false, 'https://github.com/MattGaarder/team-profile-generator'],
        repo:     [true, 'https://github.com/MattGaarder/ocado-helper-frontend'],
        summary:  'Upload your Ocado PDF receipts and instantly extract ingredients into a synced “Fridge, Cupboard & Freezer” Notion database. Powered by Multer & Express file-upload, PDF.js text extraction, PapaParse + FoundationFoods lookup, MongoDB persistence and two-way sync with Notion via the Notion API.',
        technology: [
            
            { name: 'MongoDB',    logo: '/src/assets/deprecated-logos/mongodb-svgrepo-com.svg'},
            { name: 'Expressjs', logo: '/src/assets/deprecated-logos/express-js-vector-logo-seeklogo/SVG/express.svg'},
            { name: 'PDFjs',logo: '/src/assets/deprecated-logos/Pdf-js_logo.svg'},
        ],
        component: markRaw(ProjectNocado),
    },
    {
        id:       'project2',
        title:    'Vibely',
        images:   [
        '/src/assets/logos/project_logos/vibely-logo-white.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjg4YTUxNDUzMTFjOTZlMTZlZjU3MjlkMjc0YmEzMjZhZmMzODkxYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/W59zLvbEsDbE9Q7iMQ/giphy.gif'
        ],
        deployed: [true, 'https://main--endearing-sundae-33b843.netlify.app/'],
        repo:     [true, 'https://github.com/MattGaarder/vibely'],
        summary:  'A real-time, circle-centric social feed where you “Vibe” or “Not a Vibe” to posts. Built with React, Material UI & Firebase for instant auth and live updates.',
        technology: [
            { name: 'MaterialUI', logo: '/src/assets/deprecated-logos/material-ui-1.svg'},
            { name: 'Firebase', logo: '/src/assets/deprecated-logos/firebase-icon.svg'}, 
            { name: 'React',logo: '/src/assets/deprecated-logos/react-2.svg'}, 
        ],
        component: markRaw(ProjectVibely),
    },
    {
        id:       'project3',
        title:    'Moovie Match',
        images:   [
            '/src/assets/logos/project_logos/cow-white.svg',
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdkNjkyN2FiNmMxODUzMTVkN2ExOWRiOTZhMzYyODkxYmMwMDBlNiZjdD1n/32AslOrbvFhGKaEO4Q/giphy.gif'
        ],
        deployed: [true, 'https://mattgaarder.github.io/moovie-search/'],
        repo:     [true, 'https://github.com/MattGaarder/moovie-search'],
        summary:  'Compare and manage movie trailers effortlessly: view side-by-side previews and key film details, then save your picks to persistent Watch or Seen lists—your personalized cinematic dashboard for smarter, stress-free movie decisions.',
        technology: [
            { name: 'jQuery', logo: '/src/assets/deprecated-logos/SVG/j-query.svg'},
            { name: 'Git',    logo: '/src/assets/deprecated-logos/Git-Icon-1788C.svg'},
            { name: 'iFrameYoutubeAPI',logo: '/src/assets/deprecated-logos/iframe-svgrepo-com.svg'},  
        ],
        component: markRaw(MoovieMatch),
    },
    {
        id:       'project6',
        title:    'Team Builder',
        images:   [
        '/src/assets/logos/project_logos/SVG/team-builder-test-2_1.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: [false],
        repo:     [true, 'https://github.com/MattGaarder/team-profile-generator'],
        summary:  "Streamline project documentation and team overviews with a customizable Node.js CLI suite that both generates a professional, styled HTML roster for your team and seamlessly produces a badge-topped, sectioned README.md with interactive prompts.",
        technology: [
            { name: 'Nodejs', logo: '/src/assets/deprecated-logos/nodejs-icon.svg'},
            { name: 'Jest',    logo: '/src/assets/deprecated-logos/jest-js-icon.svg'},
            { name: 'Inquirer',logo: '/src/assets/deprecated-logos/inquirer_readme.svg'},
           
        ],
        component: markRaw(TeamBuilder),
    },

    {
        id:       'project1',
        title:    'Weather Dashboard',
        images:   [
            '/src/assets/logos/project_logos/SVG/SVG/cloud-day.svg',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif'
        ],
        deployed: [true, 'https://mattgaarder.github.io/weather-dashboard/'],
        repo:     [true, 'https://github.com/MattGaarder/weather-dashboard'],
        summary:  'Save and revisit your favorite cities with ease—enter a location to pull current conditions and a five-day forecast from the OpenWeather API, then build a persistent, personalized dashboard of weather insights.',
        technology: [
            { name: 'OpenWeatherAPI', logo: '/src/assets/deprecated-logos/openweather-vector-logo-seeklogo/openweather-logo.svg'},
            { name: 'Momentjs', logo: '/src/assets/deprecated-logos/momentjs-svgrepo-com.svg'}, 
            { name: 'Postman',logo: '/src/assets/deprecated-logos/postman-icon-svgrepo-com.svg'}, 
        ],
        component: markRaw(WeatherDashboard),
    },
    
    {
        id:       'project5',
        title:    'Onafa',
        images:   [
        '/src/assets/logos/project_logos/SVG/onafa-white.svg',
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTdjOGI2MjRmMmI4Y2NmNGIyMzU2NTIwZjI4YjA0M2MyNTYwYjhlZiZjdD1n/mTkFZnQ8EvNSXfV9xP/giphy.gif'
        ],
        deployed: [false, 'https://mattgaarder.github.io/password-generator/'],
        repo:     [false, 'https://github.com/MattGaarder/password-generator'],
        summary:  'Craft a dynamic, parallax-rich site with custom infinite scrolling galleries, JavaScript-driven parallax-scroll transforms, and view iterated UI design proccess — assets hand-crafted in Photoshop & Illustrator for an immersive browsing experience.',
        technology: [
            { name: 'Premiere', logo: '/src/assets/deprecated-logos/Adobe_Premiere_Pro.svg'},
            { name: 'Illustrator', logo: '/src/assets/deprecated-logos/Adobe_Illustrator.svg'}, 
            { name: 'Photoshop',logo: '/src/assets/deprecated-logos/Adobe_Photoshop.svg'}, 
        ],
        component: markRaw(ProjectOnafa),
    },
    {
        id:       'project7',
        title:    'README.md Generator',
        images:   [
        '/src/assets/logos/project_logos/readme.svg',
        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGM3MDVmYTRiZDkyMDM4YmQ5OWQzNWUzMWY1NzA5MmRjYjA2Yjg5ZSZjdD1n/HbVX9TkQKmc0mOLV4C/giphy.gif'
        ],
        deployed: [true,'https://mattgaarder.github.io/readme-generator/'],
        repo:     'https://github.com/MattGaarder/readme-generator',
        summary:  'A command-line application that dynamically generates README.md documentation from a user\'s input. Node.js dynamically generates this document in the project repository.',
        technology: ['inquirer', 'Node.js', 'ajax', 'fs']
    }
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

    .window-body {
        overflow-y: none;
    }

    @media (min-width: 600px) and (max-width: 1550px) {
    .project-row > .col-lg-4 {
        flex: 0 0 50%;
        max-width: 50%;
        }
    }

    @media (min-width: 1100px) and (max-width: 1550px) { .three-col.project-row > .col-lg-4 {
        flex: 0 0 33.3333% !important;
        max-width: 33.3333% !important;
    }
}

    .disabled {
        opacity: 0.4 !important;
    }

    
</style>
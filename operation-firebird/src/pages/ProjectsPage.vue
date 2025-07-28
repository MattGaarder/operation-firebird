<template>
  <q-page padding class="bg-primary text-white" >
    
    <div class="text-h8 text-weight-bold top-border q-mb-lg q-mr-xl q-pt-lg">PROJECTS</div>
    


    <div class="row project-row">
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
        :minWidth="522" 
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
                        <component :is="win.project.component"></component>
                     </div>
                    
                    <q-separator />
                    
                </q-card-section>
                <div class="row window-handle">
                        <q-btn v-if="win.project.deployed" flat icon="launch" label="Live" :to="win.project.deployed" target="_blank"/>
                        <q-btn v-if="win.project.repo" flat icon="code" label="GitHub" :to="win.project.repo" target="_blank"/>
                </div>
            </q-card>
        </draggable-resizable-vue>
        </teleport>
    <!-- </q-dialog> -->

  </q-page>
</template>

<script setup>
    import { ref } from 'vue';
    import ProjectSection from 'src/components/ProjectSection.vue';
    import DraggableResizableVue from 'draggable-resizable-vue3';
    import TeamBuilder from 'src/components/projects/TeamBuilder.vue';


    // const dialogOpen = ref(false)
    const windows = ref([]);

    let topZ = 2001;

    function openProject(proj) {
    windows.value.push({
        uid:     Date.now() + Math.random(),  
        project: proj,                       
        x: 150,    
        y: -1200,    
        width: 550,  
        height: "auto",  
        active: true, 
        zIndex: ++topZ 
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

    {
        id:       'project12',
        title:    'Nocado',
        images:   [
        '/src/assets/logos/project_logos/Nocado_Logo_white.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: 'TBC',
        repo:     'https://github.com/MattGaarder/team-profile-generator',
        summary:  'A command-line application that generates an HTML webpage from user input. The user is asked a series of prompts about their team and this is fully generated and formatted with HTML and CSS.',
        technology: [
            
            { name: 'MongoDB',    logo: '/src/assets/deprecated-logos/mongodb-svgrepo-com.svg'},
            { name: 'Express.js', logo: '/src/assets/deprecated-logos/express-js-vector-logo-seeklogo/SVG/express.svg'},
            { name: 'PDF.js',logo: '/src/assets/deprecated-logos/Pdf-js_logo.svg'},
           
        ],
    },
    {
        id:       'project4',
        title:    'PwC',
        images:   [
        '/src/assets/logos/project_logos/PwC_Logo_white.svg',
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzFkZjk4NzUwYzBmMDI1YzgzYzQ5YzQxMTE2ZTg4NjVmYjI2ZTg1ZCZjdD1n/pgvPIQVTNPtA2nL1S1/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/work-day-scheduler/',
        repo:     'https://github.com/MattGaarder/work-day-scheduler',
        summary:  'A day-scheduler that allows users to save events by the hour, and dynamically colour-codes future and past events.',
        technology: [
            { name: 'Google_AppsScript',    logo: '/src/assets/deprecated-logos/Google_AppsScript.svg'},
            { name: 'Inquirer',logo: '/src/assets/deprecated-logos/Articulate_idnfwbsbzM_1.svg'},
            { name: 'Azure', logo: '/src/assets/deprecated-logos/Azure.svg'}, 
            { name: 'Alteryx', logo: '/src/assets/deprecated-logos/SVG/alteryx.svg'}, 
            { name: 'C#', logo: '/src/assets/deprecated-logos/CSharp.svg'},
            { name: 'Creative_Cloud', logo: '/src/assets/deprecated-logos/adobe-creative-cloud-1.svg'},  
        ],
    },
    {
        id:       'project2',
        title:    'Vibely',
        images:   [
        '/src/assets/logos/project_logos/vibely-logo-white.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjg4YTUxNDUzMTFjOTZlMTZlZjU3MjlkMjc0YmEzMjZhZmMzODkxYSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/W59zLvbEsDbE9Q7iMQ/giphy.gif'
        ],
        deployed: 'https://main--endearing-sundae-33b843.netlify.app/',
        repo:     'https://github.com/MattGaarder/vibely',
        summary:  'Vibely is my bootcamp final team project. We wanted to challenge ourselves to reverse-engineer a twitter-like social media app with user-authentication and real-time database updates using Firebase for back-end functionality.',
        technology: [
            { name: 'MaterialUI', logo: '/src/assets/deprecated-logos/material-ui-1.svg'},
            { name: 'Firebase', logo: '/src/assets/deprecated-logos/firebase-icon.svg'}, 
            { name: 'React',logo: '/src/assets/deprecated-logos/react-2.svg'}, 
        ],
    },
    {
        id:       'project3',
        title:    'Moovie Match',
        images:   [
            '/src/assets/logos/project_logos/cow-white.svg',
            'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdkNjkyN2FiNmMxODUzMTVkN2ExOWRiOTZhMzYyODkxYmMwMDBlNiZjdD1n/32AslOrbvFhGKaEO4Q/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/weather-dashboard/',
        repo:     'https://github.com/MattGaarder/weather-dashboard',
        summary:  'Weather app that allows users to save interested cities and display a five-day forecast and current weather when needed.',
        technology: [
            { name: 'jQuery', logo: '/src/assets/deprecated-logos/SVG/j-query.svg'},
            { name: 'Git',    logo: '/src/assets/deprecated-logos/Git-Icon-1788C.svg'},
            { name: 'iFrame_YoutubeAPI',logo: '/src/assets/deprecated-logos/iframe-svgrepo-com.svg'},
           
        ],
    },
    {
        id:       'project6',
        title:    'Team Builder',
        images:   [
        '/src/assets/logos/project_logos/team-builder-test.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: 'TBC',
        repo:     'https://github.com/MattGaarder/team-profile-generator',
        summary:  "Streamline your project documentation and team overviews with a customizable Node.js CLI suite that both generates a professional, styled HTML roster for managers, engineers, and interns and seamlessly produces badge-topped, sectioned README.md files through interactive prompts.",
        technology: [
            { name: 'Node.js', logo: '/src/assets/deprecated-logos/nodejs-icon.svg'},
            { name: 'Jest',    logo: '/src/assets/deprecated-logos/jest-js-icon.svg'},
            { name: 'Inquirer',logo: '/src/assets/deprecated-logos/inquirer_readme.svg'},
           
        ],
        component: TeamBuilder,
    },

    {
        id:       'project1',
        title:    'Weather Dashboard',
        images:   [
            '/src/assets/logos/project_logos/SVG/SVG/cloud-day.svg',
            'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/moovie-search/',
        repo:     'https://github.com/MattGaarder/moovie-search',
        summary:  'Compare movie trailers and key details side-by-side, then save films to your watch-list or seen-list with persistent storage.',
        technology: [
            { name: 'OpenWeatherAPI', logo: '/src/assets/deprecated-logos/openweather-vector-logo-seeklogo/openweather-logo.svg'},
            { name: 'Moment.js', logo: '/src/assets/deprecated-logos/momentjs-svgrepo-com.svg'}, 
            { name: 'Postman',logo: '/src/assets/deprecated-logos/postman-icon-svgrepo-com.svg'}, 
        ],
    },
    
    {
        id:       'project5',
        title:    'Password Generator',
        images:   [
        '/src/assets/logos/project_logos/SVG/onafa-white.svg',
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTdjOGI2MjRmMmI4Y2NmNGIyMzU2NTIwZjI4YjA0M2MyNTYwYjhlZiZjdD1n/mTkFZnQ8EvNSXfV9xP/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/password-generator/',
        repo:     'https://github.com/MattGaarder/password-generator',
        summary:  'An application that can be used to generate a random password based on user-selected criteria.',
        technology: ['Bootstrap', 'JavaScript', 'HTML', 'CSS']
    },
    {
        id:       'project7',
        title:    'README.md Generator',
        images:   [
        '/src/assets/logos/project_logos/readme.svg',
        'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGM3MDVmYTRiZDkyMDM4YmQ5OWQzNWUzMWY1NzA5MmRjYjA2Yjg5ZSZjdD1n/HbVX9TkQKmc0mOLV4C/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/readme-generator/',
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
</style>
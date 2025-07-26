<template>
  <q-page padding class="bg-primary text-white">
    
    <div class="text-h8 text-weight-bold top-border q-mb-lg q-mr-xl q-pt-lg">PROJECTS</div>
    
    <div class="row wrap q-gutter-none items-start project-row">
      
      <div v-for="project in projects" :key="project.id" class="col-12 col-md-6 col-lg-4" >
        <ProjectSection
          v-bind="project"
          square
          class="bg-primary project-section q-pt-xl q-pr-none cursor-pointer"
          @click="openProject(project)"
          parent="#parent"
        />
      </div>
    </div>
    <q-dialog
      v-model="dialogOpen"
      no-backdrop
      persistent
    >
        <draggable-resizable-vue v-model:x="element.x"
        v-model:y="element.y"
        v-model:h="element.height"
        v-model:w="element.width"
        v-model:active="element.isActive"
        drag-handle=".handle"
        class="hide-scrollbar"
        >
            <q-card class="window-card bg-white text-black">
                <q-card-section class="dialog-header bg-primary row items-center handle">
                    <div class="col">{{ selectedProject.title }}</div>
                        x={{ element.x }}<br />
                        y={{ element.y }}<br />
                        height={{ element.height }}<br />
                        width={{ element.width }}<br />
                        isActive={{ element.isActive }}
                        
                    <q-btn dense flat round icon="close" v-close-popup />
                </q-card-section>
                <q-card-section >
                    <p>{{ selectedProject.summary }}</p> <br />
                    <p>{{ selectedProject.summary }}</p> <br />
                    <p>{{ selectedProject.summary }}</p> <br />
                    <p>{{ selectedProject.summary }}</p> <br />
                    <p>{{ selectedProject.summary }}</p> <br />
                <q-separator />
                <div class="row q-gutter-sm q-mt-md">
                    <q-btn
                    v-if="selectedProject.deployed"
                    flat
                    icon="launch"
                    label="Live"
                    :to="selectedProject.deployed"
                    target="_blank"
                    />
                    <q-btn
                    v-if="selectedProject.repo"
                    flat
                    icon="code"
                    label="Code"
                    :to="selectedProject.repo"
                    target="_blank"
                    
                    />
                </div>
                </q-card-section>
            </q-card>
        </draggable-resizable-vue>
    </q-dialog>

  </q-page>
</template>

<script setup>
    import ProjectSection from 'src/components/ProjectSection.vue';
    import DraggableResizableVue from 'draggable-resizable-vue3';
    import { ref } from 'vue'

    const dialogOpen = ref(false)
    const selectedProject = ref({})

    function openProject (project) {
        selectedProject.value = project;
        dialogOpen.value = true;
    }

    const element = ref({
        x: 20,
        y: 20,
        width: "100%",
        height: "100%",
        isActive: false,
        
    })


    const projects = [
    {
        id:       'project6',
        title:    'Nocado',
        images:   [
        '/src/assets/logos/project_logos/Nocado_Logo_white.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif'
        ],
        deployed: 'TBC',
        repo:     'https://github.com/MattGaarder/team-profile-generator',
        summary:  'A command-line application that generates an HTML webpage from user input. The user is asked a series of prompts about their team and this is fully generated and formatted with HTML and CSS.',
        technology: ['Node.js', 'jest', 'inquirer', 'npm']
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
        technology: ['Moment.js', 'jQuery', 'Bootstrap']
    },
    {
        id:       'project1',
        title:    'Moovie Match',
        images:   [
        '/src/assets/logos/project_logos/cow-white.svg',
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDdkNjkyN2FiNmMxODUzMTVkN2ExOWRiOTZhMzYyODkxYmMwMDBlNiZjdD1n/32AslOrbvFhGKaEO4Q/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/moovie-search/',
        repo:     'https://github.com/MattGaarder/moovie-search',
        summary:  'Compare movie trailers and key details side-by-side, then save films to your watch-list or seen-list with persistent storage.',
        technology: ['CSS', 'HTML', 'jQuery', 'YouTube API & iFrame']
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
        technology: ['React', 'Material UI', 'Netlify', 'Firebase']
    },
    {
        id:       'project3',
        title:    'Weather Dashboard',
        images:   [
        '/src/assets/logos/project_logos/SVG/SVG/cloud-day.svg',
        'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBmNmVjODI4NmM1NDgzYThjYjgyZDgxMmNlYTAzNThkYzBhZDAxZiZjdD1n/wZSaxEBZAxF1K5yrxy/giphy.gif'
        ],
        deployed: 'https://mattgaarder.github.io/weather-dashboard/',
        repo:     'https://github.com/MattGaarder/weather-dashboard',
        summary:  'Weather app that allows users to save interested cities and display a five-day forecast and current weather when needed.',
        technology: ['Moment.js', 'OpenWeather API', 'Bootstrap']
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
        
    }

    .dialog-header {
        cursor: move;
    }

    :v-deep .drv-active, .drv,
    :v-deep .drv-draggable {
        &::-webkit-scrollbar {
            display: none ;
        }
    -ms-overflow-style: none !important; 
    scrollbar-width: none !important;
    }

</style>
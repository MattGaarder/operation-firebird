<template>
  <q-layout view="hhh LpR lFf" class="bg-primary">
    <q-header class="q-pa-lg bg-primary header" :style="{ paddingLeft: sidePadding }">
      <q-toolbar class="q-py-md">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div class="title-subtitle q-pa-md">
          <q-toolbar-title class="bg-primary">Matteus <router-link  class="text-white no-underline"><span class="surname">Gaarder</span></router-link></q-toolbar-title>
        <p class="subtitle">Web Development</p>
        </div>
        <q-btn flat round class="q-mr-xl about" icon="home" to="/"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-primary text-white q-px-lg drawer" :width="drawerWidth" :breakpoint="1128" :style="{ paddingLeft: sidePadding }">
      <q-card flat square class="bg-primary text-white text-weight-bold q-pa-xs top-border">
        <q-card-section class="bio">
          I'm a creative technologist and former educator fluent in Japanese. I tackle complex problems with JavaScript-powered interactivity and multimedia design.
        </q-card-section>
      </q-card>
        <q-list>
          <EssentialContact v-for="link in contactList" :key="link.title" v-bind="link" class="top-border q-pr-xl" />
        </q-list>
        <q-list>
          <q-item-label header>Links</q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="top-border q-pr-xl"/>
        </q-list>

    </q-drawer>

    <q-page-container class="page-container " >
      <router-view  class="bg-primary"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, computed, provide } from 'vue';
  import { useQuasar } from 'quasar';

  import EssentialLink from 'components/EssentialLink.vue';
  import EssentialContact from 'src/components/EssentialContact.vue';

  

  const $q = useQuasar();

  const sidePadding = computed(() => {
    const w = $q.screen.width
    return (w < 1513) ? '4rem' : '9rem'
  });

  const drawerWidth = computed(() => {
    const w = $q.screen.width
    return (w > 1101 && w < 1513) ? 400 : 500
  });

  const leftDrawerOpen = ref(true)
  provide('leftDrawerOpen', leftDrawerOpen);

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const contactList = [
    {
      title: 'matteus.gaarder@gmail.com',
      link: 'matteus.gaarder@gmail.com',
    },
    {
      title: '(0044) 7498-658-030',
      caption: 'https://github.com/MattGaarder',
      icon: 'code',
      link: 'https://github.com/MattGaarder',
    },
    {
      title: 'London, N10 2PT',
      caption: `https://www.linkedin.com/in/matteus-gaarder-991494178/`,
      icon: 'record_voice_over',
      link: 'https://www.linkedin.com/in/matteus-gaarder-991494178/',
    },
  ]

  const linksList = [
    {
      title: 'Projects',
      caption: 'web.dev/projects',
      icon: 'code',
      link: '/projects-page',
    },
    {
      title: 'Illustrations',
      caption: '@audiblejellodoodles',
      icon: 'draw',
      link: '/illustrations',
    },
    {
      title: 'Test',
      caption: '/test-page',
      icon: 'chat',
      link: '/test',
    },

    {
      title: 'Github',
      caption: 'https://github.com/MattGaarder',
      icon: 'mdi-github',
      link: 'https://github.com/MattGaarder',
    },
    {
      title: 'LinkedIn',
      caption: `https://www.linkedin.com/in/matteus-gaarder-991494178/`,
      icon: 'mdi-linkedin',
      link: 'https://www.linkedin.com/in/matteus-gaarder-991494178/',
    },

  ]
</script>



<style scoped>
.bio {
  font-size: 0.86rem;
}

.title-subtitle {
  display: flex;
  flex-direction: column;
}

.subtitle {
  color: grey;
}

.about {
  margin-left: auto;
}

::v-deep .essential-contact:hover {
  background-color: white !important;
  color: black !important;
}
</style>



<!-- reveal :reveal-offset="40" -->
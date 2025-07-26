<template>
  <q-layout view="hhh LpR lFf" class="bg-primary">
    <q-header class="q-pa-lg bg-primary header">
      <q-toolbar class="q-py-lg ">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pa-lg bg-primary toolbar">Matteus <router-link to="/" class="text-white no-underline"><span class="surname">gAARDER</span></router-link></q-toolbar-title>

        <div class="q-pr-xl">About</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="bg-primary text-white q-px-lg drawer" :width="500" :breakpoint="900">
      <q-card flat square dark class="bio-card text-white text-weight-bold q-pa-md top-border">
        <q-card-section>
          A seasoned Senior Producer with 10+ years of experience, I excel in leading complex marketing and design projects from concept to completion.
        </q-card-section>
      </q-card>

        <q-list>
          <q-item-label header>Links</q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="top-border q-pr-xl"/>
        </q-list>

    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref } from 'vue';
  import EssentialLink from 'components/EssentialLink.vue';

  const leftDrawerOpen = ref(false)

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }

  const linksList = [
    {
      title: 'Projects',
      caption: 'web.dev/projects',
      icon: 'school',
      link: '/projects-page',
    },
    {
      title: 'Github',
      caption: 'https://github.com/MattGaarder',
      icon: 'code',
      link: 'https://github.com/MattGaarder',
    },
    {
      title: 'Test',
      caption: '/test-page',
      icon: 'chat',
      link: '/test',
    },
    {
      title: 'LinkedIn',
      caption: 'https://www.linkedin.com/in/matteus-gaarder-991494178/',
      icon: 'record_voice_over',
      link: 'https://www.linkedin.com/in/matteus-gaarder-991494178/',
    },
    {
      title: 'Illustrations',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: '/illustrations',
    },
  ]
</script>



<style scoped>


</style>



<!-- reveal :reveal-offset="40" -->
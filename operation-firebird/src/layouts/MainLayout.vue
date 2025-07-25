<template>
  <q-layout view="hhh LpR lFf" class="bg-primary">
    <q-header  class="q-pa-lg bg-primary header">
      <q-toolbar class="q-pa-lg ">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="q-pa-lg bg-primary">Matteus Gaarder</q-toolbar-title>

        <div class="q-pr-xl">About</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above class="bg-primary text-white q-px-lg drawer" behavior="desktop" :width="500" :breakpoint="700">
      <q-card flat square dark class="bio-card text-white text-weight-bold q-pa-md top-border">
        <q-card-section>
          A seasoned Senior Producer with 10+ years of experience, I excel in leading complex marketing and design projects from concept to completion.
        </q-card-section>
      </q-card>

        <q-list>
          <q-item-label header>Links</q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="top-border q-px-xl"/>
        </q-list>

    </q-drawer>

    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'

  

  const leftDrawerOpen = ref(false)

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }



  const linksList = [
    {
      title: 'Docs',
      caption: 'quasar.dev',
      icon: 'school',
      link: '/',
    },
    {
      title: 'Github',
      caption: 'github.com/quasarframework',
      icon: 'code',
      link: '/',
    },
    {
      title: 'Test',
      caption: 'chat.quasar.dev',
      icon: 'chat',
      link: '/test',
    },
    {
      title: 'Forum',
      caption: 'forum.quasar.dev',
      icon: 'record_voice_over',
      link: '/',
    },
    {
      title: 'Twitter',
      caption: '@quasarframework',
      icon: 'rss_feed',
      link: '/',
    },
  ];
</script>



<style scoped>

  ::v-deep .q-header {
    transition-duration: 0.3s !important;
  }

  ::v-deep .q-drawer,
  ::v-deep .q-header {
    transition-timing-function: ease-out !important;
  }
</style>



<!-- reveal :reveal-offset="40" -->
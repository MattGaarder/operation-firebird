<template>
  <q-layout view="hhh LpR lFf" :class="{ 'theme-default': !isIllustrations, 'theme-illustrations': isIllustrations }">
    <q-header class="q-pa-lg header" :style="{ paddingLeft: sidePadding }">
      <q-toolbar class="q-py-md">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <div class="title-subtitle q-pa-md">
          <q-toolbar-title >Matteus <router-link  to="/" class="text-white"><span class="surname">Gaarder</span></router-link></q-toolbar-title>
        <p class="subtitle">Web Development</p>
        </div>
        <q-btn flat round class="q-mr-xl about" :icon="isHome ? 'download' : 'home'" :to="!isHome ? '/' : undefined" @click="onHomeBtnClick" aria-label="Home or Download CV"/>
      </q-toolbar>
    </q-header>

    <q-drawer 
      v-model="leftDrawerOpen" 
      class="q-px-lg drawer" 
      :width="drawerWidth" 
      :breakpoint="1128" 
      :style="{ paddingLeft: sidePadding }" 
      :class="{ 'theme-default': !isIllustrations, 'theme-illustrations': isIllustrations }"
    >
      <q-card bordered="false" flat square class="bg-primary text-white text-weight-bold q-pa-xs top-border">
        <q-card-section  class="bio">
          I'm a creative technologist and former educator fluent in Japanese. I tackle complex problems with JavaScript-powered solutions and multimedia design.
        </q-card-section>
      </q-card>
        <q-list>
          <EssentialContact v-for="link in contactList" :key="link.title" v-bind="link" class="top-border q-pr-xl"/>
        </q-list>
        <q-list>
          <q-item-label header>Links</q-item-label>
          <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" class="top-border q-pr-xl" :to="link.link"/>
        </q-list>

    </q-drawer>

    <q-page-container class="page-container"  :class="{ 'with-padding': isHome && isWide && !leftDrawerOpen }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref, computed, provide } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRoute, useRouter } from 'vue-router';

  import EssentialLink from 'components/EssentialLink.vue';
  import EssentialContact from 'src/components/EssentialContact.vue';

  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();
  const isHome = computed(() => route.path === '/');
  const isIllustrations = computed(() => route.path.includes('illustrations'));
  const isWide = computed(() => $q.screen.width >= 1128)
  const leftDrawerOpen = ref(true)

  provide('leftDrawerOpen', leftDrawerOpen);

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
  }
  
  function onHomeBtnClick(e) {
    if (isHome.value) {
      e.preventDefault(); 
      const link = document.createElement('a');
      link.href = '/src/assets/GAARDER-CV.pdf'; 
      link.download = 'GAARDER-CV.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      router.push('/');
    }
  }

  const sidePadding = computed(() => {
    const w = $q.screen.width
    if (w < 1513 && w >= 1101 ) {
      return '4rem';
    } else if (w < 1101) {
      return '2rem';
    } else {
      return '9rem';
    }
  });

  const drawerWidth = computed(() => {
    const w = $q.screen.width
    if (w > 1101 && w < 1513) {
      return 400;
    } else if (w > 1513) {
      return 500;
    } else {
      return 350;
    }
  });



  const contactList = [
    {
      title: 'matteus.gaarder@gmail.com',
      link: 'mailto:matteus.gaarder@gmail.com?subject=Hello',
    },
    {
      title: '(0044) 7498-658-030',
      link: 'https://wa.me/447498658030?text=Hi%20Matteus',
    },
    {
      title: 'London, N8',
      link: 'https://maps.app.goo.gl/ssShuV8iibBrxwpR9',
    },
  ];

  const linksList = [
    {
      title: 'Projects',
      caption: 'web.dev/projects',
      icon: 'code',
      link: '/projects-page',
      name: '',
      isExternal: false,
    },
    {
      title: 'Illustrations',
      caption: '@audiblejellodoodles',
      icon: 'draw',
      link: '/illustrations-page',
      name: '',
      isExternal: false,
    },
    {
      title: 'Github',
      caption: 'https://github.com/MattGaarder',
      icon: 'mdi-github',
      link: 'https://github.com/MattGaarder',
      name: 'arrow_outward',
      isExternal: true,
    },
    {
      title: 'Youtube',
      caption: 'https://www.youtube.com/@AudibleJello',
      icon: 'mdi-youtube',
      link: 'https://www.youtube.com/@AudibleJello',
      name: 'arrow_outward',
      isExternal: true,
    },

    {
      title: 'LinkedIn',
      caption: `https://www.linkedin.com/in/matteus-gaarder-991494178/`,
      icon: 'mdi-linkedin',
      link: 'https://www.linkedin.com/in/matteus-gaarder-991494178/',
      name: 'arrow_outward',
      isExternal: true,
    },
  ];
</script>



<style scoped>
.bio {
  margin-top: 0.3rem;
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

.page-container.with-padding {
  padding-left: 14rem; /* or whatever feels good */
  transition: padding-left 5.3s ease; /* optional smooth effect */
}
</style>



<!-- reveal :reveal-offset="40" -->
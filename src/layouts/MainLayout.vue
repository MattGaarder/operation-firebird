<template>
  <q-layout view="hhh LpR lFf" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <q-header class="app-header" :style="{ paddingLeft: sidePadding }">
      <div class="header-wrap">
        <q-toolbar class="q-my-xl toolbar">




          <!-- Vertical Utility Column (Absolutely positioned below the menu) -->
          <div class="column items-center absolute-top" style=" top: -15px; left: 0; width: 42px;">
            <q-btn flat dense round icon="menu" class="drawer-btn" aria-label="Menu" @click="toggleLeftDrawer" />
            <q-btn flat round :icon="isHome ? 'download' : 'home'" :to="!isHome ? '/' : undefined" @click="onHomeBtnClick" aria-label="Home or Download CV"/>
            <q-btn flat dense round :icon="isDark ? 'dark_mode' : 'light_mode'" class="toggle-theme" aria-label="Toggle dark mode" @click="toggleTheme" />
          </div>
          <!-- Lottie Zero-Width Anchor (Nudged to the right) -->
          <div class="lottie-anchor" style="margin-left: 60px;">
            <div ref="lottieEl" class="title-animation-v3"></div>
          </div>

          <router-link  to="/" aria-label="Home" class="home-hitbox"></router-link>
          <q-space />
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="q-px-lg drawer"
      :width="drawerWidth"
      :breakpoint="DRAWER_BREAKPOINT"
      :style="{ paddingLeft: sidePadding }"
      :class="{ 'theme-dark': isDark, 'theme-light': !isDark }"
    >
      <q-card bordered="false" flat square class="bg-primary text-weight-bold q-pa-xs top-border">
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

  import { ref, computed, provide, onMounted, watch, onBeforeUnmount } from 'vue';
  import { useQuasar } from 'quasar';
  import { useRoute, useRouter } from 'vue-router';
  import lottie from 'lottie-web';

  import animationJsonMain from 'src/assets/animations/pcompgwd.json';


  import EssentialLink from 'components/EssentialLink.vue';
  import EssentialContact from 'src/components/EssentialContact.vue';

  const $q = useQuasar();
  const router = useRouter();
  const route = useRoute();

  const isHome = computed(() => route.path === '/');
  const isIllustrations = computed(() => route.path.includes('illustrations'));

  const DRAWER_BREAKPOINT = 1128
  const isWide = computed(() => $q.screen.width >= DRAWER_BREAKPOINT)

  const leftDrawerOpen = ref(isWide.value)

  watch(isWide, (wide) => {
    if (wide) {
      leftDrawerOpen.value = true
    } else {
      leftDrawerOpen.value = false
    }
  })

  const isDark = ref(true);
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };

  provide('isDark', isDark);
  provide('leftDrawerOpen', leftDrawerOpen);

  // ───────────── LOTTIE SETUP ─────────────
  const lottieEl = ref(null);
  //// eslint-disable-next-line no-unused-vars
  let _anim = null;
  function loadTitleAnimation(forIllustrations) {
    if (!lottieEl.value) return;

    // kill previous animation so don't get stacked svgs
    if (_anim) {
      _anim.destroy();
      _anim = null;
    }

    _anim = lottie.loadAnimation({
      container: lottieEl.value,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: animationJsonMain,
      name: forIllustrations ? 'illustrations-hero' : 'homepage-hero',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
        progressiveLoad: true
      }
    })
  }

  onMounted(() => {
    loadTitleAnimation(isIllustrations.value);
  });

  watch(isIllustrations, (val) => {
    loadTitleAnimation(val);
  });

  onBeforeUnmount(() => {
    if (_anim) {
      _anim.destroy();
      _anim = null;
    }
  });

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
    } else if (w < 1101 && w >= 600) {
      return '2rem';
    } else if (w < 600) {
      return '1rem';
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



.drawer-btn {
  margin-left: 0;
}

::v-deep .essential-contact:hover {
  background-color: white !important;
  color: black !important;
}

.page-container.with-padding {
  padding-left: 14rem;
  transition: padding-left 5.3s ease;
}

.app-header {
  position: relative;
  z-index: 2000;
  overflow: hidden; /* Prevent overflow on small screens */

}

@media (min-width: 600px) {
  .app-header {
    padding: 1.5rem; /* Desktop padding */
    overflow: visible;
  }
}



.lottie-anchor {
  position: relative;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
}

.title-animation-v3 {
  position: absolute;
  top: 2%;
  width: 600px;
  height: 640px;
  pointer-events: none;
  filter: var(--logo-filter, brightness(1.2));
}

.toolbar { position: relative; z-index: 1; }

.home-hitbox {
  position: absolute;
  top: 8px; left: 20px;
  width: 280px; height: 40px;
  z-index: 2001;
  pointer-events: auto;
}




/* @media (max-width: 940px) {
  .title-animation-v3 {
    transform-origin: left center;
    transform: translateY(10%) scale(3.1);
  }
}

@media (max-width: 590px) {
  .title-animation-v3 {
    transform-origin: left center;
    transform: translateY(-50%) scale(2.7);
  }
}
*/



.title-animation-v3 {
  transform-origin: left center;
  transform: translateY(1.5%) translateX(-123%) scale(3);
}
@media (max-width: 376px) {
  .title-animation-v3 {
  transform: translateY(-7.1%) translateX(-103%) scale(2.5);
  }

  .home-hitbox {
    top: 8px; left: 60px;
    width: 170px; height: 40px;
    z-index: 2001;
    pointer-events: auto;
  }
}

/* @media (min-width: 1520px) {
  .title-animation-v3 {
    transform-origin: left center;
    transform: translateY(-50%) scale(1.2);
  }
} */
</style>

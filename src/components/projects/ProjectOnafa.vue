<template>
  <!-- Hero video -->
  <video class="vidya" autoplay muted loop playsinline>
    <source :src="splash" type="video/mp4" />
  </video>

  <!-- Main project card -->
  <div class="projects-wrapper">
    <q-card bordered class="project-card q-pa-md q-ma-sm">
      <!-- Header -->
      <q-card-section class="project-header q-mt-sm">
        <q-icon name="restaurant" class="project-icon q-pl-md q-pt-md" />
        <div class="project-info">
          <div class="project-title">ONAFÃ</div>
        </div>
      </q-card-section>
      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline q-mx-lg q-my-lg">
        This is a vanilla JavaScript frontend implementing layered parallax scrolling, looping image carousels,
        and a paginated modal gallery. On scroll it shifts hero, main, and background elements at different rates
        for depth, triggers a splash animation past a threshold, and continuously animates three duplicated gallery
        tracks for infinite horizontal scroll using <code>requestAnimationFrame</code>. A modal toggles visibility with
        next/prev controls showing two gallery items per page. No frameworks—just DOM APIs and event listeners.
        <q-separator class="separator invisi" />
        <em>
          Layered parallax, infinite gallery tracks, and a modal “menu” gallery — a pure JavaScript restaurant landing
          page that feels like a motion design piece, powered only by DOM APIs, scroll events and transforms.
        </em>
      </div>

      <!-- Code Snippets (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              Code Snippets
            </h1>
          </div>
        </template>
        <q-separator />

        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism class="prism-block">
              <code class="language-js" :textContent="onafaCode"></code>
            </pre>
          </q-scroll-area>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              More Information
            </h1>
          </div>
        </template>

        <q-separator />

        <!-- Feature list -->
        <q-card-section class="project-body">
          <ul class="feature-list">
            <li>
              <strong>Responsive Navbar:</strong> Sticky, CSS-animated menu component with custom icons and dropdown
              behavior.
            </li>
            <li>
              <strong>Parallax Layers:</strong> Multiple background elements moved at varying speeds on scroll via
              <code>requestAnimationFrame</code>.
            </li>
            <li>
              <strong>Infinite Gallery:</strong> Cloned image tracks for seamless horizontal scrolling carousels in
              three simultaneous lanes.
            </li>
            <li>
              <strong>Modal Menu Gallery:</strong> Paginated overlay showing two items per page with next/previous
              controls.
            </li>
            <li>
              <strong>Design Iterations:</strong> Rapid prototyping &amp; visual polish using Photoshop &amp;
              Illustrator — refined typography, color and asset placement.
            </li>
            <li>
              <strong>Learned:</strong> Advanced DOM manipulation, scroll event optimization, CSS transforms and
              cross-platform performance tuning.
            </li>
          </ul>
        </q-card-section>
      </q-expansion-item>

      <!-- Design Iterations (expandable) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info q-ml-lg">
              Design Iterations
            </h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="c-carousel">
          <div class="carousel-wrapper">
            <q-carousel
              v-model="slide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              control-color="black"
              position="top"
              navigation
              arrows
              height="auto"
              width="100%"
              class="rounded-borders"
              navigation-position="top"
            >
              <!-- Iteration 1 -->
              <q-carousel-slide :name="1" class="column no-wrap c-slide">
                <div class="row fit justify-start items-center q-gutter-sm no-wrap">
                  <q-img class="rounded-borders col-4 full-height" :src="mockup" />
                  <div class="col-8">
                    <q-img class="rounded-borders full-height inner-image-tshirt" :src="tshirt" />
                    <q-img class="rounded-borders full-height inner-image" :src="iteration1" />
                  </div>
                </div>
              </q-carousel-slide>

              <!-- Iteration 2 -->
              <q-carousel-slide :name="2" class="column no-wrap c-slide">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-12 full-height" :src="screenR1" />
                </div>
              </q-carousel-slide>

              <!-- Iteration 3 -->
              <q-carousel-slide :name="3" class="column no-wrap c-slide">
                <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                  <q-img class="rounded-borders col-8 full-height" :src="screenR2" />
                  <q-img class="rounded-borders col-4 full-height" :src="screenR3" />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import splash from 'src/assets/onafa/splash-main_7.mp4';
import tshirt from 'src/assets/onafa/SVG/t-shirt.svg';
import iteration1 from 'src/assets/onafa/iteration-1.png';
import mockup from 'src/assets/onafa/mockup.png';
import screenR1 from 'src/assets/onafa/Screen_Recording1.gif';
import screenR2 from 'src/assets/onafa/Screen2.gif';
import screenR3 from 'src/assets/onafa/Screen3.gif';
import onafaCode from 'src/assets/snippets/onafa-code.txt?raw';

const slide = ref(1);
</script>

<style scoped>

.vidya {
  width: 100%;
  height: auto;
  margin-top: -0.94rem;
}

.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ecf2f8;
}

.inner-image-tshirt {
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  z-index: 4000;
}
.iteration {
  font-weight: bold;
  font-size: 0.9rem;
}

.c-slide {
  margin-top: 0rem;
  padding-left: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0rem;
}

.c-carousel {
  padding: 0;
  
}


</style>
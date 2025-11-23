<template>
  <!-- Hero video -->
  <video class="vidya" autoplay muted loop playsinline>
    <source :src="splash" type="video/mp4" />
  </video>

  <!-- Main project card -->
  <div class="projects-wrapper special-padding ">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header special-padding special-padding-left">
        <q-icon name="restaurant" class="project-icon" />
        <div class="project-info ">
          <div class="project-title">ONAFÃ</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline special-padding-left">
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

      <!-- Code Snippets heading -->
      <q-separator class="separator" />
      <h1 class="text-h5 text-weight-bold info-code special-padding-left">Code Snippets</h1>
      <q-separator class="separator" />

      <!-- Code block -->
      <q-card-section class="project-code">
        <q-scroll-area class="code-container">
          <pre v-prism class="prism-block">
          <code class="language-js" :textContent="onafaCode">
          </code>
          </pre>
        </q-scroll-area>
      </q-card-section>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info special-padding-left">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list special-padding-left">
          <li>
            <strong>Responsive Navbar:</strong> Sticky, CSS-animated menu component with custom icons and dropdown
            behavior.
          </li>
          <li>
            <strong>Parallax Layers:</strong> Multiple background elements moved at varying speeds on scroll via
            <code>requestAnimationFrame</code>.
          </li>
          <li>
            <strong>Infinite Gallery:</strong> Cloned image tracks for seamless horizontal scrolling carousels in three
            simultaneous lanes.
          </li>
          <li>
            <strong>Modal Menu Gallery:</strong> Paginated overlay showing two items per page with next/previous
            controls.
          </li>
          <li>
            <strong>Design Iterations:</strong> Rapid prototyping &amp; visual polish using Photoshop &amp; Illustrator
            —
            refined typography, color and asset placement.
          </li>
          <li>
            <strong>Learned:</strong> Advanced DOM manipulation, scroll event optimization, CSS transforms and
            cross-platform performance tuning.
          </li>
        </ul>
      </q-card-section>
      <q-card-section class="carousel-q-section">
        <div class="carousel-wrapper">
          <q-carousel v-model="slide" transition-prev="slide-right" transition-next="slide-left" swipeable animated
            control-color="black" navigation arrows height="auto" width="100%" class="rounded-borders">
            <q-carousel-slide :name="1" class="column no-wrap">
              <q-separator class="separator separator-info-exception" />
              <div class="iteration ">Iteration 1</div>
              <q-separator class="separator separator-info-exception" />
              <div class="row fit justify-start items-center q-gutter-sm no-wrap">
                <q-img class="rounded-borders col-4 full-height" :src="mockup" />
                <div class="col-8">
                  <q-img class="rounded-borders full-height inner-image-tshirt" :src="tshirt" />
                  <q-img class="rounded-borders full-height inner-image" :src="iteration1" />
                </div>
              </div>
            </q-carousel-slide>

            <q-carousel-slide :name="2" class="column no-wrap">
              <div class="iteration special-padding-left">Iteration 2</div>
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <q-img class="rounded-borders col-12 full-height" :src="screenR1" />
              </div>
            </q-carousel-slide>

            <q-carousel-slide :name="3" class="column no-wrap">
              <div class="iteration">Iteration 3</div>
              <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
                <q-img class="rounded-borders col-8 full-height" :src="screenR2" />
                <q-img class="rounded-borders col-4 full-height" :src="screenR3" />
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </q-card-section>
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
/* Headings */
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: -1rem;
  padding: 0;
}

.info-code {
  font-size: 0.9rem;
  color: black;
  padding: 0;
  padding-left: 1.2rem;
}

/* Invisible spacer separator between tagline and <em> */
.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

/* Video splash */
.vidya {
  width: 100%;
  height: auto;
  margin-top: -0.94rem;
}

/* Main wrapper + card layout */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgb(253, 253, 253);
}

.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: white;
  margin: 0.6rem;
  /* padding: 0.8rem; */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* Header band */
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--q-color-grey-1);
  margin-top: 1.7rem;
}

.project-icon {
  height: auto;
  border-radius: 4px;
  color: #2b6caf;
  font-size: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.4rem;
}

.project-info {
  flex: 1 1 auto;
  min-width: 0;
}

.project-title {
  font-size: 1.55rem;
  font-weight: 600;
  margin-top: auto;
  margin-left: 0.3rem;
}

/* Tagline block */
.project-tagline {
  padding: 1.5rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Feature list section */
.q-card__section--vert {
  padding: 8px;
}

.project-body {
  padding: 1rem;
  padding-top: 1.8rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* .separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
} */

.separator-info {
  margin-left: -1rem;
  margin-right: -1rem;
  margin-top: 0.5rem;
}

.special-padding {
  padding: 0.8rem;
}


.separator-info-exception {
  margin-left: -2.8rem;
  margin-right: -3.8rem;
  
}

.special-padding-left {
  margin-left: 1.5rem;
}
/* Code section */
.project-code {
  background-color: #ecf2f8;
  /* margin-left: -0.8rem;
  margin-right: -0.8rem; */
}

.code-container {
  height: 350px;
  margin-top: -0.5rem;
  font-size: 0.7rem;
}

/* Prism block */
.prism-block {
  margin: 0;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 1.3rem;
  font-family: sans-serif;
  background-color: #ecf2f8;
}

/* Carousel / iterations */
.carousel-wrapper {
  width: 100%;

}



.inner-image-tshirt {
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  z-index: 4000;
}



/* Make iteration heading behave like Code Snippets / Further Information */
.iteration {
  font-weight: bold;
  font-size: 0.9rem; /* match .info / .info-code */
  padding-left: 0rem; /* same as .info-code */
  margin-bottom: 0rem;
  margin-left: 0.8rem;
  padding: 1rem;
}

.carousel-q-section {
  padding: 0;
}

/* Responsive tweaks */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
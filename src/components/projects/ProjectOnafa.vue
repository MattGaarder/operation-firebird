<template>
  <!-- Hero video -->
  <video class="vidya" autoplay muted loop playsinline>
    <source :src="splash" type="video/mp4" />
  </video>

  <!-- Main project card -->
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="restaurant" class="project-icon" />
        <div class="project-info">
          <div class="project-title">ONAFÃ</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
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
      <h1 class="text-h5 text-weight-bold info-code">Code Snippets</h1>
      <q-separator class="separator" />

      <!-- Code block -->
      <q-card-section class="project-code">
        <q-scroll-area class="code-container">
          <pre v-prism class="prism-block">
<code class="language-js">
const hero = document.querySelector('.hero');
const main = document.querySelector('.main');
const splash = document.querySelector('.splash');
const food = document.querySelector('.food');
const foodbkg = document.querySelector('.food-bkg');
const heroSection = document.querySelector('section.hero');

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(-${scrollY * 0.1}px)`;  
    main.style.transform = `translateY(-${scrollY * 0.5}px)`;  
    food.style.transform = `translateY(-${scrollY * 0.8}px)`;
    foodbkg.style.transform = `translateY(-${scrollY * 0.6}px)`;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const threshold = hero.offsetTop + hero.clientHeight - 500;
  let hasAnimated = false;

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    if (!hasAnimated && scrollY > threshold) {
      splash.classList.add('animate-in');
      hasAnimated = true;
    }
    if (hasAnimated) {
      splash.style.transform = `translateY(-${scrollY * 3}px)`; 
    }
  });
});

// START OF FIRST TRACK
const track = document.querySelector('#gallery-track');
const container = document.querySelector('.image-flex-container');
const originalContent = track.innerHTML;
track.innerHTML += originalContent;
const trackWidth = track.offsetWidth;
const containerWidth = container.offsetWidth;
let scrollPosition = 0;
const scrollSpeed = 1; 

// SECOND TRACK
const track2 = document.querySelector('#gallery-track-2');
const container2 = document.querySelector('.image-flex-container-2');
const originalContent2 = track2.innerHTML;
track2.innerHTML += originalContent2;
const trackWidth2 = track2.offsetWidth;
const containerWidth2 = container2.offsetWidth;
let scrollPosition2 = 0;
const scrollSpeed2 = 1; 

// THIRD TRACK
const track3 = document.querySelector('#gallery-track-3');
const container3 = document.querySelector('.image-flex-container-3');
const originalContent3 = track3.innerHTML;
track3.innerHTML += originalContent3;
const trackWidth3 = track3.offsetWidth;
const containerWidth3 = container3.offsetWidth;
let scrollPosition3 = 0;
const scrollSpeed3 = 1; 

function animate() {
  scrollPosition -= scrollSpeed;
  scrollPosition2 -= scrollSpeed2;
  scrollPosition3 -= scrollSpeed3;

  if (Math.abs(scrollPosition) >= trackWidth / 2) {
    scrollPosition = 0;
  }
  if (Math.abs(scrollPosition2) >= trackWidth2 / 2) {
    scrollPosition2 = 0;
  }
  if (Math.abs(scrollPosition3) >= trackWidth3 / 2) {
    scrollPosition3 = 0;
  }

  track.style.transform = `translate3d(${scrollPosition}px, 0, 0)`;
  track2.style.transform = `translate3d(${-scrollPosition2}px, 0, 0)`;
  track3.style.transform = `translate3d(${scrollPosition3}px, 0, 0)`;

  requestAnimationFrame(animate);
}

animate();

// END OF TRACKS

const itemsPerPage = 2;
let currentPage = 0;

const galleryItems = document.querySelectorAll('.gallery-item');
const modalGallery = document.getElementById('modalGallery');
const menuLink = document.getElementById('menuLink');
const arrowRight = document.getElementById('arrowRight');
const arrowLeft = document.getElementById('arrowLeft');
const modalClose = document.getElementById('modalClose');

function showPage(page) {
  galleryItems.forEach(item =&gt; {
    item.style.display = 'none';
  });

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i &lt; endIndex &amp;&amp; i &lt; galleryItems.length; i++) {
    galleryItems[i].style.display = 'block';
  }
}

function openModal() {
  modalGallery.style.display = 'flex';
  currentPage = 0;
  showPage(currentPage);
}

function closeModal() {
  modalGallery.style.display = 'none';
}

menuLink.addEventListener('click', function (e) {
  e.preventDefault(); 
  openModal();
});

modalClose.addEventListener('click', closeModal);

arrowRight.addEventListener('click', function () {
  if ((currentPage + 1) * itemsPerPage &lt; galleryItems.length) {
    currentPage++;
    showPage(currentPage);
  }
});

arrowLeft.addEventListener('click', function () {
  if (currentPage &gt; 0) {
    currentPage--;
    showPage(currentPage);
  }
});
</code>
          </pre>
        </q-scroll-area>
      </q-card-section>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
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
            <strong>Infinite Gallery:</strong> Cloned image tracks for seamless horizontal scrolling carousels in three
            simultaneous lanes.
          </li>
          <li>
            <strong>Modal Menu Gallery:</strong> Paginated overlay showing two items per page with next/previous
            controls.
          </li>
          <li>
            <strong>Design Iterations:</strong> Rapid prototyping &amp; visual polish using Photoshop &amp; Illustrator —
            refined typography, color and asset placement.
          </li>
          <li>
            <strong>Learned:</strong> Advanced DOM manipulation, scroll event optimization, CSS transforms and
            cross-platform performance tuning.
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
  <q-card bordered class="project-card">
  <!-- Design iteration carousel -->
  <div class="carousel-wrapper">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="black"
      navigation
      padding
      arrows
      height="auto"
      width="100%"
      class="rounded-borders"
    >
      <q-carousel-slide :name="1" class="column no-wrap">
        <div class="iteration">Iteration 1</div>
        <div class="row fit justify-start items-center q-gutter-sm no-wrap">
          <q-img class="rounded-borders col-4 full-height" :src="mockup" />
          <div class="col-8">
            <q-img class="rounded-borders full-height inner-image-tshirt" :src="tshirt" />
            <q-img class="rounded-borders full-height inner-image" :src="iteration1" />
          </div>
        </div>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="column no-wrap">
        <div class="iteration">Iteration 2</div>
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
  </q-card>
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
  padding: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* Header band */
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--q-color-grey-1);
  margin-top: 0.7rem;
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

/* Separators */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
}

/* Code section */
.project-code {
  background-color: #ecf2f8;
  margin-left: -0.8rem;
  margin-right: -0.8rem;
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
  margin-top: 0.5rem;
}

.iteration {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.inner-image-tshirt {
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  z-index: 4000;
}

/* Responsive tweaks */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
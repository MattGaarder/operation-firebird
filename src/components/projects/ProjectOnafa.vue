<template>
    <video class="vidya" autoplay muted>
      <source src="/src/assets/onafa/splash-main_7.mp4" type="video/mp4" class="vidya" autoplay muted loop>
    </video>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-body">
        <div class="project-info">
          <div class="project-title">Onafã</div>
          <div class="project-tagline">
            This is a vanilla JavaScript frontend implementing layered parallax scrolling, looping image carousels, and a paginated modal gallery. On scroll it shifts hero, main, and background elements at different rates for depth, triggers a splash animation past a threshold, and continuously animates three duplicated gallery tracks for infinite horizontal scroll using requestAnimationFrame. A modal toggles visibility with next/prev controls showing two gallery items per page. No frameworks—just DOM APIs and event listeners.
          </div>
        </div>
      </q-card-section>

      <q-separator />
     
          <q-card-section class="project-code">
          <q-scroll-area class="code-container" >
          <pre v-prism><code class="language-js">
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
    // foodbkg2.style.transform = `translateY(-${scrollY * 0.6}px)`;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const threshold = hero.offsetTop + hero.clientHeight - 500;
  let hasAnimated = false;

  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    console.log(scrollY);
    console.log(threshold);
    console.log((scrollY > threshold))
    if (!hasAnimated && scrollY > threshold) {
      splash.classList.add('animate-in');
      hasAnimated = true
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
  if (Math.abs(scrollPosition3) >= trackWidth / 2) {
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
  galleryItems.forEach(item => {
    item.style.display = 'none';
  });
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  for (let i = startIndex; i < endIndex && i < galleryItems.length; i++) {
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
  if ((currentPage + 1) * itemsPerPage < galleryItems.length) {
    currentPage++;
    showPage(currentPage);
  }
});

arrowLeft.addEventListener('click', function () {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
});
          </code></pre>
          
        </q-scroll-area>
      </q-card-section>
      <q-card-section class="project-body">
        <ul class="feature-list">
          <li><strong>Responsive Navbar:</strong> Sticky, CSS-animated menu component with custom icons and dropdown behavior.</li>
          <li><strong>Parallax Layers:</strong> Multiple background elements moved at varying speeds on scroll via `requestAnimationFrame`.</li>
          <li><strong>Infinite Gallery:</strong> Cloned image tracks for seamless horizontal scrolling carousels in three simultaneous lanes.</li>
          <li><strong>Design Iterations:</strong> Rapid prototyping and visual polish using Photoshop & Illustrator—refined typography, color, and asset placement.</li>
          <li><strong>Learned:</strong> Advanced DOM manipulation, scroll event optimization, CSS transforms, and cross-platform performance tuning.</li>
        </ul>
      </q-card-section>
    </q-card>

  </div>
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
          <q-img class="rounded-borders col-4 full-height" src="/src/assets/onafa/mockup.png" />
          <div class=" col-8">
            <q-img class="rounded-borders full-height inner-image-tshirt" src="/src/assets/onafa/SVG/t-shirt.svg"/>
            <q-img class="rounded-borders full-height inner-image" src="src/assets/onafa/iteration-1.png"/>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap">
        <div class="iteration">Iteration 2</div>
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-12 full-height" src="/src/assets/onafa/Screen_Recording1.gif" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap">
        <div class="iteration">Iteration 3</div>
        <div class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap">
          <q-img class="rounded-borders col-8 full-height" src="/src/assets/onafa/Screen2.gif" />
          <q-img class="rounded-borders col-4 full-height" src="/src/assets/onafa/Screen3.gif" />
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const slide = ref(1);
</script>

<style scoped>
.iteration {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.custom-caption {
  text-align: center;
  padding: 12px;
  color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.3);
}
.inner-image-tshirt{
  margin-top: -5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  z-index: 4000;
}

.carousel-wrapper {
  width: 100%;
}

.vidya {
  width: 100%;
  height: auto;
  margin-top: -0.94rem;
}

.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
}

.project-card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
  background: white;
}

/* header: icon + info, wrapping when too narrow */
.project-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  gap: 0.75rem;
  background: var(--q-color-grey-1);
  padding: 1rem;
}

.project-icon {
  flex: 0 0 174px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.readme-icon {
  color: var(--q-color-blue-6);
}

.project-info {
  flex: 1 1 auto;
  min-width: 0; /* allow text to wrap */
}

.project-title {
  font-size: 1.7rem;
  font-weight: 600;
  margin-left: auto;
  margin-top: auto;
}

.project-tagline {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: var(--q-color-grey-7);
  line-height: 1.4;
}

/* feature list section */
.project-body {
  padding: 0.75rem 1rem;
  padding-top: 0rem;
  background: var(--q-color-grey-2);
  flex-grow: 1;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* demo GIF */
.project-demo {
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>

<template>
  <q-page padding class="text-black">
    <div class="page-head">
    </div>

    <div ref="grid" class="masonry-grid">
      <!-- sizer for Masonry baseline column width -->
      <div class="masonry-sizer"></div>

      <div
        v-for="(ill, idx) in illustrations"
        :key="idx"
        class="masonry-item"
        :class="`span-${ill.span || 1}`"
      >
        <div class="img-wrapper">
          <q-img
            :src="ill.src"
            :alt="ill.alt || 'illustration'"
            loading="lazy"
            class="masonry-img"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

const grid = ref(null);
let msnry = null;

function initMasonry() {
  if (!grid.value) return;

  nextTick(() => {
    imagesLoaded(grid.value, () => {
      msnry = new Masonry(grid.value, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-sizer',
        percentPosition: true,
        transitionDuration: '0.3s',
      });
      msnry.layout();
    });

    imagesLoaded(grid.value).on('progress', () => {
      msnry?.layout();
    });

    window.addEventListener('resize', resizeHandler);
  });
}

function resizeHandler() {
  msnry?.layout();
}

onMounted(initMasonry);

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler);
  if (msnry) {
    msnry.destroy();
    msnry = null;
  }
});

import deer from '/src/assets/illustrations/deer.png';
import brief from '/src/assets/illustrations/brief.png';
import bike from '/src/assets/illustrations/bike.png';
import composer from  '/src/assets/illustrations/composer.png';
import samurai from '/src/assets/illustrations/samurai.png';
import fall from '/src/assets/illustrations/fall.png';
import french from '/src/assets/illustrations/french.png';
import frenchNkd from '/src/assets/illustrations/frenchNkd.png';
import haggard from '/src/assets/illustrations/haggard.png';
import frog from '/src/assets/illustrations/frog.png';
import bignosedude from '/src/assets/illustrations/bignosedude.png';
import faces from '/src/assets/illustrations/faces.png';
import kobe from '/src/assets/illustrations/kobe.png';
import nachi from '/src/assets/illustrations/nachi.png';
import notebook from '/src/assets/illustrations/notebook.png';
import osaka from '/src/assets/illustrations/osaka.png';
import penguin1 from '/src/assets/illustrations/penguin1.png';
import penguin2 from '/src/assets/illustrations/penguin2.png';
import penguins from '/src/assets/illustrations/penguins.png';
import rosen from '/src/assets/illustrations/rosen.png';
import skull from '/src/assets/illustrations/skull.png';
import overthere from '/src/assets/illustrations/overthere.png';
import self from '/src/assets/illustrations/self.png';
import self2 from '/src/assets/illustrations/self2.png';
import self3 from '/src/assets/illustrations/self3.png';
import life1 from '/src/assets/illustrations/life1.png';
import quick from '/src/assets/illustrations/quick.png';
import yuka_clean from '/src/assets/illustrations/yuka-clean.png';
import cato from '/src/assets/illustrations/cato.png';
import salaryman from '/src/assets/illustrations/salaryman.png';
import trapcard from '/src/assets/illustrations/trapcard.png';
import fish from '/src/assets/illustrations/fish.png';
import lamp from '/src/assets/illustrations/lamp.png';
import lawyer from '/src/assets/illustrations/lawyer.png';
import hey from '/src/assets/illustrations/hey.png';
import angryblue from '/src/assets/illustrations/angryblue.png';
import devilangryblue from '/src/assets/illustrations/devilangryblue.png';
import pug from '/src/assets/illustrations/pug.png';
import frogandmouse from '/src/assets/illustrations/frogandmouse.png';
import lifeback from '/src/assets/illustrations/lifeback.png';
import animedude from '/src/assets/illustrations/animedude.png';
import smokechar from '/src/assets/illustrations/smokechar.png';
import lg_lady from '/src/assets/illustrations/lg-lady.png';


const illustrations = [
    { src: deer, alt: 'deer', span: 1 },
    { src: brief, alt: 'brief', span: 1 },
    { src: bike, alt: 'bike', span: 1 },
    { src: composer, alt: 'composer', span: 1 },
    { src: samurai, alt: 'samurai', span: 1 },
    { src: fall, alt: 'fall', span: 1 },
    { src: french, alt: 'french', span: 1 },
    { src: frenchNkd, alt: 'frenchNkd', span: 1 },
    { src: haggard, alt: 'haggard', span: 1 },
    { src: frog, alt: 'frog', span: 1 },
    { src: bignosedude, alt: 'bignosedude', span: 1 },
    { src: faces, alt: 'faces', span: 2 },
    { src: kobe, alt: 'kobe', span: 1 },
    { src: nachi, alt: 'nachi', span: 1 },
    { src: notebook, alt: 'notebook', span: 1 },
    { src: osaka, alt: 'osaka', span: 1 },
    { src: penguin1, alt: 'penguin1', span: 1 },
    { src: penguin2, alt: 'penguin2', span: 1 },
    { src: penguins, alt: 'penguins', span: 2 },
    { src: rosen, alt: 'rosen', span: 1 },
    { src: skull, alt: 'skull', span: 1 },
    { src: overthere, alt: 'overthere', span: 1 },
    { src: self, alt: 'self', span: 1 },
    { src: self2, alt: 'self2', span: 1 },
    { src: self3, alt: 'self3', span: 1 },
    { src: life1, alt: 'life1', span: 1 },
    { src: quick, alt: 'quick', span: 1 },
    { src: yuka_clean, alt: 'yuka_clean', span: 2 },
    { src: cato, alt: 'cato', span: 1 },
    { src: salaryman, alt: 'salaryman', span: 1 },
    { src: trapcard, alt: 'trapcard', span: 1 },
    { src: fish, alt: 'fish', span: 2 },
    { src: lamp, alt: 'lamp', span: 1 },
    { src: lawyer, alt: 'lawyer', span: 1 },
    { src: hey, alt: 'hey', span: 1 },
    { src: angryblue, alt: 'angryblue', span: 1 },
    { src: devilangryblue, alt: 'devilangryblue', span: 1 },
    { src: pug, alt: 'pug', span: 1 },
    { src: frogandmouse, alt: 'frogandmouse', span: 1 },
    { src: lifeback, alt: 'lifeback', span: 1 },
    { src: animedude, alt: 'animedude', span: 1 },
    { src: smokechar, alt: 'smokechar', span: 1 },
    { src: lg_lady, alt: 'lg_lady', span: 1 },
];
</script>

<style scoped>
.page-head {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}
.subtitle {
  font-size: 0.9rem;
  color: var(--q-color-grey-4);
}


.masonry-sizer {
  width: 25%;
  height: 0;
}

.masonry-item {
    width: 25%; 
    padding: 1rem;
    box-sizing: border-box;
    display: flex;              
    align-items: center;
    justify-content: center;
}



.masonry-item.span-1 {
  width: 25%;
}
.masonry-item.span-2 {
  width: 50%;
}
.masonry-item.span-3 {
  width: 75%;
}
.masonry-item.span-4 {
  width: 100%;
}

.masonry-item:hover {
  z-index: 2;
}

.img-wrapper {
   align-items: center;
  justify-content: center;
  width: 100%;   
  height: 100%;  
}

.masonry-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  color: white;
    max-width: 100%;
  max-height: 100%;
  object-fit: contain; 
  border-radius: 4px;
    transition: transform 0.2s; 
  
}

.masonry-item:hover .masonry-img {
  transform: scale(1.01);
}

/* responsive fallback */
@media (max-width: 1200px) {
  .masonry-item,
  .masonry-item.span-1 {
    width: calc(50% - 8px);
  }
  .masonry-item.span-2,
  .masonry-item.span-3 {
    width: calc(100% - 8px);
  }
}
@media (max-width: 600px) {
  .masonry-item,
  .masonry-item.span-1,
  .masonry-item.span-2,
  .masonry-item.span-3 {
    width: 100%;
  }
}
</style>

<!-- const illustrations = [
    
    { src: '/src/assets/illustrations/deer.png', alt: 'Concept B', span: 1 },
        { src: '/src/assets/illustrations/brief.png', alt: 'brief', span: 1 },
        
    { src: '/src/assets/illustrations/bike.png', alt: 'bike', span: 1 },

    { src: '/src/assets/illustrations/composer.png', alt: 'Concept B', span: 1 },
            { src: '/src/assets/illustrations/samurai.png', alt: 'Sketch A', span: 1 },

    { src: '/src/assets/illustrations/fall.png', alt: 'Poster C', span: 1 },
    // { src: '/src/assets/illustrations/fish.png', alt: 'Concept B', span: 2 },
    { src: '/src/assets/illustrations/french.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/frenchNkd.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/haggard.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/frog.png', alt: 'Detail D', span: 1 },
    { src: '/src/assets/illustrations/hey.png', alt: 'Poster C', span: 1 },
        { src: '/src/assets/illustrations/faces.png', alt: 'Poster C', span: 2 },

    { src: '/src/assets/illustrations/kobe.png', alt: 'Sketch A', span: 1 },
    // { src: '/src/assets/illustrations/lamp.png', alt: 'Concept B', span: 1 },

    { src: '/src/assets/illustrations/nachi.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/notebook.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/osaka.png', alt: 'Detail D', span: 1 },
    { src: '/src/assets/illustrations/penguin1.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/penguin2.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/penguins.png', alt: 'Sketch A', span: 2 },
    { src: '/src/assets/illustrations/rosen.png', alt: 'Sketch A', span: 1 },
{ src: '/src/assets/illustrations/skull.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self2.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self3.png', alt: 'Concept B', span: 1 },
        { src: '/src/assets/illustrations/life1.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/yuka-clean.png', alt: 'Poster C', span: 2 },
    { src: '/src/assets/illustrations/cato.png', alt: 'cato', span: 1 },
    
]; -->
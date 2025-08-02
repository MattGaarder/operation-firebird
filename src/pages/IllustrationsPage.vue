
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
          <img
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

const illustrations = [
    { src: '/src/assets/illustrations/deer.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/brief.png', alt: 'brief', span: 1 },
    { src: '/src/assets/illustrations/bike.png', alt: 'bike', span: 1 },
    { src: '/src/assets/illustrations/composer.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/samurai.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/fall.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/french.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/frenchNkd.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/haggard.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/frog.png', alt: 'Detail D', span: 1 },
    { src: '/src/assets/illustrations/bignosedude.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/faces.png', alt: 'Poster C', span: 2 },
    { src: '/src/assets/illustrations/kobe.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/nachi.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/notebook.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/osaka.png', alt: 'Detail D', span: 1 },
    { src: '/src/assets/illustrations/penguin1.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/penguin2.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/penguins.png', alt: 'Sketch A', span: 2 },
    { src: '/src/assets/illustrations/rosen.png', alt: 'Sketch A', span: 1 },
    { src: '/src/assets/illustrations/skull.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/overthere.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self2.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/self3.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/life1.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/quick.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/yuka-clean.png', alt: 'Poster C', span: 2 },
    { src: '/src/assets/illustrations/cato.png', alt: 'cato', span: 1 },
    { src: '/src/assets/illustrations/salaryman.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/trapcard.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/fish.png', alt: 'Concept B', span: 2 },
    { src: '/src/assets/illustrations/lamp.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/lawyer.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/hey.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/angryblue.png', alt: 'cato', span: 1 },
    { src: '/src/assets/illustrations/devilangryblue.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/pug.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/frogandmouse.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/lifeback.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/animedude.png', alt: 'Concept B', span: 1 },
    { src: '/src/assets/illustrations/smokechar.png', alt: 'Poster C', span: 1 },
    { src: '/src/assets/illustrations/lg-lady.png', alt: 'Poster C', span: 1 },
];
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
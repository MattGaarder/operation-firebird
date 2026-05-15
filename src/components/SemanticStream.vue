<template>
  <span class="semantic-stream" :class="{ 'is-stable': isFullyStable }">
    <!-- Ghost element to hold the exact layout space of the final text -->
    <span class="semantic-stream-ghost" aria-hidden="true" v-html="canonicalHTML"></span>

    <!-- Visible element positioned over the ghost -->
    <span class="semantic-stream-visible">
      <span class="locked-text" v-html="lockedHTML"></span>
      <span v-if="!isFullyStable && activeCandidate" class="unstable-text" :style="unstableStyle" v-html="activeCandidate"></span>
    </span>
  </span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = defineProps({
  chunks: { type: Array, required: true },
  delay: { type: Number, default: 0 },
  start: { type: Boolean, default: true }
});

const emit = defineEmits(['complete']);

const isFullyStable = ref(false);
const lockedIndex = ref(0);
const activeCandidate = ref('');

// The canonical HTML is the concatenation of all stable chunks
const canonicalHTML = computed(() => {
  return props.chunks.map(chunk => chunk.stable).join('');
});

// The locked HTML is the concatenation of all fully stable chunks up to lockedIndex
const lockedHTML = computed(() => {
  return props.chunks.slice(0, lockedIndex.value).map(chunk => chunk.stable).join('');
});

const unstableStyle = computed(() => {
  return {
    opacity: 0.3
  };
});

let startTime = null;
let chunkStartTime = null;
let animationFrameId = null;
let currentBreakpoints = [];
let activeChunkDuration = 0;

function tick(timestamp) {
  if (!startTime) startTime = timestamp;

  const globalElapsed = timestamp - startTime;

  if (globalElapsed < props.delay) {
    animationFrameId = requestAnimationFrame(tick);
    return;
  }

  if (lockedIndex.value >= props.chunks.length) {
    if (!isFullyStable.value) {
      isFullyStable.value = true;
      emit('complete');
    }
    return; // All chunks locked
  }

  const currentChunk = props.chunks[lockedIndex.value];

  if (!chunkStartTime) {
    chunkStartTime = timestamp;

    // Add +/- 20% random variance to the chunk duration
    const baseDuration = currentChunk.duration !== undefined ? currentChunk.duration : 800;
    activeChunkDuration = baseDuration > 100 ? baseDuration * (0.8 + Math.random() * 0.4) : baseDuration;

    const numCandidates = currentChunk.candidates ? currentChunk.candidates.length : 0;
    currentBreakpoints = [];

    if (numCandidates > 1) {
      for (let i = 0; i < numCandidates - 1; i++) {
        // Random swap points between 10% and 90% of the chunk's duration
        currentBreakpoints.push(0.1 + Math.random() * 0.8);
      }
      currentBreakpoints.sort((a, b) => a - b);
    }

    if (numCandidates > 0) {
      activeCandidate.value = currentChunk.candidates[0];
    } else {
      activeCandidate.value = currentChunk.stable;
    }
  }

  const chunkElapsed = timestamp - chunkStartTime;
  const progress = Math.min(chunkElapsed / activeChunkDuration, 1);

  if (progress >= 1) {
    // Lock this chunk
    activeCandidate.value = '';
    lockedIndex.value++;
    chunkStartTime = null; // Reset for next chunk

    // Tiny micro-pause added organically by letting the next frame pick up the next chunk
    animationFrameId = requestAnimationFrame(tick);
    return;
  }

  if (currentChunk.candidates && currentChunk.candidates.length > 0) {
    let stage = 0;
    for (let i = 0; i < currentBreakpoints.length; i++) {
      if (progress >= currentBreakpoints[i]) {
        stage = i + 1;
      }
    }
    activeCandidate.value = currentChunk.candidates[stage];
  } else {
    activeCandidate.value = currentChunk.stable;
  }

  animationFrameId = requestAnimationFrame(tick);
}

import { watch } from 'vue';

watch(() => props.start, (newVal) => {
  if (newVal && !animationFrameId && !isFullyStable.value && props.chunks && props.chunks.length > 0) {
    startTime = null; // reset so it takes current timestamp on next tick
    animationFrameId = requestAnimationFrame(tick);
  }
});

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !props.chunks || props.chunks.length === 0) {
    isFullyStable.value = true;
    lockedIndex.value = props.chunks ? props.chunks.length : 0;
    emit('complete');
  } else if (props.start) {
    animationFrameId = requestAnimationFrame(tick);
  }
});

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});
</script>

<style scoped>
.semantic-stream {
  display: grid;
  vertical-align: top;
  width: 100%;
}

.semantic-stream-ghost {
  grid-area: 1 / 1;
  visibility: hidden;
  pointer-events: none;
  white-space: pre-wrap;
  word-break: break-word;
}

.semantic-stream-visible {
  grid-area: 1 / 1;
  white-space: pre-wrap;
  word-break: break-word;
  align-self: start;
  height: 0;
  min-height: 0;
  overflow: visible;
}

.locked-text {
  opacity: 1;
}

.unstable-text {
  display: inline;
}
</style>

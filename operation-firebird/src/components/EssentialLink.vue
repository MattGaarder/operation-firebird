<template>
  <q-item clickable :to="props.link">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section >
      <q-item-label :class="isActive ? 'text-black' : 'text-white'">{{ props.title }}<q-icon name="arrow_outward" class="arrow-outward-icon"></q-icon></q-item-label>
      <q-item-label caption :class="isActive ? 'text-black' : 'text-white'">{{ props.caption }}</q-item-label>
      
    </q-item-section>
    
  </q-item>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  });

  const route = useRoute();

  const isActive = computed(() => route.path === props.link);
</script>

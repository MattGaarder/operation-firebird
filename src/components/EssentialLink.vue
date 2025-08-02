<template>
  <q-item clickable :to="!props.isExternal ? props.link : undefined" :href="props.isExternal ? props.link : undefined">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section >
      
      <q-item-label :class="isActive ? 'text-black' : 'text-white'" class="text-bold">{{ props.title }}<q-icon :name="props.name" class="arrow-outward-icon"></q-icon></q-item-label>
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
    name: {
      type: String,
      default: '',
    },
    isExternal: {
      type: Boolean,
      default: false,
    },
  });

  const route = useRoute();

  const isActive = computed(() => route.path === props.link);
</script>

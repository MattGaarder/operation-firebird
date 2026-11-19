<template>
  <q-item clickable :to="!props.isExternal ? props.link : undefined" :href="props.isExternal ? props.link : undefined" :exact="props.exact">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>

      <q-item-label class="link-title">{{ props.title }}<q-icon :name="props.name" class="arrow-outward-icon"></q-icon></q-item-label>
      <q-item-label v-if="props.cvDownload && props.caption" caption>
        <a class="cv-link" :href="cvHref" :download="props.caption" @click.stop>{{ props.caption }}</a>
      </q-item-label>
      <q-item-label v-else-if="props.caption" caption>{{ props.caption }}</q-item-label>

    </q-item-section>

  </q-item>
</template>

<script setup>
  import { computed } from 'vue';

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
    exact: {
      type: Boolean,
      default: false,
    },
    cvDownload: {
      type: Boolean,
      default: false,
    },
  });

  const cvHref = computed(() => '/src/assets/GAARDER-CV.pdf');
</script>

<style scoped>
.link-title {
  font-size: 0.72rem;
  color: #4A80AD !important;
}

:deep(.q-item__label--caption),
.q-item__label--caption,
[caption] {
  font-size: 0.64rem;
  color: #85BAD6 !important;
}

:deep(.q-icon) {
  color: #4A80AD;
}

.cv-link {
  color: #85BAD6 !important;
  font-size: 0.64rem;
  text-decoration: underline;
  cursor: pointer;
}

.cv-link:hover {
  color: #9cdcfe !important;
}
</style>

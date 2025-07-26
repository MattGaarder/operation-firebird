<template>
  <q-card flat class="q-mb-xl">
    <q-card-section class="q-pa-none">
            <div class="q-gutter-md">
                <div class="col-6">
                    <div class="text-h6">{{ project }}</div>
                    <div class="text-caption text-grey-6">{{ summary }}</div>
                </div>
                <img :src="logo"/>
                <div class="col-6">
                    <ul class="q-pl-xl technology">
                        <li v-for="(item, i) in technology" :key="i">{{ item }}</li>
                    </ul>
                </div>
            </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const { project, logo, summary, technology } = defineProps({
  project:    { type: String,  required: true },
  logo:   { type: String,  required: true },
  summary:    { type: String, default: ""},
  technology: { type: Array,   default: () => [] },
});
</script>

<style scoped>

</style>
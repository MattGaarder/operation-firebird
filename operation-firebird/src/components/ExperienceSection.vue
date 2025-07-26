<template>
  <q-card flat class="q-mb-xl">
    <q-card-section class="q-pa-none">

            <div class="row q-gutter-md">
                <div class="col-5">
                    <div class="text-h6">{{ company }}</div>
                    <div class="text-caption text-grey-6">{{ duration }}</div>
                </div>

                <div class="col-8">
                    <ul class="q-pl-xl bullet-points">
                        <li v-for="(item, i) in bullets" :key="i">{{ item }}</li>
                    </ul>
                </div>
            </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
const { company, duration, bullets } = defineProps({
  company:    { type: String,  required: true },
  duration:   { type: String,  required: true },
  bullets:    { type: Array,   default: () => [] },
});
</script>

<style scoped>

</style>
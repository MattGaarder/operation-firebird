<template>
  <q-card flat class="q-mb-xl">
    <q-card-section class="q-pa-none">

            <div class="row">
                <div class="col-12 col-md-3 col-lg-4">
                    <div class="text-h7">{{ role }}</div>
                    <div class="text-h6">{{ company }}</div>
                    <div class="text-caption text-grey-6">{{ duration }}</div>
                    <div class="text-caption text-grey-6">{{ location }}</div>
                </div>

                <div class="col-12 col-md-9 col-lg-8">
                    <ul class="q-pl-xl bullet-points">
                        <li class="bullet" v-for="(item, i) in bullets" :key="i">{{ item }}</li>
                    </ul>
                </div>
            </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
const { role, company, duration, location } = defineProps({
  role: { type: String, required: true },
  company: { type: String,  required: true },
  duration: { type: String,  required: true },
  location: { type: String,  required: true },
  bullets: { type: Array,   default: () => [] },
});
</script>

<style scoped>

</style>
<template>
  <q-item class="essential-contact" clickable  :href="props.link">
    <q-item-section >
      <q-item-label class="q-pl-xs contacts" >{{ props.title }}<q-icon name="arrow_outward" class="arrow-outward-icon"></q-icon></q-item-label>
    </q-item-section>
    
  </q-item>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: '#',
    },
  });


</script>

<style >
.contacts {
  font-size: small;
}


.essential-contact {
  min-height: 0 !important;
}
</style>
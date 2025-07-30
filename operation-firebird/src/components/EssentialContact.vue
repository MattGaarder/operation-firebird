<template>
  <q-item class="essential-contact" clickable  :to="props.link">
    <q-item-section >
      <q-item-label class="q-pl-xs contacts ">{{ props.title }}<q-icon name="arrow_outward" class="arrow-outward-icon"></q-icon></q-item-label>
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

:deep(.essential-contact.q-hoverable:hover > .q-focus-helper::before) {
  background-color: white !important;
  opacity: 1 !important;
}

:deep(.essential-contact.q-hoverable:hover > .q-item-section .contacts) {
  color: black !important;
  background-color: white !important;
  opacity: 1 !important;
}

:deep(.essential-contact.q-hoverable:hover > .q-item__section .contacts) {
  color: black !important;
  font-weight: bold !important;
}

.essential-contact {
  min-height: 0 !important;
}
</style>
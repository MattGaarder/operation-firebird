<template>
  <q-page padding class="bg-primary text-white" :class="{ 'with-closed-drawer': !leftDrawerOpen }">

    <div class="text-h8 text-weight-bold q-mb-lg q-mr-xl q-pt-lg top-border">EXPERIENCE</div>

    <ExperienceSection
      v-for="entry in experiences"
      :key="entry.company"
      :company="entry.company"
      :duration="entry.duration"
      :bullets="entry.bullets"
      square
      class="bg-primary experience-section top-border q-pt-lg q-pr-xl"
    />
  </q-page>
</template>

<script setup>
  import ExperienceSection from 'src/components/ExperienceSection.vue';
  import { inject } from 'vue';
  const leftDrawerOpen = inject('leftDrawerOpen')
        

  const experiences = [
    {
      company:  "PwC",
      duration: "Oct 2023 – Present",
      bullets: [
        "Designed and delivered eLearning solutions using Articulate Storyline",
        "Automated 20+ workflows with Power Automate and Azure Functions",
        "Collaborated with non-technical stakeholders to gather requirements"
      ]
    },
    {
      company:  "H&M",
      duration: "Jan 2021 – Sep 2023",
      bullets: [
        "Led visual merchandising projects for 15 stores across Japan",
        "Managed a team of 5 designers to refresh seasonal displays",
        "Analyzed foot-traffic data to optimize product placement"
      ]
    },
        {
      company:  "TransPerfect",
      duration: "Jan 2021 – Sep 2023",
      bullets: [
        "I conduct data collection sessions with paid participants, to aid in the improvement of voice assistants in their responsiveness to a range of dialects, accents, and individuals.",
        "Communicate instructions clearly to those with varying levels of familiarity with technology.",
        "Work seamlessly with an international team to provide data matching client specifications."
      ]
    },
        {
      company:  "CPM UK",
      duration: "Jan 2021 – Sep 2023",
      bullets: [
        "Provided clear and concise guidance for Diageo customers and clients regarding a wide range of potential technical faults in their outlet setups; diagnosing issues including, but not limited to, gas pressurisation, product flow integrity, and appropriate equipment usage.",
        "In the event of undiagnosable issues I clearly and concisely logged jobs on Salesforce and internal systems. Often handling 200+ calls a day during high traffic periods.",
        "Liaised and coordinated with teams of engineers and contractors across the UK to resolve issues in a timely manner, with the aim to resolve urgent tickets within 24 hours.",
        "Guided customers through ullaging procedures, directing them to appropriate wholesalers, or other potential solutions.",
      ]
    },
        {
      company:  "H&M",
      duration: "Jan 2021 – Sep 2023",
      bullets: [
        "Led visual merchandising projects for 15 stores across Japan",
        "Managed a team of 5 designers to refresh seasonal displays",
        "Analyzed foot-traffic data to optimize product placement"
      ]
    },
        {
      company:  "Testronic",
      duration: "Jan 2021 – Sep 2023",
      bullets: [
        "I provided quality assurance for games in their final stages of production for leading AAA game developers. Part of a team that ensured that the final product was free from bugs, user experience issues, and language errors before the its final release to the public.",
        "Communicated efficiently between large international teams to assure speedy elimination of bugs and UX/UI issues.",
        "Verified there were no language discrepancies in the game by cross referencing Japanese and English script files."
      ]
    },
  ];
</script>

<style scoped>
.with-closed-drawer {
  margin-left: 25rem;
}
</style>
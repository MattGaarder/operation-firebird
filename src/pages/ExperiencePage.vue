<template>
  <q-page padding class="q-pl-xl"  :style="{ paddingLeft: sidePadding }">
    <div class="text-h8 text-weight-bold q-mb-lg  q-pt-lg top-border">SKILLS  &  INTERESTS</div>
    <SkillsSection class="bg-primary experience-section top-border q-pt-lg "></SkillsSection>

    <div class="text-h8 text-weight-bold q-mb-lg q-mr-xl q-pt-lg top-border">EXPERIENCE</div>

    <ExperienceSection
      v-for="entry in experiences"
      :key="entry.company"
      :role="entry.role"
      :company="entry.company"
      :duration="entry.duration"
      :location="entry.location"
      :bullets="entry.bullets"
      square
      class="bg-primary experience-section top-border q-pt-lg q-pr-xl"
    />
  </q-page>
</template>

<script setup>
  import ExperienceSection from 'src/components/ExperienceSection.vue';
  import SkillsSection from 'src/components/SkillsSection.vue';
//   import { inject, computed } from 'vue';
//   import { useQuasar } from 'quasar';
  // const leftDrawerOpen = inject('leftDrawerOpen');
        

  

//   const $q = useQuasar();

//   const sidePadding = computed(() => {
//   const w = $q.screen.width;

//   if (w < 1113) {
//     // narrow screen
//     if (!leftDrawerOpen?.value) {
//       // drawer closed + narrow
//       return '2rem';
//     } else {
//       // drawer open + narrow
//       return '4rem';
//     }
//   } else {
//     // wide screen
//     if (leftDrawerOpen?.value) {
//       // drawer open + wide
//       return '4rem';
//     } else {
//       // drawer closed + wide
//       return '25rem';
//     }
//   }
// });

  const experiences = [
    {
      role: "AI Data Contributor",
      company:  "Postwork Labs, Inc",
      duration: "Current",
      location: "Remote",
      bullets: [
        "Complete coding projects across a range of technical domains, producing high-quality datasets designed to support the training of frontier AI systems.",
        "Apply problem-solving and programming skills to deliver efficient, well-documented solutions aligned with project specifications.",
        "Ensure accuracy, consistency, and clarity of code outputs to contribute to robust, real-world AI training data."
      ]
    },
    {
      role: "eLearning Developer",
      company:  "PwC",
      duration: "August 2023 - March 2025",
      location: "WC2N 6RH, London",
      bullets: [
        "Leverage Articulate Storyline and Creative Suite to design and author eLearning materials. Produce multimedia assets, implement custom functionality with JavaScript to maximize engagement and interactivity in our learning experiences. ",
        "Automated 20+ workflows with Google App Scripts, Power Automate, Alteryx and Azure Functions. Work with user data and backend technologies - Azure, Dataverse, Microsoft ecosystem.",
        "Integrate AI, automation, and tech solutions in our workflows - improving quality-of-work and reducing administrative and managerial burden - increasing the time we get to spend on the creative stuff! "
      ]
    },
    {
      role: "Localisation Tester",
      company:  "Testronic",
      duration: "2020 - 2023",
      location: "CR0 1PE, London",
      bullets: [
        "Conducted final-stage quality assurance for AAA game titles, ensuring release-ready products free from bugs, UX/UI issues, and language inconsistencies.",
        "Collaborated with international teams to expedite bug resolution and cross-referenced Japanese and English scripts to maintain language accuracy.",
        "Used Excel and JIRA to streamline issue tracking.",
      ]
    },
    {
      role: "Project Moderator",
      company:  "TransPerfect",
      duration: "2022 - 2023",
      location: "EC3N 1AH, London",
      bullets: [
        "Facilitated structured data collection sessions for a range of ai and assistant products - to better recognize individual speech patterns.",
        "Delivered clear, actionable instructions, ensuring high-quality data output aligned with client standards.",
      ],
    },
    {
      role: "Inbound Contact Executive",
      company:  "CPM UK",
      duration: "2022",
      location: "OX9 3PG, Thame",
      bullets: [
        "Delivered technical support to Diageo customers.",
        "Managed high call volumes (200+ daily) - logging cases in Salesforce - coordinating with UK-wide engineering teams to resolve urgent issues.",
        "Guided clients through troubleshooting and supply chain solutions to ensure operational continuity.",
  
      ]
    },

    {
      role: "Assistant Lanugage Teacher",
      company:  "JET Programme",
      duration: "2015 - 2018",
      location: "Tachikawa International, Tokyo",
      bullets: [
        "Prepared learning materials, supervised school excursions, and organized cultural events.",
        "Originated mathematics and science curriculum for international students.",
        "Elected as Head Teacher of English Club and as Cultural Exchange Ambassador."
      ]
    },
    {
      role: "Film Production Instructor",
      company:  "Digital Media Academy",
      duration: "2011",
      location: "Stanford University, California",
      bullets: [
        "Aided students in using professional cameras and editing software.",
        "Hired by programme director by demonstrating outstanding achievements in short-film production.",
      ]
    },
  ];
</script>

<style scoped>


</style>
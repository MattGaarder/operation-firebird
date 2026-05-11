<template>
  <q-page padding class="experience-page">
    <div class="text-h8 q-pa-sm q-pl-md top-border">Skills</div>
    <SkillsSection class="bg-primary top-border"></SkillsSection>

    <div class="text-h8 top-border q-pa-sm q-pl-md">Experience</div>

    <ExperienceSection
      v-for="entry in experiences"
      :key="entry.company"
      :role="entry.role"
      :company="entry.company"
      :duration="entry.duration"
      :location="entry.location"
      :bullets="entry.bullets"
      square
      class="bg-primary top-border q-pt-lg"
      :class="{
        'q-pr-xl': !isMobile,
        'q-pr-none': isMobile
      }"
    />
    <div class="text-h8 top-border q-pa-sm q-pl-md">Education</div>
      <q-card flat class="q-mb-md bg-primary top-border">
        <q-card-section>
          <div class="row experience-section q-pt-lg">
            <div class="col-12 col-md-3 col-lg-4">
              <div class="text-h6">
                The University of Manchester
              </div>
              <div class="text-h7">
                BA Japanese and Screen Studies
              </div>
              <div class="text-caption text-grey-6">
                2011 – 2015
              </div>
            </div>
            <div class="col-12 col-md-9 col-lg-8">
              <ul class="bullet-points">
                <li class="bullet">
                  Gained Japanese language skills, knowledge in medieval history and contemporary sociology.
                </li>
                <li class="bullet">
                  Developed skills in filmmaking, editing, directing and producing short films.
                </li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat class="q-mb-md bg-primary top-border">
        <q-card-section>
          <div class="row experience-section q-pt-lg">
            <div class="col-12 col-md-3 col-lg-4">
              <div class="text-h6">
                EDX Trinity Skills Bootcamp
              </div>
              <div class="text-h7">
                Front-End Web Dev Bootcamp
              </div>
              <div class="text-caption text-grey-6">
                2023
              </div>
            </div>
            <div class="col-12 col-md-9 col-lg-8">
              <ul class="bullet-points">
                <li class="bullet">
                  Graduated with skills in HTML5, CSS3, JavaScript, jQuery, React.js and Node.js.
                </li>
                <li class="bullet">
                  Projects included a social media app, weather dashboard, command-line applications and a film comparison app.
                </li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
  </q-page>
</template>

<script setup>
  import ExperienceSection from 'src/components/ExperienceSection.vue';
  import SkillsSection from 'src/components/SkillsSection.vue';

  import { computed } from 'vue'
  import { useQuasar } from 'quasar'

  const $q = useQuasar()
  const isMobile = computed(() => $q.screen.lt.md)  // < md == mobile/tablet

  const experiences = [
    {
      role: "AI Data Contributor",
      company:  "Postwork Labs, Inc",
      duration: "Current — Remote",
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

.experience-page {
  margin-top: -182px !important;
}

@media (max-width: 900px) {
  .experience-page {
    margin-top: -182px !important;
  }
}


</style>

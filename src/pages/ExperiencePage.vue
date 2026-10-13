<template>
  <q-page padding class="experience-page">
    <div class="q-pa-sm q-pl-md top-border section-header">Skills / Interests</div>
    <SkillsSection class="bg-primary top-border"></SkillsSection>

    <div class="q-pa-sm q-pl-md top-border section-header">Professional Experience</div>

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
    <div class="top-border q-pa-sm q-pl-md section-header">Education</div>
      <q-card flat class="q-mb-md bg-primary top-border">
        <q-card-section>
          <div class="row experience-section q-pt-lg">
            <div class="col-12 col-md-4 col-lg-4">
              <div class="text-h7">
                BA Japanese and Screen Studies | <span class="job-meta">2011-2015</span>
              </div>
              <div class="text-h6">
                The University of Manchester
              </div>
            </div>
            <div class="col-12 col-md-8 col-lg-8">
              <ul class="bullet-points">
                <li class="bullet">
                  Gained <span class="pop-yellow">Japanese language skills</span>, knowledge in medieval history and contemporary sociology.
                </li>
                <li class="bullet">
                  Developed skills in <span class="pop-yellow">filmmaking, editing, directing and producing</span> short films.
                </li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card flat class="q-mb-md bg-primary top-border">
        <q-card-section>
          <div class="row experience-section q-pt-lg">
            <div class="col-12 col-md-4 col-lg-4">
              <div class="text-h7">
                Front-End Web Dev Bootcamp | <span class="job-meta">2023</span>
              </div>
              <div class="text-h6">
                EDX Trinity Skills Bootcamp
              </div>
            </div>
            <div class="col-12 col-md-8 col-lg-8">
              <ul class="bullet-points">
                <li class="bullet">
                  Graduated with skills in <span class="skill-yellow">HTML5</span>, <span class="skill-yellow">CSS3</span>, <span class="skill-yellow">JavaScript</span>, <span class="skill-yellow">jQuery</span>, <span class="skill-yellow">React.js</span> and <span class="skill-yellow">Node.js</span>.
                </li>
                <li class="bullet">
                  Projects included a <span class="pop-yellow">social media app</span>, <span class="pop-yellow">weather dashboard</span>, command-line applications and a film comparison app.
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
        "Complete coding projects across a range of technical domains, producing high-quality datasets designed to support the training of <span class=\"pop-yellow\">frontier AI systems</span>.",
        "Apply problem-solving and programming skills to deliver <span class=\"pop-yellow\">efficient, well-documented solutions</span> aligned with project specifications.",
        "Ensure accuracy, consistency, and clarity of code outputs to contribute to <span class=\"pop-yellow\">robust, real-world AI training data</span>."
      ]
    },
    {
      role: "eLearning Developer",
      company:  "PwC",
      duration: "August 2023 - March 2025",
      location: "WC2N 6RH, London",
      bullets: [
        "Leverage <span class=\"skill-yellow\">Articulate Storyline</span> and <span class=\"skill-yellow\">Creative Suite</span> to design and author eLearning materials. Produce <span class=\"pop-yellow\">multimedia assets</span>, implement <span class=\"pop-yellow\">custom functionality with JavaScript</span> to maximize engagement and interactivity in our learning experiences. ",
        "<span class=\"pop-yellow\">Automated 20+ workflows</span> with Google App Scripts, Power Automate, Alteryx and Azure Functions. Work with user data and backend technologies - Azure, Dataverse, Microsoft ecosystem.",
        "Integrate <span class=\"pop-yellow\">AI, automation, and tech solutions</span> in our workflows - improving quality-of-work and reducing administrative and managerial burden - increasing the time we get to spend on the creative stuff! "
      ]
    },
    {
      role: "Localisation Tester",
      company:  "Testronic",
      duration: "2020 - 2023",
      location: "CR0 1PE, London",
      bullets: [
        "Conducted <span class=\"pop-yellow\">final-stage quality assurance for AAA game titles</span>, ensuring release-ready products free from bugs, UX/UI issues, and language inconsistencies.",
        "Collaborated with international teams to expedite bug resolution and cross-referenced <span class=\"pop-yellow\">Japanese and English scripts</span> to maintain language accuracy.",
        "Used Excel and JIRA to <span class=\"pop-yellow\">streamline issue tracking</span>.",
      ]
    },
    {
      role: "Project Moderator",
      company:  "TransPerfect",
      duration: "2022 - 2023",
      location: "EC3N 1AH, London",
      bullets: [
        "Facilitated <span class=\"pop-yellow\">structured data collection sessions</span> for a range of AI and assistant products - to better recognize individual speech patterns.",
        "Delivered clear, actionable instructions, ensuring <span class=\"pop-yellow\">high-quality data output</span> aligned with client standards.",
      ],
    },
    {
      role: "Inbound Contact Executive",
      company:  "CPM UK",
      duration: "2022",
      location: "OX9 3PG, Thame",
      bullets: [
        "Delivered <span class=\"pop-yellow\">technical support</span> to Diageo customers.",
        "Managed high call volumes (<span class=\"pop-yellow\">200+ daily</span>) - logging cases in Salesforce - coordinating with UK-wide engineering teams to resolve urgent issues.",
        "Guided clients through troubleshooting and supply chain solutions to ensure <span class=\"pop-yellow\">operational continuity</span>.",

      ]
    },

    {
      role: "Assistant Language Teacher",
      company:  "JET Programme",
      duration: "2015 - 2018",
      location: "Tachikawa International, Tokyo",
      bullets: [
        "Prepared learning materials, supervised school excursions, and organized cultural events.",
        "Originated <span class=\"pop-yellow\">mathematics and science curriculum</span> for international students.",
        "Elected as <span class=\"pop-yellow\">Head Teacher of English Club</span> and as Cultural Exchange Ambassador."
      ]
    },
    {
      role: "Film Production Instructor",
      company:  "Digital Media Academy",
      duration: "2011",
      location: "Stanford University, California",
      bullets: [
        "Aided students in using <span class=\"pop-yellow\">professional cameras and editing software</span>.",
        "Hired by programme director by demonstrating <span class=\"pop-yellow\">outstanding achievements in short-film production</span>.",
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
    margin-top: -132px !important;
  }
}

.section-header {
  font-size: 0.72rem;
  letter-spacing: 0.5px;
  color: #A57663 !important;
}
</style>

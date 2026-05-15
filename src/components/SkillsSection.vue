<template>
  <q-card flat square>
    <q-card-section>

            <div class="row skill-summary-row">
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><SemanticStream :chunks="skill1Chunks" :start="s1" @complete="s2 = true; s7 = true" /></li>
                        <li><SemanticStream :chunks="skill2Chunks" :start="s2" @complete="s3 = true" /></li>
                        <li><SemanticStream :chunks="skill3Chunks" :start="s3" /></li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><SemanticStream :chunks="skill7Chunks" :start="s7" @complete="s8 = true; s4 = true" /></li>
                        <li><SemanticStream :chunks="skill8Chunks" :start="s8" @complete="s9 = true" /></li>
                        <li><SemanticStream :chunks="skill9Chunks" :start="s9" /></li>
                    </ul>
                </div>

                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><SemanticStream :chunks="skill4Chunks" :start="s4" @complete="s5 = true" /></li>
                        <li><SemanticStream :chunks="skill5Chunks" :start="s5" @complete="s6 = true" /></li>
                        <li><SemanticStream :chunks="skill6Chunks" :start="s6" /></li>
                    </ul>
                </div>


            </div>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';
import SemanticStream from 'src/components/SemanticStream.vue';

const s1 = ref(true);
const s2 = ref(false);
const s3 = ref(false);
const s4 = ref(false);
const s5 = ref(false);
const s6 = ref(false);
const s7 = ref(false);
const s8 = ref(false);
const s9 = ref(false);

const skill1Chunks = [
  { stable: '<span class="text-weight-bolder text-size-larger">JavaScript</span> ecosystem', candidates: ['frontend development', 'JavaScript systems', 'JavaScript tooling'], duration: 800 },
  { stable: ' — TypeScript,', candidates: [' — typed code,', ' — type systems,'], duration: 600 },
  { stable: ' <span class="text-weight-bolder text-size-larger">Vue</span>.js 3,', candidates: [' UI frameworks,', ' Vue development,'], duration: 700 },
  { stable: ' Node.js', candidates: [' backend runtime', ' backend JS'], duration: 600 }
];

const skill2Chunks = [
  { stable: 'Alteryx Designer, ', candidates: ['data tools, ', 'workflow tools, ', 'Alteryx, '], duration: 750 },
  { stable: 'SQL, ', candidates: ['databases, ', 'relational DBs, '], duration: 600 },
  { stable: 'Google Apps Script', candidates: ['integrations', 'Google APIs'], duration: 700 }
];

const skill3Chunks = [
  { stable: 'Microsoft <span class="text-weight-bolder text-size-larger">Power</span> — ', candidates: ['enterprise tools — ', 'Microsoft tools — ', 'Microsoft Platform — '], duration: 850 },
  { stable: 'BI, Automate, Query;', candidates: ['dashboards, workflows;', 'BI, workflows;'], duration: 800 },
  { stable: ' Excel VBA, C#', candidates: [' legacy code', ' VBA and C#'], duration: 700 }
];

const skill4Chunks = [
  { stable: '<span class="text-weight-bolder text-size-larger">Japanese</span> (Fluent),', candidates: ['foreign languages,', 'Japanese language,'], duration: 900 },
  { stable: ' Portuguese', candidates: ['Norwegian', ' Portuguese (Basic)'], duration: 600 }
];

const skill5Chunks = [
  { stable: 'Illustration', candidates: ['visual arts', 'drawing'], duration: 800 }
];

const skill6Chunks = [
  { stable: 'Rock Climbing', candidates: ['outdoor sports', 'climbing'], duration: 800 }
];

const skill7Chunks = [
  { stable: '<span class="text-weight-bolder text-size-larger">Adobe</span> — ', candidates: ['creative software — ', 'Creative Cloud — '], duration: 700 },
  { stable: 'After Effects, Illustrator, ', candidates: ['video and vector, ', 'motion and vector, '], duration: 800 },
  { stable: 'Photoshop, Premiere', candidates: ['photo and video editing', 'Photoshop, video editing'], duration: 700 }
];

const skill8Chunks = [
  { stable: 'Articulate<span class="text-weight-bolder text-size-larger"> Storyline</span> 360, ', candidates: ['e-learning tools, ', 'Articulate tools, '], duration: 900 },
  { stable: 'Instructional Design', candidates: ['learning architecture', 'course design'], duration: 700 }
];

const skill9Chunks = [
  { stable: 'Blender, ', candidates: ['3D software, ', '3D modeling, '], duration: 650 },
  { stable: 'Unity', candidates: ['interactive engines', 'game engines'], duration: 600 }
];
</script>

<style scoped>


    .row {
        align-items: center;
        justify-content: center;
    }

    ul {
        list-style: none;

        padding-left: 0;
        font-size: medium;
    }

    ul li {
        padding: 0.4rem;
        line-height: 1.4;
    }

    .skill-column {
        display: flex;
        flex-direction: column;

    }


    @media (max-width: 900px) {
        .skill-column:not(:last-child) {
            margin-bottom: 1.5rem;
        }

        .skill-column {
            line-height: 1.2;
        }
    }

    @media (max-width: 400px) {
        .skill-column ul {
            font-size: 0.9rem;
            margin-bottom: -1.8rem;
        }

        .skill-column:last-child {
            margin-bottom: 3rem;
        }

        .skill-column h1 {
            font-size: 1rem;
            color: #3b4553;
        }

    }

</style>

<template>
  <q-card flat square>
    <q-card-section>

            <div class="row skill-summary-row">
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">JavaScript</span> ecosystem — TypeScript, <span class="text-weight-bolder text-size-larger">Vue</span>.js 3, Node.js</li>
                        <li>Alteryx Designer, SQL, Google Apps Script</li>
                        <li>Microsoft <span class="text-weight-bolder text-size-larger">Power</span> — BI, Automate, Query; Excel VBA, C#</li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">Japanese</span> (Fluent), Portuguese</li>
                        <li>Illustration</li>
                        <li>Rock Climbing</li>
                    </ul>
                </div>

                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">Adobe</span> — After Effects, Illustrator, Photoshop, Premiere</li>
                        <li>Articulate<span class="text-weight-bolder text-size-larger"> Storyline</span> 360, Instructional Design</li>
                        <li>Blender, Unity</li>
                    </ul>
                </div>


            </div>

    </q-card-section>
  </q-card>
</template>

<script setup>

</script>

<style scoped>


    .row {
        align-items: center;
        justify-content: center;
    }

    ul {
        list-style: none;
        align-items: center;
        justify-content: center;
        text-align: center;
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
        align-items: center;
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

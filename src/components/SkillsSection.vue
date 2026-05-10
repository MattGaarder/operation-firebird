<template>
  <q-card flat square>
    <q-card-section>

            <div class="row skill-summary-row">
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">JavaScript</span>, Vue, CSS </li>
                        <li>C#, Power Platform, <span class="text-weight-bolder text-size-larger">Excel (VBA)</span></li>
                        <li>Alteryx, Power BI</li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">Japanese</span> Speaker</li>
                        <li>Illustrator</li>
                        <li>Climber</li>
                    </ul>
                </div>

                <div class="col-12 col-md-4 col-lg-4 skill-column">
                    <ul>
                        <li><span class="text-weight-bolder text-size-larger">Photoshop</span>, Illustrator</li>
                        <li>Premiere, <span class="text-weight-bolder text-size-larger">AfterEffects</span></li>
                        <li>Articulate <span class="text-weight-bolder text-size-larger">Storyline</span>, Blender</li>
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
            line-height: 0.8rem;

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

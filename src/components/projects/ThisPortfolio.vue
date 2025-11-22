<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="person_outline" class="project-icon" />
        <div class="project-info">
          <div class="project-title">THIS.PORTFOLIO</div>
        </div>
      </q-card-section>

      <!-- Tagline -->
      <div class="project-tagline">
        This portfolio is a Vue 3 + Quasar single-page app that layers a responsive layout, dynamic theming,
        and intelligent navigation together. It uses Quasar components (layout, header, drawer, buttons, lists)
        with Vue Router to detect context (e.g., illustrations page) and conditionally swap themes via CSS custom
        properties (<code>--site-bg</code>/<code>--site-text</code>). The “home” button is reactive: on the root path
        it triggers a CV download, elsewhere it navigates home. External vs internal links are managed so contacts
        (mailto/WhatsApp/maps) and links (GitHub, YouTube, LinkedIn) behave appropriately. Computed props drive UI
        state (<code>isIllustrations</code>, <code>isHome</code>), and layout sizing adapts to screen width. Overall:
        modern reactive UI, theme scoping, and graceful UX for a developer portfolio.
        <q-separator class="separator invisi" />
        <em>
          A Vue 3 + Quasar powered, theme-aware portfolio where routing, layout, and CSS variables work together to
          deliver a tailored experience—CV downloads on home, illustration gallery elsewhere, all wrapped in a
          responsive, accessible shell.
        </em>
      </div>

      <!-- Further Information -->
      <q-separator class="separator" />
      <q-card-section class="project-body">
        <h1 class="text-h5 text-weight-bold info">Further Information</h1>
        <q-separator class="separator-info" />
        <ul class="feature-list">
          <li>
            <strong>Framework:</strong> Built with Vue 3 and Quasar for reactive composition, layout scaffolding, and UI
            primitives.
          </li>
          <li>
            <strong>Routing &amp; State:</strong> <code>vue-router</code> drives conditional theming and navigation;
            computed route-derived flags (e.g., illustrations vs. default) control UI variants.
          </li>
          <li>
            <strong>Theming:</strong> CSS custom properties
            (<code>--site-bg</code>/<code>--site-text</code>) with scoped theme classes enable dynamic light/dark-style
            switches per page.
          </li>
          <li>
            <strong>Gallery:</strong> Masonry layout with <code>imagesLoaded</code> for a responsive, gap-aware
            illustration grid that recalculates on load/resize.
          </li>
          <li>
            <strong>Asset Handling:</strong> Lazy-loaded PNG/JPG illustrations exported from Photoshop/Illustrator,
            maintaining aspect ratios and centered presentation with flexbox.
          </li>
          <li>
            <strong>Link Management:</strong> Differentiates internal vs external links (GitHub, YouTube, mailto,
            WhatsApp) to avoid improper client-side routing and preserve UX.
          </li>
          <li>
            <strong>CV Logic:</strong> Context-aware header button that toggles between navigation and triggering a
            client-side download of the résumé.
          </li>
          <li>
            <strong>Responsive Layout:</strong> Adaptive paddings and drawer sizing via Quasar’s screen breakpoints;
            masonry and drawer gracefully fall back on smaller viewports.
          </li>
          <li>
            <strong>Accessibility &amp; Navigation:</strong> Semantic router-links, ARIA labels, and clear active-state
            indicators for discoverability and keyboard navigation.
          </li>
          <li>
            <strong>Styling:</strong> Deep CSS overrides, utility class conflict resolution, and hover/active
            interactions for “pop” feedback (e.g., illustration hover scale, drawer link highlighting).
          </li>
          <li>
            <strong>Performance:</strong> Image lazy loading, throttled layout recalculations, and minimal DOM churn to
            keep interactions smooth.
          </li>
          <li>
            <strong>Learned:</strong> Practical mastery of reactive computed properties, CSS variable theming
            precedence, interplay between framework utility classes and custom overrides, and integrating design assets
            into a live web experience.
          </li>
        </ul>
      </q-card-section>

      <!-- Demo GIF -->
      <q-separator class="separator" />
      <q-card-section class="project-demo">
        <q-img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif"
          alt="this.portfolio demo"
          class="project-gif"
          ratio="16/9"
          contain
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
// purely presentational
</script>

<style scoped>
.info {
  font-size: 0.9rem;
  color: black;
  margin-top: -1rem;
  padding: 0;
}

/* main wrapper + card layout */
.projects-wrapper {
  display: flex;
  flex-direction: column;
  background-color: rgb(253, 253, 253);
}

.project-card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: white;
  margin: 0.6rem;
  padding: 0.8rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  border-color: rgb(207, 207, 207);
}

/* header band */
.project-header {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  background: var(--q-color-grey-1);
  margin-top: 0.7rem;
}

.project-icon {
  height: auto;
  border-radius: 4px;
  color: #2b6caf;
  font-size: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.4rem;
}

.project-info {
  flex: 1 1 auto;
  min-width: 0;
}

.project-title {
  font-size: 1.55rem;
  font-weight: 600;
  margin-top: auto;
  margin-left: 0.3rem;
}

/* tagline block */
.project-tagline {
  padding: 1.5rem;
  padding-left: 1.2rem;
  padding-top: 0.7rem;
  font-size: 0.95rem;
  line-height: 1.4;
}

/* invisible spacer separator between tagline and <em> */
.invisi {
  opacity: 0;
  margin-top: 0.5rem;
}

/* feature list section */
.q-card__section--vert {
  padding: 8px;
}

.project-body {
  padding: 1rem;
  padding-top: 1.8rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1.5rem;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* separators (full-width effect inside padded card) */
.separator {
  margin-left: -0.8rem;
  margin-right: -0.8rem;
}

.separator-info {
  margin-left: -1.8rem;
  margin-right: -1.8rem;
  margin-top: 0.5rem;
}

/* demo GIF block */
.project-demo {
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>
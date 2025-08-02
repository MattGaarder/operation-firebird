<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <div class="project-title">this.portfolio</div>
        <div class="project-info">

          <div class="project-tagline">
            This portfolio is a Vue 3 + Quasar single-page app that layers a responsive layout, dynamic theming, and intelligent navigation together. It uses Quasar components (layout, header, drawer, buttons, lists) with Vue Router to detect context (e.g., illustrations page) and conditionally swap themes via CSS custom properties (--site-bg/--site-text). The “home” button is reactive: on the root path it triggers a CV download, elsewhere it navigates home. External vs internal links are managed so contacts (mailto/WhatsApp/maps) and links (GitHub, YouTube, LinkedIn) behave appropriately. Computed props drive UI state (isIllustrations, isHome), and layout sizing adapts to screen width. Overall: modern reactive UI, theme scoping, and graceful UX for a developer portfolio.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-body">
        <ul class="feature-list">
        <li><strong>Framework:</strong> Built with Vue 3 and Quasar for reactive composition, layout scaffolding, and UI primitives.</li>
        <li><strong>Routing & State:</strong> vue-router drives conditional theming and navigation; computed route-derived flags (e.g., illustrations vs. default) control UI variants.</li>
        <li><strong>Theming:</strong> CSS custom properties (e.g., <code>--site-bg</code>/<code>--site-text</code>) with scoped theme classes enable dynamic light/dark-style switches per page.</li>
        <li><strong>Gallery:</strong> Masonry-layout with imagesLoaded for a responsive, gap-aware illustration grid that recalculates on load/resize.</li>
        <li><strong>Asset Handling:</strong> Lazy-loaded PNG/JPG illustrations exported from Photoshop/Illustrator, maintaining aspect ratios and centered presentation with flexbox.</li>
        <li><strong>Link Management:</strong> Differentiates internal vs external links (GitHub, YouTube, mailto, WhatsApp) to avoid improper client-side routing and preserve UX.</li>
        <li><strong>CV Logic:</strong> Context-aware header button that toggles between navigation and triggering a client-side download of the résumé.</li>
        <li><strong>Responsive Layout:</strong> Adaptive paddings and drawer sizing via Quasar’s screen breakpoints; masonry and drawer gracefully fall back on smaller viewports.</li>
        <li><strong>Accessibility & Navigation:</strong> Semantic router-links, aria labels, and clear active-state indicators for discoverability and keyboard navigation.</li>
        <li><strong>Styling:</strong> Deep CSS overrides, utility class conflict resolution, and hover/active interactions for “pop” feedback (e.g., illustration hover scale, drawer link highlighting).</li>
        <li><strong>Performance:</strong> Image lazy loading, throttled layout recalculations, and minimal DOM churn to keep interactions smooth.</li>
        <li><strong>Learned:</strong> Practical mastery of reactive computed properties, CSS variable theming precedence, interplay between framework utility classes and custom overrides, and integrating design assets into a live web experience.</li>
        </ul>
      </q-card-section>

      <q-separator />

      <q-card-section class="project-demo">
        <q-img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWY3NTcxZTc1ODg5ZDg4NGFkNTdhMzhiZTM3YjAxNTJkMjU2YTFkMSZjdD1n/DoHFVICa66Y0ZSNZqv/giphy.gif"
          alt="Team Builder Demo"
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
.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* if you want some padding inside your draggable window */
  padding: 1rem;
}

/* each card will try to be at least 300px wide,
   but grow to fill available space */
.project-card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
  background: white;
}

/* header: icon + info, wrapping when too narrow */
.project-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  gap: 0.75rem;
  background: var(--q-color-grey-1);
  padding: 1rem;
}

.project-icon {
  flex: 0 0 174px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.readme-icon {
  color: var(--q-color-blue-6);
}

.project-info {
  flex: 1 1 auto;
  min-width: 0; /* allow text to wrap */
}

.project-title {
  font-size: 1.7rem;
  font-weight: 600;
  margin-left: auto;
  margin-top: auto;
}

.project-tagline {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: var(--q-color-grey-7);
  line-height: 1.4;
}

/* feature list section */
.project-body {
  padding: 0.75rem 1rem;
  background: var(--q-color-grey-2);
  flex-grow: 1;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* demo GIF */
.project-demo {
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}


</style>
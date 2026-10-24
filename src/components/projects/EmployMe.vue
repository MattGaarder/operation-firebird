<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="work" class="project-icon code-journal-icon" />
        <div class="project-info">
          <div class="project-title">employ-me</div>
        </div>
      </q-card-section>

      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline">
        An end-to-end, AI-assisted job search pipeline that finds relevant LinkedIn roles, scores each one against my
        career profile, writes a tailored cover letter (also saved as a <code>.docx</code>), tracks everything in
        SQLite and Notion, and then uses an autonomous browser agent to fill in the application form.
        <q-separator class="invisi" />
        <code>LinkedIn ──► Scraper API ──► Seniority filter ──► Gemini evaluator ──► SQLite ⇄ Notion</code>
        <br />
        <code>Cover letter .docx ──► Browser Use agent ──► Application form</code>
        <q-separator class="separator invisi" />
        <em>
          "Everything in app/ and the orchestration in browser-use/main.py and browser-use/diagnostics.py is my own work,
          built on top of two open-source projects."
        </em>
      </div>

      <!-- Code Snippets (expandable with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info">Code Snippets</h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel
              v-model="codeSlide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              arrows
              navigation
              navigation-position="top"
              height="auto"
              width="100%"
              class="rounded-borders"
            >
              <q-carousel-slide :name="1" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>1. Upgrade-proof Ctrl+C / SIGTERM cancellation</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 3</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="signalSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <q-carousel-slide :name="2" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Gemini evaluator: structured output + runtime validation</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 3</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="evaluatorSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <q-carousel-slide :name="3" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Atomic job claiming and idempotent import</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 3</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="claimSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <!-- More Information (expandable with carousel) -->
      <q-separator class="separator" />
      <q-expansion-item dense class="full-width-expansion">
        <template #header>
          <div class="row items-center full-width">
            <h1 class="text-h5 text-weight-bold info">More Information</h1>
          </div>
        </template>

        <q-separator />

        <q-card-section class="q-pa-none">
          <div class="carousel-wrapper">
            <q-carousel
              v-model="infoSlide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              arrows
              navigation
              navigation-position="bottom"
              height="auto"
              width="100%"
              class="rounded-borders"
            >
              <!-- Slide 1: Built on top of + Job import + Evaluator -->
              <q-carousel-slide :name="1" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>1. Foundations, Import Pipeline &amp; AI Evaluator</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Built on Linkedin-Jobs-Api:</strong>
                        Extends <code>atharv01h/Linkedin-Jobs-Api</code> (Express + Puppeteer). Rewrote much of
                        <code>scraper.service.ts</code> to extract full descriptions, post dates and external application
                        URLs, added an authenticated Chrome-profile fallback that decodes LinkedIn's
                        <code>safety/go</code> redirect links, plus request pacing and rate-limit detection.
                      </li>
                      <li>
                        <strong>Built on browser-use:</strong>
                        Embedded the <code>browser-use</code> LLM browser agent in a run lifecycle reported to my own
                        API, with custom Ctrl+C / SIGTERM cancellation hooks, retry/backoff tuning, a local LLM
                        fallback, and a full diagnostics layer.
                      </li>
                      <li>
                        <strong>Job Import Pipeline:</strong>
                        Boolean LinkedIn queries in <code>config/job-searches.ts</code>, each with its own location and
                        date window. A regex filters out senior, lead, principal and manager roles.
                      </li>
                      <li>
                        <strong>Dedupe Before Spend:</strong>
                        A <code>UNIQUE(source, source_job_id)</code> check runs before fetching details or calling the
                        AI. Failures are handled per job, so one bad listing never stops a batch; each run is recorded
                        in an <code>import_runs</code> table.
                      </li>
                      <li>
                        <strong>Gemini Evaluator:</strong>
                        Uses <code>@google/genai</code> with a <code>responseSchema</code> to return
                        <code>fitScore</code> (0–100), <code>fitExplanation</code> and <code>coverLetter</code>. The
                        prompt is grounded in a written career profile and a style guide of real past letters, with
                        strict guardrails: never invent experience, qualifications, employers or technologies.
                      </li>
                      <li>
                        <strong>Validated Output:</strong>
                        Responses are checked at runtime (integer range, field types) before anything is saved. A local
                        Ollama (<code>qwen3.5</code>) path is kept for offline or zero-cost evaluation.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: Cover letters + Sync + Agent -->
              <q-carousel-slide :name="2" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Cover Letters, Notion Sync &amp; the Application Agent</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Cover Letter Generator:</strong>
                        Turns the AI-written letter into a formatted Word document with the <code>docx</code> library
                        (Arial 11pt, 1.15 line spacing) and builds filesystem-safe names
                        (<code>GAARDER-&lt;Company&gt;-COVER.docx</code>) that the browser agent later finds and uploads.
                      </li>
                      <li>
                        <strong>SQLite ⇄ Notion Two-Way Sync:</strong>
                        SQLite (<code>better-sqlite3</code>) is the source of truth; Notion is the front end where I
                        review jobs and manage the queue. <code>sync:notion</code> picks up statuses set by hand, and
                        <code>sync:notion:reverse</code> pushes pipeline statuses back.
                      </li>
                      <li>
                        <strong>Sync Safeguards:</strong>
                        Rows match on LinkedIn source job ID, statuses are checked against a typed
                        <code>ApplicationStatus</code> list, the reverse sync never overwrites hand-set Notion statuses,
                        and long descriptions are chunked to fit Notion's 2,000-character block limit.
                      </li>
                      <li>
                        <strong>Autonomous Application Agent:</strong>
                        <code>npm run apply</code> starts a Browser Use agent that claims the oldest
                        <code>QUEUED</code> job in a single SQLite transaction, reports step-by-step progress to the
                        Express API, fills the form from structured candidate data, uploads the CV and matching cover
                        letter, and syncs the final status back to Notion.
                      </li>
                      <li>
                        <strong>Strict Form Rules:</strong>
                        Dropdowns, radios and yes/no questions are only answered when the candidate data supports it
                        explicitly.
                      </li>
                      <li>
                        <strong>Resilience:</strong>
                        Gemini retries with exponential backoff and jitter (12 attempts) to ride out
                        <code>503 UNAVAILABLE</code> spikes, a fallback model, and a 15-minute LLM timeout for long
                        multi-step reasoning.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 3: Cancellation + Diagnostics + Architecture -->
              <q-carousel-slide :name="3" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Cancellation, Diagnostics &amp; Architecture</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>The Stuck-RUNNING Bug:</strong>
                        Browser Use's second Ctrl+C calls <code>os._exit(0)</code>, skipping <code>atexit</code> and
                        Python exception handlers, which left jobs stuck as <code>RUNNING</code> in both databases.
                      </li>
                      <li>
                        <strong>Upgrade-Proof Fix:</strong>
                        My first fix edited <code>custom_exit_callback</code> inside <code>.venv</code>; a library
                        upgrade silently overwrote it. The current fix subclasses browser-use's
                        <code>SignalHandler</code>, replaces it at module level, and chains my cleanup in front of its
                        own telemetry callback. An idempotency flag makes cancellation run exactly once.
                      </li>
                      <li>
                        <strong>Run Diagnostics:</strong>
                        <code>diagnostics.py</code> wraps the LLM's <code>ainvoke</code> to record latency, status and
                        token usage per step, separates LLM latency from browser latency, and captures each step's goal,
                        memory, evaluation, actions and cost estimates.
                      </li>
                      <li>
                        <strong>Run Artefacts:</strong>
                        Each run writes <code>run.log</code>, <code>history.json</code> and
                        <code>diagnostics.json</code>, including for failed or cancelled runs.
                      </li>
                      <li>
                        <strong>Architecture:</strong>
                        <code>app/</code> (TypeScript Express + SQLite: ai, application-runs, jobs, integrations,
                        services, db, config), <code>Linkedin-Jobs-Api/</code> (extended Puppeteer scraper) and
                        <code>browser-use/</code> (Python agent runner + diagnostics).
                      </li>
                      <li>
                        <strong>REST Contract:</strong>
                        <code>/jobs</code>, <code>/jobs/import</code>, <code>/application-runs/claim</code>,
                        <code>/:id/start</code>, <code>/:id/progress</code> and
                        <code>/:id/complete | fail | cancel</code>, backed by <code>jobs</code>,
                        <code>application_runs</code> and <code>import_runs</code> tables.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 4: Tech, Skills, Notes -->
              <q-carousel-slide :name="4" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>4. Technologies, Skills &amp; Notes</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 4 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Technologies:</strong>
                        TypeScript, Python, SQL; Node.js, Express, <code>better-sqlite3</code>; Google Gemini,
                        Ollama, Browser Use; Puppeteer (+ stealth), authenticated Chrome profiles, Chrome DevTools
                        Protocol; Notion API, <code>docx</code>.
                      </li>
                      <li>
                        <strong>System Design:</strong>
                        A multi-service pipeline (Node scraper, Node API, Python agent) linked by a REST contract and a
                        shared run-lifecycle state machine.
                      </li>
                      <li>
                        <strong>Applied LLM Engineering:</strong>
                        Grounding documents, anti-hallucination guardrails, schema-constrained JSON, runtime
                        validation, provider fallback, and retry/backoff.
                      </li>
                      <li>
                        <strong>Data Engineering:</strong>
                        Idempotent imports, natural-key deduplication, atomic queue claiming, schema migrations, and
                        two-way sync with conflict safeguards.
                      </li>
                      <li>
                        <strong>Debugging Library Internals:</strong>
                        Traced a silent regression through browser-use's signal handling (<code>os._exit</code>
                        skipping <code>atexit</code>, swallowed <code>**kwargs</code>) and replaced a fragile
                        <code>.venv</code> patch with a monkey-patch that survives upgrades.
                      </li>
                      <li>
                        <strong>Observability &amp; Scraping:</strong>
                        Structured logging, per-step timing, token and cost accounting; reverse-engineered LinkedIn
                        redirect URLs and rate-limit behaviour.
                      </li>
                      <li>
                        <strong>Disclaimer:</strong>
                        A personal project for automating my own job search. Automated scraping and form submission may
                        conflict with some websites' terms of service. Keep request rates low and review applications
                        before they are submitted.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-card-section>
      </q-expansion-item>

      <q-separator class="separator" />
      <div class="bumper"></div>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  containerWidth: {
    type: Number,
    default: 0
  }
});

const isNarrow = computed(() => props.containerWidth > 0 && props.containerWidth < 700);

const codeSlide = ref(1);
const infoSlide = ref(1);

const signalSnippet = `# browser-use/main.py
# Browser Use installs its own asyncio signal handler. The first Ctrl+C pauses
# the agent; the second calls os._exit(0), skipping atexit and Python exception
# handlers, which used to leave jobs stuck as RUNNING in both databases.
#
# Upgrade-proof fix: subclass SignalHandler and replace it at module level,
# chaining my cleanup in front of browser-use's own telemetry callback.

class _EmployMeSignalHandler(_OriginalSignalHandler):
    def __init__(self, *args, custom_exit_callback=None, **kwargs):
        def chained_exit_callback():
            try:
                _cancel_on_exit()   # mark run CANCELLED, sync Notion, save diagnostics
            finally:
                if custom_exit_callback:
                    custom_exit_callback()   # browser-use's own telemetry flush

        super().__init__(
            *args,
            custom_exit_callback=chained_exit_callback,
            **kwargs,
        )

_bu_utils.SignalHandler = _EmployMeSignalHandler

# An idempotency flag means cancellation runs exactly once, whether it is
# triggered by the signal handler, atexit, or a KeyboardInterrupt.`;

const evaluatorSnippet = `// app/src/ai/evaluator.ts (simplified)
// Gemini returns schema-constrained JSON, then it is validated at runtime
// before anything is saved to SQLite or Notion.

const response = await ai.models.generateContent({
  model: MODEL,
  contents: buildPrompt(job, careerProfile, coverLetterExamples),
  config: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        fitScore: { type: Type.INTEGER },        // 0-100
        fitExplanation: { type: Type.STRING },   // strengths and significant gaps
        coverLetter: { type: Type.STRING },
      },
      required: ['fitScore', 'fitExplanation', 'coverLetter'],
    },
  },
});

const result = JSON.parse(response.text);

if (!Number.isInteger(result.fitScore) || result.fitScore < 0 || result.fitScore > 100) {
  throw new Error('Evaluator returned an invalid fitScore');
}
if (typeof result.fitExplanation !== 'string' || typeof result.coverLetter !== 'string') {
  throw new Error('Evaluator returned malformed fields');
}`;

const claimSnippet = `// app/src/application-runs (simplified)
// Claim the oldest QUEUED job with an application URL in ONE transaction,
// so two runners can never grab the same job.

const claimNext = db.transaction(() => {
  const job = db.prepare(
    "SELECT * FROM jobs " +
    "WHERE application_status = 'QUEUED' AND application_url IS NOT NULL " +
    "ORDER BY id ASC LIMIT 1"
  ).get();

  if (!job) return null;

  db.prepare("UPDATE jobs SET application_status = 'RUNNING' WHERE id = ?").run(job.id);
  const run = db.prepare(
    "INSERT INTO application_runs (job_id, attempt, status) " +
    "VALUES (?, (SELECT COUNT(*) + 1 FROM application_runs WHERE job_id = ?), 'RUNNING')"
  ).run(job.id, job.id);

  return { runId: run.lastInsertRowid, job };
});

// Import side: skip duplicates BEFORE any expensive work.
// jobs has UNIQUE(source, source_job_id); the check runs before
// fetching details or calling the AI.`;
</script>

<style scoped>
/* Scoped adjustments for employ-me */
</style>

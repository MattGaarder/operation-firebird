<template>
  <div class="projects-wrapper">
    <q-card bordered class="project-card">
      <!-- Header -->
      <q-card-section class="project-header">
        <q-icon name="directions_boat" class="project-icon code-journal-icon" />
        <div class="project-info">
          <div class="project-title">Fortship (Lorena HTML)</div>
        </div>
      </q-card-section>

      <q-separator class="separator" />

      <!-- Tagline -->
      <div class="project-tagline">
        Take raw port schedules from an Excel spreadsheet, structure the data for mobile and desktop, and generate a clean, responsive HTML email.
        <q-separator class="invisi" />
        <code>Excel (Office Scripts) ──► ngrok tunnel ──► Express server ──► Responsive HTML + PDF/XLSX ──► Microsoft Graph</code>
        <q-separator class="separator invisi" />
        <em>
          "One click in Excel → a polished, responsive, branded email (plus PDF and XLSX attachments) lands in the right inboxes."
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
                  <span>1. Block &amp; Landmark Parsing in Excel Office Scripts</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 4</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="parserSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <q-carousel-slide :name="2" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Dual Responsive Email Generator (Desktop Table + Mobile Cards)</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 4</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="generatorSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <q-carousel-slide :name="3" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Single-Source Puppeteer PDF &amp; Template-Preserving ExcelJS</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 4</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="attachmentsSnippet"></code></pre>
                  </q-scroll-area>
                </q-card-section>
              </q-carousel-slide>

              <q-carousel-slide :name="4" class="column no-wrap q-pa-none">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>4. Microsoft Graph Dispatch &amp; Resilient Weather Pipeline</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 4 / 4</span>
                </div>
                <q-card-section class="project-code">
                  <q-scroll-area class="code-container">
                    <pre v-prism class="prism-block"><code class="language-js" :textContent="dispatchSnippet"></code></pre>
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
              <!-- Slide 1: The Problem & The Solution -->
              <q-carousel-slide :name="1" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>1. The Operational Problem &amp; The One-Click Solution</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 1 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>The Legacy Screenshot Workflow:</strong>
                        Port agency operations depend on recurring Excel workbooks (line-ups for Mucuripe, Pecém, Vila do Conde, Tank Pier, Recife, plus daily berthing and discharge reports). Previously, operators had to manually select cell ranges, take screenshots, paste blurry bitmaps into email drafts, and re-enter recipient lists several times a day.
                      </li>
                      <li>
                        <strong>Critical Pain Points:</strong>
                        Screenshots produce flat unselectable images unreadable by screen readers, pixelated on Retina screens, illegible in dark-mode mail clients, and require cumbersome horizontal pinch-to-zoom on mobile devices.
                      </li>
                      <li>
                        <strong>The One-Click Pipeline:</strong>
                        Lorena HTML turns shipping spreadsheets into professional, responsive HTML emails with automated PDF and formatted Excel attachments in a single action directly inside Excel Online.
                      </li>
                      <li>
                        <strong>Empowering Non-Technical Operators:</strong>
                        Recipients are managed dynamically directly within the Excel <code>HOME</code> sheet (cells <code>F2:F4</code> for To/CC/BCC). Distribution lists can be updated immediately without modifying server configs or code.
                      </li>
                      <li>
                        <strong>Rich Contextual Enrichment:</strong>
                        Line-up emails are automatically enriched with live OpenWeather forecasts (day/night conditions, wind speed, gusts, humidity, pressure, sunrise/sunset) and aerial port overview photography.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 2: Pipeline Architecture & Report Types -->
              <q-carousel-slide :name="2" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>2. Pipeline Architecture &amp; Report Processing</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 2 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Cloud-Executed Office Scripts:</strong>
                        An Excel Office Script (TypeScript) running in Microsoft's cloud reads the active worksheet using <code>range.getTexts()</code>, preserving exact user-formatted timestamps, AM/PM values, and numeric precision before POSTing JSON to an ngrok tunnel.
                      </li>
                      <li>
                        <strong>Timing-Safe Security &amp; CORS:</strong>
                        The Express backend verifies requests using <code>crypto.timingSafeEqual</code> against a shared API key, applies tightly scoped CORS rules to the machine webhook, and enforces 1 MB payload limits.
                      </li>
                      <li>
                        <strong>Line-Up Reports:</strong>
                        Parses 9-column berth blocks (Vessel, ETA, ETB, ETC, ETD, Cargo, Quantity, Load/Disch, Remarks) across dynamic berths, evaluates stacked data, and attaches a custom-formatted XLSX workbook.
                      </li>
                      <li>
                        <strong>Berth &amp; Sail Reports:</strong>
                        Parses used ranges into structured <code>label / valueB / valueC</code> operational rows for instantaneous harbour movement updates.
                      </li>
                      <li>
                        <strong>Landmark-Based Daily Reports:</strong>
                        Uses dynamic landmark search (locating <code>Hold</code>s, summary headers, shift metrics, and <code>ETC/S</code> cells) rather than rigid coordinates, tolerating structural worksheet layout shifts.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 3: Responsive Email Design & Attachments -->
              <q-carousel-slide :name="3" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>3. Responsive Email Design, PDF &amp; XLSX Generation</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 3 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Dual-Mode Responsive HTML:</strong>
                        Embeds both a comprehensive zebra-striped desktop table and compact mobile cards in a single email. Below 600px, <code>@media</code> queries hide the wide tables and surface stacked label/value vessel cards requiring zero horizontal panning.
                      </li>
                      <li>
                        <strong>Inline CID Image Embedding:</strong>
                        Corporate logos, port imagery, and weather icons are embedded as inline MIME attachments (Content-ID <code>cid:</code>), bypassing mail client external image blocking without third-party asset hosting.
                      </li>
                      <li>
                        <strong>Single-Source Puppeteer PDF:</strong>
                        Puppeteer renders the exact same email HTML to an A4 PDF at 2× device scale, swapping CIDs for base64 data URIs, enforcing desktop tables, and applying <code>break-inside: avoid</code> page-break rules.
                      </li>
                      <li>
                        <strong>Template-Preserving ExcelJS Generation:</strong>
                        For line-ups, ExcelJS loads a corporate workbook template (<code>lineup-format.xlsx</code>), isolates the relevant port sheet, injects evaluated values into formula cells, and clones formatting row-by-row.
                      </li>
                    </ul>
                  </div>
                </q-card-section>
              </q-carousel-slide>

              <!-- Slide 4: Cloud Integration, Security & Resilience -->
              <q-carousel-slide :name="4" class="column no-wrap">
                <div class="text-subtitle2 q-px-md q-pt-sm text-weight-bold row items-center justify-between" style="color: var(--site-text);">
                  <span>4. Cloud Integration, Security &amp; Developer Experience</span>
                  <span class="text-caption text-weight-regular" style="color: var(--caption-text);">Slide 4 / 4</span>
                </div>
                <q-card-section class="project-body" :class="{ 'stacked-layout': isNarrow }">
                  <div class="project-body-left">
                    <ul class="feature-list">
                      <li>
                        <strong>Microsoft Graph &amp; MSAL Integration:</strong>
                        Automates OAuth token caching via <code>@azure/msal-node</code>, creates email drafts with dual attachments (PDF + XLSX), and dispatches directly through Microsoft 365 (with Gmail API fallback support).
                      </li>
                      <li>
                        <strong>Resilient Weather Forecasting:</strong>
                        Queries OpenWeather with <code>AbortSignal.timeout</code>, exponential backoff (3 attempts, 1s × 1.5), and automatic circuit breaking on unrecoverable 400/401 HTTP errors.
                      </li>
                      <li>
                        <strong>Clean Lifecycle &amp; Temp Hygiene:</strong>
                        Generated PDFs and workbooks receive cryptographically random suffixes to eliminate collision hazards, with guaranteed deletion in a <code>finally</code> block on both success and failure.
                      </li>
                      <li>
                        <strong>Rapid Iteration &amp; Mock Fixtures:</strong>
                        Features hot route previews (<code>/preview</code>, <code>/preview/daily-report</code>) that bust Node's <code>require.cache</code> on reload, enabling rapid template styling without server restarts.
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

const parserSnippet = `// office-script.js (Excel Office Scripts in TypeScript)
// range.getTexts() retrieves formatted display strings (e.g. "14/10 18:00")
// rather than raw serial numbers, preserving operator formatting.

function processLineUp(sheet: ExcelScript.Worksheet): LineUpReport {
  const usedRange = sheet.getUsedRange();
  const texts = usedRange.getTexts();
  const berths: BerthBlock[] = [];

  // Each berth occupies 9 columns across row 3 (berth name) and row 4 (headers)
  for (let col = 0; col < texts[2].length; col += 9) {
    const berthName = texts[2][col]?.trim();
    const headerCheck = texts[3][col]?.trim();
    if (!berthName || headerCheck !== "Vessels Names") continue;

    const vessels: VesselRow[] = [];
    for (let r = 4; r < texts.length; r++) {
      const vesselName = texts[r][col]?.trim();
      if (!vesselName) break;
      vessels.push({
        vessel: vesselName,
        eta: texts[r][col + 1],
        etb: texts[r][col + 2],
        etc: texts[r][col + 3],
        etd: texts[r][col + 4],
        cargo: texts[r][col + 5],
        quantity: texts[r][col + 6],
        operation: texts[r][col + 7],
        remarks: texts[r][col + 8]
      });
    }
    berths.push({ name: berthName, vessels });
  }

  // Recipients extracted directly from the "HOME" sheet
  const homeTexts = sheet.getWorkbook().getWorksheet("HOME").getRange("F2:F4").getTexts();
  return {
    reportType: "line-up",
    sheetName: sheet.getName(),
    to: splitAddresses(homeTexts[0][0]),
    cc: splitAddresses(homeTexts[1][0]),
    bcc: splitAddresses(homeTexts[2][0]),
    berths
  };
}`;

const generatorSnippet = `// generator-line-up.js (HTML email generation)
// Builds responsive email HTML with table layout for desktop
// and stacked card layout toggled via CSS media queries.

export function renderLineUpHtml(report, weather, portConfig) {
  return \`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        .desktop-report { display: table !important; width: 100%; border-collapse: collapse; }
        .mobile-report { display: none !important; }

        @media only screen and (max-width: 600px) {
          .desktop-report { display: none !important; }
          .mobile-report { display: block !important; }
          .vessel-card {
            background: #ffffff;
            border-left: 4px solid #16375E;
            margin-bottom: 12px;
            padding: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .card-row { display: flex; justify-content: space-between; padding: 3px 0; }
          .card-label { font-weight: bold; color: #555555; }
        }
      </style>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f4f6f8;">
      <!-- Branded Header with CID inline image -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td><img src="cid:fortship-logo" alt="Fortship" height="40" /></td>
          <td align="right" style="color: #666; font-size: 13px;">\${report.timestamp}</td>
        </tr>
      </table>

      <!-- Desktop Berth Tables -->
      <div class="desktop-report">
        \${renderDesktopBerths(report.berths)}
      </div>

      <!-- Mobile Stacked Vessel Cards (No horizontal pinch-zoom) -->
      <div class="mobile-report">
        \${renderMobileCards(report.berths)}
      </div>
    </body>
    </html>
  \`;
}`;

const attachmentsSnippet = `// pdf-generator.js & workbook-generator.js
// 1. Puppeteer renders the exact email HTML into an A4 print PDF
export async function generatePdf(htmlContent, inlineImages) {
  // Convert CID references into inline base64 data URIs for headless print
  let printHtml = htmlContent;
  for (const img of inlineImages) {
    const dataUri = \`data:\${img.mimeType};base64,\${img.contentBytes}\`;
    printHtml = printHtml.replaceAll(\`cid:\${img.contentId}\`, dataUri);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(printHtml, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '12mm', bottom: '15mm', left: '12mm' }
  });
  await browser.close();
  return pdfBuffer;
}

// 2. ExcelJS fills corporate template while cloning styles dynamically
export async function generateStackedWorkbook(stackedData, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('templates/lineup-format.xlsx');
  const sheet = workbook.getWorksheet(sheetName);

  stackedData.rows.forEach((row, idx) => {
    const excelRow = sheet.getRow(idx + 5);
    excelRow.values = row;
    // Replace dynamic formulas with static calculated values
    excelRow.commit();
  });
  return await workbook.xlsx.writeBuffer();
}`;

const dispatchSnippet = `// mailer.js & graph.js (Microsoft Graph API draft and dispatch)
import { Client } from '@microsoft/microsoft-graph-client';
import { getAccessToken } from './auth.js';

export async function sendReportEmail({ to, cc, bcc, subject, htmlBody, attachments }) {
  const token = await getAccessToken();
  const client = Client.init({
    authProvider: (done) => done(null, token)
  });

  // Construct draft message with inline CID assets and PDF/XLSX attachments
  const draftMessage = {
    subject,
    body: { contentType: 'HTML', content: htmlBody },
    toRecipients: to.map(email => ({ emailAddress: { address: email } })),
    ccRecipients: cc.map(email => ({ emailAddress: { address: email } })),
    attachments: attachments.map(att => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: att.filename,
      contentType: att.contentType,
      contentBytes: att.contentBase64,
      isInline: att.isInline || false,
      contentId: att.contentId || undefined
    }))
  };

  const draft = await client.api('/me/messages').post(draftMessage);
  
  if (process.env.MICROSOFT_ALLOW_SEND === 'true') {
    await client.api(\`/me/messages/\${draft.id}/send\`).post({});
    return { success: true, draftId: draft.id, sent: true };
  }
  return { success: true, draftId: draft.id, sent: false };
}`;
</script>

<style scoped>
/* Scoped adjustments for Fortship */
</style>

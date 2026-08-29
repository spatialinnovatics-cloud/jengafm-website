<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Sitemap | Jenga Facilities Management</title>
<style>
  :root {
    --color-bg: #F5F7FA;
    --color-surface: #FFFFFF;
    --color-surface-alt: #ECF1F9;
    --color-ink: #131A29;
    --color-ink-soft: #4E5B70;
    --color-ink-faint: #93A0B2;
    --color-navy: #163B87;
    --color-navy-dark: #0A1B42;
    --color-amber: #2F6FED;
    --color-amber-dark: #1A4FCB;
    --color-border: #DFE6F1;
    --radius-md: 14px;
    --radius-lg: 22px;
    --shadow-sm: 0 2px 8px rgba(19, 26, 41, 0.06);
    --shadow-md: 0 8px 24px rgba(19, 26, 41, 0.10);
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif;
    background: var(--color-bg);
    color: var(--color-ink);
    line-height: 1.6;
  }
  header {
    background: linear-gradient(160deg, var(--color-navy) 0%, var(--color-navy-dark) 100%);
    color: #fff;
    padding: 48px 24px;
  }
  .wrap { max-width: 900px; margin: 0 auto; padding: 0 24px; }
  header .wrap { padding: 0; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.75); margin-bottom: 14px;
  }
  .eyebrow::before { content: ""; width: 22px; height: 2px; background: rgba(255,255,255,0.6); display: inline-block; }
  h1 { margin: 0 0 8px; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; letter-spacing: -0.01em; }
  header p { margin: 0; color: rgba(255,255,255,0.75); }
  main { padding: 40px 0 72px; }
  .table-scroll {
    overflow-x: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    -webkit-overflow-scrolling: touch;
  }
  table { width: 100%; min-width: 620px; border-collapse: collapse; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); table-layout: fixed; }
  col.col-loc { width: 46%; }
  col.col-mod { width: 20%; }
  col.col-freq { width: 20%; }
  col.col-pri { width: 14%; }
  thead th {
    text-align: left; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.05em;
    color: var(--color-ink-faint); font-weight: 700; padding: 16px 20px; background: var(--color-surface-alt);
    border-bottom: 1px solid var(--color-border);
  }
  tbody td { padding: 18px 20px; border-bottom: 1px solid var(--color-border); font-size: 0.95rem; color: var(--color-ink-soft); }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: var(--color-surface-alt); }
  a.loc { color: var(--color-navy); font-weight: 700; text-decoration: none; overflow-wrap: anywhere; }
  a.loc:hover { color: var(--color-amber); text-decoration: underline; }
  .priority-pill {
    display: inline-flex; align-items: center; justify-content: center;
    min-width: 44px; padding: 4px 10px; border-radius: 999px; font-size: 0.82rem; font-weight: 700;
    background: linear-gradient(150deg, #EAF1FF, #D6E4FE); color: var(--color-amber-dark);
    border: 1px solid var(--color-border);
  }
  footer { text-align: center; padding: 24px; font-size: 0.82rem; color: var(--color-ink-faint); }
  @media (max-width: 640px) {
    thead th, tbody td { padding: 14px; }
  }
</style>
</head>
<body>
<header>
  <div class="wrap">
    <div class="eyebrow">Jenga Facilities Management</div>
    <h1>XML Sitemap</h1>
    <p>A machine-readable index of every page on jengafm.co.uk, for search engines and visitors alike.</p>
  </div>
</header>
<main class="wrap">
  <div class="table-scroll">
  <table>
    <colgroup>
      <col class="col-loc"/>
      <col class="col-mod"/>
      <col class="col-freq"/>
      <col class="col-pri"/>
    </colgroup>
    <thead>
      <tr>
        <th>Page URL</th>
        <th>Last Modified</th>
        <th>Change Frequency</th>
        <th>Priority</th>
      </tr>
    </thead>
    <tbody>
      <xsl:for-each select="sm:urlset/sm:url">
        <tr>
          <td><a class="loc" href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
          <td><xsl:value-of select="sm:lastmod"/></td>
          <td><xsl:value-of select="sm:changefreq"/></td>
          <td><span class="priority-pill"><xsl:value-of select="sm:priority"/></span></td>
        </tr>
      </xsl:for-each>
    </tbody>
  </table>
  </div>
</main>
<footer>&#169; <xsl:value-of select="substring(sm:urlset/sm:url[1]/sm:lastmod, 1, 4)"/> Jenga Facilities Management. Nationwide Facilities Management.</footer>
</body>
</html>
</xsl:template>
</xsl:stylesheet>

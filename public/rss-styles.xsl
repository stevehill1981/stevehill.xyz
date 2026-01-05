<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style type="text/css">
          :root {
            --color-bg: #111;
            --color-surface: #1a1a1a;
            --color-text: #e5e5e5;
            --color-text-secondary: #a3a3a3;
            --color-primary: #a855f7;
            --color-border: #333;
          }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: var(--color-bg);
            color: var(--color-text);
            line-height: 1.6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #a855f7, #ec4899, #3b82f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 0.5rem;
          }
          h1 { font-size: 2rem; font-weight: 700; }
          .description {
            color: var(--color-text-secondary);
            margin-bottom: 2rem;
          }
          .notice {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 2rem;
            font-size: 0.9rem;
            color: var(--color-text-secondary);
          }
          .notice a {
            color: var(--color-primary);
            text-decoration: none;
          }
          .notice a:hover {
            text-decoration: underline;
          }
          .posts { list-style: none; }
          .post {
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: border-color 0.2s;
          }
          .post:hover {
            border-color: var(--color-primary);
          }
          .post-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .post-title a {
            color: var(--color-text);
            text-decoration: none;
          }
          .post-title a:hover {
            color: var(--color-primary);
          }
          .post-date {
            font-size: 0.85rem;
            color: var(--color-text-secondary);
            margin-bottom: 0.75rem;
          }
          .post-description {
            color: var(--color-text-secondary);
            font-size: 0.95rem;
          }
          .tags {
            margin-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .tag {
            background: rgba(168, 85, 247, 0.2);
            color: var(--color-primary);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.8rem;
          }
        </style>
      </head>
      <body>
        <header>
          <h1 class="header"><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
        </header>
        <div class="notice">
          <p>This is an <strong>RSS feed</strong>. Copy the URL into your RSS reader to subscribe.
          <a href="https://aboutfeeds.com/">Learn more about RSS</a>.</p>
        </div>
        <main>
          <ul class="posts">
            <xsl:for-each select="/rss/channel/item">
              <li class="post">
                <h2 class="post-title">
                  <a>
                    <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h2>
                <p class="post-date">
                  <xsl:value-of select="substring(pubDate, 1, 16)"/>
                </p>
                <p class="post-description">
                  <xsl:value-of select="description"/>
                </p>
                <xsl:if test="category">
                  <div class="tags">
                    <xsl:for-each select="category">
                      <span class="tag"><xsl:value-of select="."/></span>
                    </xsl:for-each>
                  </div>
                </xsl:if>
              </li>
            </xsl:for-each>
          </ul>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

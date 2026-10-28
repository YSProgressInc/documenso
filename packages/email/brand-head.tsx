import type { ComponentProps } from 'react';
import { Head as ReactEmailHead } from 'react-email';

/**
 * Brand fonts and dark-mode rules for the YS Progress emails.
 *
 * Templates inline light colours. Mail apps that honour `prefers-color-scheme`
 * (Apple Mail, Outlook for Mac, iOS Mail) get the warm dark palette below
 * instead of inverting the email on their own. Outlook.com marks its dark mode
 * with `data-ogsc` / `data-ogsb` attributes, so the same rules are repeated for
 * it. Gmail ignores both and applies its own inversion; everything stays
 * readable there because the logo sits on an opaque background and every text colour
 * has enough contrast with either background.
 */
const DARK_MODE_CSS = `
:root { color-scheme: light dark; supported-color-schemes: light dark; }
.ys-email-bg { background-color: #f7f3ec; }
.ys-email-bg, .ys-email-bg td, .ys-email-bg p, .ys-email-bg a {
  font-family: 'Hanken Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
}
.ys-email-bg p.ys-email-title, .ys-email-bg p.ys-b-title { font-family: Spectral, Georgia, 'Times New Roman', serif !important; }
@media (prefers-color-scheme: dark) {
  .ys-email-logo-light { display: none !important; }
  .ys-email-logo-dark { display: block !important; max-height: none !important; overflow: visible !important; }
  body, .ys-email-bg:not(.ys-b-page), .ys-email-bg:not(.ys-b-page) table, .ys-email-bg:not(.ys-b-page) td { background-color: #1d1a17 !important; }
  body.ys-b-page, .ys-email-bg.ys-b-page, .ys-email-bg.ys-b-page > table > tbody > tr > td { background-color: #171411 !important; }
  .ys-email-bg .ys-b-card { background-color: #221e1a !important; border-color: #3a332c !important; }
  .ys-email-bg .ys-b-chip { background-color: #2b2621 !important; border-color: #3a332c !important; }
  .ys-email-bg .ys-b-title, .ys-email-bg .ys-b-strong { color: #f3ede3 !important; }
  .ys-email-bg .ys-b-text { color: #e2d9cb !important; }
  .ys-email-bg .ys-b-soft { color: #b9ae9f !important; }
  .ys-email-bg .ys-b-accent, .ys-email-bg .ys-b-link { color: #e7a397 !important; }
  .ys-email-bg .ys-b-quote { border-color: #c46a5c !important; }
  .ys-email-card { background-color: #1d1a17 !important; border-color: #3d3730 !important; }
  .ys-email-title { color: #f3ede3 !important; }
  .ys-email-text, .ys-email-bg p { color: #d9d1c4 !important; }
  .ys-email-muted { color: #b3a99b !important; }
  .ys-email-bg a { color: #e7a397 !important; }
  .ys-email-bg a.ys-email-button { background-color: #9a3a2e !important; color: #fffaf3 !important; }
  .ys-email-bg hr { border-color: #3d3730 !important; }
}
[data-ogsb] body, [data-ogsb] .ys-email-bg:not(.ys-b-page), [data-ogsb] .ys-email-bg:not(.ys-b-page) table, [data-ogsb] .ys-email-bg:not(.ys-b-page) td { background-color: #1d1a17 !important; }
[data-ogsb] .ys-email-bg.ys-b-page, [data-ogsb] .ys-email-bg.ys-b-page > table > tbody > tr > td { background-color: #171411 !important; }
[data-ogsb] .ys-b-card { background-color: #221e1a !important; }
[data-ogsb] .ys-b-chip { background-color: #2b2621 !important; }
[data-ogsc] .ys-b-title, [data-ogsc] .ys-b-strong { color: #f3ede3 !important; }
[data-ogsc] .ys-b-text { color: #e2d9cb !important; }
[data-ogsc] .ys-b-soft { color: #b9ae9f !important; }
[data-ogsc] .ys-b-accent, [data-ogsc] .ys-b-link { color: #e7a397 !important; }
[data-ogsb] .ys-email-card { background-color: #1d1a17 !important; border-color: #3d3730 !important; }
[data-ogsc] .ys-email-title { color: #f3ede3 !important; }
[data-ogsc] .ys-email-text, [data-ogsc] .ys-email-bg p { color: #d9d1c4 !important; }
[data-ogsc] .ys-email-muted { color: #b3a99b !important; }
[data-ogsc] .ys-email-bg a { color: #e7a397 !important; }
[data-ogsb] .ys-email-bg a.ys-email-button { background-color: #9a3a2e !important; }
[data-ogsc] .ys-email-bg a.ys-email-button { color: #fffaf3 !important; }
`;

export const Head = ({ children, ...props }: ComponentProps<typeof ReactEmailHead>) => (
  <ReactEmailHead {...props}>
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <link
      href="https://fonts.googleapis.com/css2?family=Spectral:wght@600&family=Hanken+Grotesk:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
    <style>{DARK_MODE_CSS}</style>
    {children}
  </ReactEmailHead>
);

import type { CSSProperties, ReactNode } from 'react';
import { Fragment } from 'react';

import { Body, Column, Container, Head, Html, Img, Link, Preview, Row, Section, Text } from '../components';
import { useBranding } from '../providers/branding';
import { getEmailAssetUrl } from '../utils/asset-url';
import { getSafeBrandingUrl } from '../utils/branding-url';
import { BRAND_COLORS as C, BRAND_FONTS as F } from './brand-tokens';

/** "YS Progress Inc. · Markham & Toronto" → ["YS Progress Inc.", "Markham & Toronto"]. */
export const splitCompanyDetails = (details: string) =>
  details
    .split('\n')[0]
    ?.split('·')
    .map((part) => part.trim())
    .filter(Boolean) ?? [];

type BrandedLayoutProps = {
  preview: string;
  assetBaseUrl: string;
  reportUrl?: string;
  children: ReactNode;
};

const hiddenUnlessDark: CSSProperties = {
  display: 'none',
  maxHeight: 0,
  overflow: 'hidden',
  msoHide: 'all',
} as CSSProperties;

export const BrandedLayout = ({ preview, assetBaseUrl, reportUrl, children }: BrandedLayoutProps) => {
  const branding = useBranding();

  const [companyName = '', ...companyRest] = splitCompanyDetails(branding.brandingCompanyDetails);
  // Brand Details: line 1 is "Name · place · …", an optional line 2 is the tagline.
  const tagline = branding.brandingCompanyDetails.split('\n')[1]?.trim() ?? '';
  const websiteUrl = getSafeBrandingUrl(branding.brandingUrl);
  const websiteLabel = websiteUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const asset = (name: string) => getEmailAssetUrl(assetBaseUrl, `static/${name}`);

  const name = (
    <>
      <Text
        className="ys-b-title"
        style={{
          margin: '14px 0 0',
          fontFamily: F.display,
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: 600,
          color: C.ink,
          textAlign: 'center',
        }}
      >
        {companyName}
      </Text>
      {tagline && (
        <Text
          className="ys-b-soft"
          style={{
            margin: '4px 0 0',
            fontFamily: F.body,
            fontSize: '11px',
            lineHeight: '16px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.inkSoft,
            textAlign: 'center',
          }}
        >
          {tagline}
        </Text>
      )}
    </>
  );

  const mark = (
    <>
      <Img
        className="ys-email-logo-light"
        src={asset('brand-email-mark-light.png')}
        alt={companyName || 'Logo'}
        width="56"
        height="56"
        style={{ display: 'block', margin: '0 auto', border: 0, fontFamily: F.display, fontSize: '20px', color: C.ink }}
      />
      <div className="ys-email-logo-dark" style={hiddenUnlessDark}>
        <Img
          src={asset('brand-email-mark-dark.png')}
          alt={companyName || 'Logo'}
          width="56"
          height="56"
          style={{ display: 'block', margin: '0 auto', border: 0 }}
        />
      </div>
    </>
  );

  const linked = (content: ReactNode) =>
    websiteUrl ? (
      <Link href={websiteUrl} target="_blank" style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    ) : (
      content
    );

  const header = (
    <Section style={{ padding: '36px 0 28px', textAlign: 'center' }}>
      {linked(mark)}
      {name}
    </Section>
  );

  return (
    <Html>
      <Head />

      <Body className="ys-b-page" style={{ margin: 0, padding: 0, backgroundColor: C.paper, fontFamily: F.body }}>
        <Preview>{preview}</Preview>

        {/* The page colour sits on a full-width table, not only on <body>: some mail apps
            (iOS) turn <body> into a div with their own class, so dark-mode rules aimed at the
            body never match and light text would land on a light page. */}
        <Section className="ys-b-shell" style={{ width: '100%', backgroundColor: C.paper }}>
          <Container style={{ maxWidth: '560px', margin: '0 auto', padding: '0 16px' }}>
            {header}

            <Section
              className="ys-b-card"
              style={{
                backgroundColor: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: '14px',
                padding: '36px 36px 32px',
              }}
            >
              {children}
            </Section>

            <Section style={{ padding: '28px 8px 40px', textAlign: 'center' }}>
              {reportUrl && (
                <Text
                  className="ys-b-soft"
                  style={{
                    margin: '0 0 16px',
                    fontFamily: F.body,
                    fontSize: '13px',
                    lineHeight: '20px',
                    color: C.inkSoft,
                    textAlign: 'center',
                  }}
                >
                  Not expecting this email?{' '}
                  <Link className="ys-b-link" href={reportUrl} style={{ color: C.accent, textDecoration: 'underline' }}>
                    Report it
                  </Link>
                  . Never sign a document you don&apos;t recognise.
                </Text>
              )}

              <Text
                className="ys-b-soft"
                style={{
                  margin: 0,
                  fontFamily: F.body,
                  fontSize: '13px',
                  lineHeight: '20px',
                  color: C.inkSoft,
                  textAlign: 'center',
                }}
              >
                <strong style={{ fontWeight: 600 }}>{companyName}</strong>
                {companyRest.map((part) => (
                  <Fragment key={part}>
                    {' · '}
                    {part}
                  </Fragment>
                ))}
              </Text>

              {websiteUrl && (
                <Text
                  style={{
                    margin: '4px 0 0',
                    fontFamily: F.body,
                    fontSize: '13px',
                    lineHeight: '20px',
                    textAlign: 'center',
                  }}
                >
                  <Link className="ys-b-link" href={websiteUrl} style={{ color: C.accent, textDecoration: 'none' }}>
                    {websiteLabel}
                  </Link>
                </Text>
              )}
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  );
};

/* ---- Content blocks used inside the card ---- */

export const Eyebrow = ({ children }: { children: ReactNode }) => (
  <Text
    className="ys-b-accent"
    style={{
      margin: 0,
      fontFamily: F.body,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: C.accent,
    }}
  >
    {children}
  </Text>
);

export const Title = ({ children }: { children: ReactNode }) => (
  <Text
    className="ys-b-title"
    style={{
      margin: '10px 0 0',
      fontFamily: F.display,
      fontSize: '27px',
      lineHeight: '34px',
      fontWeight: 600,
      color: C.ink,
    }}
  >
    {children}
  </Text>
);

export const Paragraph = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <Text
    className="ys-b-text"
    style={{ margin: '14px 0 0', fontFamily: F.body, fontSize: '16px', lineHeight: '25px', color: C.ink, ...style }}
  >
    {children}
  </Text>
);

export const DocumentChip = ({
  assetBaseUrl,
  documentName,
  meta,
}: {
  assetBaseUrl: string;
  documentName: string;
  meta?: string;
}) => (
  <Section
    className="ys-b-chip"
    style={{ marginTop: '24px', backgroundColor: C.chip, border: `1px solid ${C.line}`, borderRadius: '10px' }}
  >
    <Row>
      <Column style={{ width: '52px', padding: '14px 0 14px 16px', verticalAlign: 'middle' }}>
        <Img
          src={getEmailAssetUrl(assetBaseUrl, 'static/review.png')}
          alt=""
          width="22"
          height="22"
          style={{ display: 'block', border: 0 }}
        />
      </Column>
      <Column style={{ padding: '14px 16px 14px 0', verticalAlign: 'middle' }}>
        <Text
          className="ys-b-strong"
          style={{
            margin: 0,
            fontFamily: F.body,
            fontSize: '15px',
            lineHeight: '21px',
            fontWeight: 600,
            color: C.ink,
            wordBreak: 'break-word',
          }}
        >
          {documentName}
        </Text>
        {meta && (
          <Text
            className="ys-b-soft"
            style={{ margin: '2px 0 0', fontFamily: F.body, fontSize: '13px', lineHeight: '18px', color: C.inkSoft }}
          >
            {meta}
          </Text>
        )}
      </Column>
    </Row>
  </Section>
);

export const PrimaryButton = ({ href, children }: { href: string; children: ReactNode }) => (
  <Section style={{ marginTop: '28px' }}>
    <Link
      className="ys-email-button"
      href={href}
      style={{
        display: 'block',
        backgroundColor: C.accent,
        color: C.paper,
        fontFamily: F.body,
        fontSize: '16px',
        lineHeight: '22px',
        fontWeight: 600,
        textAlign: 'center',
        textDecoration: 'none',
        padding: '15px 24px',
        borderRadius: '10px',
      }}
    >
      {children}
    </Link>
  </Section>
);

export const Fineprint = ({ children }: { children: ReactNode }) => (
  <Text
    className="ys-b-soft"
    style={{
      margin: '14px 0 0',
      fontFamily: F.body,
      fontSize: '13px',
      lineHeight: '19px',
      color: C.inkSoft,
      textAlign: 'center',
    }}
  >
    {children}
  </Text>
);

/** The sender's own words, set apart from the system text. */
export const MessageQuote = ({ from, children }: { from?: string; children: ReactNode }) => (
  <Section
    className="ys-b-quote"
    style={{ marginTop: '22px', borderLeft: `3px solid ${C.accent}`, padding: '2px 0 2px 16px' }}
  >
    <Text
      className="ys-b-text"
      style={{
        margin: 0,
        fontFamily: F.body,
        fontSize: '15px',
        lineHeight: '24px',
        color: C.ink,
      }}
    >
      {/* Line breaks as <br> so the plain-text version keeps them too. */}
      {typeof children === 'string'
        ? children.split('\n').map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: lines have no identity of their own
            <Fragment key={index}>
              {index > 0 && <br />}
              {line}
            </Fragment>
          ))
        : children}
    </Text>
    {from && (
      <Text
        className="ys-b-soft"
        style={{ margin: '8px 0 0', fontFamily: F.body, fontSize: '13px', lineHeight: '18px', color: C.inkSoft }}
      >
        {from}
      </Text>
    )}
  </Section>
);

/** A labelled detail such as a rejection reason. */
export const Detail = ({ label, children }: { label: string; children: ReactNode }) => (
  <Section
    className="ys-b-chip"
    style={{
      marginTop: '20px',
      backgroundColor: C.chip,
      border: `1px solid ${C.line}`,
      borderRadius: '10px',
      padding: '14px 16px',
    }}
  >
    <Text
      className="ys-b-soft"
      style={{
        margin: 0,
        fontFamily: F.body,
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        fontWeight: 600,
        color: C.inkSoft,
      }}
    >
      {label}
    </Text>
    <Text
      className="ys-b-text"
      style={{ margin: '6px 0 0', fontFamily: F.body, fontSize: '15px', lineHeight: '22px', color: C.ink }}
    >
      {children}
    </Text>
  </Section>
);

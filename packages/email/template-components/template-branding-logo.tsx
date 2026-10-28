import type { CSSProperties } from 'react';

import { Img, Link, Section } from '../components';
import { useBranding } from '../providers/branding';
import { getEmailAssetUrl } from '../utils/asset-url';
import { getSafeBrandingUrl } from '../utils/branding-url';

export type TemplateBrandingLogoProps = {
  assetBaseUrl: string;
  className?: string;
};

/**
 * The organisation name for the logo's alt text, taken from the first segment of
 * the Brand Details ("YS Progress Inc. · Markham & Toronto" → "YS Progress Inc."),
 * so a mail app that blocks images still shows who the email is from.
 */
const getBrandName = (companyDetails: string) => {
  const firstLine = companyDetails.split('\n')[0] ?? '';

  return firstLine.split('·')[0]?.trim() ?? '';
};

/**
 * Renders the email logo.
 *
 * - With custom branding enabled, the brand lockup (`static/brand-email-lockup-*.png`)
 *   is centred above the content. It links to the Brand Website when one is set.
 * - Otherwise the Documenso logo is shown.
 */
export const TemplateBrandingLogo = ({ assetBaseUrl, className = 'mb-4 h-6' }: TemplateBrandingLogoProps) => {
  const branding = useBranding();

  if (!branding.brandingEnabled) {
    const documensoLogoUrl = getEmailAssetUrl(assetBaseUrl, 'static/logo.png');

    return <Img src={documensoLogoUrl} alt="Documenso Logo" className={className} />;
  }

  const brandName = getBrandName(branding.brandingCompanyDetails) || 'Logo';

  // Two copies of the brand lockup. The light copy sits on an opaque paper
  // background so it stays readable when a mail app inverts the email on its own
  // (Gmail on phones). The dark copy is transparent and only shown by mail apps
  // that support `prefers-color-scheme` (rules in brand-head.tsx).
  const lockupStyle = {
    border: 0,
    margin: '0 auto',
    fontSize: '18px',
    fontWeight: 600,
    color: '#3c352d',
  } as const;

  const brandingLogo = (
    <>
      <Img
        src={getEmailAssetUrl(assetBaseUrl, 'static/brand-email-lockup-light.png')}
        alt={brandName}
        width="300"
        height="66"
        className="ys-email-logo-light"
        style={{ ...lockupStyle, display: 'block' }}
      />
      <div
        className="ys-email-logo-dark"
        style={{ display: 'none', maxHeight: 0, overflow: 'hidden', msoHide: 'all' } as CSSProperties}
      >
        <Img
          src={getEmailAssetUrl(assetBaseUrl, 'static/brand-email-lockup-dark.png')}
          alt={brandName}
          width="300"
          height="66"
          style={{ ...lockupStyle, display: 'block', color: '#f3ede3' }}
        />
      </div>
    </>
  );

  const safeBrandingUrl = getSafeBrandingUrl(branding.brandingUrl);

  return (
    <Section className="mt-2 mb-6 text-center">
      {safeBrandingUrl ? (
        <Link href={safeBrandingUrl} target="_blank">
          {brandingLogo}
        </Link>
      ) : (
        brandingLogo
      )}
    </Section>
  );
};

export default TemplateBrandingLogo;

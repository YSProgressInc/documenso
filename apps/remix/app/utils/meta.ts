import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { env } from '@documenso/lib/utils/env';
import { i18n, type MessageDescriptor } from '@lingui/core';

/**
 * A self-hosted instance can present itself under its own name: set
 * `NEXT_PUBLIC_BRAND_NAME` and page titles, the description and the share
 * preview use it instead of the Documenso marketing copy.
 */
const getBrandName = () => env('NEXT_PUBLIC_BRAND_NAME') || '';

export const appMetaTags = (title?: MessageDescriptor) => {
  const brandName = getBrandName();

  if (brandName) {
    const description = `Review and sign documents from ${brandName}.`;

    return [
      { title: title ? `${i18n._(title)} - ${brandName}` : brandName },
      { name: 'description', content: description },
      { name: 'author', content: brandName },
      { name: 'robots', content: 'noindex, nofollow' },
      { property: 'og:title', content: brandName },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
    ];
  }

  const description =
    'Join Documenso, the open signing infrastructure, and get a 10x better signing experience. Pricing starts at $30/mo. forever! Sign in now and enjoy a faster, smarter, and more beautiful document signing process. Integrates with your favorite tools, customizable, and expandable. Support our mission and become a part of our open-source community.';

  return [
    {
      title: title ? `${i18n._(title)} - Documenso` : 'Documenso',
    },
    {
      name: 'description',
      content: description,
    },
    {
      name: 'keywords',
      content:
        'Documenso, open source, DocuSign alternative, document signing, open signing infrastructure, open-source community, fast signing, beautiful signing, smart templates',
    },
    {
      name: 'author',
      content: 'Documenso, Inc.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      property: 'og:title',
      content: 'Documenso - The Open Source DocuSign Alternative',
    },
    {
      property: 'og:description',
      content: description,
    },
    {
      property: 'og:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:site',
      content: '@documenso',
    },
    {
      name: 'twitter:description',
      content: description,
    },
    {
      name: 'twitter:image',
      content: `${NEXT_PUBLIC_WEBAPP_URL()}/opengraph-image.jpg`,
    },
  ];
};

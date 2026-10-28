import { Column, Img, Row, Section } from '../components';
import { useBranding } from '../providers/branding';
import { getEmailAssetUrl } from '../utils/asset-url';

export interface TemplateDocumentImageProps {
  assetBaseUrl: string;
  className?: string;
}

/**
 * The generic Documenso document illustration. Branded emails lead with the
 * brand mark instead, so the illustration is left out when branding is enabled.
 */
export const TemplateDocumentImage = ({ assetBaseUrl, className }: TemplateDocumentImageProps) => {
  const branding = useBranding();

  if (branding.brandingEnabled) {
    return null;
  }

  return (
    <Section className={className}>
      <Row className="table-fixed">
        <Column />

        <Column>
          <Img className="mx-auto h-42" src={getEmailAssetUrl(assetBaseUrl, 'static/document.png')} alt="Documenso" />
        </Column>

        <Column />
      </Row>
    </Section>
  );
};

export default TemplateDocumentImage;

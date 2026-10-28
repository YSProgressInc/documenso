import { OrganisationType, RecipientRole } from '@prisma/client';

import { useBranding } from '../providers/branding';
import {
  BrandedLayout,
  Detail,
  DocumentChip,
  Eyebrow,
  Fineprint,
  MessageQuote,
  Paragraph,
  PrimaryButton,
  splitCompanyDetails,
  Title,
} from './branded-layout';

/**
 * Branded versions of the emails a client receives (and the two the sender gets
 * about a client's action). The original templates switch to these when the
 * organisation has custom branding enabled. Copy is English only.
 */

const documentTitle = (documentName: string) => documentName.replace(/\.pdf$/i, '');

const useCompanyName = () => splitCompanyDetails(useBranding().brandingCompanyDetails)[0] ?? '';

const ROLE_COPY: Record<RecipientRole, { eyebrow: string; verb: string; button: string }> = {
  [RecipientRole.SIGNER]: { eyebrow: 'Signature requested', verb: 'sign', button: 'Review and sign' },
  [RecipientRole.APPROVER]: { eyebrow: 'Approval requested', verb: 'approve', button: 'Review and approve' },
  [RecipientRole.VIEWER]: { eyebrow: 'Document shared', verb: 'review', button: 'View the document' },
  [RecipientRole.ASSISTANT]: { eyebrow: 'Help requested', verb: 'prepare', button: 'Open the document' },
  [RecipientRole.CC]: { eyebrow: 'For your records', verb: 'see', button: 'View the document' },
};

type InviteProps = {
  inviterName: string;
  documentName: string;
  signDocumentLink: string;
  assetBaseUrl: string;
  role: RecipientRole;
  customBody?: string;
  reportUrl?: string;
  teamName?: string;
  includeSenderDetails?: boolean;
  organisationType?: OrganisationType;
  selfSigner?: boolean;
};

export const BrandedDocumentInvite = ({
  inviterName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role,
  customBody,
  reportUrl,
  teamName,
  includeSenderDetails,
  organisationType,
  selfSigner,
}: InviteProps) => {
  const companyName = useCompanyName();
  const copy = ROLE_COPY[role];

  const sender =
    organisationType === OrganisationType.ORGANISATION && !includeSenderDetails && teamName
      ? teamName
      : companyName
        ? `${inviterName} from ${companyName}`
        : inviterName;

  const intro = selfSigner
    ? `This document is ready for you to ${copy.verb}.`
    : `${sender} has asked you to ${copy.verb} this document.`;

  return (
    <BrandedLayout
      preview={`${intro} ${documentTitle(documentName)}`}
      assetBaseUrl={assetBaseUrl}
      reportUrl={reportUrl}
    >
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <Title>{documentTitle(documentName)}</Title>
      <Paragraph>{intro}</Paragraph>

      {customBody && <MessageQuote>{customBody}</MessageQuote>}

      <DocumentChip assetBaseUrl={assetBaseUrl} documentName={documentName} meta={`Sent by ${inviterName}`} />

      {role !== RecipientRole.CC && <PrimaryButton href={signDocumentLink}>{copy.button}</PrimaryButton>}

      <Fineprint>Takes about a minute. No account or download needed. Questions? Reply to this email.</Fineprint>
    </BrandedLayout>
  );
};

type ReminderProps = {
  recipientName: string;
  documentName: string;
  signDocumentLink: string;
  assetBaseUrl: string;
  role: RecipientRole;
  customBody?: string;
  reportUrl?: string;
};

export const BrandedDocumentReminder = ({
  recipientName,
  documentName,
  signDocumentLink,
  assetBaseUrl,
  role,
  customBody,
  reportUrl,
}: ReminderProps) => {
  const copy = ROLE_COPY[role];
  const greeting = recipientName ? `Hi ${recipientName.split(' ')[0]}, this` : 'This';

  return (
    <BrandedLayout
      preview={`Reminder: ${documentTitle(documentName)} is waiting for you`}
      assetBaseUrl={assetBaseUrl}
      reportUrl={reportUrl}
    >
      <Eyebrow>Friendly reminder</Eyebrow>
      <Title>{documentTitle(documentName)}</Title>
      <Paragraph>{`${greeting} document is still waiting for you to ${copy.verb} it.`}</Paragraph>

      {customBody && <MessageQuote>{customBody}</MessageQuote>}

      <DocumentChip assetBaseUrl={assetBaseUrl} documentName={documentName} />

      <PrimaryButton href={signDocumentLink}>{copy.button}</PrimaryButton>

      <Fineprint>Already done, or have questions? Reply to this email.</Fineprint>
    </BrandedLayout>
  );
};

export const BrandedDocumentCompleted = ({
  documentName,
  downloadLink,
  assetBaseUrl,
  customBody,
  reportUrl,
}: {
  documentName: string;
  downloadLink: string;
  assetBaseUrl: string;
  customBody?: string;
  reportUrl?: string;
}) => (
  <BrandedLayout
    preview={`${documentTitle(documentName)} is signed by everyone`}
    assetBaseUrl={assetBaseUrl}
    reportUrl={reportUrl}
  >
    <Eyebrow>Completed</Eyebrow>
    <Title>{documentTitle(documentName)}</Title>
    <Paragraph>
      {customBody ||
        'Everyone has signed. The signed PDF is attached to this email, with its signing certificate and audit log on the last pages.'}
    </Paragraph>

    <DocumentChip assetBaseUrl={assetBaseUrl} documentName={documentName} meta="Signed by all parties" />

    <PrimaryButton href={downloadLink}>Download the signed document</PrimaryButton>

    <Fineprint>Keep this email for your records.</Fineprint>
  </BrandedLayout>
);

export const BrandedDocumentPending = ({
  documentName,
  assetBaseUrl,
}: {
  documentName: string;
  assetBaseUrl: string;
}) => (
  <BrandedLayout preview={`Thank you for signing ${documentTitle(documentName)}`} assetBaseUrl={assetBaseUrl}>
    <Eyebrow>Signed</Eyebrow>
    <Title>{documentTitle(documentName)}</Title>
    <Paragraph>
      Thank you, your signature is recorded. We are waiting for the other people to sign, and you will receive the
      completed document by email as soon as they have.
    </Paragraph>
    <DocumentChip assetBaseUrl={assetBaseUrl} documentName={documentName} meta="Waiting for other signers" />
  </BrandedLayout>
);

export const BrandedDocumentCancel = ({
  inviterName,
  documentName,
  assetBaseUrl,
  cancellationReason,
}: {
  inviterName: string;
  documentName: string;
  assetBaseUrl: string;
  cancellationReason?: string;
}) => (
  <BrandedLayout preview={`${documentTitle(documentName)} was cancelled`} assetBaseUrl={assetBaseUrl}>
    <Eyebrow>Cancelled</Eyebrow>
    <Title>{documentTitle(documentName)}</Title>
    <Paragraph>{`${inviterName} cancelled this document. You don't need to sign it, and any signatures on it are void.`}</Paragraph>
    {cancellationReason && <Detail label="Reason">{cancellationReason}</Detail>}
  </BrandedLayout>
);

export const BrandedRejectionConfirmed = ({
  documentName,
  documentOwnerName,
  reason,
  assetBaseUrl,
}: {
  documentName: string;
  documentOwnerName: string;
  reason: string;
  assetBaseUrl: string;
}) => (
  <BrandedLayout preview={`You rejected ${documentTitle(documentName)}`} assetBaseUrl={assetBaseUrl}>
    <Eyebrow>Rejected</Eyebrow>
    <Title>{documentTitle(documentName)}</Title>
    <Paragraph>{`You rejected this document. ${documentOwnerName} has been told and may get in touch with you. Nothing else is needed from you.`}</Paragraph>
    {reason && <Detail label="Your reason">{reason}</Detail>}
  </BrandedLayout>
);

export const BrandedRecipientSigned = ({
  documentName,
  recipientName,
  recipientEmail,
  assetBaseUrl,
}: {
  documentName: string;
  recipientName: string;
  recipientEmail: string;
  assetBaseUrl: string;
}) => {
  const who = recipientName ? `${recipientName} (${recipientEmail})` : recipientEmail;

  return (
    <BrandedLayout preview={`${who} signed ${documentTitle(documentName)}`} assetBaseUrl={assetBaseUrl}>
      <Eyebrow>Signed</Eyebrow>
      <Title>{documentTitle(documentName)}</Title>
      <Paragraph>{`${who} has signed this document.`}</Paragraph>
    </BrandedLayout>
  );
};

export const BrandedDocumentRejected = ({
  recipientName,
  documentName,
  documentUrl,
  rejectionReason,
  assetBaseUrl,
}: {
  recipientName: string;
  documentName: string;
  documentUrl: string;
  rejectionReason: string;
  assetBaseUrl: string;
}) => (
  <BrandedLayout preview={`${recipientName} rejected ${documentTitle(documentName)}`} assetBaseUrl={assetBaseUrl}>
    <Eyebrow>Rejected</Eyebrow>
    <Title>{documentTitle(documentName)}</Title>
    <Paragraph>{`${recipientName} rejected this document.`}</Paragraph>
    {rejectionReason && <Detail label="Their reason">{rejectionReason}</Detail>}
    <PrimaryButton href={documentUrl}>Open the document</PrimaryButton>
  </BrandedLayout>
);

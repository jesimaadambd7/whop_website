export type LegalCallout = {
  title: string;
  body: string;
};

export type LegalSection = {
  id: string;
  number: string;
  title: string;
  navLabel: string;
  paragraphs: string[];
  /** Optional highlighted notice box (e.g. refund policy). */
  callout?: LegalCallout;
};

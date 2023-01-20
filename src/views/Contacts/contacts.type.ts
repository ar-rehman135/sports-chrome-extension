export interface ImportContactsProps {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: { address: string; type: string }[];
    phone: { number: string; type: string }[];
    address: [
      {
        street?: string;
        city?: string;
        region?: string;
        country?: string;
        postalCode?: string;
        type?: string;
      }
    ];
    companies: string[];
    groups: string[];
    importSource: string;
    appId?: string;
  }
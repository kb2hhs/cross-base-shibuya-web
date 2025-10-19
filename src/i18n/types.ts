export type Translations = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    facilities: string;
    location: string;
    reserve: string;
  };
  hero: {
    title: string;
  };
  facilities: {
    heading: string;
    description: string;
    floorPlan: {
      title: string;
      description: string;
    };
    bedroom1: {
      title: string;
      description: string;
    };
    bedroom2: {
      title: string;
      description: string;
    };
    livingArea: {
      title: string;
      description: string;
    };
    kitchen: {
      title: string;
      description: string;
    };
    bathroom: {
      title: string;
      description: string;
    };
  };
  location: {
    heading: string;
    description: string;
    addressLabel: string;
    addressLine1: string;
    addressLine2: string;
  };
  booking: {
    checkAvailability: string;
    bestRate: string;
  };
  floating: {
    reserve: string;
    bookAtBestRate: {
      line1: string;
      line2: string;
    };
  };
};

export type Language = 'en' | 'ja' | 'zh-cn' | 'zh-tw' | 'ko';

export const SUPPORTED_LANGUAGES: readonly Language[] = ['en', 'ja', 'zh-cn', 'zh-tw', 'ko'] as const;

export const LANGUAGE_NAMES: Record<Language, string> = {
  'en': 'EN',
  'ja': '日本語',
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  'ko': '한국어',
};

import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  appName: {
    en: 'LIFEOS',
    hi: 'लाइफओएस',
    te: 'లైఫ్ఓఎస్',
  },
  dashboard: {
    en: 'DASHBOARD',
    hi: 'डैशबोर्ड',
    te: 'డాష్‌బోర్డ్',
  },
  activity: {
    en: 'ACTIVITY',
    hi: 'गतिविधि',
    te: 'కార్యకలాపాలు',
  },
  login: {
    en: 'LOGIN',
    hi: 'लॉगिन',
    te: 'లాగిన్',
  },
  exit: {
    en: 'EXIT',
    hi: 'बाहर निकलें',
    te: 'నిష్క్రమించు',
  },
  heroLine1: {
    en: 'Accept uncomfortable experiments.',
    hi: 'असहज प्रयोगों को स्वीकार करें।',
    te: 'అసౌకర్య ప్రయోగాలను అంగీకరించండి.',
  },
  heroLine2: {
    en: 'Log what changed.',
    hi: 'क्या बदला, उसे दर्ज करें।',
    te: 'ఏమి మారిందో నమోదు చేయండి.',
  },
  heroLine3: {
    en: 'Build proof about yourself.',
    hi: 'अपने बारे में प्रमाण बनाएँ।',
    te: 'మీ గురించి నిరూపణను నిర్మించుకోండి.',
  },
  startNow: {
    en: 'Start Now',
    hi: 'अभी शुरू करें',
    te: 'ఇప్పుడే ప్రారంభించండి',
  },
  acceptChallenge: {
    en: 'Accept a Challenge',
    hi: 'चुनौती स्वीकार करें',
    te: 'సవాలును స్వీకరించండి',
  },
  library: {
    en: 'Challenge Library',
    hi: 'चुनौती लाइब्रेरी',
    te: 'ఛాలెంజ్ లైబ్రరీ',
  },
  activeChallenges: {
    en: 'Active Challenges',
    hi: 'सक्रिय चुनौतियाँ',
    te: 'క్రియాశీల సవాళ్లు',
  },
  tacticalStats: {
    en: 'Tactical Stats',
    hi: 'सामरिक आंकड़े',
    te: 'టాక్టికల్ గణాంకాలు',
  },
  experimentsTab: {
    en: 'Active Experiments',
    hi: 'सक्रिय प्रयोग',
    te: 'క్రియాశీల ప్రయోగాలు',
  },
  statsTab: {
    en: 'Command Center',
    hi: 'कमांड सेंटर',
    te: 'कमांड सेंटर',
  },
  empathyDefault: {
    en: 'Great job logging today! Consistency is the key to self-discovery.',
    hi: 'आज लॉग इन करने के लिए बहुत अच्छा काम! आत्म-खोज की कुंजी निरंतरता है।',
    te: 'ఈ రోజు లాగిన్ చేసినందుకు అభినందనలు! స్వీయ ఆవిష్కరణకు నిలకడ ముఖ్యం.',
  },
  empathySad: {
    en: 'I notice things felt heavy today. It is brave to log your feelings even when they are hard. Be kind to yourself.',
    hi: 'मैंने गौर किया कि आज चीज़ें भारी महसूस हो रही थीं। अपनी भावनाओं को दर्ज करना बहादुरी का काम है, भले ही वे कठिन हों। अपने प्रति दयालु रहें।',
    te: 'ఈ రోజు మీకు భారంగా అనిపించిందని నేను గమనించాను. కష్టంగా ఉన్నప్పటికీ మీ భావాలను నమోదు చేయడం గొప్ప విషయం. మీ పట్ల మీరు దయతో ఉండండి.',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

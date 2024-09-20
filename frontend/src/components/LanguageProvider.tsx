import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';

interface LanguageContextProps {
    language: string;
    toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'ja',
    toggleLanguage: () => { },
});

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        const browserLanguage = navigator.language.startsWith('ja') ? 'ja' : 'en';
        setLanguage(browserLanguage);
    }, []);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ja' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

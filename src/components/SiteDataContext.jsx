"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteDataContext = createContext({});

export function SiteDataProvider({ children }) {
    const [media, setMedia] = useState({});

    useEffect(() => {
        fetch('/api/public/site-content')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const mapped = {};
                    (data.items || []).forEach(item => {
                        if (item.key.startsWith("site_media_")) {
                            mapped[item.key.replace("site_media_", "")] = item.value;
                        }
                    });
                    setMedia(mapped);
                }
            })
            .catch(err => console.error("Failed to fetch site media:", err));
    }, []);

    return (
        <SiteDataContext.Provider value={{ media }}>
            {children}
        </SiteDataContext.Provider>
    );
}

export const useSiteData = () => useContext(SiteDataContext);

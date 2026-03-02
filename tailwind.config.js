/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2B3AA0",
                secondary: "#FFB31A",
                accent: "#3b82f6",
                ivory: "#FDFDFD",
            },
            fontFamily: {
                heading: ["Outfit", "sans-serif"],
                sans: ["Plus Jakarta Sans", "sans-serif"],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
                'glow': '0 0 50px -12px rgba(255, 179, 26, 0.3)',
                'academic': '0 20px 60px -15px rgba(43, 58, 160, 0.1)',
            }
        },
    },
    plugins: [],
};

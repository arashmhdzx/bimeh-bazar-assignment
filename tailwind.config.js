/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors:{
                "primary":"#000",
                "secondary":"#FFC453",
                "texture":"#b4b4b4"
            }
        },
    },
    plugins: [],
}

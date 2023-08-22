/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(14, 165, 233)",
				secondary: "rgb(12, 74, 110)",
				title: "rgb(23, 23, 23)",
				description: "rgb(64, 64, 64)",
				hover: "rgb(245, 245, 245)",
				select: "rgb(229, 229, 229)",
			},
		},
	},
	plugins: [],
};

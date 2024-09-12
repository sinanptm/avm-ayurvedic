import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
   darkMode: ["class"],
   content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
   prefix: "",
   theme: {
   	container: {
   		center: 'true',
   		padding: '2rem',
   		screens: {
   			'2xl': '1400px'
   		}
   	},
   	toolTip: ' bg-green-700 bg-opacity-55 border-white cursor-pointer',
   	extend: {
   		screens: {
   			md: '732px',
   			'md-cus': '930px',
   			'admin-nav': '635px'
   		},
   		colors: {
   			green: {
   				'500': '#24AE7C',
   				'600': '#0D2A1F'
   			},
   			blue: {
   				'500': '#79B5EC',
   				'600': '#152432'
   			},
   			red: {
   				'500': '#F37877',
   				'600': '#3E1716',
   				'700': '#F24E43'
   			},
   			light: {
   				'200': '#E8E9E9'
   			},
   			dark: {
   				'200': '#0D0F10',
   				'300': '#131619',
   				'400': '#1A1D21',
   				'500': '#363A3D',
   				'600': '#76828D',
   				'700': '#ABB8C4'
   			}
   		},
   		fontFamily: {
   			sans: ["var(--font-sans)", ...fontFamily.sans]
   		},
   		keyframes: {
   			'accordion-down': {
   				from: {
   					height: '0'
   				},
   				to: {
   					height: 'var(--radix-accordion-content-height)'
   				}
   			},
   			'accordion-up': {
   				from: {
   					height: 'var(--radix-accordion-content-height)'
   				},
   				to: {
   					height: '0'
   				}
   			}
   		},
   		animation: {
   			'accordion-down': 'accordion-down 0.2s ease-out',
   			'accordion-up': 'accordion-up 0.2s ease-out'
   		}
   	}
   },
   plugins: [require("tailwindcss-animate"), "prettier-plugin-tailwindcss"],
} satisfies Config;

export default config;

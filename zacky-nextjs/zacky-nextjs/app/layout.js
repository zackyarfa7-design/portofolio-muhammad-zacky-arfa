import './globals.css';
import {Bricolage_Grotesque,Instrument_Serif} from 'next/font/google';
const sans=Bricolage_Grotesque({subsets:['latin'],variable:'--f-sans',display:'swap'});
const ser=Instrument_Serif({subsets:['latin'],weight:'400',style:['normal','italic'],variable:'--f-ser',display:'swap'});
export const metadata={title:'Muhammad Zacky Arfa | F&B Management, Data Analyst, IT',description:'Portofolio Muhammad Zacky Arfa: F&B Management, Data Analyst, dan IT Enthusiast dari Pekanbaru, Riau.',openGraph:{images:['/images/profil.webp']}};
export const viewport={themeColor:'#050a18'};
export default function RootLayout({children}){return <html lang="id" className={`${sans.variable} ${ser.variable} scroll-smooth`}><body>{children}</body></html>}

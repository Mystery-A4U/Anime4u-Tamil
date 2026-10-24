import './globals.css';import Header from '@/components/Header';
export const metadata={title:'Anime4u — Media Index',description:'Anime4u media index'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><Header/>{children}<footer className="footer"><div className="container">© 2026 Anime4u · Built by <a href="https://github.com/Mystery-A4U" target="_blank" rel="noreferrer">Mystery-A4U</a></div></footer></>}

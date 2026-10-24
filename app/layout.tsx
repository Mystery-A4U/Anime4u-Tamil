import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Anime4u — Media Index',
  description: 'Anime4u is a clean index for movies, series, anime and K Drama.',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <>
    <Header />
    <div className="page-wrap">{children}</div>
    <footer className="footer"><div className="container">© 2026 Anime4u · Built by <a href="https://github.com/Mystery-A4U" target="_blank" rel="noreferrer">Mystery-A4U</a></div></footer>
  </>;
}

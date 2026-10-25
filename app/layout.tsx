import "./style.css";
import A4ULoader from "../components/A4ULoader";

export const metadata={title:"Anime4u",description:"Anime4u — simple media index"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><A4ULoader />{children}</body></html>}

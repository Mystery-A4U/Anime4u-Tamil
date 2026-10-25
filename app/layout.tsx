import "./style.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export const metadata={title:"Anime4u",description:"Anime4u — simple media index"};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body><div className="app-shell"><TopBar/>{children}<BottomNav/></div></body></html>
}

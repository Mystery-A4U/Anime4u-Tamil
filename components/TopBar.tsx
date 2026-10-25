export default function TopBar(){
 return <header className="topbar">
   <a href="/" className="brand" aria-label="Anime4u home"><img src="/assets/anime4u-logo.png" alt="Anime4u"/></a>
   <div className="top-actions">
     <a className="search-button" href="/search" aria-label="Search">
       <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l5 5"></path></svg>
       <span>Search</span>
     </a>
     <a className="signin" href="/login"><span>Sign in</span><b>↗</b></a>
   </div>
 </header>
}
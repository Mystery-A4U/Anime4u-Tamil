export default function TopBar(){
 return <header className="topbar">
   <div className="rose-petal-field" aria-hidden="true">
     <i className="petal p1"></i><i className="petal p2"></i><i className="petal p3"></i>
     <i className="petal p4"></i><i className="petal p5"></i><i className="petal p6"></i>
     <i className="petal p7"></i><i className="petal p8"></i><i className="petal p9"></i>
     <i className="petal p10"></i><i className="petal p11"></i><i className="petal p12"></i>
   </div>
   <a href="/" className="brand" aria-label="Anime4u home">
     <span className="brand-halo"></span>
     <img src="/assets/anime4u-logo.png" alt="Anime4u"/>
   </a>
   <div className="top-actions">
     <a className="search-button" href="/search" aria-label="Search">
       <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l5 5"></path></svg>
       <span>Search</span>
     </a>
     <a className="signin" href="/login"><span>Sign in</span><b>↗</b></a>
   </div>
 </header>
}
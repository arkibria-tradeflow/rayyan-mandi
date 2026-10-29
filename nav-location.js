/* Rayyan consistent mobile navigation + first-visit customer branch choice */
(()=>{
 const page=location.pathname.split("/").pop()||"index.html";
 const current=page==="book-table.html"?"book":page==="order.html"?"order":(page==="menu.html"||page==="official-menu.html")?"menu":"home";
 const icons={
 home:'<path d="m3 10 9-7 9 7v10H3zM9 20v-7h6v7"/>',
 menu:'<path d="M4 5h16M4 11h16M4 17h16M4 22h16"/>',
 book:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M14 14h3"/>',
 order:'<path d="M3 5h2l2 12h12l2-9H6M10 21h.01M18 21h.01"/>'
 };
 const entries=[["home","Home","index.html"],["menu","Menu","official-menu.html"],["book","Book Table","book-table.html"],["order","Order","order.html"]];
 const nav=document.querySelector('nav.nav[aria-label="Bottom navigation"]')||document.querySelector("nav.bottom");
 if(nav){
   nav.className="rayyan-four-nav";
   nav.setAttribute("aria-label","Bottom navigation");
   nav.innerHTML=entries.map(([key,text,url])=>'<a href="'+url+'"'+(current===key?' class="current" aria-current="page"':'')+'><svg viewBox="0 0 24 24" aria-hidden="true">'+icons[key]+'</svg><span>'+text+'</span></a>').join("");
 }
 if(page!=="index.html"&&page!=="")return;
 const layer=document.getElementById("branchOverlay");
 if(!layer)return;
 const key="rayyan_location_confirmed_v1";
 let locked=false;
 try{locked=!localStorage.getItem(key)}catch(e){locked=true}
 if(!locked)return;
 function preventExit(e){
   if(!locked)return;
   const dismissal=e.target.closest?.('[data-close="branchOverlay"],.sheet-close');
   if(dismissal || (e.target===layer)){
     e.preventDefault();e.stopImmediatePropagation();
   }
 }
 document.addEventListener("click",preventExit,true);
 document.addEventListener("keydown",e=>{
   if(locked && e.key==="Escape" && layer.classList.contains("open")){
     e.preventDefault();e.stopImmediatePropagation();
   }
 },true);
 layer.classList.add("rayyan-location-required");
 // Open after the existing page scripts have initialized the branch list.
 const opener=document.getElementById("activeBranchTop");
 if(opener && !layer.classList.contains("open")) opener.click();
 if(!layer.classList.contains("open")){
   layer.classList.add("open");
   layer.setAttribute("aria-hidden","false");
   document.body.style.overflow="hidden";
 }
 layer.querySelectorAll(".sheet-close").forEach(x=>x.setAttribute("aria-hidden","true"));
 layer.addEventListener("click",e=>{
   const opt=e.target.closest("[data-branch]");
   if(!opt)return;
   const id=opt.dataset.branch;
   try{
     localStorage.setItem("rayyan_branch",id);
     localStorage.setItem("rayyan_demo_branch",id);
     localStorage.setItem(key,"yes");
   }catch(err){}
   locked=false;
   layer.classList.remove("rayyan-location-required");
 });
})();

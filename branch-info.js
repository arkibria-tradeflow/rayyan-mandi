
(()=>{
if(!window.RayyanBranches)return;
const details=window.RayyanBranches;
details.forEach(detail=>{
 const b=branches.find(x=>x.id===detail.id);
 if(b)Object.assign(b,detail);
});
const menu=!!document.getElementById("menuArea");
const home=!!document.getElementById("branchesSection");
if(!menu&&!home)return;
const panel=document.createElement("section");
panel.className="r-branch-panel";panel.id="verifiedBranchPanel";
if(menu)document.getElementById("menuArea").insertAdjacentElement("afterbegin",panel);
else document.getElementById("branchesSection").insertAdjacentElement("afterend",panel);
const clean=s=>String(s).replace(/[&<>"]/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[x]));
function renderBranchPanel(){
 const b=details.find(x=>x.id===selected.id)||details[0], ar=lang==="ar";
 panel.innerHTML='<div class="r-eyebrow">'+(ar?"فرعك المختار":"YOUR SELECTED BRANCH")+'</div>'+
 '<h3>'+clean(ar?b.ar:b.name)+'</h3>'+
 '<p>⌖ '+clean(b.address)+'</p><div class="r-hours">◷ '+clean(ar?b.hoursAr:b.hours)+'</div>'+
 '<div class="r-branch-links"><a href="tel:'+b.phone+'">'+(ar?"اتصال":"☎ Call")+'</a><a href="'+window.rayyanMaps(b)+'" target="_blank" rel="noopener">'+(ar?"الاتجاهات":"↗ Maps")+'</a><a href="https://wa.me/'+b.wa+'?text='+encodeURIComponent("Hello Rayyan Mandi "+b.name+", could you confirm your menu and availability?")+'" target="_blank" rel="noopener">'+(ar?"واتساب":"WhatsApp")+'</a></div>'+
 '<a class="r-see-all" href="branches.html">'+(ar?"عرض جميع فروع الريان الستة ←":"Explore all six Rayyan branches →")+'</a>'+
 '<div class="r-hint">'+(ar?"ساعات العمل مأخوذة من قوائم عامة. تأكد قبل الزيارة.":"Hours are from public listings. Confirm with the restaurant before visiting.")+'</div>';
}
if(menu){
 const previous=refreshPrices;
 refreshPrices=function(){previous();renderBranchPanel()};
 document.getElementById("menuDirections").href=window.rayyanMaps(selected);
 const prevUpdateActions=typeof updateActions==="function"?updateActions:null;
 const panelObserver=new MutationObserver(()=>{const b=details.find(x=>x.id===selected.id);if(b){const directions=document.getElementById("menuDirections");if(directions && directions.href!==window.rayyanMaps(b))directions.href=window.rayyanMaps(b);}});
 panelObserver.observe(document.getElementById("selectedBranch"),{childList:true,subtree:true});
} else {
 const previous=updateBranch;
 updateBranch=function(){previous();renderBranchPanel()};
}
document.getElementById("navBranches")?.addEventListener("click",e=>{e.stopImmediatePropagation();e.preventDefault();location.href="branches.html"},true);
document.querySelector("#branchOverlay .sheet")?.insertAdjacentHTML("beforeend",'<div style="padding:14px 20px 24px;text-align:center"><a href="branches.html" style="font-size:13px;color:#835e36;text-decoration:underline">View addresses, hours &amp; directions for all 6 branches ↗</a></div>');
try{const id=localStorage.getItem("rayyan_demo_branch"),b=branches.find(x=>x.id===id);if(b)selected=b;}catch(e){}
if(menu){document.getElementById("selectedBranch").textContent=selected.name;document.getElementById("cartBranch").textContent=selected.name;refreshPrices();}
else updateBranch();
renderBranchPanel();
})();

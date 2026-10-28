
(()=>{
if(!document.getElementById("extendedMenu")||typeof products==="undefined")return;
// Public-domain CC0 photographs with source links. Representative photos; not photographs of Rayyan's own portions.
const files={
chicken:"Chicken Mandi Rice مندي دجاج.JPG",
haneeth:"Chicken fry piece mandi.jpg",
seafood:"Grilled fish.jpg",
rice:"Chicken Mandi Rice during Cooking.JPG",
salad:"Fattoush 1.JPG",
dessert:"Sweet3.jpg"
};
const links=Object.fromEntries(Object.entries(files).map(([key,file])=>[key,"https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file)+"?width=450"]));
const original=products.mandi?.image||"";
const mapping={
 mutton:original,
 chicken:links.chicken,
 haneeth:original,
 seafood:links.seafood,
 rice:links.rice,
 salad:links.salad,
 dessert:links.dessert
};
Object.keys(products).forEach(id=>{
 const p=products[id];
 if(id==="mandi"||id==="madbee")return; // Preserve Rayyan's actual menu illustrations.
 if(!p.group)return;
 if(mapping[p.group])p.image=mapping[p.group];
});
const area=document.getElementById("extendedMenu");
function enhance(){
 area.querySelectorAll(".rayyan-menu-card").forEach(card=>{
  const art=card.querySelector(".rayyan-menu-illustration");
  if(!art||art.dataset.photoReady)return;
  const p=products[card.dataset.id];if(!p||!p.image)return;
  art.dataset.photoReady="yes";art.classList.add("photo");
  art.replaceChildren();
  const img=document.createElement("img");img.alt="Illustrative "+p.group+" food photograph";img.loading="lazy";img.decoding="async";img.src=p.image;
  const backup=document.createElement("div");backup.className="photo-fallback";backup.textContent="✦";
  img.onerror=()=>{img.style.display="none";backup.style.display="grid"};
  art.append(img,backup);
 });
}
const caption=document.createElement("details");caption.className="rayyan-photo-credit";
caption.innerHTML='<summary>Photography &amp; menu image information</summary><p>Featured mutton photos are from Rayyan’s supplied printed menu. Additional food photos are real, illustrative photographs from Wikimedia Commons (CC0); they do not depict Rayyan’s own photographed portions. Please replace them with approved restaurant photos before official launch.</p>'+
 Object.entries(files).map(([group,file])=>'<a href="https://commons.wikimedia.org/wiki/File:'+encodeURIComponent(file)+'" target="_blank" rel="noopener">'+group+'</a>').join(" · ");
area.insertAdjacentElement("afterend",caption);
const observer=new MutationObserver(enhance);observer.observe(area,{childList:true,subtree:true});
enhance();
})();

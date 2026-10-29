
/* Real local WebP photography, mapped from Rayyan's curated public photo package. */
(()=>{
 if(!document.getElementById("extendedMenu") || typeof products==="undefined")return;
 const map=window.RayyanPhotoMap||{};
 const defaultArt=products.mandi&&products.mandi.image;
 for(const [id,path] of Object.entries(map)){
   if(products[id])products[id].image=path;
 }
 const area=document.getElementById("extendedMenu");
 const imageFail=()=>{ /* Browser image onerror handles the visual fallback. */ };
 function renderPhotos(){
   area.querySelectorAll(".rayyan-menu-card").forEach(card=>{
     const art=card.querySelector(".rayyan-menu-illustration");
     if(!art)return;
     const p=products[card.dataset.id];
     if(!p)return;
     const src=map[card.dataset.id];
     if(!src){return;}
     if(art.dataset.photoSrc===src)return;
     art.dataset.photoSrc=src;
     art.classList.add("photo");
     art.replaceChildren();
     const img=document.createElement("img");
     img.alt="Illustrative food photograph: "+p.name;
     img.loading="lazy";img.decoding="async";img.src=src;
     const fallback=document.createElement("span");
     fallback.className="photo-fallback";fallback.textContent="R";
     img.onerror=()=>{img.style.display="none";fallback.style.display="grid"};
     art.append(img,fallback);
   });
   document.querySelectorAll(".simple").forEach(card=>{
     const id=card.dataset.id,src=map[id];
     if(!src || card.querySelector(".rayyan-side-photo"))return;
     const img=document.createElement("img");
     img.src=src;img.alt="Representative photograph: "+products[id].name;
     img.className="rayyan-side-photo";img.loading="lazy";img.decoding="async";
     img.onerror=()=>img.remove();
     card.prepend(img);
   });
 }
 renderPhotos();
 const obs=new MutationObserver(renderPhotos);
 obs.observe(area,{childList:true,subtree:true});
 const last=document.querySelector(".rayyan-photo-credit");
 if(last)last.remove();
 const notes=document.createElement("details");
 notes.className="rayyan-photo-credit";
 notes.innerHTML='<summary>About the food photographs &amp; credits</summary>'+
 '<p>Rayyan’s original printed-menu featured dish photos remain. The additional images are real photographs of similar food from Wikimedia Commons, not official Rayyan product photos. Actual presentation may vary. Some photos are cropped and resized for the layout. Licensed images are credited in the downloadable package and <a href="data/photo-credits.csv" target="_blank" rel="noopener">source/credits register</a>.</p>';
 area.insertAdjacentElement("afterend",notes);
})();

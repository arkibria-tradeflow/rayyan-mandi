
/* Rayyan expanded menu: public Al Rigga delivery-menu data; demo prices require confirmation */
(()=>{
 const rows=[
 ["Local Mandi Meat","لحم مندي محلي",75,"mutton"],
 ["Local Meat Muhammara","لحم محمّر محلي",75,"mutton"],
 ["Local Meat Moqalqal","مقلقل لحم محلي",75,"mutton"],
 ["Local Mutton Madhbi","لحم مظبي محلي",75,"mutton"],
 ["Meat Salona with Bread","صالونة لحم مع خبز",75,"mutton"],
 ["Chicken Mandi","دجاج مندي",45,"chicken"],
 ["Chicken Madbee","دجاج مظبي",49,"chicken"],
 ["Chicken Madfoon","دجاج مدفون",49,"chicken"],
 ["Chicken Mohammer","دجاج محمّر",49,"chicken"],
 ["Chicken Mugalkal","مقلقل دجاج",49,"chicken"],
 ["Chicken Madghout","دجاج مضغوط",49,"chicken"],
 ["Chicken Curry with Kuboos","كاري دجاج مع خبز",49,"chicken"],
 ["Homemade Haneeth Meat Shoulder","حنيذ كتف لحم",105,"haneeth"],
 ["Homemade Haneeth Meat Ribs","حنيذ ريش لحم",105,"haneeth"],
 ["Homemade Haneeth Madfoon Meat Ribs","حنيذ مدفون ريش لحم",105,"haneeth"],
 ["Homemade Haneeth Madfoon Meat Shoulder","حنيذ مدفون كتف لحم",105,"haneeth"],
 ["Hammour Mandi","هامور مندي",39,"seafood"],
 ["Seabream","سمك دنيس",65,"seafood"],
 ["Sheri Fish Mandi","سمك شعري مندي",69,"seafood"],
 ["King Fish Mandi","سمك كنعد مندي",69,"seafood"],
 ["Grilled Prawns with Rice","روبيان مشوي مع الأرز",69,"seafood"],
 ["Rice Mandi","أرز مندي",20,"rice"],
 ["Rice Madghout","أرز مضغوط",20,"rice"],
 ["Vegetable Madghout","مضغوط خضار",50,"rice"],
 ["Yogurt Salad","سلطة الزبادي",10,"salad"],
 ["Arabic Salad","سلطة عربية",19,"salad"],
 ["Fattoush Salad","سلطة فتوش",19,"salad"],
 ["Jarjeer Salad","سلطة جرجير",19,"salad"],
 ["Tomato Sauce","صلصة طماطم",5,"salad"],
 ["Green Sauce Aspic","صلصة خضراء",7,"salad"],
 ["Kunafa","كنافة",20,"dessert"],
 ["Lokaymat Sweets","لقيمات",20,"dessert"]
 ];
 const categories={mutton:["Mutton","اللحم"],chicken:["Chicken","الدجاج"],haneeth:["Haneeth","الحنيذ"],seafood:["Seafood","الأسماك"],rice:["Rice & vegetables","الأرز والخضروات"],salad:["Salads & sides","السلطات والإضافات"],dessert:["Desserts","الحلويات"]};
 const symbols={mutton:"✥",chicken:"✦",haneeth:"✥",seafood:"≈",rice:"✧",salad:"❋",dessert:"✳"};
 const escapeHTML=s=>String(s).replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[x]));
 const img='<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130"><rect width="130" height="130" rx="16" fill="#f0e4d1"/><circle cx="65" cy="52" r="33" fill="none" stroke="#b89355" stroke-width="2"/><path d="M65 28Q84 51 65 77Q46 51 65 28" fill="none" stroke="#b89355" stroke-width="2"/><text x="65" y="110" font-size="14" font-family="Georgia" text-anchor="middle" fill="#8d673b">RAYYAN</text></svg>';
 const placeholder="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(img);
 const extras=rows.map((r,i)=>({id:"extra"+i,name:r[0],ar:r[1],price:r[2],group:r[3],image:placeholder,source:"Al Rigga delivery menu"}));
 extras.forEach(p=>products[p.id]=p);
 products.mandi.group="mutton";products.madbee.group="mutton";
 products.madfoon={name:"Mutton Madfoon",ar:"لحم مدفون",price:64,group:"mutton",image:placeholder,source:"printed"};
 products.madghout={name:"Mutton Madghout",ar:"لحم مضغوط",price:64,group:"mutton",image:placeholder,source:"printed"};
 document.querySelectorAll(".dish").forEach(n=>n.dataset.group="mutton");
 document.querySelectorAll(".simple").forEach((n,i)=>{
   let id=i===0?"madfoon":"madghout";n.dataset.id=id;n.dataset.group="mutton";
   let button=document.createElement("button");button.type="button";button.className="add";button.textContent="+";
   button.style.cssText="min-width:32px;height:32px;margin-inline-start:10px;border-radius:9px";
   button.setAttribute("aria-label","Add "+products[id].name);button.onclick=()=>add(id);n.appendChild(button);
 });
 const section=document.createElement("section");section.id="extendedMenu";section.className="rayyan-menu-additions";
 document.getElementById("moreBlock").insertAdjacentElement("afterend",section);
 const actions=document.createElement("div");actions.className="rayyan-actions";actions.innerHTML='<a id="menuCall" href="tel:042980070">☎ <span>Call branch</span></a><a id="menuDirections" href="#" target="_blank" rel="noopener">⌖ <span>Get directions</span></a>';
 section.insertAdjacentElement("afterend",actions);
 const filters=document.getElementById("filters");
 const tabs=[["all","All dishes","الكل"],["mutton","Mutton","لحم"],["chicken","Chicken","دجاج"],["haneeth","Haneeth","حنيذ"],["seafood","Seafood","أسماك"],["rice","Rice","أرز"],["salad","Salads","سلطات"],["dessert","Desserts","حلويات"]];
 filters.innerHTML=tabs.map(r=>'<button type="button" class="filter'+(r[0]==="all"?" selected":"")+'" data-filter="'+r[0]+'" data-en="'+r[1]+'" data-ar="'+r[2]+'">'+r[1]+'</button>').join("");
 filters.querySelectorAll("button").forEach(btn=>btn.onclick=()=>{filter=btn.dataset.filter;filters.querySelectorAll("button").forEach(b=>b.classList.toggle("selected",b===btn));search()});
 const t={en:{k:"MORE FROM OUR KITCHEN",title:"More to discover.",desc:"Explore chicken, haneeth, seafood, salads and sweet favorites.",note:"Client demo: four classic mutton prices are taken from the supplied printed menu. Other UAE prices are indicative Al Rigga delivery prices, and may vary by branch. Confirm prices, portions and availability directly with Rayyan.",count:"DISHES",ask:"Ask price",call:"Call branch",directions:"Get directions",source:"Al Rigga menu reference"},ar:{k:"المزيد من مطبخنا",title:"نكهات أكثر لاكتشافها.",desc:"اكتشف الدجاج والحنيذ والأسماك والسلطات والحلويات.",note:"قائمة تجريبية: أسعار أطباق اللحم الأربعة من القائمة المطبوعة، والأسعار الأخرى استرشادية من قائمة توصيل فرع الرقة وقد تختلف حسب الفرع. يرجى التأكد من الأسعار والتوفر لدى الريان.",count:"طبق",ask:"اسأل عن السعر",call:"اتصل بالفرع",directions:"الاتجاهات",source:"مرجع قائمة الرقة"}};
 function renderExtra(){
  const z=t[lang],countryQ=selected.country==="qatar";let text='<div class="rayyan-kicker">'+z.k+'</div><div class="rayyan-catalog-intro"><div><h2>'+z.title+'</h2><p>'+z.desc+'</p></div><div class="rayyan-menu-count">'+Object.keys(products).length+'<small>'+z.count+'</small></div></div><div id="rayyanCategories">';
  Object.keys(categories).forEach(cat=>{
   const group=extras.filter(p=>p.group===cat);
   text+='<div class="rayyan-group" data-category="'+cat+'"><div class="rayyan-group-head"><h3>'+categories[cat][lang==="ar"?1:0]+'</h3><small>'+group.length+' '+z.count.toLowerCase()+'</small></div><div class="rayyan-menu-grid">';
   group.forEach(p=>{
    text+='<article class="rayyan-menu-card" data-id="'+p.id+'" data-group="'+p.group+'" data-terms="'+escapeHTML((p.name+" "+p.ar).toLowerCase())+'"><div class="rayyan-menu-illustration"><strong>'+symbols[cat]+'</strong><small>RAYYAN</small></div>';
    text+='<div class="rayyan-menu-text" role="button" tabindex="0" data-detail="'+p.id+'"><h4>'+escapeHTML(lang==="ar"?p.ar:p.name)+'</h4><span class="rayyan-ar">'+escapeHTML(lang==="ar"?p.name:p.ar)+'</span><p>'+(lang==="ar"?"من قائمة مطعم الريان.":"From Rayyan's menu.")+'</p></div>';
    text+='<div class="rayyan-menu-meta"><span class="rayyan-menu-price">'+(countryQ?z.ask:'<small>AED </small>'+p.price)+'</span><button type="button" class="rayyan-menu-add" data-add="'+p.id+'" aria-label="Add '+escapeHTML(p.name)+'">+</button></div></article>';
   });
   text+='</div></div>';
  });
  text+='</div><div class="rayyan-menu-disclosure"><span>✧</span><p>'+z.note+' <a href="https://www.talabat.com/uae/restaurant/613815/rayyan-mandi-restaurant-al-rigga" target="_blank" rel="noopener">'+z.source+' ↗</a></p></div>';
  section.innerHTML=text;
  section.querySelectorAll("[data-add]").forEach(btn=>btn.onclick=()=>add(btn.dataset.add));
  section.querySelectorAll("[data-detail]").forEach(n=>{n.onclick=()=>openDetail(n.dataset.detail);n.onkeydown=e=>{if(e.key==="Enter"){openDetail(n.dataset.detail)}}});
  search();
 }
 function updateActions(){
  document.getElementById("menuCall").href="tel:"+selected.phone.replace(/[^+\d]/g,"");
  document.getElementById("menuDirections").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent("Rayyan Mandi Restaurant "+selected.name+" "+(selected.country==="qatar"?"Doha Qatar":"Dubai"));
  document.querySelector("#menuCall span").textContent=t[lang].call;
  document.querySelector("#menuDirections span").textContent=t[lang].directions;
 }
 search=function(){
  const q=document.getElementById("searchInput").value.trim().toLowerCase();let any=false;
  document.querySelectorAll(".dish,.simple,.rayyan-menu-card").forEach(n=>{
   const p=products[n.dataset.id],terms=(n.dataset.terms||"")+" "+(p?.name||"")+" "+(p?.ar||"");
   const match=(filter==="all"||filter===n.dataset.group)&&(!q||terms.toLowerCase().includes(q));
   n.classList.toggle("hidden",!match);any=any||match;
  });
  const hasHero=!!document.querySelector(".dish:not(.hidden)");
  document.getElementById("dishes").classList.toggle("hidden",!hasHero);
  document.getElementById("dishes").previousElementSibling.classList.toggle("hidden",!hasHero);
  document.getElementById("moreBlock").classList.toggle("hidden",!document.querySelector(".simple:not(.hidden)"));
  section.querySelectorAll(".rayyan-group").forEach(n=>n.classList.toggle("hidden",!n.querySelector(".rayyan-menu-card:not(.hidden)")));
  section.classList.toggle("hidden",!section.querySelector(".rayyan-menu-card:not(.hidden)"));
  document.getElementById("noResults").classList.toggle("hidden",any);
 };
 const oldSetLanguage=setLanguage;
 setLanguage=function(next){
  oldSetLanguage(next);
  filters.querySelectorAll("button").forEach(b=>b.textContent=b.dataset[next==="ar"?"ar":"en"]);
  renderExtra();updateActions();
  const note=document.querySelector(".more .notice");
  if(note)note.textContent=next==="ar"?"أسعار الأطباق الأربعة الأساسية من القائمة المطبوعة. يرجى تأكيد الأسعار والتوفر لدى الفرع.":"The four classic mutton dishes use prices from the supplied printed menu. Confirm final prices and availability with the branch.";
 };
 const oldRefreshPrices=refreshPrices;
 refreshPrices=function(){
  oldRefreshPrices();renderExtra();updateActions();
  try{localStorage.setItem("rayyan_demo_branch",selected.id)}catch(e){}
 };
 openWA=function(){
  const entries=Object.entries(cart).filter(([,n])=>n>0);if(!entries.length)return;
  const total=entries.reduce((sum,[id,n])=>sum+products[id].price*n,0);
  const msg="Hello Rayyan Mandi Restaurant,\nI would like to inquire about ordering from your "+selected.name+" branch:\n"+entries.map(([id,n])=>"- "+products[id].name+" × "+n).join("\n")+"\n\n"+(selected.country==="qatar"?"Please confirm local prices and availability.":"Indicative subtotal: AED "+total+". Some prices are from Al Rigga's delivery listing and may vary by branch.")+"\nPlease confirm the final total, portions and delivery or pickup options. Thank you.";
  window.open("https://wa.me/"+selected.wa+"?text="+encodeURIComponent(msg),"_blank","noopener");
 };
 document.getElementById("sendWhatsApp").onclick=openWA;
 try{
  const id=localStorage.getItem("rayyan_demo_branch"),found=branches.find(b=>b.id===id);
  if(found){selected=found;document.getElementById("selectedBranch").textContent=found.name;document.getElementById("cartBranch").textContent=found.name;}
 }catch(e){}
 setLanguage(lang);refreshPrices();
 const category=new URLSearchParams(window.location.search).get('category');
 if(category){const button=Array.from(filters.querySelectorAll('button')).find(b=>b.dataset.filter===category);if(button)button.click();}
})();

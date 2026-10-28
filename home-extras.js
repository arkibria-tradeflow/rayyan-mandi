
/* Rayyan homepage: tasteful category discovery and shared branch selection */
(()=>{
 const groups=[
  ["mutton","Mutton specialties","أطباق اللحم","✥"],
  ["chicken","Chicken favorites","أطباق الدجاج","✦"],
  ["haneeth","Slow-cooked Haneeth","الحنيذ","✥"],
  ["seafood","Seafood","الأسماك","≈"],
  ["rice","Rice & vegetables","الأرز والخضار","✧"],
  ["salad","Salads & sides","السلطات والإضافات","❋"],
  ["dessert","Desserts","الحلويات","✳"]
 ];
 const content={en:{label:"FROM OUR KITCHEN",title:"Something for every table.",desc:"Discover the rest of Rayyan's menu, from traditional mandi to seafood and sweet favorites.",all:"Explore the complete menu"},ar:{label:"من مطبخنا",title:"نكهات تناسب كل مائدة.",desc:"اكتشف قائمة الريان من أطباق المندي إلى الأسماك والحلويات.",all:"استكشف القائمة الكاملة"}};
 const section=document.createElement("section");section.className="rayyan-home-categories";section.id="exploreMenuCategories";
 document.getElementById("menuSection").insertAdjacentElement("afterend",section);
 function displayGroups(){
  const x=content[lang];
  let out='<div class="label">'+x.label+'</div><h2>'+x.title+'</h2><p>'+x.desc+'</p><div class="rayyan-home-category-grid">';
  groups.forEach(g=>out+='<a class="rayyan-home-category" href="menu.html?category='+g[0]+'"><b>'+g[lang==="ar"?2:1]+'</b><span aria-hidden="true">'+g[3]+'</span></a>');
  out+='</div><a class="rayyan-home-all" href="menu.html">'+x.all+' ↗</a>';
  section.innerHTML=out;
 }
 const oldSetLang=setLang;
 setLang=function(next){oldSetLang(next);displayGroups()};
 const oldUpdateBranch=updateBranch;
 updateBranch=function(){
  oldUpdateBranch();
  try{localStorage.setItem("rayyan_demo_branch",selected.id)}catch(e){}
 };
 try{
  const remembered=localStorage.getItem("rayyan_demo_branch"),found=branches.find(b=>b.id===remembered);
  if(found)selected=found;
 }catch(e){}
 updateBranch();displayGroups();
})();

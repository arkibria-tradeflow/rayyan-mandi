
/* Connect legacy Rayyan menu basket with the new guided order review screen. */
(()=>{
const isMenu=!!document.getElementById("menuArea");
const isHome=!!document.getElementById("menuSection")&&!isMenu;
if(!isMenu&&!isHome)return;
const key="rayyan_demo_cart_v2";
function persist(){
 const current=[];
 for(const [id,qty] of Object.entries(cart)){
  if(!qty||!products[id])continue;
  const p=products[id];
  current.push({id,name:p.name,ar:p.ar||p.name,price:p.price,qty});
 }
 try{
  let saved={};try{saved=JSON.parse(localStorage.getItem(key)||"{}")}catch(e){}
  const items=isHome&&Array.isArray(saved.items)
   ?[...saved.items.filter(p=>!current.some(c=>c.id===p.id)),...current]
   :current;
  localStorage.setItem(key,JSON.stringify({items,branchId:selected.id,updatedAt:new Date().toISOString()}));
  localStorage.setItem("rayyan_demo_branch",selected.id);
 }catch(e){}
}
if(isMenu){
 try{
  const saved=JSON.parse(localStorage.getItem(key)||"{}");
  if(saved&&Array.isArray(saved.items))saved.items.forEach(p=>{
   if(products[p.id]&&Number.isInteger(Number(p.qty))&&Number(p.qty)>0&&Number(p.qty)<=99)cart[p.id]=Number(p.qty);
  });
 }catch(e){}
}
const originalAdd=add;
add=function(id){originalAdd(id);persist()};
const originalRender=renderCart;
renderCart=function(){originalRender();persist()};
if(typeof count==="function"&&isMenu){count();renderCart()}
if(isHome&&typeof updateCartCount==="function")updateCartCount();
const action=document.getElementById("sendWhatsApp");
if(action){
 action.onclick=()=>{if(!Object.values(cart).some(q=>q>0))return;persist();location.href="order.html"};
 const span=action.querySelector("span");if(span){span.textContent="Review your order →";span.dataset.t="review";span.dataset.i18n="review"}
}
const buttons=document.querySelectorAll("#cartOverlay .sheet p");
buttons.forEach(p=>{if((p.textContent||"").toLowerCase().includes("automatically"))p.textContent="Client demo: review customer and delivery details before opening WhatsApp. Nothing is sent automatically."});
document.addEventListener("click",e=>{
 if(e.target.closest("#sendWhatsApp")){e.preventDefault();e.stopImmediatePropagation();persist();if(Object.values(cart).some(q=>q>0))location.href="order.html"}
},true);
window.addEventListener("pagehide",persist);
})();

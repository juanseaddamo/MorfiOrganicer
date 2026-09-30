"use strict";
/* ---------- ingredient master ---------- */
const ING={
  pollo:{n:"Pechuga de pollo",sec:"carniceria",f:1.35,u:"g"},
  patamuslo:{n:"Pata-muslo (con hueso)",sec:"carniceria",f:1.7,u:"g"},
  bife:{n:"Bife magro",sec:"carniceria",f:1.3,u:"g"},
  picada:{n:"Carne picada magra",sec:"carniceria",f:1.3,u:"g"},
  huevo:{n:"Huevos",sec:"lacteos",f:1,u:"u"},
  claras:{n:"Claras de huevo",sec:"lacteos",f:1,u:"g"},
  yogur:{n:"Yogur alto en proteína",sec:"lacteos",f:1,u:"g"},
  jamon:{n:"Jamón cocido",sec:"lacteos",f:1,u:"g"},
  queso:{n:"Queso",sec:"lacteos",f:1,u:"g"},
  arroz:{n:"Arroz",sec:"almacen",f:0.33,u:"g"},
  fideos:{n:"Fideos",sec:"almacen",f:0.45,u:"g"},
  lentejas:{n:"Lentejas secas",sec:"almacen",f:0.4,u:"g"},
  panrallado:{n:"Pan rallado",sec:"almacen",f:1,u:"g"},
  tostadas:{n:"Tostadas de arroz",sec:"almacen",f:1,u:"u"},
  pastamani:{n:"Pasta de maní",sec:"almacen",f:1,u:"g"},
  tortilla:{n:"Tortillas (tacos/wrap)",sec:"panaderia",f:1,u:"g"},
  panham:{n:"Pan de hamburguesa",sec:"panaderia",f:1,u:"u"},
  pan:{n:"Pan (sándwich)",sec:"panaderia",f:1,u:"u"},
  tapatarta:{n:"Tapa de tarta",sec:"panaderia",f:1,u:"u"},
  tomate:{n:"Tomate",sec:"verduleria",f:1,u:"g"},
  lechuga:{n:"Lechuga",sec:"verduleria",f:1,u:"g"},
  zanahoria:{n:"Zanahoria",sec:"verduleria",f:1,u:"g"},
  rucula:{n:"Rúcula",sec:"verduleria",f:1,u:"g"},
  palta:{n:"Palta",sec:"verduleria",f:1,u:"g"},
  cebolla:{n:"Cebolla",sec:"verduleria",f:1,u:"g"},
  calabaza:{n:"Calabaza",sec:"verduleria",f:1,u:"g"},
  papa:{n:"Papa",sec:"verduleria",f:1,u:"g"},
  aceite:{n:"Aceite",sec:"basicos",f:1,u:"g"},
  salsa:{n:"Salsa de tomate",sec:"basicos",staple:1},
  cafe:{n:"Café",sec:"basicos",staple:1},
  condimento:{n:"Sal / limón / vinagre",sec:"basicos",staple:1},
};
const SECTIONS=[
  {id:"carniceria",n:"Carnicería y pollería",fresh:1},
  {id:"verduleria",n:"Verdulería",fresh:1},
  {id:"lacteos",n:"Lácteos y fiambres",fresh:1},
  {id:"panaderia",n:"Panadería",fresh:1},
  {id:"almacen",n:"Almacén (seco)",fresh:0},
  {id:"basicos",n:"Básicos y a gusto",fresh:0},
];

const M=(id,cat,name,kcal,prot,ings,extra={})=>({id,cat,name,kcal,prot,ings,...extra});
const MEALS=[
  M("d1","des","Huevos, tostadas y palta",370,35,[["huevo",2],["claras",180],["tostadas",2],["palta",40],["cafe",1]],{note:"Variante económica: sacá la palta y sumá otra tostada."}),
  M("d2","des","Yogur, pasta de maní y tostadas",340,35,[["yogur",300],["pastamani",15],["tostadas",2],["cafe",1]]),
  M("m1","mer","Huevos y tostadas",350,37,[["huevo",2],["claras",200],["tostadas",3],["cafe",1]]),
  M("m2","mer","Yogur y pasta de maní",370,36,[["yogur",300],["pastamani",20],["tostadas",2],["cafe",1]]),
  M("a1","alm","Pechuga con arroz y ensalada",650,63,[["pollo",180],["arroz",200],["tomate",150],["lechuga",80],["aceite",5],["condimento",1]],{sal:"Ensalada 1"}),
  M("a2","alm","Bife con papas y ensalada",650,59,[["bife",200],["papa",200],["tomate",150],["lechuga",80],["condimento",1]],{sal:"Ensalada 1"}),
  M("a3","alm","Carne picada con arroz",660,55,[["picada",190],["arroz",170],["tomate",120],["zanahoria",60]]),
  M("a4","alm","Fideos con carne picada",665,55,[["picada",150],["fideos",170],["salsa",1],["queso",10]]),
  M("a5","alm","Guiso de lentejas con pollo",640,63,[["lentejas",250],["pollo",120],["papa",80],["zanahoria",40],["cebolla",40]]),
  M("a6","alm","Tacos de pollo",650,64,[["pollo",150],["tortilla",100],["queso",20],["tomate",40],["lechuga",30]]),
  M("a7","alm","Milanesa de pollo con puré",650,63,[["pollo",180],["panrallado",30],["aceite",5],["papa",200]],{note:"Al horno o air fryer con el aceite medido. Nada de fritura profunda."}),
  M("a8","alm","Hamburguesa casera completa",670,60,[["picada",180],["panham",1],["queso",20],["tomate",30],["lechuga",20]]),
  M("c1","cen","Pata-muslo con papas y cebolla",655,57,[["patamuslo",200],["papa",200],["cebolla",60]],{note:"200 g = carne cocida sin hueso (≈300–350 g crudos con hueso)."}),
  M("c2","cen","Albóndigas con puré",650,55,[["picada",190],["papa",200],["salsa",1]]),
  M("c3","cen","Fideos con pollo",640,65,[["pollo",150],["fideos",200],["salsa",1],["queso",15]]),
  M("c4","cen","Tortilla de papa proteica",655,62,[["huevo",3],["claras",200],["papa",200],["cebolla",50],["jamon",80]]),
  M("c5","cen","Burrito de pollo",650,58,[["pollo",130],["tortilla",70],["arroz",80],["queso",20],["tomate",40],["lechuga",30],["cebolla",20]]),
  M("c6","cen","Sándwich de milanesa",640,60,[["pollo",150],["panrallado",25],["aceite",5],["pan",1],["tomate",40],["lechuga",20]],{note:"Cuidá aceite, tamaño del pan y salsas. Mayonesa light y medida."}),
  M("c7","cen","Papa rellena con pollo",660,63,[["papa",350],["pollo",150],["queso",20],["cebolla",30]]),
  M("c8","cen","Tarta de pollo y calabaza (porción)",660,62,[["pollo",150],["calabaza",200],["queso",20],["huevo",0.67],["tapatarta",0.34]],{note:"Hacé la tarta entera y dividila en 3. Esta es 1 porción."}),
];
const MEAL=Object.fromEntries(MEALS.map(m=>[m.id,m]));
const CATS=[["des","Desayuno"],["alm","Almuerzo"],["mer","Merienda"],["cen","Cena"]];
const CATNAME=Object.fromEntries(CATS);
const DAYS=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const DAYS_SHORT=["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];
const DEF_DAYS=[0,1,2,3,4];
const ROT=[ // rotation used by autocompletar, applied to active days in order
  ["d1","a3","m2","c2"],["d2","a2","m1","c5"],["d1","a7","m1","c1"],
  ["d2","a1","m2","c3"],["d1","a5","m1","c7"],["d2","a6","m2","c4"],["d1","a8","m1","c8"],
];

/* ---------- state + store (persistencia: solo localStorage) ---------- */
const state={tab:"week",week:{},days:DEF_DAYS.slice(),products:[],customMeals:[],checked:{},
  calc:{mode:"g2m",target:"prot",prod:""},
  mealsCat:"alm",
  builder:{id:null,name:"",cat:"alm",components:[]}};
let MODE="loading";
const LS={week:"cs_week2",prod:"cs_prod",meals:"cs_meals",chk:"cs_checked"};

function lsGet(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function dayKey(di,c){return di+"-"+c;}

function initStore(){
  MODE=(function(){try{localStorage.setItem("__t","1");localStorage.removeItem("__t");return "local";}catch(e){return "memory";}})();
  const wk=lsGet(LS.week,null);
  if(wk){state.week=wk.slots||{};state.days=Array.isArray(wk.days)?wk.days:DEF_DAYS.slice();}
  state.products=lsGet(LS.prod,[]);
  state.customMeals=(lsGet(LS.meals,[])||[]).map(m=>({custom:true,...m}));
  state.checked=lsGet(LS.chk,{});
  renderAll();
  showFallbackBanner();
}
function showFallbackBanner(){
  if(MODE==="local")return;
  const msg="No se pudo guardar: los cambios se perderán al cerrar (el navegador bloqueó el almacenamiento local).";
  const b=document.createElement("div");b.className="banner";b.style.background="var(--amber-soft)";b.style.color="var(--amber)";
  b.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg><span>'+msg+'</span>';
  const t=document.querySelector("#tab-week");t.insertBefore(b,t.firstChild);
}

/* writes — optimistic: state already mutated by caller, render immediately, then persist */
function saveWeek(){lsSet(LS.week,{slots:state.week,days:state.days});}
function saveChecked(){lsSet(LS.chk,state.checked);}
function upsertProduct(p){
  if(p.id){const i=state.products.findIndex(x=>x.id===p.id);if(i>=0)state.products[i]=p;}
  else{p.id="p"+Date.now();p.createdAt=Date.now();state.products.push(p);}
  lsSet(LS.prod,state.products);renderAll();
}
function deleteProduct(id){
  state.products=state.products.filter(p=>p.id!==id);lsSet(LS.prod,state.products);renderAll();
}
function upsertMeal(m){
  if(m.id){const i=state.customMeals.findIndex(x=>x.id===m.id);if(i>=0)state.customMeals[i]=m;}
  else{m.id="cm"+Date.now();m.custom=true;m.createdAt=Date.now();state.customMeals.push(m);}
  lsSet(LS.meals,state.customMeals);renderAll();
}
function deleteMeal(id){
  state.customMeals=state.customMeals.filter(m=>m.id!==id);lsSet(LS.meals,state.customMeals);renderAll();
  // remove from any week slot
  let changed=false;
  for(const k in state.week){if(state.week[k]===id){delete state.week[k];changed=true;}}
  if(changed){saveWeek();}
}

/* photo */
function compressImage(file,maxDim=900,q=0.6){
  return new Promise((res,rej)=>{
    const img=new Image();const url=URL.createObjectURL(file);
    img.onload=()=>{URL.revokeObjectURL(url);let w=img.width,h=img.height;const s=Math.min(1,maxDim/Math.max(w,h));w=Math.round(w*s);h=Math.round(h*s);
      const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(img,0,0,w,h);
      c.toBlob(b=>b?res(b):rej(new Error("blob")),"image/jpeg",q);};
    img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error("img"));};img.src=url;
  });
}
function blobToDataURL(b){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(b);});}
function photoSrc(p){return (p&&p.photoData)||null;}

/* ---------- meal helpers ---------- */
function prodById(id){return state.products.find(p=>p.id===id);}
function mealById(id){return MEAL[id]||state.customMeals.find(m=>m.id===id)||null;}
function mealsInCat(cat){return MEALS.filter(m=>m.cat===cat).concat(state.customMeals.filter(m=>m.cat===cat));}
function mealNutrition(m){
  if(!m)return {kcal:0,prot:0,carbs:0,fat:0};
  if(!m.custom)return {kcal:m.kcal,prot:m.prot,carbs:m.carbs||0,fat:m.fat||0};
  let k=0,p=0,c=0,f=0;
  for(const comp of (m.components||[])){
    const pr=prodById(comp.productId);if(!pr)continue;
    const per=+pr.per||100,g=+comp.grams||0;
    k+=(+pr.kcal||0)/per*g;p+=(+pr.protein||0)/per*g;c+=(+pr.carbs||0)/per*g;f+=(+pr.fat||0)/per*g;
  }
  return {kcal:Math.round(k),prot:Math.round(p*10)/10,carbs:Math.round(c),fat:Math.round(f)};
}

/* ---------- render ---------- */
function renderAll(){renderWeek();renderShop();renderMeals();renderBuilder();renderProducts();}

function renderWeek(){
  // day toggles
  const dt=document.getElementById("daytoggle");
  dt.innerHTML=DAYS_SHORT.map((d,i)=>`<button data-day="${i}" class="${state.days.includes(i)?"on":""}">${d}</button>`).join("");
  // days
  const wrap=document.getElementById("days");
  const active=state.days.slice().sort((a,b)=>a-b);
  let filled=0,slots=0,tk=0,tp=0,fullDays=0;
  const parts=active.map(di=>{
    let k=0,p=0,has=false;
    CATS.forEach(([c])=>{const m=mealById(state.week[dayKey(di,c)]);if(m){const n=mealNutrition(m);k+=n.kcal;p+=n.prot;has=true;filled++;}slots++;});
    if(has){tk+=k;tp+=p;fullDays++;}
    const dot=has?statusDot(k,p):null;
    const sl=CATS.map(([c,cn])=>{
      const m=mealById(state.week[dayKey(di,c)]);
      const n=m?mealNutrition(m):null;
      return `<button class="slot" data-slot="${dayKey(di,c)}">
        <span class="slabel">${cn.slice(0,3)}</span>
        <span class="sname ${m?"":"empty"}">${m?escapeHtml(m.name):"Elegir…"}</span>
        ${m?`<span class="smac tnum">${n.kcal} · ${Math.round(n.prot)}g</span>`:'<svg class="plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>'}
      </button>`;
    }).join("");
    return `<div class="day">
      <div class="day-top">
        <span class="dname">${DAYS[di]}</span>
        ${has?`<span class="day-tot"><span class="smac tnum" style="color:var(--muted);font-weight:700;font-size:12px">${k} kcal · ${Math.round(p)} g</span><span class="dot ${dot}"></span></span>`:'<span class="faint" style="font-size:12px">sin planificar</span>'}
      </div>${sl}</div>`;
  }).join("");
  wrap.innerHTML=active.length?parts:'<div class="empty"><p>No hay días activos. Tocá un día arriba para activarlo.</p></div>';
  document.getElementById("avg-kcal").textContent=fullDays?Math.round(tk/fullDays):"—";
  document.getElementById("avg-prot").textContent=fullDays?Math.round(tp/fullDays):"—";
  document.getElementById("wk-count").textContent=filled+"/"+slots+" comidas";
}
function statusDot(k,p){
  if(k>=1900&&k<=2100&&p>=175)return "ok";
  if(k>=1750&&k<=2250&&p>=150)return "warn";
  return "bad";
}

function buildShopping(){
  const ingBuy={},prodBuy={};
  for(const di of state.days){
    for(const [c] of CATS){
      const m=mealById(state.week[dayKey(di,c)]);if(!m)continue;
      if(m.custom){for(const comp of (m.components||[])){if(!comp.productId)continue;prodBuy[comp.productId]=(prodBuy[comp.productId]||0)+(+comp.grams||0);}}
      else{for(const [ik,q] of m.ings){ingBuy[ik]=(ingBuy[ik]||0)+q;}}
    }
  }
  return {ingBuy,prodBuy};
}
function fmtBuy(ik,cooked){
  const g=ING[ik];if(!g||g.staple)return "";
  const raw=cooked*(g.f||1);
  if(g.u==="u")return Math.ceil(raw-1e-9)+" u";
  const r=Math.max(10,Math.round(raw/10)*10);
  return r>=1000?(r/1000).toFixed(r%1000?1:0).replace(".",",")+" kg":r+" g";
}
function fmtGrams(g){const r=Math.max(5,Math.round(g/5)*5);return r>=1000?(r/1000).toFixed(r%1000?1:0).replace(".",",")+" kg":r+" g";}
function renderShop(){
  const wrap=document.getElementById("shoplist");
  const {ingBuy,prodBuy}=buildShopping();
  const ikeys=Object.keys(ingBuy),pkeys=Object.keys(prodBuy);
  if(!ikeys.length&&!pkeys.length){wrap.innerHTML='<div class="empty"><svg viewBox="0 0 24 24"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6 5 3H2"/></svg><p>Planificá comidas en <b>Semana</b> y acá aparece la lista.</p></div>';return;}
  let html="";
  for(const sec of SECTIONS){
    const items=ikeys.filter(k=>ING[k]&&ING[k].sec===sec.id);
    if(!items.length)continue;
    items.sort((a,b)=>ING[a].n.localeCompare(ING[b].n));
    html+=`<div class="shop-sec"><h3>${sec.n} <span class="tag ${sec.fresh?"fresh":"dry"}">${sec.fresh?"fresco":"stock"}</span></h3>`;
    for(const ik of items){
      const g=ING[ik],key="i-"+ik,done=state.checked[key]?"done":"",q=fmtBuy(ik,ingBuy[ik]);
      html+=`<div class="sitem ${done}" data-chk="${key}">
        <span class="ck"><svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6"/></svg></span>
        <span class="sn">${g.n}${ik==="patamuslo"?'<span class="snote"> — para 200 g de carne</span>':""}</span>
        <span class="sq tnum">${q||'<span class="snote">a gusto</span>'}</span></div>`;
    }
    html+="</div>";
  }
  if(pkeys.length){
    html+=`<div class="shop-sec"><h3>Tus productos <span class="tag you">tus comidas</span></h3>`;
    const rows=pkeys.map(id=>({id,p:prodById(id),g:prodBuy[id]})).filter(r=>r.p).sort((a,b)=>a.p.name.localeCompare(b.p.name));
    for(const r of rows){
      const key="p-"+r.id,done=state.checked[key]?"done":"";
      html+=`<div class="sitem ${done}" data-chk="${key}">
        <span class="ck"><svg viewBox="0 0 24 24"><path d="M4 12l6 6L20 6"/></svg></span>
        <span class="sn">${escapeHtml(r.p.name)}${r.p.brand?`<span class="snote"> — ${escapeHtml(r.p.brand)}</span>`:""}</span>
        <span class="sq tnum">${fmtGrams(r.g)}</span></div>`;
    }
    html+="</div>";
  }
  html+='<div style="height:10px"></div><button class="btn sm ghost" id="resetchk">Destildar todo</button>';
  wrap.innerHTML=html;
}

function renderMeals(){
  const seg=document.getElementById("meals-cat");
  seg.innerHTML=CATS.map(([c,n])=>`<button data-mcat="${c}" class="${state.mealsCat===c?"on":""}">${n}</button>`).join("");
  const list=document.getElementById("meals-list");
  const meals=mealsInCat(state.mealsCat);
  list.innerHTML=meals.map(m=>{
    const n=mealNutrition(m);
    const badge=m.custom?'<span class="chip soft">tuya</span>':'<span class="chip soft">del plan</span>';
    return `<button class="card meal-item" data-meal="${m.id}">
      <span class="mi-main"><span class="mi-name">${escapeHtml(m.name)}</span>
      <span class="mi-mac"><span class="chip kcal tnum">${n.kcal} kcal</span><span class="chip prot tnum">${Math.round(n.prot)} g</span>${badge}</span></span>
      <svg class="chev" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>`;
  }).join("");
}

function renderBuilder(){
  const el=document.getElementById("builder");
  const b=state.builder;
  const editing=!!b.id;
  const hasProd=state.products.length>0;
  const opt=(sel)=>state.products.map(p=>`<option value="${p.id}" ${p.id===sel?"selected":""}>${escapeHtml(p.name)}</option>`).join("");
  const rows=b.components.map((comp,i)=>`
    <div class="comp-row" data-i="${i}">
      <select class="comp-prod">${hasProd?'<option value="">— producto —</option>'+opt(comp.productId):'<option value="">sin productos</option>'}</select>
      <input class="comp-g" type="number" inputmode="decimal" value="${comp.grams!=null?comp.grams:""}" placeholder="g">
      <span class="g">g</span>
      <button class="rm" data-rm="${i}" aria-label="Quitar">×</button>
    </div>`).join("");
  el.innerHTML=`
    <h3><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--green)" stroke-width="2" style="vertical-align:-3px"><path d="M12 5v14M5 12h14"/></svg>${editing?"Editar comida":"Nueva comida"}</h3>
    <p class="faint" style="font-size:12.5px;margin:4px 0 12px">Sumá tus productos con sus gramos y calculá los valores. Después guardala en una categoría.</p>
    <div class="field"><label for="b-name">Nombre de la comida</label><input id="b-name" value="${escapeAttr(b.name)}" placeholder="ej. Pollo con arroz y palta"></div>
    <div class="eyebrow" style="margin-bottom:6px">Categoría</div>
    <div class="target-row" id="b-cat">${CATS.map(([c,n])=>`<button data-bcat="${c}" class="${b.cat===c?"on":""}">${n}</button>`).join("")}</div>
    <div class="eyebrow" style="margin-bottom:6px">Productos de la comida</div>
    ${hasProd?"":'<p class="note-box">Cargá primero algún producto en la pestaña <b>Productos</b> para poder armar comidas.</p>'}
    <div id="b-rows">${rows}</div>
    <button class="btn sm ghost" id="b-add" style="margin-bottom:4px" ${hasProd?"":"disabled"}>+ Agregar producto</button>
    <div class="btot" id="b-tot"></div>
    <div class="row" style="gap:9px">
      <button class="btn primary" id="b-save" style="flex:1" ${hasProd?"":"disabled"}>${editing?"Guardar cambios":"Guardar en "+CATNAME[b.cat]}</button>
      ${editing?'<button class="btn ghost" id="b-cancel">Cancelar</button>':""}
    </div>`;
  recomputeBuilderTotals();
}
function recomputeBuilderTotals(){
  const n=mealNutrition({custom:true,components:state.builder.components});
  const tot=document.getElementById("b-tot");
  if(!tot)return;
  tot.innerHTML=`
    <div class="bt"><div class="btk">kcal</div><div class="btv tnum" style="color:var(--amber)">${n.kcal}</div></div>
    <div class="bt"><div class="btk">Proteína</div><div class="btv tnum" style="color:var(--green-ink)">${r1(n.prot)} g</div></div>
    <div class="bt"><div class="btk">Carbs</div><div class="btv tnum">${n.carbs} g</div></div>
    <div class="bt"><div class="btk">Grasas</div><div class="btv tnum">${n.fat} g</div></div>`;
}
function resetBuilder(){state.builder={id:null,name:"",cat:state.mealsCat,components:[{productId:"",grams:100}]};}

function renderProducts(){
  const sel=document.getElementById("calc-prod");
  const cur=state.calc.prod;
  sel.innerHTML=state.products.length?state.products.map(p=>`<option value="${p.id}">${escapeHtml(p.name)}</option>`).join(""):'<option value="">— cargá un producto primero —</option>';
  if(state.products.length){if(!state.products.find(p=>p.id===cur))state.calc.prod=state.products[0].id;sel.value=state.calc.prod;}
  runCalc();
  const wrap=document.getElementById("prodlist");
  if(!state.products.length){wrap.innerHTML='<div class="empty"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg><p>Todavía no cargaste productos.<br>Tocá <b>+ Agregar</b> y subí el paquete real con sus valores.</p></div>';return;}
  wrap.innerHTML=state.products.map(p=>{
    const src=photoSrc(p);
    const thumb=src?`<img class="pthumb" src="${src}" alt="">`:`<span class="pthumb"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></span>`;
    const ing=p.ing&&ING[p.ing]?`<span class="chip soft">${ING[p.ing].n}</span>`:"";
    return `<div class="prod card">${thumb}
      <div class="pinfo"><div class="pname">${escapeHtml(p.name)}</div>${p.brand?`<div class="pbrand">${escapeHtml(p.brand)}</div>`:""}
        <div class="pmac"><span class="chip kcal tnum">${num(p.kcal)} kcal</span><span class="chip prot tnum">${num(p.protein)} g prot</span>${ing}</div>
        <div class="faint" style="font-size:11px;margin-top:3px">por ${num(p.per)||100} g${p.note?" · "+escapeHtml(p.note):""}</div></div>
      <button class="pedit" data-edit="${p.id}" aria-label="Editar"><svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></button></div>`;
  }).join("");
}
function runCalc(){
  const out=document.getElementById("calc-out");
  const p=state.products.find(x=>x.id===state.calc.prod);
  if(!p){out.innerHTML='<div class="co"><div class="cok">Sin producto</div><div class="cov">—</div></div>';return;}
  const per=+p.per||100,kcal100=(+p.kcal||0)/per,prot100=(+p.protein||0)/per,carb100=(+p.carbs||0)/per,fat100=(+p.fat||0)/per;
  if(state.calc.mode==="g2m"){
    const g=+document.getElementById("calc-g").value||0;
    const parts=[["kcal",Math.round(kcal100*g)],["Proteína",r1(prot100*g)+" g"]];
    if(p.carbs)parts.push(["Carbs",r1(carb100*g)+" g"]);
    if(p.fat)parts.push(["Grasas",r1(fat100*g)+" g"]);
    out.innerHTML=parts.map(([k,v])=>`<div class="co"><div class="cok">${k}</div><div class="cov tnum">${v}</div></div>`).join("");
  }else{
    const t=+document.getElementById("calc-t").value||0;
    const basis=state.calc.target==="prot"?prot100:kcal100;
    const grams=basis>0?t/basis:0;
    out.innerHTML=`<div class="co"><div class="cok">Comer</div><div class="cov tnum">${Math.round(grams)} g</div></div>
      <div class="co"><div class="cok">${state.calc.target==="prot"?"= kcal":"= proteína"}</div><div class="cov tnum">${state.calc.target==="prot"?Math.round(kcal100*grams):r1(prot100*grams)+" g"}</div></div>`;
  }
}

/* ---------- sheets ---------- */
const root=document.getElementById("sheet-root");
function closeSheet(){root.innerHTML="";}
function sheet(title,bodyHtml,actionsHtml=""){
  root.innerHTML=`<div class="scrim" id="scrim"><div class="sheet" role="dialog" aria-modal="true">
    <div class="sheet-top"><h3>${title}</h3><button class="xbtn" id="xsheet" aria-label="Cerrar">×</button></div>
    <div class="sheet-body">${bodyHtml}</div>${actionsHtml}</div></div>`;
  document.getElementById("xsheet").onclick=closeSheet;
  document.getElementById("scrim").addEventListener("click",e=>{if(e.target.id==="scrim")closeSheet();});
}

function openPicker(slotKey){
  const cat=slotKey.split("-")[1];
  const cur=state.week[slotKey];
  const meals=mealsInCat(cat);
  const list=meals.length?meals.map(m=>{const n=mealNutrition(m);
    return `<button class="pick ${m.id===cur?"sel":""}" data-pick="${m.id}">
      <span class="pk-n">${escapeHtml(m.name)}</span>
      <span class="chip kcal tnum">${n.kcal}</span><span class="chip prot tnum">${Math.round(n.prot)}g</span></button>`;}).join("")
    :'<p class="muted">No hay comidas en esta categoría. Creá una en la pestaña Comidas.</p>';
  const actions=cur?`<div class="sheet-actions"><button class="btn ghost del-btn" id="clearslot">Quitar de este día</button></div>`:"";
  sheet(CATNAME[cat],list,actions);
  root.querySelectorAll("[data-pick]").forEach(btn=>btn.addEventListener("click",()=>{
    state.week[slotKey]=btn.dataset.pick;renderWeek();renderShop();saveWeek();closeSheet();
  }));
  if(cur){const cs=document.getElementById("clearslot");if(cs)cs.onclick=()=>{delete state.week[slotKey];renderWeek();renderShop();saveWeek();closeSheet();};}
}

function openMealDetail(id,slotKey){
  const m=mealById(id);if(!m)return;
  const n=mealNutrition(m);
  let itemsHtml;
  if(m.custom){
    itemsHtml=(m.components||[]).map(comp=>{const pr=prodById(comp.productId);
      return `<li><span>${pr?escapeHtml(pr.name):"(producto borrado)"}</span><span class="di-q tnum">${comp.grams} g</span></li>`;}).join("")||'<li><span class="muted">Sin productos</span></li>';
  }else{
    itemsHtml=m.ings.map(([ik,q])=>{const g=ING[ik];if(!g)return "";
      let disp=g.staple?"a gusto":(g.u==="u"?(q%1?q.toFixed(2):q)+" u":q+" g");
      return `<li><span>${g.n}</span><span class="di-q tnum">${disp}</span></li>`;}).join("");
  }
  const body=`
    <div class="row" style="gap:8px;margin-bottom:10px;flex-wrap:wrap">
      <span class="chip kcal tnum">${n.kcal} kcal</span><span class="chip prot tnum">${r1(n.prot)} g proteína</span>
      ${n.carbs?`<span class="chip soft tnum">${n.carbs} g carbs</span>`:""}${n.fat?`<span class="chip soft tnum">${n.fat} g grasas</span>`:""}
      ${m.sal?`<span class="chip soft">${m.sal}</span>`:""}</div>
    <div class="eyebrow" style="margin-bottom:6px">${m.custom?"Productos":"Ingredientes (peso ya cocido / comestible)"}</div>
    <ul class="det-ings">${itemsHtml}</ul>
    ${m.note?`<div class="note-box">${m.note}</div>`:""}`;
  let actions="";
  if(slotKey)actions=`<div class="sheet-actions"><button class="btn" id="changemeal">Cambiar</button><button class="btn ghost del-btn" id="removemeal">Quitar</button></div>`;
  else if(m.custom)actions=`<div class="sheet-actions"><button class="btn" id="editmeal">Editar</button><button class="btn ghost del-btn" id="delmeal">Borrar</button></div>`;
  sheet(m.name,body,actions);
  if(slotKey){
    document.getElementById("changemeal").onclick=()=>{closeSheet();openPicker(slotKey);};
    document.getElementById("removemeal").onclick=()=>{delete state.week[slotKey];renderWeek();renderShop();saveWeek();closeSheet();};
  }else if(m.custom){
    document.getElementById("editmeal").onclick=()=>{loadMealIntoBuilder(m);closeSheet();};
    document.getElementById("delmeal").onclick=()=>{
      const a=root.querySelector(".sheet-actions");
      a.innerHTML=`<span style="flex:1;align-self:center;font-size:13px;font-weight:600">¿Borrar "${escapeHtml(m.name)}"?</span>
        <button class="btn ghost" id="dno">No</button><button class="btn del-btn" id="dyes">Sí</button>`;
      document.getElementById("dno").onclick=()=>openMealDetail(id);
      document.getElementById("dyes").onclick=()=>{deleteMeal(id);closeSheet();};
    };
  }
}
function loadMealIntoBuilder(m){
  state.mealsCat=m.cat;
  state.builder={id:m.id,name:m.name,cat:m.cat,components:(m.components||[]).map(c=>({productId:c.productId,grams:c.grams}))};
  if(!state.builder.components.length)state.builder.components.push({productId:"",grams:100});
  renderMeals();renderBuilder();
  document.getElementById("builder").scrollIntoView({behavior:"smooth",block:"start"});
}

let formPhoto=null;
function openProductForm(id){
  const p=id?state.products.find(x=>x.id===id):null;
  formPhoto=null;
  const src=p?photoSrc(p):null;
  const ingOpts=['<option value="">— ninguno —</option>'].concat(Object.keys(ING).filter(k=>!ING[k].staple).map(k=>`<option value="${k}" ${p&&p.ing===k?"selected":""}>${ING[k].n}</option>`)).join("");
  const body=`
    <div class="photo-pick">
      <label class="photo-prev" id="photolabel" for="photoinput" style="cursor:pointer">
        ${src?`<img src="${src}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>'}
      </label>
      <div><div style="font-weight:600;font-size:13.5px">Foto del producto</div>
        <div class="faint" style="font-size:12px;margin:2px 0 6px">Sacá foto o elegí de la galería</div>
        <button class="btn sm" id="pickphoto" type="button">${src?"Cambiar":"Agregar foto"}</button>
        <input id="photoinput" type="file" accept="image/*"></div>
    </div>
    <div class="field"><label for="f-name">Nombre *</label><input id="f-name" value="${p?escapeAttr(p.name):""}" placeholder="ej. Arroz Gallo Oro"></div>
    <div class="field"><label for="f-brand">Marca</label><input id="f-brand" value="${p?escapeAttr(p.brand||""):""}" placeholder="opcional"></div>
    <div class="field"><label for="f-per">Valores por (g)</label><input id="f-per" type="number" inputmode="decimal" value="${p?num(p.per)||100:100}"></div>
    <div class="grid2">
      <div class="field"><label for="f-kcal">Calorías *</label><input id="f-kcal" type="number" inputmode="decimal" value="${p?num(p.kcal):""}" placeholder="kcal"></div>
      <div class="field"><label for="f-prot">Proteína (g) *</label><input id="f-prot" type="number" inputmode="decimal" value="${p?num(p.protein):""}" placeholder="g"></div>
      <div class="field"><label for="f-carb">Carbohidratos (g)</label><input id="f-carb" type="number" inputmode="decimal" value="${p&&p.carbs?num(p.carbs):""}" placeholder="opcional"></div>
      <div class="field"><label for="f-fat">Grasas (g)</label><input id="f-fat" type="number" inputmode="decimal" value="${p&&p.fat?num(p.fat):""}" placeholder="opcional"></div>
    </div>
    <div class="field"><label for="f-ing">Corresponde al ingrediente (para la lista de compras)</label><select id="f-ing">${ingOpts}</select></div>
    <div class="field"><label for="f-note">Nota</label><input id="f-note" value="${p?escapeAttr(p.note||""):""}" placeholder="opcional"></div>`;
  const actions=`<div class="sheet-actions">${id?`<button class="btn ghost del-btn" id="delprod">Borrar</button>`:""}<button class="btn primary" id="saveprod">Guardar</button></div>`;
  sheet(id?"Editar producto":"Nuevo producto",body,actions);
  const input=document.getElementById("photoinput");
  document.getElementById("pickphoto").onclick=()=>input.click();
  document.getElementById("photolabel").onclick=e=>{e.preventDefault();input.click();};
  input.onchange=async()=>{const f=input.files&&input.files[0];if(!f)return;
    try{const blob=await compressImage(f);formPhoto={blob};const url=URL.createObjectURL(blob);
      document.getElementById("photolabel").innerHTML=`<img src="${url}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:12px">`;
    }catch(e){alert("No se pudo procesar la imagen.");}};
  if(id)document.getElementById("delprod").onclick=()=>{
    const a=root.querySelector(".sheet-actions");
    a.innerHTML=`<span style="flex:1;align-self:center;font-size:13px;font-weight:600">¿Borrar "${escapeHtml(p.name)}"?</span>
      <button class="btn ghost" id="cancel">No</button><button class="btn del-btn" id="yes">Sí, borrar</button>`;
    document.getElementById("cancel").onclick=()=>openProductForm(id);
    document.getElementById("yes").onclick=()=>{deleteProduct(id);closeSheet();};
  };
  document.getElementById("saveprod").onclick=async()=>{
    const name=val("f-name").trim(),kcal=val("f-kcal"),prot=val("f-prot");
    if(!name){flash("f-name");return;}if(kcal===""){flash("f-kcal");return;}if(prot===""){flash("f-prot");return;}
    const body={name,brand:val("f-brand").trim(),per:+val("f-per")||100,kcal:+kcal,protein:+prot,
      carbs:val("f-carb")!==""?+val("f-carb"):0,fat:val("f-fat")!==""?+val("f-fat"):0,ing:val("f-ing"),note:val("f-note").trim()};
    if(p){body.createdAt=p.createdAt;if(p.photoData)body.photoData=p.photoData;body.id=p.id;}
    if(formPhoto&&formPhoto.blob){
      const btn=document.getElementById("saveprod");btn.textContent="Guardando…";btn.disabled=true;
      try{body.photoData=await blobToDataURL(formPhoto.blob);}catch(e){}
    }
    upsertProduct(body);closeSheet();
  };
}

/* ---------- events ---------- */
document.getElementById("tabbar").addEventListener("click",e=>{
  const b=e.target.closest("button[data-tab]");if(!b)return;
  state.tab=b.dataset.tab;
  document.querySelectorAll(".tabbar button").forEach(x=>x.classList.toggle("on",x===b));
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("on"));
  document.getElementById("tab-"+state.tab).classList.add("on");
  document.querySelector("main").scrollTop=0;
});
document.getElementById("daytoggle").addEventListener("click",e=>{
  const b=e.target.closest("[data-day]");if(!b)return;
  const i=+b.dataset.day;
  if(state.days.includes(i))state.days=state.days.filter(x=>x!==i);else state.days.push(i);
  renderWeek();renderShop();saveWeek();
});
document.getElementById("days").addEventListener("click",e=>{
  const s=e.target.closest("[data-slot]");if(!s)return;
  const key=s.dataset.slot,cur=state.week[key];
  if(cur)openMealDetail(cur,key);else openPicker(key);
});
document.getElementById("autofill").onclick=()=>{
  const active=state.days.slice().sort((a,b)=>a-b);
  const nw={};active.forEach((di,idx)=>{const r=ROT[idx%ROT.length];CATS.forEach(([c],ci)=>nw[dayKey(di,c)]=r[ci]);});
  state.week=nw;renderWeek();renderShop();saveWeek();
};
document.getElementById("clearweek").onclick=()=>{state.week={};renderWeek();renderShop();saveWeek();};
document.getElementById("shoplist").addEventListener("click",e=>{
  if(e.target.id==="resetchk"){state.checked={};renderShop();saveChecked();return;}
  const it=e.target.closest("[data-chk]");if(!it)return;
  const k=it.dataset.chk;if(state.checked[k])delete state.checked[k];else state.checked[k]=1;
  renderShop();saveChecked();
});
// meals tab
document.getElementById("meals-cat").addEventListener("click",e=>{
  const b=e.target.closest("[data-mcat]");if(!b)return;
  state.mealsCat=b.dataset.mcat;
  if(!state.builder.id)state.builder.cat=state.mealsCat;
  renderMeals();renderBuilder();
});
document.getElementById("meals-list").addEventListener("click",e=>{
  const b=e.target.closest("[data-meal]");if(!b)return;openMealDetail(b.dataset.meal);
});
document.getElementById("builder").addEventListener("click",e=>{
  const add=e.target.closest("#b-add");
  if(add){state.builder.components.push({productId:"",grams:100});renderBuilder();return;}
  const rm=e.target.closest("[data-rm]");
  if(rm){state.builder.components.splice(+rm.dataset.rm,1);if(!state.builder.components.length)state.builder.components.push({productId:"",grams:100});renderBuilder();return;}
  const bc=e.target.closest("[data-bcat]");
  if(bc){state.builder.cat=bc.dataset.bcat;
    document.querySelectorAll("#b-cat button").forEach(x=>x.classList.toggle("on",x===bc));
    const sv=document.getElementById("b-save");if(sv&&!state.builder.id)sv.textContent="Guardar en "+CATNAME[state.builder.cat];
    return;}
  const cancel=e.target.closest("#b-cancel");
  if(cancel){resetBuilder();renderBuilder();return;}
  const save=e.target.closest("#b-save");
  if(save)saveBuilderMeal();
});
document.getElementById("builder").addEventListener("input",e=>{
  if(e.target.id==="b-name"){state.builder.name=e.target.value;return;}
  const row=e.target.closest(".comp-row");if(!row)return;
  const i=+row.dataset.i;
  if(e.target.classList.contains("comp-prod"))state.builder.components[i].productId=e.target.value;
  if(e.target.classList.contains("comp-g"))state.builder.components[i].grams=e.target.value===""?"":+e.target.value;
  recomputeBuilderTotals();
});
document.getElementById("builder").addEventListener("change",e=>{
  const row=e.target.closest(".comp-row");if(!row)return;
  const i=+row.dataset.i;
  if(e.target.classList.contains("comp-prod")){state.builder.components[i].productId=e.target.value;recomputeBuilderTotals();}
});
function saveBuilderMeal(){
  const b=state.builder;
  const name=(b.name||"").trim();
  const comps=b.components.filter(c=>c.productId&&(+c.grams>0));
  if(!name){flash("b-name");return;}
  if(!comps.length){alert("Agregá al menos un producto con gramos.");return;}
  const n=mealNutrition({custom:true,components:comps});
  const meal={id:b.id||null,custom:true,cat:b.cat,name,components:comps,kcal:n.kcal,prot:n.prot,carbs:n.carbs,fat:n.fat};
  upsertMeal(meal);
  state.mealsCat=b.cat;resetBuilder();
  renderMeals();renderBuilder();
}
// productos calc
document.getElementById("addprod").onclick=()=>openProductForm(null);
document.getElementById("prodlist").addEventListener("click",e=>{const b=e.target.closest("[data-edit]");if(b)openProductForm(b.dataset.edit);});
document.getElementById("calc-prod").onchange=e=>{state.calc.prod=e.target.value;runCalc();};
document.getElementById("calc-mode").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;state.calc.mode=b.dataset.m;
  document.querySelectorAll("#calc-mode button").forEach(x=>x.classList.toggle("on",x===b));
  document.getElementById("calc-in-g").classList.toggle("hide",state.calc.mode!=="g2m");
  document.getElementById("calc-in-t").classList.toggle("hide",state.calc.mode!=="m2g");runCalc();});
document.getElementById("calc-target").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;state.calc.target=b.dataset.t;
  document.querySelectorAll("#calc-target button").forEach(x=>x.classList.toggle("on",x===b));
  document.getElementById("calc-t-lbl").textContent=b.dataset.t==="prot"?"Proteína objetivo (g)":"Calorías objetivo";runCalc();});
document.getElementById("calc-g").addEventListener("input",runCalc);
document.getElementById("calc-t").addEventListener("input",runCalc);

/* theme */
(function(){const btn=document.getElementById("theme");let t=lsGet("cs_theme",null);
  if(t)document.documentElement.setAttribute("data-theme",t);
  btn.onclick=()=>{const cur=document.documentElement.getAttribute("data-theme");
    const sysDark=matchMedia("(prefers-color-scheme:dark)").matches;
    const next=cur?(cur==="dark"?"light":"dark"):(sysDark?"light":"dark");
    document.documentElement.setAttribute("data-theme",next);lsSet("cs_theme",next);};})();

/* utils */
function val(id){return document.getElementById(id).value;}
function num(v){return v==null||v===""?"":(+v%1?(+v).toFixed(1):+v);}
function r1(x){return (Math.round(x*10)/10).toString().replace(".",",");}
function escapeHtml(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function escapeAttr(s){return escapeHtml(s);}
function flash(id){const el=document.getElementById(id);if(!el)return;el.style.outline="2px solid var(--red)";el.focus();setTimeout(()=>el.style.outline="",1200);}

/* boot */
resetBuilder();
renderAll();
initStore();

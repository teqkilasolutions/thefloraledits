/* Shared behaviour: layout, cart, reveal-on-scroll, parallax, toast. */
window.App=(function(){
var KEY='tfe_cart_v1',mem=[],D=window.DATA,io=null;

/* ---------- money + cart ---------- */
function money(n){return '\u20b9'+Math.round(n).toLocaleString('en-IN')}
function load(){try{var s=localStorage.getItem(KEY);if(s){mem=JSON.parse(s)}}catch(e){}return mem}
function save(c){mem=c;try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}}
function find(c,k){for(var i=0;i<c.length;i++)if(c[i].k===k)return c[i]}
function setOf(id){for(var i=0;i<D.sets.length;i++)if(D.sets[i].id===id)return D.sets[i]}
function fl(o){return o&&o.indexOf('f:')===0?D.fById[o.slice(2)]:null}
function unit(it){
  if(it.t==='s'){var s=setOf(it.id);return s?s.price:0}
  var p=D.byId[it.id];if(!p)return 0;var f=fl(it.o);
  return p.price+(f?f.add:it.o==='arr'?p.addon:0);
}
function tierOf(it){
  if(it.t==='s'){var s=setOf(it.id);return s&&s.tier||'ready'}
  var f=fl(it.o);return f?f.tier:'ready';
}
function leadOf(list){var r='ready',w={ready:1,order:2,exotic:3},k=['','ready','order','exotic'];list.forEach(function(i){var t=tierOf(i);if(w[t]>w[r])r=t});return D.tiers[r]}
function pFor(p,o){var f=fl(o);return f?Object.assign({},p,{arr:{s:'lush',p:f.cols,petals:f.pt,n:7}}):p}
function art(p,o){return Art.vase(pFor(p,o),{arranged:o!=='vase'})}
function optLabel(it){var f=fl(it.o);return f?'With '+f.name.toLowerCase()+' \u00b7 '+D.tiers[f.tier].n:it.o==='arr'?'Signature arrangement \u00b7 Next day':'Vase only \u00b7 Next day'}
function setItems(s){var f=s.flower?D.fById[s.flower]:null;return s.items.map(function(id){var p=D.byId[id];return {p:f?pFor(p,'f:'+f.id):p,arranged:true}})}
function add(t,id,o,q){
  var c=load().slice(),k=t+':'+id+':'+(o||''),ex=find(c,k);
  if(ex)ex.q+=q||1;else c.push({k:k,t:t,id:id,o:o||'',q:q||1});
  save(c);count(true);
  var nm=t==='s'?(setOf(id)||{}).name:(D.byId[id]||{}).name;
  toast((nm||'Item')+' added to your bag','cart.html','View bag');
}
function count(bump){
  var n=0;load().forEach(function(i){n+=i.q});
  var b=document.getElementById('cc');if(!b)return;b.textContent=n;
  if(bump){b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
}
var tt=null;
function toast(msg,href,label){
  var el=document.getElementById('toast');if(!el)return;
  el.innerHTML=msg+(href?'<a href="'+href+'">'+label+'</a>':'');
  el.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('on')},3200);
}

/* ---------- layout ---------- */
function layout(active){
  var nav=[['shop.html','Shop Vases','shop'],['flowers.html','Flowers','flowers'],['events.html','Events','events'],['settings.html','Settings','settings'],['themes.html','Themes','themes'],['about.html','Studio','about']];
  var h=document.createElement('header');h.className='hdr';h.id='hdr';
  h.innerHTML='<div class="wrap hdr-in"><a class="logo" href="index.html">'+Art.logo()+'<span>The Floral Edit</span></a>'+
   '<nav class="nav" id="nav" aria-label="Main">'+nav.map(function(n){return '<a href="'+n[0]+'"'+(n[2]===active?' class="on" aria-current="page"':'')+'>'+n[1]+'</a>'}).join('')+'</nav>'+
   '<div class="hdr-r"><a class="bag" href="cart.html" aria-label="Shopping bag"><span>Bag</span><b id="cc">0</b></a>'+
   '<button class="burger" id="bg" aria-label="Open menu" aria-expanded="false"><i></i><i></i></button></div></div><div class="prog" id="prog"></div>';
  document.body.insertBefore(h,document.body.firstChild);
  splash();
  var f=document.createElement('footer');f.className='ftr';
  f.innerHTML='<div class="wrap"><div class="ftr-g"><div class="brand"><a class="ftr-logo" href="index.html" aria-label="The Floral Edit, home"><img src="assets/logo-full.png" alt="The Floral Edit. Where floral meets design." width="720" height="720" loading="lazy"></a><p>Ready-to-style vases and floral settings for homes, offices, parties and ceremonies. Delhi NCR.</p></div>'+
   '<div><h4>Shop</h4><ul><li><a href="shop.html">All vases</a></li><li><a href="themes.html">Theme pots</a></li><li><a href="flowers.html">Flowers &amp; availability</a></li><li><a href="events.html">Event setups</a></li><li><a href="settings.html">Settings &amp; sets</a></li></ul></div>'+
   '<div><h4>Settings</h4><ul><li><a href="settings.html#home">Home</a></li><li><a href="settings.html#office">Office</a></li><li><a href="settings.html#party">Parties</a></li><li><a href="settings.html#cultural">Cultural events</a></li></ul></div>'+
   '<div><h4>Studio</h4><ul><li><a href="about.html">About &amp; care</a></li><li><a href="about.html#contact">Contact</a></li><li><a href="cart.html">Your bag</a></li></ul></div></div>'+
   '<div class="ftr-b"><span>\u00a9 2026 The Floral Edit</span><span>Sample catalogue. Prices and details are placeholders.</span></div></div>'+
   '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
  document.body.appendChild(f);
  var bg=document.getElementById('bg'),nv=document.getElementById('nav');
  bg.addEventListener('click',function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',String(o))});
  count();
  var prog=document.getElementById('prog'),ticking=false;
  function onScroll(){
    if(ticking)return;ticking=true;
    requestAnimationFrame(function(){
      var y=window.scrollY||document.documentElement.scrollTop,mx=document.documentElement.scrollHeight-window.innerHeight;
      h.classList.toggle('scrolled',y>8);prog.style.width=(mx>0?Math.min(100,y/mx*100):0)+'%';
      var vh=window.innerHeight;
      document.querySelectorAll('[data-par]').forEach(function(el){
        var r=el.parentNode.getBoundingClientRect();
        if(r.bottom<-200||r.top>vh+200)return;
        var d=(r.top+r.height/2-vh/2)*-parseFloat(el.getAttribute('data-par'));
        el.style.transform='translate3d(0,'+d.toFixed(1)+'px,0)';
      });
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);onScroll();
  pointer();leave();
  reveal();
}

/* ---------- splash, pointer parallax, page leave ---------- */
var calm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function splash(){
  var seen=false;try{seen=sessionStorage.getItem('tfe_splash')==='1'}catch(e){}
  if(seen||calm)return;
  try{sessionStorage.setItem('tfe_splash','1')}catch(e){}
  var s=document.createElement('div');s.className='splash';s.setAttribute('aria-hidden','true');
  s.innerHTML='<img src="assets/logo-full.png" alt="" width="720" height="720"><i></i>';
  document.body.appendChild(s);
  setTimeout(function(){s.classList.add('out')},1700);
  setTimeout(function(){s.remove()},3000);
}
function pointer(){
  var host=document.getElementById('hero-art');if(!host||calm)return;
  var hero=host.closest('.hero')||host;
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();
    host.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));
    host.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));
  });
  hero.addEventListener('pointerleave',function(){host.style.setProperty('--mx',0);host.style.setProperty('--my',0)});
}
function leave(){
  if(calm)return;
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.button||a.target)return;
    var u=a.getAttribute('href');
    if(!u||u.charAt(0)==='#'||/^(https?:|mailto:|tel:)/.test(u))return;
    var base=u.split('#')[0];if(base===location.pathname.split('/').pop())return;
    e.preventDefault();document.body.classList.add('leaving');
    setTimeout(function(){location.href=u},260);
  });
  window.addEventListener('pageshow',function(e){if(e.persisted)document.body.classList.remove('leaving')});
}

/* ---------- reveal on scroll ---------- */
function reveal(root){
  root=root||document;
  var els=root.querySelectorAll('[data-rv]:not([data-rvd])');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.setAttribute('data-rvd','1')});return}
  if(!io)io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  var vh=window.innerHeight;
  els.forEach(function(e,i){
    e.setAttribute('data-rvd','1');
    var kind=e.getAttribute('data-rv');
    var r=e.getBoundingClientRect();
    if(r.top<vh*.92&&r.bottom>0)return;       /* already on screen: leave visible */
    e.classList.add('rv');if(kind==='fade')e.classList.add('fade');if(kind==='scale')e.classList.add('scale');
    var st=e.getAttribute('data-d');if(st)e.style.setProperty('--d',st+'s');
    io.observe(e);
  });
  /* stagger children of [data-stagger] */
  root.querySelectorAll('[data-stagger]:not([data-sd])').forEach(function(p){
    p.setAttribute('data-sd','1');
    Array.prototype.forEach.call(p.children,function(c,i){c.style.setProperty('--d',(Math.min(i,8)*.08)+'s')});
  });
}

/* ---------- cards ---------- */
function badge(p){return p.theme?(p.group==='festivals'?'Festival':p.group==='series'?'Series':'Movie'):'Studio'}
function card(p){
  return '<article class="card" data-rv><div class="aw"><a class="art" href="product.html#'+p.id+'" data-pid="'+p.id+'" aria-label="View '+p.name+'"><span class="badge">'+badge(p)+'</span>'+Art.vase(p)+'</a>'+
   '<div class="quick"><button class="btn sm plain" type="button" data-add="'+p.id+'">Add to bag</button></div></div>'+
   '<div class="meta"><h3><a href="product.html#'+p.id+'" data-pid="'+p.id+'">'+p.name+'</a></h3><span class="price">'+money(p.price)+'</span></div>'+
   '<span class="sub">'+p.size+'</span></article>';
}
function wire(root){
  (root||document).querySelectorAll('[data-add]:not([data-w])').forEach(function(b){b.setAttribute('data-w','1');b.addEventListener('click',function(){add('p',b.getAttribute('data-add'),'vase',1)})});
  (root||document).querySelectorAll('[data-pid]:not([data-wp])').forEach(function(a){a.setAttribute('data-wp','1');a.addEventListener('click',function(){try{sessionStorage.setItem('tfe_pid',a.getAttribute('data-pid'))}catch(e){}})});
  (root||document).querySelectorAll('[data-addset]:not([data-w])').forEach(function(b){b.setAttribute('data-w','1');b.addEventListener('click',function(){add('s',b.getAttribute('data-addset'),'arr',1)})});
}

return {fl:fl,tierOf:tierOf,leadOf:leadOf,pFor:pFor,art:art,optLabel:optLabel,setItems:setItems,money:money,load:load,save:save,add:add,count:count,toast:toast,layout:layout,reveal:reveal,card:card,wire:wire,unit:unit,setOf:setOf,badge:badge};
})();

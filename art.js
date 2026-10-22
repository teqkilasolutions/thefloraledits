/* The Floral Edit: procedural illustration library.
   Everything on the site (vases, arrangements, room scenes) is drawn here in code. */
(function(){
var U=0;
function R(seed){var s=(seed>>>0)||1;return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296}}
function hx(c){c=c.replace('#','');if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];return[parseInt(c.substr(0,2),16),parseInt(c.substr(2,2),16),parseInt(c.substr(4,2),16)]}
function mix(a,b,t){var x=hx(a),y=hx(b);return'#'+[0,1,2].map(function(i){var v=Math.round(x[i]+(y[i]-x[i])*t);return(v<16?'0':'')+v.toString(16)}).join('')}
function hash(s){var h=7;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h||1}
function f(n){return Math.round(n*100)/100}

/* ---------- vase silhouettes (viewBox 0 0 200 260, base at y=250) ---------- */
var SHAPES={
 bud:{d:"M93 96 L107 96 L107 138 C107 152 128 166 128 204 C128 238 118 248 110 250 L90 250 C82 248 72 238 72 204 C72 166 93 152 93 138 Z",my:96,mw:7,x:[72,128]},
 amphora:{d:"M84 70 L116 70 C112 80 110 90 112 100 C140 118 150 160 138 200 C132 230 120 246 112 250 L88 250 C80 246 68 230 62 200 C50 160 60 118 88 100 C90 90 88 80 84 70 Z",my:70,mw:16,x:[56,144],extra:"M88 98 C64 90 54 112 66 132 M112 98 C136 90 146 112 134 132"},
 cylinder:{d:"M74 90 L126 90 L122 244 Q122 250 116 250 L84 250 Q78 250 78 244 Z",my:90,mw:26,x:[74,126]},
 bowl:{d:"M52 180 L148 180 C148 224 128 250 100 250 C72 250 52 224 52 180 Z",my:180,mw:48,x:[52,148]},
 moon:{d:"M82 104 L118 104 C118 112 124 116 130 124 C158 150 156 232 112 249 L88 249 C44 232 42 150 70 124 C76 116 82 112 82 104 Z",my:104,mw:18,x:[44,156]},
 urn:{d:"M66 100 L134 100 C134 118 124 128 120 140 C142 160 138 200 118 214 L118 232 L136 244 L136 250 L64 250 L64 244 L82 232 L82 214 C62 200 58 160 80 140 C76 128 66 118 66 100 Z",my:100,mw:34,x:[58,142]},
 trumpet:{d:"M66 70 C80 70 90 90 94 130 C96 170 94 220 80 244 L78 250 L122 250 L120 244 C106 220 104 170 106 130 C110 90 120 70 134 70 Z",my:70,mw:34,x:[66,134]},
 spire:{d:"M88 60 L112 60 L108 120 C124 150 128 210 116 250 L84 250 C72 210 76 150 92 120 Z",my:60,mw:12,x:[76,124]}
};

/* ---------- vase surface motifs (generic ornament only) ---------- */
function motif(n,c,r,sh){
 var y0=sh.my+6,y1=248,x0=44,x1=156,o='',i,k,h=y1-y0;
 if(!n||n==='none')return '';
 if(n==='bands'){[.5,.55,.86].forEach(function(t,j){var y=y0+h*t;o+='<line x1="'+x0+'" x2="'+x1+'" y1="'+f(y)+'" y2="'+f(y)+'" stroke="'+c+'" stroke-width="'+(j===1?1:2)+'"/>'})}
 if(n==='stripes'){for(i=x0;i<x1;i+=7)o+='<line x1="'+i+'" x2="'+i+'" y1="'+y0+'" y2="'+y1+'" stroke="'+c+'" stroke-width="1.2" opacity=".55"/>'}
 if(n==='awning'){for(i=x0;i<x1;i+=16)o+='<rect x="'+i+'" y="'+y0+'" width="8" height="'+h+'" fill="'+c+'" opacity=".6"/>';o+='<path d="M'+x0+' '+(y0+14)+' '+(function(){var s='';for(var q=x0;q<x1;q+=16)s+='q4 8 8 0 q4 8 8 0 ';return s})()+'" fill="none" stroke="'+mix(c,'#000',.1)+'" stroke-width="1" opacity=".5"/>'}
 if(n==='lattice'){for(k=-120;k<130;k+=14){o+='<line x1="'+x0+'" y1="'+(y0+k)+'" x2="'+x1+'" y2="'+(y0+k+112)+'" stroke="'+c+'" stroke-width="1" opacity=".55"/><line x1="'+x0+'" y1="'+(y0+k+112)+'" x2="'+x1+'" y2="'+(y0+k)+'" stroke="'+c+'" stroke-width="1" opacity=".55"/>'}}
 if(n==='dots'){for(var yy=y0+6;yy<y1;yy+=13)for(var xx=x0+((Math.round(yy/13)%2)?0:6);xx<x1;xx+=12)o+='<circle cx="'+xx+'" cy="'+f(yy)+'" r="1.8" fill="'+c+'" opacity=".7"/>'}
 if(n==='stars'){for(i=0;i<16;i++){var sx=x0+r()*112,sy=y0+r()*h,z=2+r()*2.5;o+='<path d="M'+f(sx)+' '+f(sy-z)+' L'+f(sx+z*.3)+' '+f(sy-z*.3)+' L'+f(sx+z)+' '+f(sy)+' L'+f(sx+z*.3)+' '+f(sy+z*.3)+' L'+f(sx)+' '+f(sy+z)+' L'+f(sx-z*.3)+' '+f(sy+z*.3)+' L'+f(sx-z)+' '+f(sy)+' L'+f(sx-z*.3)+' '+f(sy-z*.3)+'Z" fill="'+c+'" opacity=".9"/>'}}
 if(n==='clouds'){for(i=0;i<5;i++){var cx=x0+r()*112,cy=y0+10+r()*(h-20);o+='<g fill="'+c+'" opacity=".6"><circle cx="'+f(cx)+'" cy="'+f(cy)+'" r="6"/><circle cx="'+f(cx+7)+'" cy="'+f(cy+2)+'" r="5"/><circle cx="'+f(cx-7)+'" cy="'+f(cy+2)+'" r="4.5"/><rect x="'+f(cx-10)+'" y="'+f(cy+2)+'" width="22" height="5" rx="2.5"/></g>'}}
 if(n==='diya'){var by=y0+h*.56;for(i=62;i<=138;i+=19){o+='<path d="M'+(i-6)+' '+by+' h12 q0 7 -6 7 q-6 0 -6 -7z" fill="'+c+'"/><path d="M'+i+' '+(by-1)+' q-3 -5 0 -9 q3 4 0 9z" fill="'+mix(c,'#E8731A',.5)+'"/>'}}
 if(n==='rings'){var by2=y0+h*.58;for(i=0;i<6;i++){var a=i*Math.PI/3,px=100+Math.cos(a)*22,py=by2+Math.sin(a)*22*0.9;o+='<circle cx="'+f(px)+'" cy="'+f(py)+'" r="7" fill="none" stroke="'+c+'" stroke-width="1.2"/>'}o+='<circle cx="100" cy="'+f(by2)+'" r="9" fill="'+c+'" opacity=".85"/>'}
 if(n==='crescent'){var ym=y0+h*.5;o+='<path d="M110 '+f(ym-18)+' A19 19 0 1 0 110 '+f(ym+18)+' A14 14 0 1 1 110 '+f(ym-18)+'Z" fill="'+c+'"/>';[[128,ym-12],[134,ym+4],[122,ym+18]].forEach(function(p){o+='<circle cx="'+p[0]+'" cy="'+f(p[1])+'" r="1.6" fill="'+c+'"/>'})}
 if(n==='pine'){for(var py2=y0+8;py2<y1;py2+=12)for(var px2=x0;px2<x1;px2+=16)o+='<path d="M'+px2+' '+py2+' l8 6 l8 -6" fill="none" stroke="'+c+'" stroke-width="1" opacity=".5"/>'}
 if(n==='splash'){var cols=['#E8447A','#F2B01E','#3FA9D9','#7BC46A','#9B5DE5'];for(i=0;i<22;i++)o+='<circle cx="'+f(x0+r()*112)+'" cy="'+f(y0+r()*h)+'" r="'+f(2+r()*7)+'" fill="'+cols[i%5]+'" opacity=".78"/>'}
 if(n==='border'){o+='<rect x="'+x0+'" y="'+f(y0+4)+'" width="112" height="9" fill="'+c+'"/><rect x="'+x0+'" y="'+f(y0+16)+'" width="112" height="2" fill="'+c+'"/><rect x="'+x0+'" y="'+(y1-14)+'" width="112" height="9" fill="'+c+'"/><rect x="'+x0+'" y="'+(y1-22)+'" width="112" height="2" fill="'+c+'"/>'}
 if(n==='fan'){for(var row=0;row<8;row++)for(var cx2=x0-(row%2?0:12);cx2<x1+16;cx2+=24){var cy2=y0+row*13+16;[6,11,16].forEach(function(rr){o+='<path d="M'+(cx2-rr)+' '+cy2+' A'+rr+' '+rr+' 0 0 1 '+(cx2+rr)+' '+cy2+'" fill="none" stroke="'+c+'" stroke-width=".9" opacity=".6"/>'})}}
 if(n==='spire'){for(i=x0+4;i<x1;i+=9){var L=h*(.35+((i*7)%10)/18);o+='<line x1="'+i+'" x2="'+i+'" y1="'+(y1-L)+'" y2="'+y1+'" stroke="'+c+'" stroke-width="1" opacity=".5"/>'}}
 return o;
}

/* ---------- flowers ---------- */
function bloom(x,y,r,n,c1,c2,mid,rot){
 var rx=Math.max(r*.2,r*Math.sin(Math.PI/n)*.95),g='<g transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')">',i;
 for(i=0;i<n;i++)g+='<ellipse cx="'+f(x)+'" cy="'+f(y-r*.6)+'" rx="'+f(rx)+'" ry="'+f(r*.62)+'" fill="'+c1+'" transform="rotate('+f(i*360/n)+' '+f(x)+' '+f(y)+')"/>';
 for(i=0;i<n;i++)g+='<ellipse cx="'+f(x)+'" cy="'+f(y-r*.36)+'" rx="'+f(rx*.8)+'" ry="'+f(r*.4)+'" fill="'+c2+'" transform="rotate('+f(i*360/n+180/n)+' '+f(x)+' '+f(y)+')"/>';
 return g+'<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r*.17)+'" fill="'+mid+'"/></g>';
}
function blossom(x,y,r,c,m){var g='',i;for(i=0;i<5;i++){var a=(i*72-90)*Math.PI/180;g+='<circle cx="'+f(x+Math.cos(a)*r*.62)+'" cy="'+f(y+Math.sin(a)*r*.62)+'" r="'+f(r*.5)+'" fill="'+c+'"/>'}return g+'<circle cx="'+f(x)+'" cy="'+f(y)+'" r="'+f(r*.26)+'" fill="'+m+'"/>'}
function stem(x1,y1,cx,cy,x2,y2,c,w){return '<path d="M'+f(x1)+' '+f(y1)+' Q'+f(cx)+' '+f(cy)+' '+f(x2)+' '+f(y2)+'" fill="none" stroke="'+c+'" stroke-width="'+(w||1.6)+'" stroke-linecap="round"/>'}
function leaf(x,y,rx,ry,rot,c){return '<ellipse cx="'+f(x)+'" cy="'+f(y)+'" rx="'+rx+'" ry="'+ry+'" fill="'+c+'" transform="rotate('+f(rot)+' '+f(x)+' '+f(y)+')"/>'}
function qp(t,a,c,b){return(1-t)*(1-t)*a+2*(1-t)*t*c+t*t*b}

var LEAF=['#4F8A62','#6FA77A','#3A6A4C'],STEM='#4F7D5A';

function arrangement(a,sh,seed,ov){
 ov=ov||{};
 var r=R(seed),mx=100,my=sh.my+3,avail=ov.avail||(my-6),P=a.p,m=a.m||'#E9B25D',o='',st=a.s,i;
 var cap={lush:100,grass:130,branch:125,single:82,tulip:108,spray:118,pine:112}[st]||100;
 if(ov.big)cap*=1.45;
 var H=Math.max(24,Math.min((avail-(ov.avail?0:16))*.94,cap));
 function col(k){return P[k%P.length]}
 function branches(cnt,dirs,br,bc,twig){
   for(var b=0;b<cnt;b++){
     var dir=dirs[b%dirs.length],ex=mx+dir*H*.55,ey=my-H*(.7+r()*.3),cx=mx+dir*H*.12,cy=my-H*.55;
     o+=stem(mx,my,cx,cy,ex,ey,twig,2);
     for(var t=.3;t<=1.01;t+=br.step){
       var px=qp(t,mx,cx,ex)+(r()-.5)*7,py=qp(t,my,cy,ey)+(r()-.5)*7;
       o+=blossom(px,py,br.r*(.7+r()*.5),bc[Math.floor(r()*bc.length)],m);
       if(r()>.55)o+=leaf(px+(r()-.5)*14,py+4,2.4,6,r()*80-40,LEAF[b%3]);
     }
   }
 }
 if(st==='lush'){
   var slots=[[0,-1],[-.62,-.8],[.62,-.8],[-.95,-.52],[.95,-.52],[0,-.58],[-.5,-.3],[.5,-.3]].slice(0,a.n||7);
   var br2=Math.max(8,Math.min(24,H*.25)),pts=[];
   if(!ov.avail&&my-H*.92-br2*1.15<3)H=Math.max(22,(my-3-br2*1.15)/.92);
   br2=Math.max(7,Math.min(br2,H*.28));
   var sx=Math.max(26,H*.5);
   slots.forEach(function(s,k){pts.push({x:mx+s[0]*sx,y:Math.min(my+s[1]*H*.92,my-br2*.4),k:k})});
   pts.forEach(function(p){o+=stem(mx,my,(mx+p.x)/2,(my+p.y)/2+5,p.x,p.y,STEM,1.6)});
   pts.slice(0,5).forEach(function(p,k){o+=leaf((mx+p.x)/2+(p.x<mx?-5:5),(my+p.y)/2+2,4,10,(p.x<mx?-1:1)*(40+r()*20),LEAF[k%3])});
   pts.slice().sort(function(u,v){return v.y-u.y}).forEach(function(p){o+=bloom(p.x,p.y,br2*(.85+r()*.3),a.petals||8,col(p.k),mix(col(p.k),'#FFFFFF',.45),m,r()*60)});
 }
 else if(st==='single'){
   var by=my-H*.86,bs=Math.min(H*.34,26);
   o+=stem(mx,my,mx+6,my-H*.4,mx,by,STEM,2.2)+leaf(mx-9,my-H*.35,4,11,-48,LEAF[0])+leaf(mx+10,my-H*.5,4,11,50,LEAF[1]);
   o+=bloom(mx,by,bs,a.petals||9,col(0),mix(col(0),'#FFFFFF',.5),m,r()*40);
 }
 else if(st==='tulip'){
   for(i=0;i<5;i++){
     var dx=(i-2)*H*.19,tx=mx+dx*1.3,ty=my-H*(.78+((i%2)*.14)+r()*.1);
     o+=stem(mx,my,mx+dx*.4,my-H*.5,tx,ty,STEM,1.8);
     o+=leaf(mx+dx*.5,my-H*.3,3,12,dx<0?-28:28,LEAF[i%3]);
     var c=col(i),z=Math.max(5.5,H*.07);
     o+='<ellipse cx="'+f(tx-z*.6)+'" cy="'+f(ty)+'" rx="'+f(z*.7)+'" ry="'+f(z*1.7)+'" fill="'+mix(c,'#000',.08)+'" transform="rotate(-14 '+f(tx)+' '+f(ty)+')"/><ellipse cx="'+f(tx+z*.6)+'" cy="'+f(ty)+'" rx="'+f(z*.7)+'" ry="'+f(z*1.7)+'" fill="'+mix(c,'#000',.08)+'" transform="rotate(14 '+f(tx)+' '+f(ty)+')"/><ellipse cx="'+f(tx)+'" cy="'+f(ty-z*.2)+'" rx="'+f(z*.8)+'" ry="'+f(z*1.9)+'" fill="'+c+'"/>';
   }
 }
 else if(st==='grass'){
   for(i=0;i<15;i++){
     var tx2=mx+(r()-.5)*H*1.15,ty2=my-H*(.5+r()*.5),c2=mx+(tx2-mx)*.3;
     o+=stem(mx,my,c2,my-H*.45,tx2,ty2,'#B79A74',1.2);
     var ang=(tx2-mx)/H*38;
     o+='<ellipse cx="'+f(tx2)+'" cy="'+f(ty2-6)+'" rx="3.6" ry="'+f(12+r()*6)+'" fill="'+col(i)+'" opacity=".92" transform="rotate('+f(ang)+' '+f(tx2)+' '+f(ty2)+')"/><ellipse cx="'+f(tx2)+'" cy="'+f(ty2-8)+'" rx="1.6" ry="9" fill="'+mix(col(i),'#FFFFFF',.55)+'" transform="rotate('+f(ang)+' '+f(tx2)+' '+f(ty2)+')"/>';
   }
 }
 else if(st==='branch'){branches(3,[-1,.15,1],{step:.15,r:7},P,'#6B5A4A')}
 else if(st==='spray'){branches(5,[-1,-.45,.1,.55,1],{step:.11,r:4.6},P,'#8A7C6A')}
 else if(st==='pine'){
   [-1,-.4,.35,1].forEach(function(dir,b){
     var ex=mx+dir*H*.62,ey=my-H*(.55+r()*.4),cx=mx+dir*H*.14,cy=my-H*.5;
     o+=stem(mx,my,cx,cy,ex,ey,'#5A4632',2);
     for(var t=.2;t<=1;t+=.085){
       var px=qp(t,mx,cx,ex),py=qp(t,my,cy,ey);
       o+='<path d="M'+f(px)+' '+f(py)+' l-8 -6 M'+f(px)+' '+f(py)+' l8 -6" stroke="'+LEAF[b%3]+'" stroke-width="2" stroke-linecap="round" fill="none"/>';
       if(r()>.8)o+='<circle cx="'+f(px+(r()-.5)*8)+'" cy="'+f(py+(r()-.5)*6)+'" r="2.6" fill="'+P[0]+'"/>';
     }
   });
 }
 return o;
}

function vaseInner(p,ov){
 ov=ov||{};
 var sh=SHAPES[p.shape],id='v'+(++U),g=p.glaze||['#EEE','#CCC'],o='';
 var r=R(hash(p.id||'x'));
 o+='<defs><linearGradient id="'+id+'g" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="'+g[1]+'"/><stop offset=".38" stop-color="'+g[0]+'"/><stop offset="1" stop-color="'+g[1]+'"/></linearGradient><clipPath id="'+id+'c"><path d="'+sh.d+'"/></clipPath></defs>';
 if(ov.flowers!==false&&p.arr)o+='<g class="arr">'+arrangement(p.arr,sh,hash(p.id||'x'),ov)+'</g>';
 o+='<ellipse cx="100" cy="251" rx="'+((sh.x[1]-sh.x[0])*.52)+'" ry="4" fill="#1E1A1D" opacity=".09"/>';
 if(sh.extra)o+='<path d="'+sh.extra+'" fill="none" stroke="'+g[1]+'" stroke-width="5" stroke-linecap="round"/>';
 o+='<path d="'+sh.d+'" fill="url(#'+id+'g)"/>';
 o+='<g clip-path="url(#'+id+'c)">'+motif(p.motif,p.mc||'#fff',r,sh)+'<rect x="'+(sh.x[0]+9)+'" y="'+(sh.my+10)+'" width="5" height="'+(236-sh.my)+'" rx="2.5" fill="#fff" opacity=".3"/></g>';
 o+='<path d="'+sh.d+'" fill="none" stroke="'+mix(g[1],'#000',.2)+'" stroke-opacity=".32" stroke-width=".8"/>';
 o+='<line x1="'+(100-sh.mw)+'" x2="'+(100+sh.mw)+'" y1="'+sh.my+'" y2="'+sh.my+'" stroke="'+(p.rim||mix(g[1],'#000',.25))+'" stroke-width="2.6" stroke-linecap="round"/>';
 return o;
}
function vase(p,opts){
 opts=opts||{};
 return '<svg viewBox="0 0 200 260" role="img" aria-label="'+(p.name||'Vase')+' illustration">'+vaseInner(p,{flowers:opts.arranged!==false})+'</svg>';
}

/* ---------- a row of vases on a shelf (used for "settings" sets) ---------- */
function group(items){
 var n=items.length,o='<svg viewBox="0 0 600 300" role="img" aria-label="Arranged set of vases">';
 o+='<line x1="20" x2="580" y1="281" y2="281" stroke="#1E1A1D" stroke-opacity=".2" stroke-width="1"/>';
 items.forEach(function(it,i){
   var s=n===1?1:n===2?.95:.9,cx=(i+.5)*600/n;
   o+='<g transform="translate('+f(cx-100*s)+' '+f(280-250*s)+') scale('+s+')">'+vaseInner(it.p,{flowers:it.arranged!==false})+'</g>';
 });
 return o+'</svg>';
}

/* ---------- room scenes ---------- */
var INK='#1E1A1D';
function at(p,x,base,sc,arranged){return '<g transform="translate('+f(x-100*sc)+' '+f(base-250*sc)+') scale('+sc+')">'+vaseInner(p,{flowers:arranged!==false})+'</g>'}
function flame(x,y,s){return '<g transform="translate('+x+' '+y+') scale('+(s||1)+')"><path class="flame" d="M0 0 C-4 -6 -3 -11 0 -17 C3 -11 4 -6 0 0Z" fill="#F6B53B"/></g>'}
function find(id){return window.DATA&&window.DATA.byId?window.DATA.byId[id]:null}

function scene(type){
 var o='<svg viewBox="0 0 640 420" role="img" aria-label="'+type+' setting illustration" class="scene">',i;
 if(type==='home'){
   o+='<rect width="640" height="420" fill="#FBF9F6"/><rect y="330" width="640" height="90" fill="#F2ECE6"/><line x1="0" x2="640" y1="330" y2="330" stroke="'+INK+'" stroke-opacity=".12"/>';
   o+='<polygon class="sunbeam" points="70,300 190,300 420,420 240,420" fill="#E9C98A" opacity=".16"/>';
   o+='<path d="M70 304 V150 A60 60 0 0 1 190 150 V304 Z" fill="#fff" stroke="'+INK+'" stroke-opacity=".5"/><line x1="130" x2="130" y1="90" y2="304" stroke="'+INK+'" stroke-opacity=".35"/><line x1="70" x2="190" y1="205" y2="205" stroke="'+INK+'" stroke-opacity=".35"/>';
   o+='<circle cx="510" cy="150" r="48" fill="none" stroke="'+INK+'" stroke-opacity=".45"/><path d="M470 160 A40 40 0 0 1 550 160" fill="#E8D5C4" opacity=".6"/><circle cx="520" cy="140" r="14" fill="#C9A68A" opacity=".5"/>';
   o+='<ellipse cx="420" cy="376" rx="200" ry="24" fill="#EFE6DD"/>';
   o+='<rect x="240" y="282" width="360" height="8" rx="2" fill="#E6DACB"/><line x1="262" x2="262" y1="290" y2="352" stroke="'+INK+'" stroke-opacity=".5"/><line x1="578" x2="578" y1="290" y2="352" stroke="'+INK+'" stroke-opacity=".5"/>';
   var a=find('aurelia'),w=find('wren'),m=find('mist');
   if(a)o+=at(a,345,282,.78);if(w)o+=at(w,455,282,.72);if(m)o+=at(m,525,282,.62);
 }
 if(type==='office'){
   o+='<rect width="640" height="420" fill="#F8F9FA"/><rect y="340" width="640" height="80" fill="#EEF0F1"/>';
   o+='<rect x="400" y="50" width="200" height="200" fill="#fff" stroke="'+INK+'" stroke-opacity=".4"/><line x1="500" x2="500" y1="50" y2="250" stroke="'+INK+'" stroke-opacity=".25"/><line x1="400" x2="600" y1="150" y2="150" stroke="'+INK+'" stroke-opacity=".25"/>';
   o+='<path d="M400 250 V205 h22 V180 h18 V215 h20 V160 h24 V205 h18 V190 h26 V225 h22 V170 h20 V250Z" fill="#D9E1E6" opacity=".7"/>';
   o+='<line x1="70" x2="300" y1="130" y2="130" stroke="'+INK+'" stroke-opacity=".5" stroke-width="2"/>';
   [[80,22,'#C9D2C7'],[104,16,'#E1C9B5'],[122,20,'#B9C6D2'],[144,14,'#D9D0C4']].forEach(function(b){o+='<rect x="'+b[0]+'" y="'+(130-b[1]*1.6)+'" width="'+(b[1]*.6)+'" height="'+(b[1]*1.6)+'" fill="'+b[2]+'"/>'});
   var mi=find('mist'),li=find('linen'),pi=find('pillar'),wr=find('wren');
   if(mi)o+=at(mi,260,130,.36);
   o+='<rect x="70" y="292" width="500" height="8" rx="2" fill="#E1D6C8"/><line x1="96" x2="96" y1="300" y2="372" stroke="'+INK+'" stroke-opacity=".5"/><line x1="544" x2="544" y1="300" y2="372" stroke="'+INK+'" stroke-opacity=".5"/>';
   o+='<rect x="205" y="168" width="150" height="96" rx="5" fill="#fff" stroke="'+INK+'" stroke-opacity=".6"/><rect x="214" y="177" width="132" height="78" fill="#E7EEF3"/><path d="M214 240 l40 -34 l30 22 l30 -28 l32 40Z" fill="#CBD9E2"/><line x1="280" x2="280" y1="264" y2="292" stroke="'+INK+'" stroke-opacity=".5"/><rect x="250" y="286" width="60" height="6" rx="2" fill="#D8D2CA"/>';
   o+='<rect x="222" y="283" width="100" height="5" rx="2" fill="#E8E2DA" stroke="'+INK+'" stroke-opacity=".25"/>';
   if(li)o+=at(li,430,292,.62);if(pi)o+=at(pi,500,292,.5);if(wr)o+=at(wr,130,292,.5);
 }
 if(type==='party'){
   o+='<rect width="640" height="420" fill="#FCF5F5"/><rect y="372" width="640" height="48" fill="#F3E8E8"/>';
   o+='<path d="M0 50 Q160 120 320 50 T640 50" fill="none" stroke="'+INK+'" stroke-opacity=".4"/>';
   for(i=0;i<16;i++){var t=i/15,bx=t*640,by=50+Math.sin(t*Math.PI*4)*-0+ (function(){var u=(t*2)%1;return 70*Math.sin(u*Math.PI)*(1)}());o+='<circle class="twink" style="animation-delay:'+(i*.23)+'s" cx="'+f(bx)+'" cy="'+f(by+4)+'" r="4.5" fill="#F6C65B"/>'}
   o+='<rect x="60" y="268" width="520" height="8" rx="2" fill="#fff" stroke="'+INK+'" stroke-opacity=".3"/>';
   o+='<path d="M60 276 H580 V336 '+(function(){var s='';for(var q=0;q<13;q++)s+='q-20 26 -40 0 ';return s})()+'Z" fill="#fff" stroke="'+INK+'" stroke-opacity=".3"/>';
   [130,250,370,490].forEach(function(x){o+='<ellipse cx="'+x+'" cy="264" rx="26" ry="5" fill="#F3E8E8" stroke="'+INK+'" stroke-opacity=".25"/>'});
   var so=find('solstice'),or=find('orla'),ja=find('jaipur');
   if(so)o+=at(so,205,266,.82);if(or)o+=at(or,325,266,.62);if(ja)o+=at(ja,445,266,.7);
   [[270,266],[385,266]].forEach(function(c){o+='<rect x="'+(c[0]-4)+'" y="'+(c[1]-34)+'" width="8" height="34" fill="#F8F2E8" stroke="'+INK+'" stroke-opacity=".3"/>'+flame(c[0],c[1]-36)});
 }
 if(type==='cultural'){
   o+='<rect width="640" height="420" fill="#FFF9F0"/><rect y="350" width="640" height="70" fill="#F5E8D6"/>';
   o+='<path d="M30 24 Q320 78 610 24" fill="none" stroke="'+INK+'" stroke-opacity=".35"/>';
   for(i=0;i<15;i++){var tt=i/14,gx=30+tt*580,gy=24+ (2*(1-tt)*tt*54);for(var j=0;j<4+(i%3);j++){o+='<circle cx="'+f(gx)+'" cy="'+f(gy+8+j*10)+'" r="5.5" fill="'+((i+j)%2?'#F2A91B':'#E8731A')+'"/>'}o+='<line x1="'+f(gx)+'" x2="'+f(gx)+'" y1="'+f(gy)+'" y2="'+f(gy+6)+'" stroke="#4F7D5A"/>'}
   o+='<g transform="translate(320 378) scale(1 .22)">';
   for(i=0;i<12;i++)o+='<ellipse cx="0" cy="-120" rx="26" ry="58" fill="'+['#E8447A','#F2A91B','#fff','#7BC46A'][i%4]+'" opacity=".75" transform="rotate('+(i*30)+')"/>';
   o+='<circle r="62" fill="#F2A91B" opacity=".85"/><circle r="34" fill="#E8447A" opacity=".9"/></g>';
   o+='<rect x="190" y="300" width="260" height="14" fill="#C9473A"/><rect x="190" y="296" width="260" height="6" fill="#E26B5B"/><line x1="206" x2="206" y1="314" y2="346" stroke="'+INK+'" stroke-opacity=".5"/><line x1="434" x2="434" y1="314" y2="346" stroke="'+INK+'" stroke-opacity=".5"/>';
   var pe=find('petal'),wn=find('wren');
   if(pe)o+=at(pe,320,298,1.05);if(wn)o+=at(wn,232,298,.5);if(wn)o+=at(wn,408,298,.5);
   [[262,296],[378,296],[150,350],[490,350]].forEach(function(c){o+='<path d="M'+(c[0]-12)+' '+c[1]+' h24 q0 11 -12 11 q-12 0 -12 -11z" fill="#C9962F"/>'+flame(c[0],c[1]-1,1.3)});
 }
 return o+'</svg>';
}

/* ---------- logo + hero line drawing ---------- */
function logo(){return '<img class="mark" src="assets/logo-mark.png" alt="" width="44" height="44" decoding="async">'}
function heroLine(){
 var sh=SHAPES.amphora,o='<g class="outline" fill="none" stroke="#1E1A1D" stroke-width="1.1" stroke-linecap="round">';
 o+='<path class="draw" pathLength="1" d="'+sh.d+'"/><path class="draw" pathLength="1" d="'+sh.extra+'"/>';
 o+='<path class="draw" pathLength="1" style="animation-delay:.5s" d="M100 73 C96 20 70 -20 30 -50"/><path class="draw" pathLength="1" style="animation-delay:.7s" d="M100 73 C102 10 110 -40 112 -92"/><path class="draw" pathLength="1" style="animation-delay:.9s" d="M100 73 C110 30 150 -10 176 -46"/>';
 [[30,-50],[112,-92],[176,-46],[64,-14],[140,-8]].forEach(function(p,k){o+='<circle class="draw" pathLength="1" style="animation-delay:'+(1.1+k*.15)+'s" cx="'+p[0]+'" cy="'+p[1]+'" r="9"/>'});
 return o+'</g>';
}

window.Art={vase:vase,vaseInner:vaseInner,group:group,scene:scene,logo:logo,heroLine:heroLine,shapes:SHAPES,mix:mix,hash:hash};
})();

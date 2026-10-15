/* Catalogue: sample products, sets and themes. Replace prices, names and copy with your own. */
(function(){
var L=[];
function p(id,name,shape,glaze,motif,mc,arr,price,addon,size,tags,blurb,x){
  var o={id:id,name:name,shape:shape,glaze:glaze,motif:motif,mc:mc,arr:arr,price:price,addon:addon,size:size,tags:tags,blurb:blurb,coll:'studio',mat:'Hand-glazed stoneware'};
  if(x)for(var k in x)o[k]=x[k];
  L.push(o);
}
var WHITE=['#FFFFFF','#F6F1EA'];

/* ---- Studio collection ---- */
p('aurelia','Aurelia Amphora','amphora',['#F4EEE5','#D8CAB5'],'bands','#C9A24B',{s:'branch',p:['#F6C1D0','#FFFFFF','#F9DDE5'],m:'#E7B56B'},4800,1800,'H 32 cm \u00b7 \u00d8 16 cm',['home','party'],'A tall two-handled amphora in a soft ivory glaze with gold-lustre bands. Holds long branches without a frog.',{mat:'Matt stoneware, gold-lustre bands'});
p('wren','Wren Bud Vase','bud',['#C6D6C9','#8FA596'],'none','',{s:'single',p:['#F7C6D3'],m:'#E7B56B',petals:9},1450,450,'H 18 cm \u00b7 \u00d8 9 cm',['home','office'],'A slim sage bottle for a single stem. Lives on desks, windowsills and bedside tables.');
p('moonlight','Moonlight Jar','moon',['#FBFAF7','#E3DDD5'],'none','',{s:'grass',p:['#F4EBDD','#E2CFAF','#FFFFFF']},3900,2200,'H 36 cm \u00b7 \u00d8 24 cm',['home'],'A round, quiet jar with a pearl glaze. Beautiful with dried pampas, equally good empty.');
p('pillar','Pillar Cylinder','cylinder',['#E8EEF2','#BCCAD3'],'stripes','#FFFFFF',{s:'tulip',p:['#F6A9BC','#FFD1DA','#FFFFFF']},2200,900,'H 28 cm \u00b7 \u00d8 12 cm',['office','home'],'A straight-sided cylinder in cool blue-grey. A good height for tulips and anything that leans.');
p('orla','Orla Low Bowl','bowl',['#F4DDD6','#DDB5A9'],'none','',{s:'lush',p:['#E98AA3','#F6B9C8','#FFFFFF'],petals:9,n:7},2900,2400,'H 14 cm \u00b7 \u00d8 30 cm',['party','home'],'A low blush bowl made for dinner tables, where guests can see across the flowers.');
p('sable','Sable Urn','urn',['#4A4448','#2B2629'],'bands','#C9A24B',{s:'lush',p:['#FFFFFF','#F3EEE6','#EADFF0'],petals:10},5400,2600,'H 38 cm \u00b7 \u00d8 22 cm',['home','cultural'],'A footed urn in charcoal glaze with gold bands. Formal, calm, and very good with white flowers.',{rim:'#C9A24B'});
p('solstice','Solstice Trumpet','trumpet',['#DDA27C','#B7714F'],'none','',{s:'grass',p:['#E8D2A8','#F4E7CE','#D6B78A']},3200,1600,'H 40 cm \u00b7 \u00d8 20 cm',['party','home'],'A flared terracotta trumpet for dried grasses and loose, tall styling.');
p('linen','Linen Spire','spire',['#EFE6D6','#CDBFA6'],'spire','#A89A80',{s:'single',p:['#FFFFFF'],m:'#E7B56B',petals:10},2600,700,'H 42 cm \u00b7 \u00d8 10 cm',['office','home'],'A tall oat-coloured spire with a gently ribbed surface. Reception desks love it.');
p('jaipur','Jaipur Cobalt','amphora',['#5A7BB5','#324A7C'],'lattice','#D9B85A',{s:'lush',p:['#F2B01E','#F6C23E','#E8731A'],petals:14},5200,2100,'H 34 cm \u00b7 \u00d8 18 cm',['cultural','party'],'A deep cobalt amphora with a gold jaali pattern. Made for marigolds and festival tables.',{rim:'#D9B85A'});
p('petal','Petal Brass Bowl','bowl',['#E6C47A','#B38B3C'],'rings','#8A5E1E',{s:'lush',p:['#F2A91B','#E8731A','#F6C23E'],petals:14,n:8},3600,2000,'H 15 cm \u00b7 \u00d8 32 cm',['cultural','party'],'A wide brass-glazed bowl, traditional in shape. Float marigolds or build a dome.',{mat:'Stoneware, brass-lustre glaze'});
p('mist','Mist Glass Bud','bud',['#DCE3E6','#AEBBC0'],'none','',{s:'spray',p:['#FFFFFF','#F6F2EA','#F7D6E0'],m:'#E7B56B'},1650,550,'H 20 cm \u00b7 \u00d8 10 cm',['office','home'],'A smoky, translucent-look bottle for baby\u2019s breath and tiny sprays.');
p('cove','Cove Ink Cylinder','cylinder',['#3B3A44','#1F1E26'],'none','',{s:'branch',p:['#FFFFFF','#F6C1D0'],m:'#E7B56B'},2800,1400,'H 30 cm \u00b7 \u00d8 13 cm',['office','party'],'A near-black cylinder with a silver rim. Branches look graphic against it.',{rim:'#BDBBC6'});
p('rosewater','Rosewater Urn','urn',['#F3C9D2','#DDA0B0'],'bands','#fff',{s:'lush',p:['#F29BB5','#F6C1D0','#FFFFFF'],petals:9},4200,2300,'H 34 cm \u00b7 \u00d8 20 cm',['home','party'],'A pink footed urn that makes a mixed rose bunch look deliberate.');
p('tide','Tide Moon Jar','moon',['#E9D5B5','#C9A97A'],'none','',{s:'single',p:['#FFFFFF'],m:'#E7B56B',petals:12},3300,900,'H 30 cm \u00b7 \u00d8 22 cm',['home','office'],'A sand-toned round jar. One large bloom is enough.');

/* ---- Theme pots: movies ---- */
function t(id,name,group,insp,blurb,shape,glaze,motif,mc,arr,price,addon,tags,x){
  p(id,name,shape,glaze,motif,mc,arr,price,addon,'H 30\u201338 cm',tags,blurb,{coll:'theme',group:group,insp:insp,mat:'Hand-glazed stoneware',theme:true});
  if(x)for(var k in x)L[L.length-1][k]=x[k];
}
t('m-pinkhotel','The Pink Hotel','movies',['The Grand Budapest Hotel'],'Pastel confectionery stripes and a lobby-boy sense of order. Tulips in strict rows.','cylinder',['#F7C9D6','#E9A4BA'],'awning','#FFFFFF',{s:'tulip',p:['#F29BB5','#FFD6E0','#FFFFFF']},2800,950,['party','home']);
t('m-dune','Desert Bloom','movies',['Dune'],'Sand, ochre and wind-dried grasses in a smooth, monumental jar.','moon',['#E7C79A','#C79C62'],'bands','#8A5A2B',{s:'grass',p:['#D9C29A','#EAD9B7','#C8A877']},3900,2000,['home','office']);
t('m-amelie','Montmartre Red','movies',['Am\u00e9lie'],'A red glaze with cream dots and a handful of poppy-red blooms. Whimsy, in moderation.','moon',['#C8483C','#8E241F'],'dots','#F6E4B8',{s:'lush',p:['#E5332A','#F26B4A','#C2271F'],petals:6,n:6},3400,1800,['home','party']);
t('m-spirit','Cloud Bath House','movies',['Spirited Away'],'Aqua glaze with drifting white clouds and a spray of pale blossom.','urn',['#9CC7C6','#5E9AA0'],'clouds','#FFFFFF',{s:'spray',p:['#FFFFFF','#E8F2F2','#F7D6E0']},3600,1700,['home','party']);
t('m-lala','Griffith Dusk','movies',['La La Land'],'Violet to marigold at sunset, scattered with tiny stars.','spire',['#9B7AD8','#5E4AA8'],'stars','#F7D774',{s:'lush',p:['#F7B267','#F4845F','#FBD38D'],petals:8,n:6},3100,1500,['party','home']);

/* ---- series ---- */
t('s-regency','Regency Garden','series',['Bridgerton'],'Powder-blue glaze with a white lattice and a cloud of garden roses. Very drawing room.','urn',['#CFE0EE','#9FB9D2'],'lattice','#FFFFFF',{s:'lush',p:['#F3B7C6','#FFFFFF','#F8D4DD'],petals:10},4900,2500,['home','party']);
t('s-nevermore','Nevermore Noir','series',['Wednesday'],'Black glaze with silver hairlines, tall as a gothic window. Dark dahlias, naturally.','spire',['#3A3640','#17151B'],'spire','#9A93A6',{s:'lush',p:['#5B1F3B','#7B2A4F','#2A1130'],petals:14,n:6,m:'#C9A24B'},3800,1900,['home','party'],{rim:'#B8B2C4'});
t('s-crown','The Royal Parlour','series',['The Crown'],'Navy and gold, formal and quiet. Cream roses and nothing else.','urn',['#2E3C6B','#18224A'],'bands','#D4AF5A',{s:'lush',p:['#FFFFFF','#F2EEE6','#EADFC8'],petals:10},5600,2800,['home','office'],{rim:'#D4AF5A'});
t('s-paris','Rooftop in Paris','series',['Emily in Paris'],'Pink-and-white awning stripes, peonies, and a very good view.','cylinder',['#FBE3EA','#F3B9CA'],'stripes','#E58AA6',{s:'lush',p:['#F7B1C5','#FFFFFF','#F2A3BA'],petals:12,n:7},3200,2200,['party','home']);
t('s-heera','Mehfil Nights','series',['Heeramandi'],'Emerald glaze with a gold jaali screen and marigold-and-jasmine for the evening.','amphora',['#1F6B5C','#0F4A3F'],'lattice','#E0B85B',{s:'lush',p:['#F2B01E','#FFFFFF','#E8731A'],petals:14},5200,2400,['cultural','party'],{rim:'#E0B85B'});

/* ---- festivals ---- */
t('f-diwali','Diwali Diya Glow','festivals',['Diwali'],'Brass glaze with a ring of tiny glowing diyas. Marigolds, of course.','urn',['#E6B450','#B07F22'],'diya','#FFE7A0',{s:'lush',p:['#F2A91B','#E8731A','#F6C23E'],petals:14},4200,2200,['cultural','home']);
t('f-holi','Holi Splash','festivals',['Holi'],'A white bowl thrown with colour and a handful of every bright flower.','bowl',['#FFFFFF','#E8E3EE'],'splash','#fff',{s:'lush',p:['#E8447A','#F2B01E','#3FA9D9','#7BC46A','#9B5DE5'],petals:8,n:8},3100,2000,['party','cultural']);
t('f-pujo','Pujo Red & White','festivals',['Durga Puja'],'The red-and-white border of a pujo sari, with soft white kash grass.','trumpet',['#FBF8F3','#E1D9CC'],'border','#D8322D',{s:'grass',p:['#FFFFFF','#F3EFE8','#EFEAE0']},3700,1800,['cultural','home']);
t('f-onam','Pookalam Ring','festivals',['Onam'],'Concentric flower motifs in yellow and white, inspired by the pookalam.','bowl',['#F6E6A8','#E6C766'],'rings','#E55B3C',{s:'lush',p:['#F7D54A','#FFFFFF','#F29B38'],petals:12,n:8},3300,1900,['cultural','home']);
t('f-xmas','Winter Evergreen','festivals',['Christmas'],'Forest green with a quiet pattern and pine boughs with red berries.','cylinder',['#2F5B45','#1C3B2C'],'pine','#D9E8DD',{s:'pine',p:['#C0392B']},3000,1300,['home','party']);
t('f-eid','Eid Moonlight','festivals',['Eid'],'Midnight teal with a gold crescent and a cloud of white jasmine-style sprays.','moon',['#1E4F5C','#0F2F3A'],'crescent','#F4E3B0',{s:'spray',p:['#FFFFFF','#F6F2EA'],m:'#E7B56B'},3800,1700,['home','cultural']);

var byId={};L.forEach(function(x){byId[x.id]=x});

/* ---- Settings: where the vases live ---- */
var SETTINGS=[
 {id:'home',name:'Home',tag:'Console, dining table, bedside',lead:'A single well-placed vase changes a room more than a new sofa does. Start with the surfaces people pass every day.',
  tips:['Odd numbers look natural: one, three or five pieces.','Vary height, not colour. Keep one glaze family per surface.','Place a vase where you stop, such as the entry console, not in a corner.'],
  scene:'home'},
 {id:'office',name:'Office',tag:'Reception, desk, meeting room',lead:'Quiet shapes and cool glazes that look composed on camera and make a lobby feel looked after.',
  tips:['Choose a vessel narrower than the monitor so it never blocks the screen.','Single stems last the longest and need the least care.','Match the glaze to your brand colour for reception displays.'],
  scene:'office'},
 {id:'party',name:'Parties',tag:'Long tables, brunches, cocktails',lead:'Low bowls for conversation, tall trumpets for drama, and bud vases between the plates.',
  tips:['Keep centrepieces under 30 cm, or above 50 cm, so guests can see each other.','Repeat one vase shape down the table with different flowers.','Add candles between vases at the same height as the low bowls.'],
  scene:'party'},
 {id:'cultural',name:'Cultural events',tag:'Pujas, Diwali, mehendi, weddings',lead:'Brass, cobalt and marigold, laid out the way the ceremony needs them: at the altar, the entrance and the floor.',
  tips:['Place the brass bowl at the centre of the chowki and flank it with two smaller vases.','Add diyas at the same height as the lowest flowers.','Use strands of marigold on the entrance as a torana, and repeat the colour in the vases.'],
  scene:'cultural'}
];

/* ---- Sets: ready-to-style groups for each setting ---- */
function S(id,setting,name,desc,items){
  var sum=0;items.forEach(function(i){var q=byId[i];sum+=q.price+q.addon});
  return {id:id,setting:setting,name:name,desc:desc,items:items,price:Math.round(sum*.9/50)*50,full:sum};
}
var SETS=[
 S('set-console','home','Morning Console','Three vessels of different heights for an entry table.',['aurelia','wren','mist']),
 S('set-dining','home','Sunday Dining','A low bowl, a jar and a bud vase for a dining table.',['orla','moonlight','wren']),
 S('set-reception','office','Reception Calm','Two tall, neutral pieces for a front desk.',['linen','cove']),
 S('set-desk','office','Desk Trio','Small bud vases and a cylinder for every workstation.',['wren','mist','pillar']),
 S('set-brunch','party','Brunch Table','Soft pinks and a pair of bud vases for a daytime table.',['orla','wren','mist']),
 S('set-longtable','party','Evening Long Table','Terracotta, cobalt and brass for a table of twelve.',['solstice','jaipur','petal']),
 S('set-puja','cultural','Puja Corner','Charcoal urn, brass bowl and a bud vase for the altar.',['sable','petal','wren']),
 S('set-diwali','cultural','Diwali Welcome','Marigold-ready vessels for the entrance and the table.',['f-diwali','jaipur','petal'])
];

var GROUPS=[
 {id:'movies',name:'Movies',lead:'Colour stories pulled from films we love.'},
 {id:'series',name:'Series',lead:'Streaming-night moods, from drawing rooms to dark academia.'},
 {id:'festivals',name:'Festivals',lead:'Pots for the calendar: lights, colours and ceremony.'}
];

window.DATA={products:L,byId:byId,settings:SETTINGS,sets:SETS,groups:GROUPS};
})();

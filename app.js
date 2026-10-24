document.documentElement.classList.add('js');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const DPR=Math.min(2,window.devicePixelRatio||1);
const css=getComputedStyle(document.documentElement);const C=n=>css.getPropertyValue(n).trim();
const BLUE=C('--blue')||'#2346F5',RED=C('--red')||'#EE2B2F',DEEP=C('--blue-deep')||'#0D1B6E',INK=C('--ink')||'#0B1330';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const easeOut=t=>1-Math.pow(1-clamp(t),3);
const easeBack=t=>{t=clamp(t);const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
const hexRGB=h=>[1,3,5].map(k=>parseInt(h.slice(k,k+2),16)).join(',');
const B=hexRGB(BLUE),R=hexRGB(RED),K=hexRGB(INK);
const icon=n=>`<svg class="ic"><use href="#i-${n}"/></svg>`;
function onVisible(el,cb){if(!('IntersectionObserver' in window)){cb(true);return}new IntersectionObserver(es=>es.forEach(e=>cb(e.isIntersecting))).observe(el)}

/* ---------- team data (vikingdigital.io/team) ---------- */
const EXEC=[
 {id:'tor',name:'Tor Langøy',role:'Founder & Strategic Lead',bio:['Norwegian entrepreneur with experience across energy, finance and global markets.','Began his career at Norway’s largest industrial logistics park, then held commercial roles at BP and Amoco.','Full-time entrepreneur and investor since 2004, founding and investing in oil, real estate and digital asset ventures.','Degrees from the Norwegian School of Management, the University of Alabama and the University of Florida.']},
 {id:'venkat',name:'Venkat Thummisi',role:'Strategic Partner & Infrastructure Lead',bio:['Technology entrepreneur and former Head of Core Infrastructure at OpenAI.','Founder and CEO of Data Cities, focused on large-scale AI digital infrastructure.','Leads senior teams with data centre and GPU cluster experience, including brownfield conversions, hyperscale campuses and liquid-cooled deployments.','MSc in Management and Engineering from MIT.']},
 {id:'lauren',name:'Lauren Selig',role:'Board Member',bio:['Entrepreneur and investor with two decades of experience in technology, start-ups, digital infrastructure and media.','Founded Shake and Bake Productions and V.A.L.I.S Studios.','Has backed or advised companies in VR, blockchain, AI and emerging technology.','Serves on the board of XPRIZE.']},
 {id:'david',name:'David Kippen',role:'Board Member',bio:['Telecoms and technology investor with 25 years in M&A and private equity, including over $30bn in transactions across the US and Europe.','Serves on the boards of infrastructure companies in Ireland, Poland and Africa, and represents a major Family Office.','Previously in technology investment banking at JPMorgan and UBS.','Degrees from McGill and Johns Hopkins / SAIS.']}];
const CORE=[{id:'joakim',name:'Joakim Treider',role:'CEO'},{id:'bjorn',name:'Bjørn Vik',role:'CTO'},{id:'joe',name:'Joe McCaffrey',role:'COO'},{id:'reza',name:'Reza Zahedi',role:'Vice President'},{id:'glauco',name:'Glauco Verdoia',role:'Vice President'},{id:'knut',name:'Knut Gronsberg',role:'Community Director'}];
const IMG=window.__IMG||{};
const ini=n=>n.split(' ').map(s=>s[0]).join('');
const photo=p=>`<div class="photo">${IMG['team-'+p.id]?`<img src="${IMG['team-'+p.id]}" alt="Portrait of ${p.name}" loading="lazy">`:`<span class="ini">${ini(p.name)}</span>`}</div>`;

(function team(){
 const ex=$('#exec');if(!ex)return;
 ex.innerHTML=EXEC.map((p,i)=>`<button class="person" data-i="${i}" aria-label="Read more about ${p.name}">${photo(p)}<div class="meta"><div><h4>${p.name}</h4><div class="role mono">${p.role}</div></div><span class="plus">${icon('plus')}</span></div></button>`).join('');
 const V=EXEC[1],inf=$('#infra');
 if(inf)inf.innerHTML=`${photo(V)}<div class="txt"><span class="mono">Infrastructure leadership for AI-scale deployment</span><h3>${V.name}</h3><p>A key strategic partner bringing deep expertise in large-scale compute and AI-native infrastructure. His experience spans high-performance data centres, GPU cluster deployments and infrastructure planning for next-generation workloads.</p><p>He leads teams of senior operators supporting the design, build and operation of high-density, AI-ready campuses.</p><ul><li>Former Head of Core Infrastructure, OpenAI</li><li>Founder &amp; CEO, Data Cities</li><li>MSc Management &amp; Engineering, MIT</li></ul></div>`;
 const cg=$('#coregrid');if(cg)cg.innerHTML=CORE.map(p=>`<div class="person">${photo(p)}<div class="meta"><div><h4>${p.name}</h4><div class="role mono">${p.role}</div></div></div></div>`).join('');
 const dr=$('#drawer'),db=$('#dbody');let last;
 function open(i){const p=EXEC[i];last=document.activeElement;db.innerHTML=`<div class="dhead">${photo(p)}<div><span class="mono" style="color:var(--mute)">Executive Management Team</span><h3 id="d-name">${p.name}</h3><div class="role mono">${p.role}</div></div></div><div class="body"><ul>${p.bio.map(b=>`<li>${icon('arrow-right')}<span>${b}</span></li>`).join('')}</ul></div>`;dr.classList.add('open');dr.setAttribute('aria-hidden','false');$('#dclose').focus()}
 function close(){dr.classList.remove('open');dr.setAttribute('aria-hidden','true');last&&last.focus()}
 ex.addEventListener('click',e=>{const b=e.target.closest('.person');if(b)open(+b.dataset.i)});
 $('#dclose').onclick=close;$('#scrim').onclick=close;addEventListener('keydown',e=>{if(e.key==='Escape')close()});
})();

/* ---------- headline word reveal ---------- */
(function(){const h=$('#h1');if(!h)return;let blue=false,i=0;h.innerHTML=h.innerHTML.split('|').map(seg=>{const o=seg.trim().split(/\s+/).filter(Boolean).map(w=>`<span class="w${blue?' blue':''}"><span style="animation-delay:${(0.08+i++*0.05).toFixed(2)}s">${w}</span></span>`).join(' ');blue=!blue;return o}).join(' ')})();

/* split headings revealed on scroll */
(function(){$$('[data-split]').forEach(h=>{let i=0;const walk=n=>{[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(' '));return}const o=document.createElement('span');o.className='w';const s=document.createElement('span');s.textContent=w;s.style.transitionDelay=(i++*0.045).toFixed(3)+'s';o.appendChild(s);f.appendChild(o)});c.replaceWith(f)}else if(c.nodeType===1&&!c.classList.contains('w'))walk(c)})};walk(h)})})();

/* ---------- reveal on scroll ---------- */
(function(){const els=$$('.rv,[data-split]');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});els.forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('in');else io.observe(el)})})();

/* ---------- nav: always visible, progress, sliding indicator, burger ---------- */
(function(){const nav=$('#nav');if(!nav)return;const pt=nav.querySelector('.prog-top');let y0=scrollY;
 const menu=$('#menu');
 addEventListener('scroll',()=>{const y=scrollY,was=nav.classList.contains('scrolled'),now=y>60;if(was!==now){nav.classList.toggle('scrolled',now);clearTimeout(nav._t);nav._t=setTimeout(()=>{go(on);ind.style.transition='none';go(on);requestAnimationFrame(()=>ind.style.transition='')},20);setTimeout(()=>go(on),760)}y0=y;
  const max=document.documentElement.scrollHeight-innerHeight;if(pt)pt.style.transform=`scaleX(${max>0?y/max:0})`},{passive:true});
 const ind=document.createElement('i');ind.className='ind';menu.appendChild(ind);menu.classList.add('has-ind');
 const on=menu.querySelector('a.on');
 function go(a){if(!a){ind.style.opacity=0;return}ind.style.opacity=1;const pd=parseFloat(getComputedStyle(a).paddingLeft)||14;ind.style.width=(a.offsetWidth-2*pd)+'px';ind.style.transform=`translateX(${a.offsetLeft+pd}px)`}
 const pill=document.createElement('i');pill.className='pill';menu.appendChild(pill);
 const glide=a=>{if(!a){pill.style.opacity=0;return}const first=pill.style.opacity!=='1';if(first){pill.style.transition='opacity .25s';}pill.style.width=a.offsetWidth+'px';pill.style.transform=`translateX(${a.offsetLeft}px)`;pill.style.opacity=1;if(first)requestAnimationFrame(()=>pill.style.transition='')};
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('mouseenter',()=>{go(a);glide(a)}));menu.addEventListener('mouseleave',()=>{go(on);glide(null)});
 requestAnimationFrame(()=>{ind.style.transition='none';go(on);requestAnimationFrame(()=>ind.style.transition='')});addEventListener('resize',()=>go(on));
 const bg=$('#burger');bg.onclick=()=>menu.classList.toggle('open')})();

/* ---------- page transition ---------- */
(function(){const v=$('#veil');if(!v||RM)return;
 if(sessionStorageGet('vdc-nav')){v.classList.add('cover');requestAnimationFrame(()=>requestAnimationFrame(()=>v.classList.add('lift')));setTimeout(()=>v.className='veil',900);sessionStorageSet('vdc-nav','')}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a)return;const h=a.getAttribute('href');if(!h||h.startsWith('#')||/^[a-z]+:/i.test(h)||a.target||e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();sessionStorageSet('vdc-nav','1');v.classList.add('out');setTimeout(()=>{location.href=h},560)});
 addEventListener('pageshow',e=>{if(e.persisted)v.className='veil'})})();
function sessionStorageGet(k){try{return sessionStorage.getItem(k)}catch(e){return null}}
function sessionStorageSet(k,val){try{sessionStorage.setItem(k,val)}catch(e){}}

/* ---------- spotlight cards ---------- */
$$('.spot').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')}));

/* ---------- partners marquee ---------- */
(function(){const t=$('#track');if(!t)return;t.innerHTML+=t.innerHTML;const n=t.children.length;[...t.children].forEach((c,i)=>{if(i>=n/2)c.setAttribute('aria-hidden','true')})})();

/* ---------- footer wordmark ---------- */
(function(){const m=$('#mega');if(!m)return;m.innerHTML=[...'Viking Digital'].map((ch,i)=>`<span style="transition-delay:${i*45}ms">${ch===' '?'&nbsp;':ch}</span>`).join('');const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){m.classList.add('in');io.disconnect()}},{threshold:.2});io.observe(m)})();

/* ---------- copy address ---------- */
(function(){const b=$('#copyaddr');if(!b)return;b.onclick=()=>{const t='Dronning Eufemias gate 10, 0191 Oslo, Norway';const done=()=>{b.textContent='Copied';setTimeout(()=>b.textContent='Copy address',1600)};
 const sel=()=>{const r=document.createRange();r.selectNodeContents($('#addr'));const s=getSelection();s.removeAllRanges();s.addRange(r)};
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done,sel);else sel()}})();

/* ---------- form ---------- */
(function(){const f=$('#form');if(!f)return;f.addEventListener('submit',e=>{e.preventDefault();let ok=true;f.querySelectorAll('.field').forEach(fl=>{const el=fl.querySelector('input,textarea'),m=fl.querySelector('.msg');let err='';if(el.required&&!el.value.trim())err='Please fill in this field.';else if(el.type==='email'&&el.value&&!/^\S+@\S+\.\S+$/.test(el.value))err='Enter an email like name@company.com.';fl.classList.toggle('err',!!err);m.textContent=err;if(err)ok=false});if(ok){f.classList.add('sent');f.querySelector('.send').style.display='none'}})})();

/* =====================================================================
   Campus engine: one isometric campus, four build states
   survey → power & services → halls → live operations
   ===================================================================== */
function Campus(cv,opt){
 const x=cv.getContext('2d');opt=opt||{};
 // [i, j, w, d, h, type]  type 0 compute hall, 1 high-density GPU/TPU hall, 2 substation, 3 heat exchange
 const halls=[[-22,-6,7,4,1.7,0],[-13,-6,7,4,1.7,1],[-4,-6,7,4,1.7,0],[5,-6,7,4,1.7,0],[-22,1,7,4,1.7,0],[-13,1,7,4,1.7,0],[-4,1,7,4,1.7,1],[5,1,7,4,1.7,0],[14,-6,5,4,1.3,0],[14,1,5,4,1.3,0],[-26,8,3,3,.9,2],[-21,8,3,3,.9,2],[12,9,2,2,2.4,3],[15.5,9,2,2,2.4,3]];
 const LBL=[['Compute hall','Liquid-cooled'],['High-density hall','GPU / TPU'],['Substation','Grid integration'],['Heat exchange','Cold water loop']];
 const order=halls.map((h,i)=>i).sort((a,b)=>(halls[a][0]+halls[a][1])-(halls[b][0]+halls[b][1]));
 const bOrder=order.filter(n=>halls[n][5]<2);
 const coast=i=>13.4+Math.sin(i*.22)*1.6+Math.sin(i*.07+1)*2.2;
 let W=0,H=0,s=10,ox=0,oy=0,dx=0,dy=0,tdx=0,tdy=0,base=null,hover=-1,tops=[];
 const st={survey:0,power:0,build:0,ops:0};
 const P=(i,j,k=0)=>[ox+dx+(i-j)*s*.866,oy+dy+(i+j)*s*.5-k*s];
 function size(){const r=cv.getBoundingClientRect();W=r.width;H=r.height;if(!W||!H)return;cv.width=Math.round(W*DPR);cv.height=Math.round(H*DPR);
  const fit=opt.fit||.96;s=Math.min(W*fit/63,H*fit/36);
  ox=W/2-s*.866*(-2.7);oy=H/2+s*.4+(opt.yShift||0)*H;
  base=document.createElement('canvas');base.width=cv.width;base.height=cv.height;const c=base.getContext('2d');c.setTransform(DPR,0,0,DPR,0,0);
  const Pb=(i,j)=>[ox+(i-j)*s*.866,oy+(i+j)*s*.5];
  c.lineWidth=.5;
  for(let i=-34;i<=30;i++){for(const d of [0,1]){const a=d?Pb(-34,i):Pb(i,-16),b=d?Pb(30,i):Pb(i,24);const g=c.createLinearGradient(a[0],a[1],b[0],b[1]);const al=i%5===0?.12:.05;g.addColorStop(0,`rgba(${B},0)`);g.addColorStop(.5,`rgba(${B},${al})`);g.addColorStop(1,`rgba(${B},0)`);c.strokeStyle=g;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke()}}}
 function poly(pts,f,st_){x.beginPath();pts.forEach((p,n)=>n?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.closePath();if(f){x.fillStyle=f;x.fill()}if(st_){x.strokeStyle=st_;x.stroke()}}
 function line(a,b){x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()}
 function path(pts){x.beginPath();pts.forEach((p,n)=>n?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()}
 // point along polyline in grid coords
 function along(pts,u){let L=0;const seg=[];for(let n=1;n<pts.length;n++){const l=Math.hypot(pts[n][0]-pts[n-1][0],pts[n][1]-pts[n-1][1]);seg.push(l);L+=l}let d=u*L;for(let n=0;n<seg.length;n++){if(d<=seg[n]){const k=d/seg[n];return [pts[n][0]+(pts[n+1][0]-pts[n][0])*k,pts[n][1]+(pts[n+1][1]-pts[n][1])*k]}d-=seg[n]}return pts[pts.length-1]}
 function partial(pts,u){if(u<=0)return;const out=[pts[0]];let L=0;const seg=[];for(let n=1;n<pts.length;n++){const l=Math.hypot(pts[n][0]-pts[n-1][0],pts[n][1]-pts[n-1][1]);seg.push(l);L+=l}let d=u*L;for(let n=0;n<seg.length;n++){if(d>=seg[n]){out.push(pts[n+1]);d-=seg[n]}else{const k=d/seg[n];out.push([pts[n][0]+(pts[n+1][0]-pts[n][0])*k,pts[n][1]+(pts[n+1][1]-pts[n][1])*k]);break}}path(out.map(p=>P(p[0],p[1],p[2]||0)))}
 const FIBRE=[[-32,-8.6],[23,-8.6],[23,-2]];
 const POWER=[[-34,9.6],[-26,9.6]];
 const BUS=[[-19.5,9.5],[-19.5,-.6],[21,-.6]];
 const LOOP_COLD=[[13,coast(13)+1.2],[13,10.6],[-23,6.2]];
 const LOOP_WARM=[[-23,6.8],[16.5,6.8],[16.5,10.6]];
 const COLD=[[13,10.6],[-24,10.6],[-24,6.2]];
 function hallK(n){const t=halls[n][5];if(t>=2)return easeBack(st.power*1.25-(t===3?.25:0));const idx=bOrder.indexOf(n);const start=idx/bOrder.length*.55;return easeBack((st.build-start)/.45)}
 function drawBox(n,k,t){const [i,j,w,d,h0,type]=halls[n];const lift=hover===n?.3:0;const h=Math.max(.02,h0*k)+lift;const hot=type===1;
  const dim=hover>=0&&hover!==n?.45:1;x.globalAlpha=dim;
  const fl=opt.fill?clamp(opt.fill(n,t,halls[n])):1;
  if(fl<1){const hw=h0+lift;x.globalAlpha=dim*(1-fl*.6);x.strokeStyle=`rgba(${B},.75)`;x.lineWidth=.8;x.setLineDash([3,2]);
   poly([P(i,j,hw),P(i+w,j,hw),P(i+w,j+d,hw),P(i,j+d,hw)],null,x.strokeStyle);line(P(i,j+d,0),P(i,j+d,hw));line(P(i+w,j+d,0),P(i+w,j+d,hw));line(P(i+w,j,0),P(i+w,j,hw));path([P(i,j+d,0),P(i+w,j+d,0),P(i+w,j,0)]);x.setLineDash([]);
   x.globalAlpha=dim*fl;if(fl<=0){x.globalAlpha=1;return}}
  // ground shadow
  x.fillStyle=`rgba(${K},${.07*clamp(k)})`;poly([P(i+w,j),P(i+w+h*.9,j+h*.15),P(i+w+h*.9,j+d+h*.15),P(i+w,j+d)]);x.fill();
  const front=[P(i,j+d,0),P(i+w,j+d,0),P(i+w,j+d,h),P(i,j+d,h)],side=[P(i+w,j,0),P(i+w,j+d,0),P(i+w,j+d,h),P(i+w,j,h)];
  let g=x.createLinearGradient(0,front[0][1],0,front[3][1]);
  if(type===3){g.addColorStop(0,'#CFE0F5');g.addColorStop(1,'#EAF2FC')}else if(hot){g.addColorStop(0,'#FFC9CB');g.addColorStop(1,'#FFE9EA')}else{g.addColorStop(0,'#CBD5FF');g.addColorStop(1,'#EDF1FF')}
  x.lineWidth=.7;poly(front,g,`rgba(${hot?R:B},.45)`);
  g=x.createLinearGradient(0,side[0][1],0,side[3][1]);
  if(hot){g.addColorStop(0,'#F7A7AA');g.addColorStop(1,'#FFD3D5')}else{g.addColorStop(0,'#AEBCFA');g.addColorStop(1,'#D6DEFF')}
  poly(side,g,`rgba(${hot?R:B},.45)`);
  // facade ribs
  x.strokeStyle=`rgba(${hot?R:B},.18)`;x.lineWidth=.5;for(let r=.5;r<w;r+=.5)line(P(i+r,j+d,h*.12),P(i+r,j+d,h*.88));
  // running status lights
  if(st.ops>0&&type<2){for(let r=.5;r<w;r+=.5){const a=st.ops*(.15+.85*Math.pow(Math.max(0,Math.sin(t/420-r*1.1-n)),8));const p=P(i+r,j+d,h*.32);x.fillStyle=hot?`rgba(${R},${a})`:`rgba(${B},${a})`;x.fillRect(p[0]-1,p[1]-1,2,2)}}
  // roof
  const top=[P(i,j,h),P(i+w,j,h),P(i+w,j+d,h),P(i,j+d,h)];tops[n]=top;
  const col=type===1?RED:type===0?BLUE:type===2?DEEP:'#5C7FD6';
  g=x.createLinearGradient(top[0][0],top[0][1],top[2][0],top[2][1]);g.addColorStop(0,col);g.addColorStop(1,type===1?'#D81E22':type===0?'#1A39D8':col);
  poly(top,g,null);
  if(opt.hl){const v=opt.hl(n,t,halls[n]);if(v>0)poly(top,`rgba(255,255,255,${.55*v})`,null)}
  x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=1;path([P(i,j+d,h),P(i+w,j+d,h),P(i+w,j,h)]);
  if(hover===n){x.strokeStyle=INK;x.lineWidth=1.2;poly(top,null,INK)}
  // rooftop cooling units
  if(type<2&&k>.9){const ua=clamp(st.ops*1.4);if(ua>0){for(let ci=i+1.1;ci<i+w-.6;ci+=1.9){const cj=j+d/2,hh=h+.14*ua;
     poly([P(ci-.45,cj-.45,hh),P(ci+.45,cj-.45,hh),P(ci+.45,cj+.45,hh),P(ci-.45,cj+.45,hh)],`rgba(255,255,255,${.22*ua})`,null);
     const c=P(ci,cj,hh);x.strokeStyle=`rgba(255,255,255,${.85*ua})`;x.lineWidth=.9;x.beginPath();x.ellipse(c[0],c[1],s*.33,s*.19,0,0,7);x.stroke();
     const sp=t/(hot?110:190)+ci;for(let b=0;b<3;b++){const a=sp+b*2.094;line(c,P(ci+.3*Math.cos(a),cj+.3*Math.sin(a),hh))}}}}
  // high-density scan
  if(hot&&st.ops>.5){const u=(t/1600+n*.3)%1,rr=.4+u*(w-.8);x.strokeStyle=`rgba(255,255,255,${.9*Math.sin(u*Math.PI)})`;x.lineWidth=2;line(P(i+rr,j+.3,h),P(i+rr,j+d-.3,h))}
  x.globalAlpha=1}
 function frame(t){if(!W){size();if(!W)return}
  dx+=(tdx-dx)*.06;dy+=(tdy-dy)*.06;
  x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,cv.width,cv.height);
  x.globalAlpha=clamp(st.survey*2);x.drawImage(base,dx*DPR,dy*DPR);x.globalAlpha=1;x.setTransform(DPR,0,0,DPR,0,0);
  // sea: shimmering dot field beyond the coastline
  const sv=easeOut(st.survey*1.4);
  for(let i=-34;i<=30;i+=.55){const c0=coast(i);for(let j=Math.ceil(c0*1.25)/1.25;j<24;j+=.8){const p=P(i,j);if(p[0]<-4||p[0]>W+4||p[1]>H+4)continue;const sh=.5+.5*Math.sin(i*.55+j*.9-t/900);const fade=clamp(1-(j-c0)/12);x.fillStyle=`rgba(${B},${sv*fade*(.08+.32*sh)})`;x.fillRect(p[0],p[1],1.4,1.4)}}
  x.strokeStyle=`rgba(${B},.75)`;x.lineWidth=1.2;const cpts=[];for(let i=-34;i<=30;i+=.5)cpts.push([i,coast(i)]);partial(cpts,easeOut(st.survey*1.2));
  // survey: pads + dashed outlines + scan line
  if(st.survey>0){const sx=-30+st.survey*58;
   halls.forEach(([i,j,w,d],n)=>{if(i>sx)return;const a=clamp((sx-i)/6);x.fillStyle=`rgba(${B},${.05*a})`;poly([P(i-.4,j-.4),P(i+w+.4,j-.4),P(i+w+.4,j+d+.4),P(i-.4,j+d+.4)]);x.fill();
    x.setLineDash([3,3]);x.strokeStyle=`rgba(${B},${.55*a*(1-clamp(st.build*2-.2))+.12*a})`;x.lineWidth=.8;poly([P(i,j),P(i+w,j),P(i+w,j+d),P(i,j+d)],null,x.strokeStyle);x.setLineDash([]);
    x.fillStyle=`rgba(${R},${.8*a*(1-st.build)})`;[[i,j],[i+w,j],[i+w,j+d],[i,j+d]].forEach(([a1,b1])=>{const p=P(a1,b1);x.fillRect(p[0]-1.5,p[1]-.5,3,1);x.fillRect(p[0]-.5,p[1]-1.5,1,3)})});
   if(st.survey<1){const a=P(sx,-14),b=P(sx,22);const g=x.createLinearGradient(a[0],a[1],b[0],b[1]);g.addColorStop(0,`rgba(${R},0)`);g.addColorStop(.5,`rgba(${R},.8)`);g.addColorStop(1,`rgba(${R},0)`);x.strokeStyle=g;x.lineWidth=1.5;line(a,b)}}
  // power, fibre, services
  if(st.power>0){const pw=easeOut(st.power*1.2);
   x.lineWidth=1.3;x.strokeStyle=`rgba(${K},.55)`;partial(POWER,pw);
   x.strokeStyle=`rgba(${B},.45)`;x.lineWidth=1;x.setLineDash([2,3]);partial(BUS,easeOut(st.power*1.4-.3));x.setLineDash([]);
   x.strokeStyle=`rgba(${R},.9)`;x.lineWidth=1.3;x.setLineDash([4,5]);x.lineDashOffset=-t/45;partial(FIBRE,easeOut(st.power*1.3-.15));x.setLineDash([]);
   x.strokeStyle=`rgba(${B},.7)`;x.lineWidth=1.3;partial(LOOP_COLD,easeOut(st.power*1.3-.35));
   x.strokeStyle=`rgba(${R},.45)`;x.lineWidth=1;partial(LOOP_WARM,easeOut(st.power*1.3-.45))}
  // live flows
  if(st.ops>0){const oa=clamp(st.ops*1.5);
   for(let k=0;k<6;k++){const u=(t/5200+k/6)%1,q=along(LOOP_COLD,u),p=P(q[0],q[1]);x.fillStyle=`rgba(${B},${oa})`;x.beginPath();x.arc(p[0],p[1],2.2,0,7);x.fill()}
   for(let k=0;k<5;k++){const u=(t/6000+k/5)%1,q=along(LOOP_WARM,u),p=P(q[0],q[1]);x.fillStyle=`rgba(${R},${oa*.8})`;x.beginPath();x.arc(p[0],p[1],1.8,0,7);x.fill()}
   for(let k=0;k<4;k++){const u=(t/2600+k/4)%1,q=along(FIBRE,u),p=P(q[0],q[1]);const g=x.createRadialGradient(p[0],p[1],0,p[0],p[1],7);g.addColorStop(0,`rgba(${R},${oa})`);g.addColorStop(1,`rgba(${R},0)`);x.fillStyle=g;x.fillRect(p[0]-7,p[1]-7,14,14)}
   for(let k=0;k<3;k++){const u=(t/3000+k/3)%1,q=along(POWER,u),p=P(q[0],q[1]);x.fillStyle=`rgba(${K},${oa*.8})`;x.fillRect(p[0]-1.5,p[1]-1.5,3,3)}
   const q=(t/1800)%1,pi=P(13,coast(13)+1.2);x.strokeStyle=`rgba(${B},${oa*(.7-q*.7)})`;x.lineWidth=1;x.beginPath();x.ellipse(pi[0],pi[1],4+q*20,(4+q*20)*.5,0,0,7);x.stroke()}
  // buildings, back to front
  order.forEach(n=>{const k=hallK(n);if(k>0.001)drawBox(n,k,t)});
  // heat shimmer above high-density halls
  if(st.ops>.4){halls.forEach(([i,j,w,d,h,type],n)=>{if(type!==1)return;for(let m=0;m<5;m++){const u=(t/2200+m/5+n*.13)%1;const p=P(i+1+m*1.2,j+d/2,h+u*1.6);x.fillStyle=`rgba(${R},${.45*(1-u)*clamp(st.ops*2-.8)})`;x.fillRect(p[0]-1,p[1]-1,2,2)}})}
  // callouts
  if(opt.callouts&&st.ops>0){const a=clamp(st.ops*2-1);if(a>0){x.globalAlpha=a*(hover>=0?.35:1);
   [[P(-9.5,-4,1.7),'GPU / TPU HALL',1],[P(13,coast(13)+1.2),'COLD WATER INTAKE',1]].forEach(([p,l,dir])=>{const ex=p[0]+dir*22,ey=p[1]-(l[0]==='G'?44:26);x.strokeStyle=INK;x.lineWidth=.8;path([p,[ex,ey],[ex+dir*12,ey]]);x.fillStyle=INK;x.beginPath();x.arc(p[0],p[1],2,0,7);x.fill();
    x.font='500 10px "IBM Plex Mono", monospace';const tw=x.measureText(l).width;const lx=dir>0?ex+dir*14:ex+dir*14-tw-8;x.fillStyle='rgba(255,255,255,.92)';x.fillRect(lx-4,ey-9,tw+16,17);x.fillStyle=INK;x.fillText(l,lx+4,ey+3.5)});x.globalAlpha=1}}
  if(opt.after)opt.after(x,P,t,W,H);
 }
 function inside(p,pl){let c=false;for(let i=0,j=pl.length-1;i<pl.length;j=i++){const [xi,yi]=pl[i],[xj,yj]=pl[j];if(((yi>p[1])!=(yj>p[1]))&&(p[0]<(xj-xi)*(p[1]-yi)/(yj-yi)+xi))c=!c}return c}
 if(opt.hover){const tip=opt.tip;
  cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect(),p=[e.clientX-r.left,e.clientY-r.top];
   let h=-1;[...order].reverse().some(n=>{if(tops[n]&&hallK(n)>.5&&inside(p,tops[n])){h=n;return true}});hover=h;
   if(h>=0&&tip){const L=LBL[halls[h][5]];tip.querySelector('#tipk').textContent=L[0];tip.querySelector('#tipv').textContent=L[1];tip.style.left=Math.min(r.width-230,p[0]+16)+'px';tip.style.top=(p[1]+16)+'px';tip.classList.add('on')}else if(tip)tip.classList.remove('on');
   if(RM)frame(performance.now())});
  cv.addEventListener('pointerleave',()=>{hover=-1;tdx=tdy=0;tip&&tip.classList.remove('on');if(RM)frame(performance.now())})}
 addEventListener('resize',()=>{size();if(RM)frame(performance.now())});
 return {st,frame,size,halls,LBL,get hover(){return hover},setHover(n){hover=n},topOf(n){return tops[n]},hallK};
}

/* hero campus: built and live, slow ambient motion, scene eases in once */
(function(){const cv=$('#campus');if(!cv)return;const hv=document.documentElement.dataset.hv||'';const t0=performance.now();let cp;
 const o={hover:true,tip:$('#tip'),callouts:true,fit:1.02};
 // V1 scan: a slow beam crosses the site every ~9s and lights the roofs it passes
 const beam=t=>{const u=(t/4000)%1;return u<.62?-30+u/.62*58:null};
 if(hv==='1'){o.hl=(n,t,h)=>{const b=beam(t);if(b===null)return 0;const c=h[0]+h[2]/2;return Math.max(0,1-Math.abs(b-c)/4)};
  o.after=(x,P,t)=>{const b=beam(t);if(b===null)return;const a=P(b,-14),c=P(b,22),g=x.createLinearGradient(a[0],a[1],c[0],c[1]);g.addColorStop(0,'rgba(238,43,47,0)');g.addColorStop(.5,'rgba(238,43,47,.85)');g.addColorStop(1,'rgba(238,43,47,0)');x.strokeStyle=g;x.lineWidth=1.5;x.beginPath();x.moveTo(...a);x.lineTo(...c);x.stroke()}}
 // V2 blueprint: halls start as dashed wireframes and fill in a west-to-east wave
 if(hv==='2'){o.fill=(n,t,h)=>easeOut(clamp((performance.now()-t0-700-(h[0]+26)/45*2200)/700))}
 cp=Campus(cv,o);cp.size();
 Object.assign(cp.st,{survey:1,power:1,build:1,ops:1});
 if(RM){cp.frame(0);cv.classList.add('shown');return}
 let vis=true,raf=0;
 function loop(now){cp.frame(now*.45);raf=vis?requestAnimationFrame(loop):0}
 onVisible(cv,v=>{vis=v;if(v&&!raf)raf=requestAnimationFrame(loop)});raf=requestAnimationFrame(loop);
 requestAnimationFrame(()=>requestAnimationFrame(()=>cv.classList.add('shown')));
 // V3 guided: a calm tour focuses one hall at a time with its label, pausing when the visitor takes over
 if(hv==='3'){const tip=$('#tip'),stops=[1,6,0,10,12,7,3];let k=0,user=false;
  cv.addEventListener('pointerenter',()=>user=true);cv.addEventListener('pointerleave',()=>user=false);
  const step=()=>{if(!user){const n=stops[k++%stops.length],top=cp.topOf(n);cp.setHover(n);
    if(top&&tip){const L=cp.LBL[cp.halls[n][5]];tip.querySelector('#tipk').textContent=L[0];tip.querySelector('#tipv').textContent=L[1];
     const cx=top.reduce((a,p)=>a+p[0],0)/4,cy=Math.min(...top.map(p=>p[1]));tip.style.left=Math.min(cv.clientWidth-230,cx-20)+'px';tip.style.top=Math.max(0,cy-74)+'px';tip.classList.remove('on');void tip.offsetWidth;tip.classList.add('on')}}};
  setTimeout(()=>{step();setInterval(step,2800)},1600)}})();

/* phases: scroll-pinned build story */
(function(){const sec=$('#phases');if(!sec)return;const cv=$('#phcanvas'),cp=Campus(cv,{fit:.9,yShift:-.03});const lis=$$('#phlist li'),bar=$('#phbar'),k=$('#phk');
 const tg={survey:0,power:0,build:0,ops:0};let act=-1;
 function setAct(a){if(a===act)return;act=a;lis.forEach((l,i)=>{l.classList.toggle('on',i===a);l.classList.toggle('past',i<a)});k.textContent=`Phase ${a+1} / 4`}
 if(RM){sec.classList.add('static');Object.assign(cp.st,{survey:1,power:1,build:1,ops:1});cp.size();cp.frame(0);lis.forEach(l=>l.classList.add('on'));k.textContent='Phase 4 / 4';bar.style.transform='scaleX(1)';return}
 function prog(){const r=sec.getBoundingClientRect();return clamp(-r.top/(r.height-innerHeight))}
 lis.forEach((l,i)=>l.addEventListener('click',()=>{const r=sec.getBoundingClientRect();const top=scrollY+r.top+(r.height-innerHeight)*(i*.25+.17);scrollTo({top,behavior:'smooth'})}));
 let vis=false,raf=0;
 function loop(now){const p=prog();tg.survey=clamp(p/.17);tg.power=clamp((p-.25)/.17);tg.build=clamp((p-.5)/.17);tg.ops=clamp((p-.75)/.15);
  for(const key in tg)cp.st[key]+=(tg[key]-cp.st[key])*.12;
  setAct(Math.min(3,Math.floor(p*4)));bar.style.transform=`scaleX(${p})`;cp.frame(now);raf=vis?requestAnimationFrame(loop):0}
 onVisible(sec,v=>{vis=v;if(v&&!raf){cp.size();raf=requestAnimationFrame(loop)}});cp.size();setAct(0)})();

/* ---------- Nordic dot map (Natural Earth 1:50m) ---------- */
(function(){const c=$('#map');if(!c||!window.__EU)return;const g=c.getContext('2d'),box=c.parentElement;const rows=__EU.rows.split(','),NR=rows.length,NC=rows[0].length,PINS=__EU.pins;
 // cluster centres per country, Norway is the hub the links start from
 const CL={};PINS.forEach(([n,x,y])=>{(CL[n]=CL[n]||[0,0,0]);CL[n][0]+=x;CL[n][1]+=y;CL[n][2]++});for(const k in CL){CL[k][0]/=CL[k][2];CL[k][1]/=CL[k][2]}
 const tip=document.createElement('div');tip.className='maptip mono';box.appendChild(tip);
 let w,h,cell,ox,oy,T=0,t0=0,vis=false,raf=0,mx=-999,my=-999,hov=-1;
 function size(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*DPR;c.height=h*DPR;g.setTransform(DPR,0,0,DPR,0,0);cell=Math.min(w/NC,(h-24)/NR);ox=(w-cell*NC)/2;oy=(h-cell*NR)/2+6}
 const XY=(x,y)=>[ox+x*NC*cell,oy+y*NR*cell];
 function draw(now){if(!t0)t0=now;T=RM?1e6:now-t0;g.clearRect(0,0,w,h);
  const rv=q=>clamp((T-200)/1400*1.6-q*.6);
  for(let r=0;r<NR;r++){const row=rows[r];for(let q=0;q<NC;q++){const v=row.charCodeAt(q)-48;if(!v)continue;const px=ox+(q+.5)*cell,py=oy+(r+.5)*cell;
   const k=clamp((q/NC+r/NR)/2),a0=rv(k);if(a0<=0)continue;const near=Math.max(0,1-Math.hypot(px-mx,py-my)/110);
   let a=v===1?.62:.2,rad=cell*(v===1?.2:.15);a=Math.min(1,a+near*.5);rad*=1+near*.7;
   g.fillStyle=v===1?`rgba(255,255,255,${a*a0})`:`rgba(174,187,245,${a*a0})`;g.fillRect(px-rad,py-rad,rad*2,rad*2)}}
  // links from the Norwegian hub
  const hub=XY(CL.Norway[0],CL.Norway[1]),la=clamp((T-1500)/900);
  if(la>0){let i=0;for(const k in CL){if(k==='Norway')continue;const d=XY(CL[k][0],CL[k][1]),mxp=(hub[0]+d[0])/2,myp=Math.min(hub[1],d[1])-Math.hypot(d[0]-hub[0],d[1]-hub[1])*.28;
    const u=clamp(la*1.4-i*.08);i++;if(u<=0)continue;g.strokeStyle=`rgba(255,255,255,${.28})`;g.lineWidth=1;g.setLineDash([3,5]);g.lineDashOffset=-T/60;g.beginPath();
    const N=40;for(let s=0;s<=N*u;s++){const t=s/N,bx=(1-t)*(1-t)*hub[0]+2*(1-t)*t*mxp+t*t*d[0],by=(1-t)*(1-t)*hub[1]+2*(1-t)*t*myp+t*t*d[1];s?g.lineTo(bx,by):g.moveTo(bx,by)}g.stroke();g.setLineDash([]);
    if(u>=1){const t=((T/2600)+i*.17)%1,bx=(1-t)*(1-t)*hub[0]+2*(1-t)*t*mxp+t*t*d[0],by=(1-t)*(1-t)*hub[1]+2*(1-t)*t*myp+t*t*d[1];const gr=g.createRadialGradient(bx,by,0,bx,by,6);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(bx-6,by-6,12,12)}}}
  // pins drop in one after another, then breathe
  PINS.forEach(([n,x,y],i)=>{const p=XY(x,y),s=easeBack(clamp((T-900-i*70)/500));if(s<=0)return;const on=hov===i;
   const ph=((T/2400)+i*.13)%1;g.strokeStyle=`rgba(255,96,100,${(1-ph)*.7*s})`;g.lineWidth=1.2;g.beginPath();g.arc(p[0],p[1],5+ph*16,0,7);g.stroke();
   const gl=g.createRadialGradient(p[0],p[1],0,p[0],p[1],14*s);gl.addColorStop(0,'rgba(238,43,47,.55)');gl.addColorStop(1,'rgba(238,43,47,0)');g.fillStyle=gl;g.fillRect(p[0]-14,p[1]-14,28,28);
   g.fillStyle='#EE2B2F';g.beginPath();g.arc(p[0],p[1],(on?7:5)*s,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(p[0],p[1],(on?2.6:1.8)*s,0,7);g.fill()});
  raf=vis&&!RM?requestAnimationFrame(draw):0}
 box.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;
  hov=-1;let best=14;PINS.forEach(([n,x,y],i)=>{const p=XY(x,y),d=Math.hypot(p[0]-mx,p[1]-my);if(d<best){best=d;hov=i}});
  if(hov>=0){const p=XY(PINS[hov][1],PINS[hov][2]);tip.textContent=PINS[hov][0];tip.style.transform=`translate(${p[0]+14}px,${p[1]-30}px)`;tip.classList.add('on');box.style.cursor='pointer'}else{tip.classList.remove('on');box.style.cursor=''}
  if(RM)draw(0)});
 box.addEventListener('pointerleave',()=>{mx=my=-999;hov=-1;tip.classList.remove('on');if(RM)draw(0)});
 size();addEventListener('resize',()=>{size();if(RM)draw(0)});if(RM){draw(0);return}
 onVisible(c,v=>{vis=v;if(v&&!raf)raf=requestAnimationFrame(draw)})})();

/* ---------- wave lines (compute card + aim card) ---------- */
function waves(c,opt){const g=c.getContext('2d');let w,h,T=0,vis=false;
 function size(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*DPR;c.height=h*DPR;g.setTransform(DPR,0,0,DPR,0,0)}
 function d(){g.clearRect(0,0,w,h);const n=opt.n||20;for(let k=0;k<n;k++){g.strokeStyle=`rgba(255,255,255,${.1+k*.02})`;g.lineWidth=1;g.beginPath();for(let xx=0;xx<=w;xx+=8){const yy=h*.15+k*(h/(n+4))+Math.sin(xx/80+T/1000+k*.35)*14;xx?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.stroke()}T+=16;if(!RM&&vis)requestAnimationFrame(d)}
 size();addEventListener('resize',size);d();onVisible(c,v=>{vis=v;if(v&&!RM)requestAnimationFrame(d)})}
$$('#flow,.aimfx').forEach(c=>waves(c,{n:c.id==='flow'?20:14}));

/* ---------- contact dots react to pointer ---------- */
(function(){const c=$('#dots');if(!c)return;const g=c.getContext('2d');let w,h,mx=-999,my=-999,T=0,vis=false;
 function size(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*DPR;c.height=h*DPR;g.setTransform(DPR,0,0,DPR,0,0)}
 function d(){g.clearRect(0,0,w,h);for(let xx=14;xx<w;xx+=26)for(let yy=14;yy<h;yy+=26){const dd=Math.hypot(xx-mx,yy-my);const k=Math.max(0,1-dd/160);const v=.12+.1*Math.sin(xx/70+yy/90+T/1500)+k*.7;g.fillStyle=k>.5?`rgba(255,120,124,${v})`:`rgba(255,255,255,${v})`;const r=1.2+k*2.2;g.fillRect(xx-r/2,yy-r/2,r,r)}T+=16;if(!RM&&vis)requestAnimationFrame(d)}
 c.parentElement.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;if(RM)d()});c.parentElement.addEventListener('pointerleave',()=>{mx=my=-999});
 size();addEventListener('resize',size);d();onVisible(c,v=>{vis=v;if(v&&!RM)requestAnimationFrame(d)})})();

/* ---------- inner page header: slow drifting survey grid ---------- */
(function(){const c=$('#phfx');if(!c)return;const g=c.getContext('2d');let w,h,T=0,vis=false;
 function size(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*DPR;c.height=h*DPR;g.setTransform(DPR,0,0,DPR,0,0)}
 function d(){g.clearRect(0,0,w,h);const st=28,off=(T/60)%st;for(let xx=-st+off;xx<w+st;xx+=st)for(let yy=st/2;yy<h;yy+=st){const fx=clamp((xx-w*.35)/(w*.65));const a=.05+.3*fx*(.5+.5*Math.sin(xx/90-yy/70+T/1400));g.fillStyle=`rgba(${B},${a})`;g.fillRect(xx,yy,1.5,1.5)}
  const sx=(T/9)%(w+400)-200;const gr=g.createLinearGradient(sx-80,0,sx+80,0);gr.addColorStop(0,`rgba(${R},0)`);gr.addColorStop(.5,`rgba(${R},.25)`);gr.addColorStop(1,`rgba(${R},0)`);g.fillStyle=gr;g.fillRect(sx,0,1,h);
  T+=16;if(!RM&&vis)requestAnimationFrame(d)}
 size();addEventListener('resize',size);d();onVisible(c,v=>{vis=v;if(v&&!RM)requestAnimationFrame(d)})})();

/* back to top */
$$('a[href="#top"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:RM?'auto':'smooth'})}));

/* footer wave field: lines swell near the pointer */
(function(){const c=$('#ftfx');if(!c)return;const g=c.getContext('2d');let w,h,T=0,vis=false,mx=-9999,my=-9999,amx=-9999;
 function size(){const r=c.getBoundingClientRect();w=r.width;h=r.height;c.width=w*DPR;c.height=h*DPR;g.setTransform(DPR,0,0,DPR,0,0)}
 function d(){g.clearRect(0,0,w,h);const n=26;amx+=(mx-amx)*.08;
  for(let k=0;k<n;k++){const y0=h*.08+k*(h*.9/n);g.strokeStyle=`rgba(255,255,255,${.05+k*.006})`;g.lineWidth=1;g.beginPath();
   for(let xx=0;xx<=w;xx+=10){const near=Math.exp(-Math.pow((xx-amx)/180,2))*Math.exp(-Math.pow((y0-my)/220,2));const yy=y0+Math.sin(xx/120+T/1400+k*.32)*(10+near*26);xx?g.lineTo(xx,yy):g.moveTo(xx,yy)}g.stroke()}
  T+=16;if(!RM&&vis)requestAnimationFrame(d)}
 const f=c.parentElement;f.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;if(amx<-9000)amx=mx;if(RM)d()});f.addEventListener('pointerleave',()=>{mx=my=-9999});
 size();addEventListener('resize',size);d();onVisible(c,v=>{vis=v;if(v&&!RM)requestAnimationFrame(d)})})();

/* ---------- footer signature: "Viking Digital" as a field of dots that light up around the cursor ---------- */
(function(){const box=$('#ftdots');if(!box)return;const cv=box.querySelector('canvas'),g=cv.getContext('2d');
 let W,H,pts=[],mx=-1e4,my=-1e4,ax=-1e4,ay=-1e4,vis=false,raf=0,born=0;
 function build(){const r=box.getBoundingClientRect();W=r.width;H=r.height;if(!W)return;cv.width=W*DPR;cv.height=H*DPR;
  const o=document.createElement('canvas'),c=o.getContext('2d');o.width=Math.round(W);o.height=Math.round(H);
  let fs=H*1.08;c.font=`800 ${fs}px "Schibsted Grotesk", sans-serif`;const tw=c.measureText('Viking Digital').width;fs*=Math.min(1,W/tw);
  c.font=`800 ${fs}px "Schibsted Grotesk", sans-serif`;c.textBaseline='alphabetic';c.fillStyle='#fff';
  const m=c.measureText('Viking Digital');c.fillText('Viking Digital',(W-m.width)/2,H-m.actualBoundingBoxDescent-2);
  const d=c.getImageData(0,0,o.width,o.height).data,step=W<600?4:Math.max(5,Math.round(W/230));pts=[];
  for(let y=step/2;y<o.height;y+=step)for(let x=step/2;x<o.width;x+=step){if(d[(Math.floor(y)*o.width+Math.floor(x))*4+3]>128)pts.push([x,y,Math.random()])}
  box.dataset.step=step}
 function draw(now){const t=now/1000,step=+box.dataset.step||6;const idle=mx<-1e3,tx=idle?W*(.5+.48*Math.sin(t*.32)):mx,ty=idle?H*(.55+.2*Math.sin(t*.9)):my;ax+=(tx-ax)*(idle?.04:.12);ay+=(ty-ay)*(idle?.04:.12);
  g.setTransform(DPR,0,0,DPR,0,0);g.clearRect(0,0,W,H);const k=easeOut((now-born)/1600);
  for(const [x,y,r] of pts){const a=clamp(k*1.6-r*.6);if(a<=0)continue;
   const wave=.5+.5*Math.sin(x/90-t*1.1+Math.sin(y/60+t*.4));const dd=Math.hypot(x-ax,y-ay),near=Math.max(0,1-dd/150);
   const rad=step*.5*(.42+.2*wave+.55*near);
   g.fillStyle=near>.02?`rgba(${near>.55?R:'143,162,255'},${.35+.65*near})`:`rgba(255,255,255,${(.1+.16*wave)*a})`;
   g.beginPath();g.arc(x,y-(1-a)*14,rad,0,7);g.fill()}
  raf=vis&&!RM?requestAnimationFrame(draw):0}
 box.addEventListener('pointermove',e=>{const r=box.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
 box.addEventListener('pointerleave',()=>{mx=my=-1e4});
 const go=()=>{build();if(RM){born=-1e5;draw(performance.now())}};
 (document.fonts?document.fonts.ready:Promise.resolve()).then(go);addEventListener('resize',()=>{build();if(RM)draw(performance.now())});
 onVisible(box,v=>{vis=v;if(v&&!born)born=performance.now();if(v&&!raf&&!RM)raf=requestAnimationFrame(draw)})})();

/* ---------- footer reveal + copy address ---------- */
(function(){const f=$('#footer');if(!f||!f.classList.contains('ft3'))return;
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;f.classList.add(e.target===f?'in':'in2');io.unobserve(e.target)}),{threshold:.15});
 io.observe(f);const row=f.querySelector('.ft3-row');row&&io.observe(row);
 const ad=f.querySelector('.ft3-addr');if(ad){ad.insertAdjacentHTML('beforeend','<span class="cp">Copy address</span>');const cp=ad.querySelector('.cp');
  ad.addEventListener('click',()=>{const t='Dronning Eufemias gate 10, 0191 Oslo';const ok=()=>{ad.classList.add('ok');cp.textContent='Copied';setTimeout(()=>{ad.classList.remove('ok');cp.textContent='Copy address'},1600)};
   try{navigator.clipboard.writeText(t).then(ok,ok)}catch(e){ok()}})}
 const up=f.querySelector('.up');up&&up.addEventListener('click',e=>{e.preventDefault();scrollTo({top:0,behavior:RM?'auto':'smooth'})})})();

/* ═══ script.js — هەمی کارکرن و تێکەلاویێن ماڵپەڕێ ═══
   بۆ دەستکاریکرنێ: بەشێ "١. ڕێکخستن" (CFG) بگۆڕە. ═══ */

/* ═══ ١. ڕێکخستن — محەمەد ل ڤێرێ دەستکاری دکەت ═══ */
const CFG={
  startDate:"",  // ڕێکەفتا دەستپێکا چیرۆکێ، وەک: "2024-02-14T18:00". ئەگەر ڤالا بیت، ژمێرەر داخازا دانانێ دکەت
  secretPhrase:"هەجها",  // ئەگەر ئەڤ پەیڤە ل کیبۆردێ بهێتە نڤیسین، پەیامەکا نهێنی دەردکەڤیت
  song:"",  // ناڤێ پەڕگەیا گۆرانیێ یا تە خودان، وەک: "song.mp3" (دەبێت ل تەنیشت index.html بیت)

  /* بیرهاتنێن نموونە — ب بیرهاتنێن ڕاستەقینە بگۆڕە. هەر {} یەک بیرهاتنە: t = ناڤنیشان، d = نڤیسین */
  timeline:[{
    t:"دەستپێکا چیرۆکێ",
    d:"(نموونە) ل ڤێرێ بیرهاتنا دەستپێکا چیرۆکا خۆ بنڤیسە."
  },{
    t:"دەمێن یێن ئێکێ یێن تایبەت",
    d:"(نموونە) ئەو دەمێن کو هەمی تشت بوون تایبەت."
  },{
    t:"تشتێن بچووک",
    d:"(نموونە) ئەو تشتێن بچووک یێن مە نێزیکتر کرین."
  },{
    t:"خەونێن ئایندێ",
    d:"(نموونە) ئەو خەونێن ئەم هیڤیدارین پێکڤە چێکەین."
  },{
    t:"پەرتووکێن چاڤەڕێ",
    d:"(نموونە) چەندین پەرەیێن جوان هێشتا ل مە چاڤەڕێنە."
  }],

  /* کویز — o = بژارتەکان، a = ژمارا بەرسڤا ڕاست (0 یان 1 یان 2). ب بەرسڤێن ڕاستەقینە بگۆڕە */
  quiz:[{
    q:"محەمەد ژ هەمی تشتان پتر حەز ژ چ دکەت؟",
    o:["فنجانەک چا","دیتنا ستێران","گوهدارییا موزیکێ"],
    a:1
  },{
    q:"کیژ جهێ ئەم دڤێت پێکڤە بچینێ؟",
    o:["سەر چیایی","نێزیک دەریایێ","ل ماڵێ"],
    a:0
  },{
    q:"نیشانا ئەڤینا مە چیە؟",
    o:["دلەک","گولەک","ستێرەک"],
    a:0
  },{
    q:"خەونا مە یا هەرە مەزن چیە؟",
    o:["گەشتەک","ماڵەک","هەمی"],
    a:2
  },{
    q:"چ ئەڤینێ مەزنتر دکەت؟",
    o:["ڕێز","سەبر","هەردوو"],
    a:2
  }]
};

/* ═══ ٢. یارمەتیدەر: پەیامی کورت (toast) و دەنگ ═══ */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let sound=false,AC;
function toast(t) {
  const e=$('#toast');
  e.textContent=t;
  e.classList.add('on');
  clearTimeout(e.t);
  e.t=setTimeout(()=>e.classList.remove('on'),3800)
}
function tone(f=660) {
  if(!sound)return;
  try {
    AC=AC||new AudioContext;
    const o=AC.createOscillator(),
    g=AC.createGain();
    o.frequency.value=f;
    g.gain.value=.05;
    o.connect(g);
    g.connect(AC.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.6);
    o.stop(AC.currentTime+.6)
  } catch(e) {}
}

/* ═══ ٣. پاشبنەما: ستێر و پەڕێن گولان ═══ */
const bg=$('#bg'),bx=bg.getContext('2d');
let W,H,stars=[],pet=[],vis=true;
function rs() {
  W=bg.width=innerWidth;
  H=bg.height=innerHeight;
  stars=Array.from({
    length:Math.min(170,W/3)
  },()=>({
    x:Math.random()*W,
    y:Math.random()*H,
    r:Math.random()*1.4+.3,
    p:Math.random()*6
  }));
  pet=Array.from({
    length:14
  },()=>({
    x:Math.random()*W,
    y:Math.random()*H,
    s:Math.random()*6+4,
    v:Math.random()*.5+.2,
    a:Math.random()*6
  }))
}
addEventListener('resize',rs);
rs();
function frame(t) {
  bx.clearRect(0,0,W,H);
  for(const s of stars) {
    bx.globalAlpha=.4+.6*Math.abs(Math.sin(t/900+s.p));
    bx.fillStyle='#fff';
    bx.beginPath();
    bx.arc(s.x,s.y,s.r,0,7);
    bx.fill()
  }
  bx.fillStyle='#ff9ec4';
  for(const p of pet) {
    p.y+=p.v;
    p.x+=Math.sin(t/1500+p.a)*.4;
    if(p.y>H+10) {
      p.y=-10;
      p.x=Math.random()*W
    }
    bx.globalAlpha=.35;
    bx.beginPath();
    bx.ellipse(p.x,p.y,p.s,p.s/2,p.a+t/2000,0,7);
    bx.fill()
  }
  if(!RM)requestAnimationFrame(frame)
}
requestAnimationFrame(frame);
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&!RM)requestAnimationFrame(frame)
});

/* ═══ ٤. دەستپێک: دەرگەهێ گەردوونێ ═══ */
const seq=(ids,gap)=>ids.forEach((id,i)=>setTimeout(()=>$(id).classList.add('on'),gap*i+600));
seq(['#i1','#i2','#intro .heart','#enter'],2600);
$('#enter').onclick=()=>{
  $('#intro').classList.add('out');
  $('#main').hidden=false;
  document.body.style.overflow='';
  sound=false;
  setTimeout(()=>{
    $('#intro').style.display='none';
    typeHero();
    heartLoop()
  },1500)
};

/* ═══ ٥. هێرۆ: نڤیسینا پیتان و دلا ژ ستێران ═══ */
const HT="ژ ناڤ ملیاران مرۆڤان، ملیۆنان ستێران و جیهانێن بێ‌ژمار دا، دلێ من تو دیتی. و ئەگەر گەردوونێ هەزار ژیان دابانا من، ئەز دێ هەمییان ب خۆ بدەم بۆ دیتنا تە ژ نوی ڤە.";
let typed=false;
function typeHero() {
  if(typed)return;
  typed=true;
  const e=$('#typed');
  if(RM) {
    e.textContent=HT;
    return
  }
  let i=0;
  (function n() {
    e.textContent=HT.slice(0,++i);
    if(i<HT.length)setTimeout(n,45)
  })()
}
const hc=$('#hc'),hx=hc.getContext('2d'),P=[];
let ph=0,hOn=false;
for(let i=0;i<240;i++) {
  const a=i/240*6.283,
  tx=280+16*Math.pow(Math.sin(a),3)*11,
  ty=250-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))*11;
  P.push({
    x:Math.random()*560,
    y:Math.random()*560,
    tx,
    ty,
    s:Math.random()*2+1
  })
}
function heartLoop() {
  if(hOn)return;
  hOn=true;
  setInterval(()=>ph^=1,4200);
  (function f(t) {
    hx.clearRect(0,0,560,560);
    const b=1+.05*Math.sin(t/220);
    for(const p of P) {
      let gx=ph?p.tx:p.tx+Math.sin(t/700+p.s*9)*140,
      gy=ph?p.ty:p.ty+Math.cos(t/800+p.s*7)*140;
      p.x+=(gx-p.x)*.03;
      p.y+=(gy-p.y)*.03;
      hx.fillStyle=`hsl(${320+p.s*12},100%,${75}%)`;
      hx.shadowColor='#ff9ec4';
      hx.shadowBlur=12;
      hx.beginPath();
      hx.arc(280+(p.x-280)*b,280+(p.y-280)*b,p.s,0,7);
      hx.fill()
    }
    if(!RM||1)requestAnimationFrame(f)
  })(0)
}

/* ═══ نهێنی ١: ٥ جاران دلێ هێرۆ بگرە ═══ */
let hk=0;
hc.onclick=()=>{
  tone(440);
  if(++hk===5) {
    hk=0;
    toast("نهێنی: ڕەنگە تو نەزانی، بەلێ هەر جارەکێ ئەز ل تە دفکرم، ڕۆژا من ڕووناکتر دبیت ♡")
  }
};
$('#sec1').onclick=()=>toast("پەیامەک: تو ژ هەر ستێرەکێ ڕووناکتر یی ل دلێ من ✦");

/* ═══ نهێنی ٢: ستێرکا زێڕین یا بچووک ═══ */
$('#gs1').onclick=()=>toast("ستایشەک: بزەکا تە جوانترین ڕووناکییە ✦");

/* ═══ نهێنی ٣: دلێ فڕیان (پشتی ٥ چرکەیان دیار دبیت) ═══ */
setTimeout(()=>{
  const h=document.createElement('button');
  h.className='fh';
  h.textContent='♡';
  h.setAttribute('aria-label','نهێنی');
  h.onclick=()=>{
    toast("دلەکێ بچووک: من ل تە دگەڕێم هەر ڕۆژەکێ ♡");
    h.remove()
  };
  document.body.appendChild(h)
},5000);

/* ═══ ٦. نامەیا ئێکێ و نامەیا ئایندێ ═══ */
function openLetter(env,paper) {
  env.classList.add('open');
  paper.classList.add('open');
  tone(520);
  $$('#'+paper.id+' p').forEach((p,i)=>setTimeout(()=>p.classList.add('on'),RM?0:1200+i*1500))
}
$('#env').onclick=()=>openLetter($('#env'),$('#paper'));
$('#fenv').onclick=()=>openLetter($('#fenv'),$('#fpaper'));

/* ═══ ٧. ڕێزا چیرۆکێ (بیرهاتن) ═══ */
let mem=[];
try {
  mem=JSON.parse(localStorage.getItem('mem')||'[]')
} catch(e) {}function renderTL() {
  const tl=$('#tl');
  tl.innerHTML='';
  [...CFG.timeline,...mem].forEach(m=>{
    const d=document.createElement('div');
    d.className='it glass';
    const h=document.createElement('h3'),
    p=document.createElement('p');
    h.textContent=m.t;
    p.textContent=m.d;
    d.append(h,p);
    tl.appendChild(d);
    io.observe(d)
  })
}
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)e.target.classList.add('in')
}),{
  threshold:.2
});
$('#addb').onclick=()=>$('#af').classList.toggle('on');
$('#af').onsubmit=e=>{
  e.preventDefault();
  mem.push({
    t:$('#at').value,
    d:$('#ad').value
  });
  try {
    localStorage.setItem('mem',JSON.stringify(mem))
  } catch(x) {}e.target.reset();
  e.target.classList.remove('on');
  renderTL();
  toast("بیرهاتن هاتە تۆمارکرن ♡")
};
renderTL();

/* ═══ ٨. هۆکار: ٣٠ ستێرک ═══ */
const R=["چنکی خۆشیا تە بۆ من گرنگە.","چنکی ئەز حەزێ ژ تشتێن بچووک دکەم یێن تو بتنێ تێدا یی.","چنکی ئەز دڤێت خەونێن تە تێبگەهم، نە تنێ ببیستم.","چنکی بزەکا تە دەمەکێ ئاسایی دکەتە بیرهاتنەکا جوان.","چنکی ئەز دڤێت سەرکەفتنێن تە پیرۆز بکەم و دەمێ گران بیت هانا تە بدەم.","چنکی ئەڤینا تە من دکەتە کەسەکێ میهرەبانتر و سەبرتر.","چنکی ئەز دڤێت پەیوەندییا مە جهەکێ ئاسوودە، پڕ ڕێز و تێگەهشتن بیت.","چنکی تو هەجهایی، و چ کەسەکێ دی وەک تە نینە.","چنکی میهرەبانییا تە دلێ من نەرم دکەت.","چنکی خەیاڵا تە یا جوان جیهانا من ڕەنگین دکەت.","چنکی دەنگێ کەنینا تە موزیکا هەرە شرینە.","چنکی تو ل دەمێ گران ژی دلێ خۆ ڤەناکەی.","چنکی تو یا ڕاستی و پاکی.","چنکی چاڤێن تە بەرپەرانە ل بەر من.","چنکی تو من هان ددەی باشتر ببم.","چنکی گوتنەک ژ تە دشێت ڕۆژا من بگۆڕیت.","چنکی ئەز ل گەل تە ئارام دبم.","چنکی تو خەونێن مەزن دبینی.","چنکی شێوازێ تە یێ ئاخفتنێ تایبەتە.","چنکی ئەز حەز دکەم گوه ل بیرۆکێن تە بگرم.","چنکی تو دەمێن ئاسایی دکەی ب مانا.","چنکی ل ڕەخ تە دنیا ب ئارامترە.","چنکی دلێ تە پاکە.","چنکی تو شیانێن هەمی تشتان هەی.","چنکی هەر ڕۆژەک ل گەل تە دبیتە دیاری.","چنکی ئەز دڤێت هەمی ڕۆژان ل تە ببینم.","چنکی تو سەبرا من فێر دکەی.","چنکی ئەز ب بوونا تە سوپاسگوزارم.","چنکی تو ئەو کەسی یا دلێ من هەلبژارتی.","چنکی دلێ من ب ناڤێ تە ڕازییە."];
const sky=$('#sky');
R.forEach((t,i)=>{
  const a=i*2.399,
  r=.12+.36*Math.sqrt((i+1)/R.length),
  b=document.createElement('button');
  b.className='st';
  b.textContent='✦';
  b.setAttribute('aria-label','هۆکارێک');
  b.style.left=50+r*Math.cos(a)*100+'%';
  b.style.top=50+r*Math.sin(a)*100+'%';
  b.style.animationDelay=i*.3+'s';
  b.onclick=()=>{
    $$('.st.on').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const k=sky.getBoundingClientRect(),
    q=b.getBoundingClientRect(),
    l=$('#ln');
    l.setAttribute('x1',k.width/2);
    l.setAttribute('y1',k.height/2);
    l.setAttribute('x2',q.left-k.left+15);
    l.setAttribute('y2',q.top-k.top+15);
    l.style.opacity=.8;
    $('#rmsg').textContent=t;
    tone(500+i*12)
  };
  sky.appendChild(b)
});

/* ═══ ٩. دلێ لێدەر ═══ */
const BM=["تو ژ هەمی ستێران ڕووناکتر یی.","دلێ من ب ناڤێ تە دلێدێت.","هەر دەمەک ل گەل تە دیاریەکە.","ئەڤین ئەوە ئەز ل تە ببینم و ئارام ببم.","تو ئەو بزەیی ئەز هەمیشە دڤێت."];
function heartTap() {
  const h=$('#bh');
  h.style.animation='none';
  h.getBoundingClientRect();
  h.style.animation='beat 1s';
  $('#bm').textContent=BM[Math.random()*BM.length|0];
  tone(330);
  for(let i=0;i<10;i++) {
    const s=document.createElement('span');
    s.textContent='♡';
    const r=h.getBoundingClientRect();
    s.style.cssText=`position:fixed;z-index:9;color:#ff9ec4;left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;transition:1.6s;opacity:1;pointer-events:none`;
    document.body.appendChild(s);
    requestAnimationFrame(()=>{
      s.style.translate=`${(Math.random()-.5)*240}px ${-Math.random()*200}px`;
      s.style.opacity=0
    });
    setTimeout(()=>s.remove(),1700)
  }
}
$('#bh').onclick=heartTap;
$('#tm').onclick=heartTap;

/* ═══ ١٠. باخچەیا گولان ═══ */
const G=["هیڤی دکەم تو هەمیشە بیر بینی کا تو چەند ب بهایی.","هیڤی دکەم ئەم هەمیشە ئێک بکەنینین.","هیڤی دکەم خەونێن تە ژ ترسێن تە مەزنتر ببن.","هیڤی دکەم ئەم هەمیشە فێر ببین چاوا ئێک تێبگەهین.","هیڤی دکەم ئەم ئایندەیەکا پڕ ژ میهرەبانی، کەنین، متمانە و بیرهاتنێن جوان ببینین.","هیڤی دکەم ڕۆژەک ڕۆژەک، ئەڤین مەزنتر ببیت."];
const gd=$('#gd');
G.forEach(t=>{
  const f=document.createElement('button');
  f.className='fl';
  f.textContent='❀';
  f.setAttribute('aria-label','گول');
  f.onclick=()=>{
    f.classList.add('b');
    $('#gm').textContent=t;
    tone(600)
  };
  gd.appendChild(f)
});
const gr=document.createElement('button');
gr.className='gold';
gr.textContent='❀';
gr.setAttribute('aria-label','نهێنی');
gr.onclick=()=>$('#gm').textContent="گولا زێڕین: تو ژ هەمی گولان جوانتر و ژ هەمی ستێران ڕووناکتر یی ♡";
gd.appendChild(gr);

/* ═══ ١١. سندوقا گەنجینان ═══ */
const T={
  a:"تو ئەو کەسی یا ڕووناکییا دلێ من. هەر کەسەک تە ببینیت بەختەوەر دبیت ب ناسینا تە.",
  b:"بەلێنەکا بچووک: ئەز دێ هەردەم ڕێزێ ل تە بگرم، ڕاست بم، گوهێ خۆ بدەمە تە، میهرەبان بم، و ل گەل تە گەشە بکەم.",
  c:""
};
$('#chest').onclick=()=>{
  $('#chest').textContent='◇';
  $('#tr').classList.add('on');
  tone(700)
};
$$('#tr button').forEach(b=>b.onclick=()=>{
  if(b.dataset.t==='c')$('#co').classList.add('on');
  else $('#tm2').textContent=T[b.dataset.t]
});
$('#cx').onclick=()=>$('#co').classList.remove('on');

/* ═══ ١٢. کویز ═══ */
let qi=0,sc=0;
function showQ() {
  const q=CFG.quiz[qi],
  a=$('#qa');
  a.innerHTML='';
  if(!q) {
    $('#qq').innerHTML='';
    $('#qq').textContent=`تە ${sc} ژ ${CFG.quiz.length} دروست زانی — بەلێ ئەڤین ب نمرەیان نایێتە پێڤان ♡`;
    const b=document.createElement('button');
    b.textContent='ژ نوی ڤە دەست پێ بکە';
    b.onclick=()=>{
      qi=sc=0;
      showQ()
    };
    a.appendChild(b);
    return
  }
  $('#qq').textContent=q.q;
  q.o.forEach((o,i)=>{
    const b=document.createElement('button');
    b.textContent=o;
    b.onclick=()=>{
      b.classList.add('pk');
      tone(500);
      const ok=i===q.a;
      if(ok)sc++;
      $('#qq').textContent=ok?"ئافەرین! دلێ من ب هەڤەکە ♡":"بەلێ ئەڤە ژی شرینە، ئەز دێ بێژمە تە ♡";
      setTimeout(()=>{
        qi++;
        showQ()
      },1400);
      $$('#qa button').forEach(x=>x.disabled=true)
    };
    a.appendChild(b)
  })
}
showQ();

/* ═══ ١٣. ژمێرەرا دەمی ═══ */
const cn=$('#cn');
function cnt() {
  if(!CFG.startDate) {
    cn.innerHTML='<p style="grid-column:1/-1">ڕێکەفتا دەستپێکا چیرۆکا خۆ د CFG.startDate دا دانە، دا ئەم دەمان بژمێرین.</p>';
    return
  }
  let s=Math.max(0,(Date.now()-new Date(CFG.startDate))/1000|0);
  const v=[s/86400|0,s/3600%24|0,s/60%60|0,s%60],
  n=['ڕۆژ','دەمژمێر','خولەک','چرکە'];
  cn.innerHTML=v.map((x,i)=>`<div><b>${x}</b><span>${n[i]}</span></div>`).join('')
}
cnt();
setInterval(cnt,1000);

/* ═══ ١٤. هیڤی و ئاگرێن هەوایی ═══ */
const wc=$('#wc'),wx=wc.getContext('2d');
let fw=[],wOn=false;
function burst(x,y) {
  const c=Math.random()*60+310;
  for(let i=0;i<70;i++) {
    const a=i/70*6.283,
    hx=16*Math.pow(Math.sin(a),3),
    hy=-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a));
    fw.push({
      x,
      y,
      vx:hx*.22,
      vy:hy*.22,
      l:1,
      c
    })
  }
}
function wl() {
  if(!wOn)return;
  wx.fillStyle='rgba(6,3,15,.2)';
  wx.fillRect(0,0,wc.width,wc.height);
  fw=fw.filter(p=>p.l>0);
  for(const p of fw) {
    p.x+=p.vx;
    p.y+=p.vy;
    p.vy+=.02;
    p.l-=.01;
    wx.fillStyle=`hsla(${p.c},100%,75%,${p.l})`;
    wx.beginPath();
    wx.arc(p.x,p.y,2,0,7);
    wx.fill()
  }
  requestAnimationFrame(wl)
}
$('#wish').onclick=()=>{
  $('#wo').classList.add('on');
  wc.width=innerWidth;
  wc.height=innerHeight;
  wOn=true;
  $('#w1').textContent='';
  $('#w2').textContent='';
  if(!RM)wl();
  else wx.clearRect(0,0,9999,9999);
  const iv=setInterval(()=>{
    if(!wOn)return clearInterval(iv);
    burst(Math.random()*wc.width*.8+wc.width*.1,Math.random()*wc.height*.5+80)
  },900);
  burst(wc.width/2,200);
  setTimeout(()=>$('#w1').textContent="ئەگەر هەر ستێرەکێ بشیا هیڤییەکێ ژ بۆ تە ببەت، ئاسمان چ جاران یێ مەزن نەبوو.",1500);
  setTimeout(()=>$('#w2').textContent="هیڤی دکەم خۆشی، ئارامی، ویر، خەونێن جوان، و ئەڤینەکا کو هەمیشە تە ب ڕێز و بهادار بهێلیت.",5500)
};
$('#wx').onclick=()=>{
  wOn=false;
  $('#wo').classList.remove('on')
};

/* ═══ ١٥. شانۆیا کۆتایێ ═══ */
let fs=false;
new IntersectionObserver(es=>{
  if(es[0].isIntersecting&&!fs) {
    fs=true;
    ['#f1','#f2','#f3','#f4','#f5','#f6','#f7'].forEach((id,i)=>setTimeout(()=>$(id).classList.add('on'),RM?0:i*2600+(i>4?2000:0)))
  }
},{
  threshold:.4
}).observe($('#fin'));
$('#again').onclick=()=>{
  fs=false;
  $$('#fin p').forEach(p=>p.classList.remove('on'));
  scrollTo({
    top:0,
    behavior:'smooth'
  })
};

/* ═══ نهێنی ٥: ڕەمزا نهێنی (ل کیبۆردێ بنڤیسە). نهێنی ٤ = گولا زێڕین د باخچێ دا ═══ */
let buf='';
addEventListener('keydown',e=>{
  buf=(buf+e.key).slice(-CFG.secretPhrase.length);
  if(buf===CFG.secretPhrase)toast("نهێنی دۆزرا: ئەم دو ستێرکێن ئێک ئاسمانین ✦♡")
});

/* ═══ ١٦. لێدەرێ موزیکێ ═══ */
const au=$('#au');
if(CFG.song)au.src=CFG.song;
else $('#mt').textContent='گۆرانی دێ بێتە زێدەکرن';
$('#mpb').onclick=()=>$('#mp').classList.toggle('min');
$('#pp').onclick=()=>{
  if(!CFG.song)return toast("پەڕگەیەکێ گۆرانیێ د CFG.song دا دانە.");
  if(au.paused) {
    au.play();
    $('#pp').textContent='❚❚';
    $('#disc').classList.add('sp');
    sound=true
  } else {
    au.pause();
    $('#pp').textContent='▶';
    $('#disc').classList.remove('sp')
  }
};
$('#mu').onclick=()=>{
  au.muted=!au.muted;
  sound=!au.muted;
  $('#mu').textContent=au.muted?'🔇':'🔊'
};
$('#vo').oninput=e=>au.volume=e.target.value;
au.volume=.6;

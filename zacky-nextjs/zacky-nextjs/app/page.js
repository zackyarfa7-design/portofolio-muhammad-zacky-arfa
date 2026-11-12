'use client';
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {IGURL,WA,nav,stats,pillars,exp,orgs,hard,soft,edu,train,filters,gallery} from './data';

const IG=()=><svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></svg>;

function useIn(){const r=useRef(null),[v,s]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){s(true);o.disconnect()}},{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[]);
  return[r,v]}
function Rv({i=0,className='',as:T='div',children,...p}){const[r,v]=useIn();
  return <T {...p} ref={r} className={`rv ${v?'in':''} ${className}`} style={{transitionDelay:i*100+'ms'}}>{children}</T>}
function Count({to,d}){const[r,v]=useIn(),[n,setN]=useState(0);
  useEffect(()=>{if(!v)return;const s=performance.now();let id;
    const f=x=>{const p=Math.min(Math.max((x-s)/1400,0),1);setN(to*(1-(1-p)**3));if(p<1)id=requestAnimationFrame(f)};
    id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id)},[v,to]);
  return <b ref={r} className="gt text-5xl font-extrabold">{n.toFixed(d)}</b>}
function Ring(){const[r,v]=useIn();
  return <svg ref={r} viewBox="0 0 120 120" className="w-40"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="9"/><circle cx="60" cy="60" r="52" fill="none" stroke="#f0b94d" strokeWidth="9" strokeLinecap="round" strokeDasharray="327" transform="rotate(-90 60 60)" style={{strokeDashoffset:v?327*.57:327,transition:'stroke-dashoffset 1.6s cubic-bezier(.2,.7,.2,1)'}}/><text x="60" y="64" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="800">43</text><text x="60" y="82" textAnchor="middle" fill="#94a3b8" fontSize="10">kata/menit</text></svg>}
const Chips=({a})=>a.map(x=><span key={x} className="chip">{x}</span>);

export default function Home(){
  const [menu,setMenu]=useState(false),[act,setAct]=useState('beranda'),[cur,setCur]=useState('all'),[lb,setLb]=useState(null),[copied,setCopied]=useState(false);
  const pg=useRef(null);
  const vis=gallery.filter(x=>cur==='all'||x[2]===cur);

  useEffect(()=>{
    const so=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setAct(e.target.id)),{rootMargin:'-45% 0px -50% 0px'});
    nav.forEach(([i])=>so.observe(document.getElementById(i)));
    const sc=()=>{pg.current.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+'%'};
    const pm=e=>{const c=e.target.closest&&e.target.closest('.glass');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}};
    addEventListener('scroll',sc,{passive:true});document.addEventListener('pointermove',pm);
    return()=>{so.disconnect();removeEventListener('scroll',sc);document.removeEventListener('pointermove',pm)}
  },[]);

  useEffect(()=>{
    if(lb===null)return;
    const kd=e=>{if(e.key==='Escape')setLb(null);if(e.key==='ArrowLeft')setLb(i=>(i-1+vis.length)%vis.length);if(e.key==='ArrowRight')setLb(i=>(i+1)%vis.length)};
    addEventListener('keydown',kd);return()=>removeEventListener('keydown',kd)
  },[lb,vis.length]);

  const copy=async()=>{try{await navigator.clipboard.writeText('zackyarfa7@gmail.com');setCopied(true);setTimeout(()=>setCopied(false),2000)}catch{}};
  const send=e=>{e.preventDefault();const f=new FormData(e.target);open(`${WA}?text=${encodeURIComponent(`Halo Zacky, saya ${f.get('n')}.\n\n${f.get('p')}`)}`,'_blank')};
  const links=nav.map(([i,t])=><a key={i} href={`#${i}`} onClick={()=>setMenu(false)} className={`nv px-3 py-1.5 rounded-full text-slate-300 hover:text-white transition ${act===i?'on':''}`}>{t}</a>);
  const cur_=lb!==null?vis[lb]:null;

  return(<>
    <div className="blob" style={{width:'44vw',height:'44vw',background:'#1d4ed8',top:'-10vw',left:'-10vw'}}/>
    <div className="blob" style={{width:'38vw',height:'38vw',background:'#b45309',bottom:'-8vw',right:'-8vw',animationDelay:'-8s'}}/>
    <div className="blob" style={{width:'28vw',height:'28vw',background:'#0f766e',top:'40vh',left:'45vw',animationDelay:'-14s',opacity:.25}}/>
    <div ref={pg} className="fixed top-0 left-0 h-0.5 bg-amber-300 z-[60]" style={{width:0}}/>

    <header className="fixed top-3 inset-x-0 z-50 flex flex-col items-center px-3">
      <nav className="glass !rounded-full flex items-center gap-1 px-2 py-1.5 text-sm">
        <a href="#beranda" className="px-3 py-1.5 font-extrabold gt">Zacky</a>
        <span className="hidden md:flex">{links}</span>
        <button className="md:hidden px-3 py-1.5" aria-label="Buka menu" onClick={()=>setMenu(!menu)}>☰</button>
      </nav>
      {menu&&<div className="glass mt-2 p-2 w-60 flex flex-col text-sm md:hidden">{links}</div>}
    </header>

    <main>
      <section id="beranda" className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto px-5 pt-28 pb-16 min-h-screen">
        <div>
          <p className="h1a text-amber-200/80 mb-5">Pekanbaru, Riau</p>
          <h1 className="h1a text-5xl sm:text-7xl font-extrabold leading-[.95] tracking-tight" style={{animationDelay:'.1s'}}>Muhammad Zacky Arfa</h1>
          <p className="h1a ser gt text-3xl sm:text-4xl mt-5" style={{animationDelay:'.25s'}}>F&amp;B Management | Data Analyst | IT Enthusiast</p>
          <p className="h1a mt-6 text-slate-300 leading-relaxed max-w-lg" style={{animationDelay:'.4s'}}>Freshgraduate Teknik Informatika yang adaptif, komunikatif, dan sangat berorientasi pada detail. Terlatih memberikan pelayanan prima dan mampu bekerja efektif di bawah tekanan, baik secara individu maupun dalam tim.</p>
          <div className="h1a flex flex-wrap gap-3 mt-8" style={{animationDelay:'.55s'}}>
            <a href="#kontak" className="b p">Hubungi Saya</a>
            <a href={IGURL} target="_blank" rel="noopener noreferrer" className="b"><IG/>Kunjungi Instagram</a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="b">💬 Chat via WhatsApp</a>
          </div>
          <a href="/CV_Zacky_Arfa.pdf" download className="h1a inline-block mt-6 text-sm text-slate-400 underline underline-offset-4 hover:text-amber-200" style={{animationDelay:'.7s'}}>Unduh CV (PDF)</a>
        </div>
        <div className="h1a relative mx-auto w-full max-w-sm" style={{animationDelay:'.3s'}}>
          <div className="absolute -inset-1.5 rounded-[2.2rem] opacity-80 blur-[2px] overflow-hidden"><div className="absolute inset-[-50%]" style={{background:'conic-gradient(#f0b94d,#1d4ed8,#c98a5b,#0f766e,#f0b94d)',animation:'sp 9s linear infinite'}}/></div>
          <Image src="/images/profil.webp" alt="Foto Muhammad Zacky Arfa" width={640} height={640} priority className="relative rounded-[2rem] w-full aspect-[4/5] object-cover object-top"/>
          <div className="glass !rounded-2xl absolute -left-2 sm:-left-8 top-8 px-4 py-2.5 text-sm font-semibold" style={{animation:'bob 6s ease-in-out infinite'}}>☕ Supervisor F&amp;B</div>
          <div className="glass !rounded-2xl absolute -right-2 sm:-right-8 top-1/2 px-4 py-2.5 text-sm font-semibold" style={{animation:'bob 7s ease-in-out -2s infinite'}}>📊 Rekap &amp; analisis data</div>
          <div className="glass !rounded-2xl absolute left-4 -bottom-4 px-4 py-2.5 text-sm font-semibold" style={{animation:'bob 8s ease-in-out -4s infinite'}}>💻 Teknik Informatika</div>
        </div>
      </section>

      <section className="sec !pt-4"><div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(([n,d,l],i)=><Rv key={l} i={i} className="glass p-5 text-center"><Count to={n} d={d}/><p className="text-slate-300 text-sm mt-2">{l}</p></Rv>)}
      </div></section>

      <section className="sec !pt-8">
        <Rv as="h2" className="h2">Tiga dunia, <span className="ser">satu cara kerja</span></Rv>
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map(([ic,t,c,x],i)=><Rv key={t} i={i} className="glass p-6"><div className="text-3xl mb-3">{ic}</div><h3 className="text-2xl font-extrabold" style={{color:c}}>{t}</h3><p className="text-slate-300 mt-2 leading-relaxed">{x}</p></Rv>)}
        </div>
      </section>

      <section id="pengalaman" className="sec">
        <Rv as="h2" className="h2">Pengalaman kerja</Rv>
        <div className="border-l border-white/15 ml-2 sm:ml-3 pl-6 sm:pl-8 space-y-8">
          {exp.map(([r,o,p,c,b],i)=><Rv as="article" key={r} i={i} className="glass p-6 relative">
            <span className="absolute -left-[2.35rem] sm:-left-[2.85rem] top-7 w-3 h-3 rounded-full" style={{background:c,boxShadow:`0 0 0 5px ${c}33`}}/>
            <p className="text-sm" style={{color:c}}>{p}</p><h3 className="text-2xl font-extrabold mt-1">{r}</h3><p className="text-slate-400">{o}</p>
            <ul className="mt-4 space-y-2 text-slate-300 leading-relaxed list-disc pl-5 marker:text-amber-300">{b.map(x=><li key={x}>{x}</li>)}</ul>
          </Rv>)}
        </div>
        <Rv as="h2" className="h2 mt-20">Pengalaman organisasi</Rv>
        <div className="grid md:grid-cols-2 gap-5">
          {orgs.map(([t,o,p,x],i)=><Rv as="article" key={t} i={i} className="glass p-6"><p className="text-sm text-amber-200">{p}</p><h3 className="text-xl font-extrabold mt-1">{t}</h3><p className="text-slate-400">{o}</p><p className="mt-3 text-slate-300 leading-relaxed">{x}</p></Rv>)}
        </div>
      </section>

      <section id="keahlian" className="sec">
        <Rv as="h2" className="h2">Keahlian</Rv>
        <div className="grid md:grid-cols-3 gap-5">
          <Rv className="glass p-6 md:col-span-2"><h3 className="font-bold text-xl mb-4 text-amber-200">Hard skills</h3><div className="flex flex-wrap gap-2"><Chips a={hard}/></div>
            <h3 className="font-bold text-xl mt-8 mb-4 text-sky-200">Soft skills</h3><div className="flex flex-wrap gap-2"><Chips a={soft}/></div></Rv>
          <Rv i={1} className="glass p-6 grid place-items-center text-center"><Ring/><p className="mt-2 text-slate-300">Typing speed 43 wpm</p></Rv>
        </div>
      </section>

      <section id="pendidikan" className="sec">
        <Rv as="h2" className="h2">Pendidikan &amp; pelatihan</Rv>
        <div className="grid md:grid-cols-2 gap-5">
          {edu.map(([t,j,n,y],i)=><Rv as="article" key={t} i={i} className="glass p-6"><p className="text-sm text-amber-200">{y}</p><h3 className="text-xl font-extrabold mt-1">{t}</h3><p className="text-slate-300">{j}</p><p className="mt-3 font-semibold gt">{n}</p></Rv>)}
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          {train.map(([t,o,y],i)=><Rv as="article" key={t} i={i} className="glass p-5"><p className="text-sm text-sky-200">Pelatihan {y}</p><h3 className="font-bold text-lg mt-1">{t}</h3><p className="text-slate-400 text-sm">{o}</p></Rv>)}
        </div>
      </section>

      <section id="galeri" className="sec">
        <Rv as="h2" className="h2">Galeri visual</Rv>
        <div className="flex flex-wrap gap-2 mb-6">{filters.map(([k,t])=><button key={k} onClick={()=>setCur(k)} className={`chip ${cur===k?'on':''}`}>{t}</button>)}</div>
        <div className="columns-2 md:columns-3 gap-4">
          {vis.map(([f,c,,w,h],i)=><figure key={f} onClick={()=>setLb(i)} className="fig glass !rounded-2xl mb-4 group">
            <Image src={`/images/${f}.webp`} alt={c} width={w} height={h} sizes="(min-width:768px) 33vw, 50vw" className="w-full h-auto"/>
            <figcaption className="absolute inset-x-0 bottom-0 p-3 pt-10 text-xs sm:text-sm text-white bg-gradient-to-t from-black/85 to-transparent sm:opacity-0 group-hover:opacity-100 transition">{c}</figcaption>
          </figure>)}
        </div>
      </section>

      <section id="kontak" className="sec">
        <Rv as="h2" className="h2">Ayo ngobrol</Rv>
        <div className="grid md:grid-cols-2 gap-5">
          <Rv className="glass p-6 space-y-5">
            <div><p className="text-slate-400 text-sm">Email</p><p className="flex items-center gap-3 flex-wrap"><a href="mailto:zackyarfa7@gmail.com" className="font-semibold hover:text-amber-200">zackyarfa7@gmail.com</a><button onClick={copy} className="chip !py-1 text-xs">{copied?'Tersalin':'Salin'}</button></p></div>
            <div><p className="text-slate-400 text-sm">WhatsApp</p><p><a href={WA} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-amber-200">085169224805</a> <a href={WA} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 underline">wa.me/6285169224805</a></p></div>
            <div><p className="text-slate-400 text-sm">Lokasi</p><p className="font-semibold">Pekanbaru, Riau (lahir 14 Mei 2005)</p></div>
            <a href={IGURL} target="_blank" rel="noopener noreferrer" className="b"><IG/>@zeak1y</a>
          </Rv>
          <Rv i={1} as="form" onSubmit={send} className="glass p-6 space-y-3">
            <h3 className="font-bold text-xl">Kirim pesan lewat WhatsApp</h3>
            <input name="n" required placeholder="Nama Anda" className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 placeholder:text-slate-500"/>
            <textarea name="p" required rows={4} placeholder="Tulis pesan Anda" className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 placeholder:text-slate-500"/>
            <button className="b p w-full justify-center">Kirim ke WhatsApp</button>
          </Rv>
        </div>
      </section>
    </main>

    <footer className="text-center text-slate-500 text-sm py-10">© 2026 Muhammad Zacky Arfa. Dibuat di Pekanbaru dengan kopi dan kode.</footer>

    {cur_&&<div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 backdrop-blur-md p-4" onClick={e=>e.target===e.currentTarget&&setLb(null)}>
      <button className="absolute top-4 right-5 text-3xl" aria-label="Tutup" onClick={()=>setLb(null)}>×</button>
      <button className="absolute left-3 top-1/2 text-4xl px-2" aria-label="Sebelumnya" onClick={()=>setLb((lb-1+vis.length)%vis.length)}>‹</button>
      <button className="absolute right-3 top-1/2 text-4xl px-2" aria-label="Berikutnya" onClick={()=>setLb((lb+1)%vis.length)}>›</button>
      <figure className="text-center max-w-3xl"><Image src={`/images/${cur_[0]}.webp`} alt={cur_[1]} width={cur_[3]} height={cur_[4]} className="max-h-[78vh] w-auto h-auto mx-auto rounded-2xl"/><figcaption className="mt-4 text-slate-200">{cur_[1]}</figcaption></figure>
    </div>}
  </>);
}

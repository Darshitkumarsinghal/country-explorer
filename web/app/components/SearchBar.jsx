// web/app/components/SearchBar.jsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { useDebounce } from '../../lib/useDebounce';

const continents = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

export default function SearchBar({ compact=false, initialRegion='', initialQuery='' }) {
  const router = useRouter();
  const [region, setRegion] = useState(initialRegion || '');
  const [q, setQ] = useState(initialQuery || '');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const dq = useDebounce(q, 300);

  useEffect(() => {
    let mounted = true;
    if (dq) {
      api.suggest(dq, region).then((s) => { if (mounted) setSuggestions(s || []); }).catch(() => { if (mounted) setSuggestions([]); });
    } else {
      setSuggestions([]);
    }
    return () => { mounted = false; };
  }, [dq, region]);

  function doSearch() {
    const p = new URLSearchParams();
    if (region) p.set('region', region);
    if (q) p.set('q', q);
    router.push(`/search?${p.toString()}`);
  }

  return (
    <div className="search-card" style={{width:'100%'}}>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <select value={region} onChange={(e)=>setRegion(e.target.value)} style={{padding:8,borderRadius:10}}>
          <option value="">All Continents</option>
          {continents.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={q} onChange={(e)=>setQ(e.target.value)} onFocus={()=>setOpen(true)} placeholder="Search country name" style={{flex:1,padding:8,borderRadius:10}} />
        <button className="btn" onClick={doSearch}>Search</button>
      </div>

      {open && suggestions.length>0 && (
        <div style={{marginTop:8,background:'#fff',borderRadius:10,overflow:'auto',maxHeight:260}}>
          {suggestions.map(s => (
            <div key={s.cca3} style={{display:'flex',gap:10,alignItems:'center',padding:8,borderBottom:'1px solid #eee'}} onClick={()=>{router.push(`/country/${s.cca3}`);}}>
              <img src={s.flags?.png || s.flags?.svg} alt={s.name?.common} style={{width:48,height:30,objectFit:'cover',borderRadius:4}}/>
              <div>
                <div style={{fontWeight:600}}>{s.name?.common}</div>
                <div style={{fontSize:12,color:'#666'}}>{(s.capital && s.capital[0]) || '—'} • {s.currencies?.[0]?.name || '—'}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

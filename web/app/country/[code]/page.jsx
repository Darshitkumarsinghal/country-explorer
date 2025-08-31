// web/app/country/[code]/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '../../lib/api';

export default function CountryDetails() {
  const params = useParams();
  const code = params?.code;
  const [c, setC] = useState(null);

  useEffect(() => {
    if (!code) return;
    let mounted = true;
    api.byCode(code).then((data) => { if (mounted) setC(data); }).catch(() => { if (mounted) setC(null); });
    return () => { mounted = false; };
  }, [code]);

  if (!c) return <div style={{padding:20}}>Loading…</div>;

  return (
    <div className="container" style={{paddingTop:20}}>
      <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
        <img src={c.flags?.svg || c.flags?.png} alt={c.name?.common} style={{width:320,borderRadius:12}}/>
        <div style={{flex:1}}>
          <h1 style={{fontSize:28,fontWeight:700}}>{c.name?.common} ({c.cca3})</h1>
          <p>Official: {c.name?.official || '—'}</p>
          <p>Region: {c.region || '—'} {c.subregion ? `• ${c.subregion}` : ''}</p>
          <p>Capital: {c.capital?.[0] || '—'}</p>
          <p>Population: {c.population?.toLocaleString() || '—'}</p>
          <p>Languages: {c.languages?.join(', ') || '—'}</p>
          <p>Currencies: {c.currencies?.map(x => x.name).filter(Boolean).join(', ') || '—'}</p>
        </div>
      </div>
    </div>
  );
}

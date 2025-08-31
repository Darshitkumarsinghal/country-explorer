// web/app/components/CountryCard.jsx
import Link from 'next/link';
export default function CountryCard({ c }) {
  return (
    <Link href={`/country/${c.cca3}`} style={{textDecoration:'none', color:'inherit'}}>
      <div className="card">
        <img src={c.flags?.png || c.flags?.svg} alt={c.flags?.alt || c.name.common} />
        <div style={{padding:12}}>
          <div style={{fontWeight:700}}>{c.name.common}</div>
          <div style={{fontSize:13,color:'#666'}}>Capital: {c.capital?.[0] || '—'}</div>
          <div style={{fontSize:13,color:'#666'}}>Currency: {c.currencies?.[0]?.name || '—'}</div>
        </div>
      </div>
    </Link>
  );
}

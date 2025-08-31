// web/app/components/SortSelect.jsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const sortBy = params.get('sortBy') || 'name';
  const order = params.get('order') || 'asc';
  const update = (k, v) => {
    const q = new URLSearchParams(params.toString());
    q.set(k, v);
    router.push(`/search?${q.toString()}`);
  };
  return (
    <div style={{display:'flex',gap:8}}>
      <select value={sortBy} onChange={(e)=>update('sortBy', e.target.value)}>
        <option value="name">Name</option>
        <option value="capital">Capital</option>
        <option value="currency">Currency</option>
      </select>
      <select value={order} onChange={(e)=>update('order', e.target.value)}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
}

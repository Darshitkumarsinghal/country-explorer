// web/app/components/Pagination.jsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
export default function Pagination({ total, page, perPage }) {
  const router = useRouter();
  const params = useSearchParams();
  const pages = Math.max(1, Math.ceil((total || 0) / perPage));
  const go = (p) => {
    const q = new URLSearchParams(params.toString());
    q.set('page', String(p));
    router.push(`/search?${q.toString()}`);
  };
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:8,marginTop:16}}>
      <button onClick={() => go(Math.max(1, page - 1))} style={{padding:8,borderRadius:8}}>Prev</button>
      <div>Page {page} of {pages}</div>
      <button onClick={() => go(Math.min(pages, page + 1))} style={{padding:8,borderRadius:8}}>Next</button>
    </div>
  );
}

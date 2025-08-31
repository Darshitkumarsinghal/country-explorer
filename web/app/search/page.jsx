// web/app/search/page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import Pagination from '../components/Pagination';
import SortSelect from '../components/SortSelect';
import { api } from '../../lib/api';
import { useSearchParams } from 'next/navigation';

export default function Results() {
  const params = useSearchParams();
  const page = parseInt(params.get('page') || '1', 10);
  const perPage = parseInt(params.get('perPage') || '20', 10);
  const region = params.get('region') || '';
  const q = params.get('q') || '';
  const sortBy = params.get('sortBy') || 'name';
  const order = params.get('order') || 'asc';

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let mounted = true;
    api.list({ region, page, perPage, sortBy, order, name: q }).then(r => {
      if (mounted) { setItems(r.items || []); setTotal(r.total || 0); }
    }).catch(() => {
      if (mounted) { setItems([]); setTotal(0); }
    });
    return () => { mounted = false; };
  }, [region, page, perPage, sortBy, order, q]);

  return (
    <div className="container">
      <div style={{marginBottom:12}}><SearchBar compact initialRegion={region} initialQuery={q} /></div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{color:'#555'}}>{total} results</div>
        <SortSelect />
      </div>
      <div className="grid">
        {items.map(c => <CountryCard key={c.cca3} c={c} />)}
      </div>
      <Pagination total={total} page={page} perPage={perPage} />
    </div>
  );
}

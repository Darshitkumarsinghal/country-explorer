// web/app/lib/api.js
import axios from 'axios';
const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export const api = {
  suggest: async (q, region) => {
    const res = await axios.get(`${base}/api/suggest`, { params: { q, region } });
    return res.data;
  },
  list: async (params) => {
    const res = await axios.get(`${base}/api/countries`, { params });
    return res.data;
  },
  byCode: async (code) => {
    const res = await axios.get(`${base}/api/country/${code}`);
    return res.data;
  }
};

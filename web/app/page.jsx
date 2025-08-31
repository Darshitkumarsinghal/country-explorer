// web/app/page.jsx
import SearchBar from './components/SearchBar';

export default function Home() {
  const bg = 'https://images.unsplash.com/photo-1502920917128-1aa500764cec?q=80&w=1800&auto=format&fit=crop';
  return (
    <div style={{position:'relative', minHeight:'80vh'}}>
      <img src={bg} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}} alt="bg"/>
      <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.35)'}}/>
      <div style={{position:'relative',zIndex:2,display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
        <div style={{width:'100%',maxWidth:900,padding:20}}>
          <SearchBar compact={false} />
        </div>
      </div>
    </div>
  );
}

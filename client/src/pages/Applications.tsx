import { useEffect, useState } from 'react'
import { api } from '../lib/api'


type Application = { _id:string, company:string, role:string, stage:string, status:string }


export default function Applications(){
const [items,setItems]=useState<Application[]>([])
const [company,setCompany]=useState('')
const [role,setRole]=useState('')
const [error,setError]=useState('')


async function load(){
try{ const res = await api<{items:Application[]}>("/applications"); setItems(res.items) }catch(e:any){ setError(e.message) }
}
useEffect(()=>{load()},[])


async function create(e:React.FormEvent){
e.preventDefault();
try{ await api("/applications", { method:'POST', body: JSON.stringify({ company, role }) }); setCompany(''); setRole(''); load() }catch(e:any){ setError(e.message) }
}


return (
<div>
<h1>Applications</h1>
{error && <div className="card" style={{borderColor:'#f87171', color:'#b91c1c'}}>{error}</div>}
<form className="card" onSubmit={create} style={{display:'grid', gap:8}}>
<input className="input" placeholder="Company" value={company} onChange={e=>setCompany(e.target.value)} />
<input className="input" placeholder="Role" value={role} onChange={e=>setRole(e.target.value)} />
<button className="button" type="submit">Add</button>
</form>
{items.map(a=> (
<div key={a._id} className="card">
<div style={{fontWeight:600}}>{a.company} — {a.role}</div>
<div style={{opacity:.8}}>Stage: {a.stage} · Status: {a.status}</div>
</div>
))}
</div>
)
}

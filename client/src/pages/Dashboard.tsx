import { useEffect, useState } from 'react'
import { api } from '../lib/api'


export default function Dashboard(){
const [data,setData]=useState<any>(null)
const [error,setError]=useState('')
useEffect(()=>{(async()=>{try{ setData(await api('/analytics/summary')) }catch(e:any){ setError(e.message) }})()},[])
return (
<div>
<h1>Dashboard</h1>
{error && <div className="card" style={{borderColor:'#f87171', color:'#b91c1c'}}>{error}</div>}
<div className="card">
<pre>{JSON.stringify(data, null, 2)}</pre>
</div>
</div>
)
}

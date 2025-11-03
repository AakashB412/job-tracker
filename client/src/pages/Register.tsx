import { useState } from 'react'
import { api } from '../lib/api'
import { setToken } from '../lib/auth'
import { Link, useNavigate } from 'react-router-dom'


export default function Register(){
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState('');
const nav=useNavigate();
async function submit(e:React.FormEvent){
e.preventDefault();
try{
const res = await api<{token:string}>("/auth/register", { method: 'POST', body: JSON.stringify({ name, email, password }) })
setToken(res.token); nav('/')
}catch(err:any){ setError(err.message) }
}
return (
<div className="container" style={{maxWidth:420}}>
<h1>Create account</h1>
{error && <div className="card" style={{borderColor:'#f87171', color:'#b91c1c'}}>{error}</div>}
<form onSubmit={submit} className="card">
<input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
<div style={{height:8}}/>
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<div style={{height:8}}/>
<input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<div style={{height:12}}/>
<button className="button" type="submit">Create account</button>
</form>
<p>Already have an account? <Link className="link" to="/login">Login</Link></p>
</div>
)
}

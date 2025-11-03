import { useState } from 'react'
import { api } from '../lib/api'
import { setToken } from '../lib/auth'
import { Link, useNavigate } from 'react-router-dom'


export default function Login(){
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [error,setError]=useState('');
const nav = useNavigate();
async function submit(e:React.FormEvent){
e.preventDefault();
try{
const res = await api<{token:string}>("/auth/login", { method: 'POST', body: JSON.stringify({ email, password }) })
setToken(res.token); nav('/')
}catch(err:any){ setError(err.message) }
}
return (
<div className="container" style={{maxWidth:420}}>
<h1>Login</h1>
{error && <div className="card" style={{borderColor:'#f87171', color:'#b91c1c'}}>{error}</div>}
<form onSubmit={submit} className="card">
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<div style={{height:8}}/>
<input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
<div style={{height:12}}/>
<button className="button" type="submit">Sign in</button>
</form>
<p>New here? <Link className="link" to="/register">Create account</Link></p>
</div>
)
}

import { Link, Outlet, useNavigate } from 'react-router-dom'
import { clearToken, getToken } from './lib/auth'


export default function App(){
const nav = useNavigate();
function logout(){ clearToken(); nav('/login') }
return (
<div>
<nav className="nav">
<Link to="/">Dashboard</Link>
<Link to="/applications">Applications</Link>
{getToken() ? <button className="button" onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
</nav>
<div className="container"><Outlet/></div>
</div>
)
}

import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";

export function Navbar() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <nav className="w-full items-center flex h-10 bg-red-500 rounded-md text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar Carro</Link>
      <button onClick={handleLogout} className="ml-auto">Sair</button>
    </nav>
  )
}
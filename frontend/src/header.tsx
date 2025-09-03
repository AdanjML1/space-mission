import { clearSession } from './store/auth';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  authed: boolean;
  setAuthed: (val: boolean) => void;
};

export default function Header({ authed, setAuthed }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();         // Borra token
    setAuthed(false);       // Actualiza estado
    navigate('/login');     // Redirige al login
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Space Mission</h1>
      {authed && (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </header>
  );
}

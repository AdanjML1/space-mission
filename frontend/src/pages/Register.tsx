import { useState } from 'react';
import { api } from '../lib/api';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState<string | null>(null);
    const [ok, setOk] = useState(false);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const { name, email, password, confirmPassword } = form;
        if (!name || !email || !password || !confirmPassword) return setError('Todos los campos son obligatorios');
        if (password !== confirmPassword) return setError('Las contraseñas no coinciden');
        try {
            await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
            setOk(true);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Error desconocido');
            }
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1>Registro Admin</h1>
            <form onSubmit={submit}>
                <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <input placeholder="Confirm Password" type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
                {error && <p style={{ color: 'crimson' }}>{error}</p>}
                {ok && <p>¡Admin creado! Ahora inicia sesión.</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

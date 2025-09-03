import { useState } from 'react';
import { api } from '../lib/api';
import { setSession } from '../store/auth';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!form.email || !form.password) return setError('Email y password son obligatorios');
        try {
            const res = await api('/auth/login', { method: 'POST', body: JSON.stringify(form) });
            setSession(res.token);
            window.location.href = '/';
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
            <h1>Sign In</h1>
            <form onSubmit={submit}>
                <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                {error && <p style={{ color: 'crimson' }}>{error}</p>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
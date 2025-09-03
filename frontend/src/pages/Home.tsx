import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import AstronautsTable from '../components/AstronautsTable';

type Astronaut = { id: number; name: string; email: string };

export default function Home() {
    const [list, setList] = useState<Astronaut[]>([]);
    const [form, setForm] = useState<Partial<Astronaut>>({ name: '', email: '' });
    const [editing, setEditing] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const load = async () => setList(await api('/astronauts'));
    useEffect(() => { load().catch(() => setError('No autorizado o error')); }, []);

    const save = async (e: React.FormEvent) => {
        e.preventDefault(); setError(null);
        if (!form.name || !form.email) return setError('Name y Email son obligatorios');
        try {
            if (editing) {
                await api(`/astronauts/${editing}`, { method: 'PUT', body: JSON.stringify(form) });
            } else {
                await api('/astronauts', { method: 'POST', body: JSON.stringify(form) });
            }
            setForm({ name: '', email: '' }); setEditing(null); await load();
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('Error desconocido');
            }
        }
    };

    const onEdit = (a: Astronaut) => { setEditing(a.id); setForm({ name: a.name, email: a.email }); };
    const onDelete = async (id: number) => { await api(`/astronauts/${id}`, { method: 'DELETE' }); await load(); };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1>Astronauts</h1>
            <form onSubmit={save}>
                <input placeholder="Name" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input placeholder="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
                {error && <p style={{ color: 'crimson' }}>{error}</p>}
                <button type="submit">{editing ? 'Update' : 'Create'}</button>
                {editing && <button type="button" onClick={() => { setEditing(null); setForm({ name: '', email: '' }); }}>Cancel</button>}
            </form>

            <AstronautsTable data={list} onEdit={onEdit} onDelete={onDelete} />
        </div>
    );
}

type Astronaut = { id: number; name: string; email: string };

type Props = {
  data: Astronaut[];
  onEdit: (a: Astronaut) => void;
  onDelete: (id: number) => void;
  className?: string; // opcional para estilos externos
};

export default function AstronautsTable({ data, onEdit, onDelete, className }: Props) {
  return (
    <table className={`min-w-full border-collapse ${className || ''}`}>
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((a, idx) => (
          <tr
            key={a.id}
            className={`border-b hover:bg-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <td className="px-4 py-2">{a.name}</td>
            <td className="px-4 py-2">{a.email}</td>
            <td className="px-4 py-2 flex gap-2">
              <button
                onClick={() => onEdit(a)}
                className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(a.id)}
                className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

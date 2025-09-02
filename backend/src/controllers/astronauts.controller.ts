import prisma from '../prisma';


export async function list(req: any, res: any) {
  const data = await prisma.astronaut.findMany({ orderBy: { id: 'desc' } });
  res.json(data);
}
export async function getOne(req: any, res: any) {
  const id = Number(req.params.id);
  const item = await prisma.astronaut.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
}
export async function create(req: any, res: any) {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email required' });
  const exists = await prisma.astronaut.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email in use' });
  const created = await prisma.astronaut.create({ data: { name, email } });
  res.status(201).json(created);
}
export async function update(req: any, res: any) {
  const id = Number(req.params.id);
  const { name, email } = req.body;
  try {
    const updated = await prisma.astronaut.update({ where: { id }, data: { name, email } });
    res.json(updated);
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
}
export async function remove(req: any, res: any) {
  const id = Number(req.params.id);
  try {
    await prisma.astronaut.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ message: 'Not found' });
  }
}

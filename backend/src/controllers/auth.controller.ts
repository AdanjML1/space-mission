import prisma from '../prisma';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function register(req: any, res: any) {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword)
    return res.status(400).json({ message: 'All fields required' });
  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Passwords do not match' });

  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email in use' });

  const hash = await bcrypt.hash(password, 10);
  const admin = await prisma.admin.create({ data: { name, email, password: hash } });
  return res.status(201).json({ id: admin.id, email: admin.email, name: admin.name });
}

export async function login(req: any, res: any) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ sub: admin.id, email: admin.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
  return res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
}

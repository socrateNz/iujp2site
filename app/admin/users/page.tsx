"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  UserPlus,
  Shield,
  User
} from 'lucide-react';
import { User as UserType } from '@/lib/types';

export default function AdminUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Erreur récupération utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createForm),
      });

      const data = await response.json();

      if (data.success) {
        setShowCreateForm(false);
        setCreateForm({ name: '', email: '', password: '', role: 'user' });
        fetchUsers();
      } else {
        alert(data.error || 'Erreur création utilisateur');
      }
    } catch (error) {
      console.error('Erreur création utilisateur:', error);
      alert('Erreur création utilisateur');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Utilisateurs</h1>
          <p className="text-slate-500 mt-1">
            Administration des accès et rôles.
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)} className="bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
          <UserPlus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Créer un nouvel utilisateur</CardTitle>
            <CardDescription>
              Ajoutez un nouvel administrateur ou utilisateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={createForm.name}
                    onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <select
                    id="role"
                    value={createForm.role}
                    onChange={(e) => setCreateForm({ ...createForm, role: e.target.value as 'admin' | 'user' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Créer l'utilisateur</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recherche */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Liste des utilisateurs */}
      <Card className="border-slate-200 shadow-md overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle>Utilisateurs ({filteredUsers.length})</CardTitle>
          <CardDescription>
            Liste de tous les utilisateurs enregistrés
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nom</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Rôle</th>
                  <th className="px-6 py-4 font-semibold">Date de création</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user._id?.toString()} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                          {user.role === 'admin' ? (
                            <Shield className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'} className="capitalize">
                        {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
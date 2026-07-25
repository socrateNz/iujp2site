"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  UserPlus,
  Shield,
  User,
  ChevronLeft,
  ChevronRight
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#205C03]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Utilisateurs</h1>
          <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Administration des accès et rôles.
          </p>
        </div>
        <button onClick={() => setShowCreateForm(true)} className="btn-eemi flex items-center gap-2 shadow-lg shadow-[#205C03]/30 hover:shadow-[#0B30BB]/40">
          <UserPlus className="h-4 w-4" />
          Nouvel utilisateur
        </button>
      </div>

      {/* Formulaire de création */}
      {showCreateForm && (
        <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Créer un nouvel utilisateur</h2>
            <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>Ajoutez un nouvel administrateur ou utilisateur</p>
          </div>
          <form onSubmit={handleCreateUser} className="space-y-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03]"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn-eemi">Créer l'utilisateur</button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                style={{ borderRadius: "2px", fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recherche */}
      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 rounded-[2px] border-slate-200 focus:ring-[#205C03] focus:border-[#205C03]"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          />
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <div className="bg-slate-50/50 p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Utilisateurs ({filteredUsers.length})</h2>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Liste de tous les utilisateurs enregistrés
          </p>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-[#111111] uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                <tr>
                  <th className="px-6 py-4 font-bold">Nom</th>
                  <th className="px-6 py-4 font-bold">Email</th>
                  <th className="px-6 py-4 font-bold">Rôle</th>
                  <th className="px-6 py-4 font-bold">Date de création</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                {paginatedUsers.map((user) => (
                  <tr key={user._id?.toString()} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-[2px] ${user.role === 'admin' ? 'bg-[#0B30BB]/10 text-[#0B30BB]' : 'bg-[#205C03]/10 text-[#205C03]'}`}>
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
                      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-widest rounded-[2px] ${user.role === 'admin' ? 'bg-[#0B30BB]/10 text-[#0B30BB]' : 'bg-slate-100 text-slate-600'}`} style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                        {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                      </span>
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
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Aucun utilisateur trouvé.
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-4 px-6 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-[2px]"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Précédent
              </Button>
              <span className="text-sm font-bold text-slate-600" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Page {currentPage} sur {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-[2px]"
              >
                Suivant <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
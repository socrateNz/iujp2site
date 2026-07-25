"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Reply,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Check,
  Trash,
  ChevronLeft,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { ContactMessage } from '@/lib/types';
import { toast } from 'sonner';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [replyForm, setReplyForm] = useState({
    message: '',
    adminName: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchContacts();
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus) params.append('status', filterStatus);

      const response = await fetch(`/api/admin/contacts?${params}`);
      const data = await response.json();

      if (data.success) {
        setContacts(data.data.contacts || data.data);
      }
    } catch (error) {
      console.error('Erreur récupération contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/admin/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: replyForm.adminName,
          email: selectedContact!.email,
          subject: "Réponse de l'UIJP II",
          message: replyForm.message,
        }),
      })

      if (!res.ok) throw new Error("Erreur d'envoi")
      handleRead(selectedContact!, "replied")
      toast("Message envoyé")
      setSelectedContact(null)
    } catch (error) {
      toast("Erreur d'envoi")
    } finally {
      fetchContacts()
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-[#E3A402]" />;
      case 'read':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <Mail className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-[#E3A402] hover:bg-[#E3A402]/90 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Nouveau</Badge>;
      case 'read':
        return <Badge variant="secondary" className="rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Lu</Badge>;
      case 'replied':
        return <Badge className="bg-[#205C03] hover:bg-[#205C03]/90 text-white rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Répondu</Badge>;
      default:
        return <Badge variant="outline" className="rounded-[2px] uppercase tracking-widest text-[10px]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>{status}</Badge>;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#205C03]"></div>
      </div>
    );
  }

  const handleRead = async (contact: ContactMessage, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts?id=${contact._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message marqué comme lu");
        fetchContacts();
      } else {
        toast.error(data.error || "Erreur lors de la mise à jour du message");
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du message");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Message supprimé");
        fetchContacts(); // rechargement des messages
      } else {
        toast.error(data.error || "Erreur lors de la suppression");
      }
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Messages</h1>
        <p className="text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          Centre de messagerie et de support.
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]" style={{ borderLeft: "4px solid #0B30BB", borderBottom: "4px solid #205C03", borderRadius: "2px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 rounded-[2px] border-slate-200 focus:ring-[#205C03] focus:border-[#205C03]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-slate-200 rounded-[2px] focus:outline-none focus:ring-2 focus:ring-[#205C03] bg-white text-sm text-slate-600"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <option value="">Tous les statuts</option>
            <option value="new">Nouveaux</option>
            <option value="read">Lus</option>
            <option value="replied">Répondus</option>
          </select>
          <Button onClick={fetchContacts} variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-600 rounded-[2px] uppercase tracking-widest" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            Actualiser
          </Button>
        </div>
      </div>

      {/* Liste des messages */}
      <div className="bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
        <div className="bg-slate-50/50 p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Boîte de réception</h2>
          <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            {filteredContacts.length} messages dans la liste
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {paginatedContacts.map((contact) => {
              return (
                <div key={contact._id?.toString()} className={`group p-5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ${contact.status === 'new' ? 'bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]' : 'bg-slate-50/50'}`} style={{ borderLeft: `4px solid ${contact.status === 'new' ? '#E3A402' : '#slate-200'}`, borderRadius: "2px" }}>
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {getStatusIcon(contact.status)}
                        <h3 className={`text-lg uppercase tracking-widest ${contact.status === 'new' ? 'font-black text-[#111111]' : 'font-bold text-slate-600'}`} style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                          {contact.subject}
                        </h3>
                        {getStatusBadge(contact.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3 bg-slate-100/50 p-2 rounded-[2px] w-fit" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                        <span className="font-bold text-[#205C03] uppercase tracking-wider">{contact.name}</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 font-medium">{contact.email}</span>
                        {contact.serviceName && (
                          <>
                            <span className="text-slate-300">|</span>
                            <span className="text-[#0B30BB] font-bold flex items-center gap-1 text-xs">
                              <Briefcase className="h-3 w-3" /> {contact.serviceName}
                            </span>
                          </>
                        )}
                        <span className="text-slate-300">|</span>
                        <span className="flex items-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          {new Date(contact.createdAt).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-none text-slate-600 mb-4 bg-white p-4 border border-slate-100" style={{ borderRadius: "2px", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                        {contact.message}
                      </div>

                      {contact.replyMessage && (
                        <div className="ml-4 pl-4 bg-[#205C03]/5 p-3" style={{ borderLeft: "4px solid #205C03", borderRadius: "0 2px 2px 0" }}>
                          <p className="text-xs font-black text-[#205C03] uppercase tracking-widest mb-1 flex items-center gap-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
                            <Reply className="h-3 w-3" />
                            Réponse de {contact.adminName}
                          </p>
                          <p className="text-sm text-slate-700" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>{contact.replyMessage}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex sm:flex-col gap-2 self-end sm:self-start opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {contact.status !== 'replied' && (
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="btn-eemi flex items-center gap-2 !px-4 !py-2 !text-xs shadow-md shadow-[#205C03]/20 hover:shadow-[#0B30BB]/30"
                        >
                          <Reply className="h-3 w-3" />
                          Répondre
                        </button>
                      )}

                      <div className="flex gap-2">
                        {contact.status !== 'replied' && contact.status !== 'read' && (
                          <Button
                            size="sm"
                            onClick={() => handleRead(contact, "read")}
                            variant="outline"
                            className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-[2px]"
                            title="Marquer comme lu"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}

                        <Button
                          size="sm"
                          onClick={() => handleDelete(contact._id?.toString() || '')}
                          variant="ghost"
                          className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-[2px]"
                          title="Supprimer"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredContacts.length === 0 && (
              <div className="text-center py-8 text-slate-500" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Aucun message trouvé.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-slate-100">
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

      {/* Modal de réponse */}
      {selectedContact && (
        <div className="fixed inset-0 bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl bg-white shadow-2xl" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
            <div className="bg-slate-50/50 p-6 border-b border-slate-100">
              <h2 className="text-2xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Répondre à {selectedContact.name}</h2>
              <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                Envoyez une réponse à {selectedContact.email}
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Message original:</label>
                  <div className="mt-1 p-3 bg-slate-50 border border-slate-100 rounded-[2px]">
                    <p className="text-sm text-slate-600">{selectedContact.message}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Votre nom:</label>
                  <Input
                    value={replyForm.adminName}
                    onChange={(e) => setReplyForm({ ...replyForm, adminName: e.target.value })}
                    placeholder="Nom de l'administrateur"
                    required
                    className="rounded-[2px] mt-1 focus:border-[#205C03] focus:ring-[#205C03]"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Votre réponse:</label>
                  <Textarea
                    value={replyForm.message}
                    onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                    placeholder="Tapez votre réponse..."
                    rows={6}
                    required
                    className="rounded-[2px] mt-1 focus:border-[#205C03] focus:ring-[#205C03]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-eemi">Envoyer la réponse</button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedContact(null);
                      setReplyForm({ message: '', adminName: '' });
                    }}
                    className="px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                    style={{ borderRadius: "2px", fontFamily: "var(--font-oswald), Oswald, sans-serif" }}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
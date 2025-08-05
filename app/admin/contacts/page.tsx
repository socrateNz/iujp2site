"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  Trash
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
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'read':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'replied':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">Nouveau</Badge>;
      case 'read':
        return <Badge variant="secondary">Lu</Badge>;
      case 'replied':
        return <Badge variant="default">Répondu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || contact.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
        <h1 className="text-2xl font-bold text-gray-900">Messages de contact</h1>
        <p className="text-gray-600">
          Gérez les messages reçus via le formulaire de contact
        </p>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un message..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="read">Lus</option>
              <option value="replied">Répondus</option>
            </select>
            <Button onClick={fetchContacts} variant="outline">
              Actualiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste des messages */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredContacts.length})</CardTitle>
          <CardDescription>
            Liste de tous les messages de contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredContacts.map((contact) => {
              return (
                <div key={contact._id?.toString()} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(contact.status)}
                        <h3 className="font-semibold text-lg">{contact.subject}</h3>
                        {getStatusBadge(contact.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span><strong>De:</strong> {contact.name} ({contact.email})</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{contact.message}</p>
                      {contact.replyMessage && (
                        <div className="bg-blue-50 p-3 rounded-lg mt-2">
                          <p className="text-sm font-medium text-blue-900 mb-1">
                            Réponse de {contact.adminName}:
                          </p>
                          <p className="text-sm text-blue-800">{contact.replyMessage}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {contact.status !== 'replied' && (
                        <Button
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                          variant={"outline"}
                        >
                          <Reply className="mr-2 h-4 w-4" />
                          Répondre
                        </Button>
                      )}
                      {(contact.status !== 'replied') && <div>
                        {(contact.status !== 'read') && (
                          <Button
                            size="sm"
                            onClick={() => handleRead(contact, "read")}
                            variant={"outline"}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Lu
                          </Button>
                        )}
                      </div>}

                      <Button
                        size="sm"
                        onClick={() => handleDelete(contact._id?.toString() || '')}
                        variant={"destructive"}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de réponse */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>Répondre à {selectedContact.name}</CardTitle>
              <CardDescription>
                Envoyez une réponse à {selectedContact.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Message original:</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{selectedContact.message}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Votre nom:</label>
                  <Input
                    value={replyForm.adminName}
                    onChange={(e) => setReplyForm({ ...replyForm, adminName: e.target.value })}
                    placeholder="Nom de l'administrateur"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Votre réponse:</label>
                  <Textarea
                    value={replyForm.message}
                    onChange={(e) => setReplyForm({ ...replyForm, message: e.target.value })}
                    placeholder="Tapez votre réponse..."
                    rows={6}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Envoyer la réponse</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedContact(null);
                      setReplyForm({ message: '', adminName: '' });
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 
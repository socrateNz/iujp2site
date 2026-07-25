"use client";

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Lock, Mail } from 'lucide-react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou mot de passe incorrect');
      } else {
        // Laisse un petit délai pour que la session se mette à jour
        await new Promise(resolve => setTimeout(resolve, 500));
        const session = await getSession();

        if (session?.user?.role === 'admin') {
          console.log("Accès autorisé");
          
          router.push('/admin');
        } else {
          setError('Accès non autorisé');
        }
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#205C03] blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#0B30BB] blur-[100px]"></div>
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#E3A402] blur-[80px]"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-white rounded-[2px] shadow-sm flex items-center justify-center mb-6 border-b-[4px] border-[#205C03]">
            <img src="/logo.png" alt="UIJP2 Logo" className="w-16 h-16 object-contain" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/205C03/FFFFFF?text=UIJP2' }} />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-[#111111]" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
            Administration
          </h1>
          <p className="mt-2 text-sm text-slate-500 font-medium" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
            Connectez-vous à l'espace de gestion UIJP II
          </p>
        </div>

        <div className="bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative" style={{ borderLeft: "4px solid #205C03", borderBottom: "4px solid #0B30BB", borderRadius: "2px" }}>
          <div className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-widest text-slate-800 flex items-center gap-2" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>
              <Lock className="h-5 w-5 text-[#205C03]" />
              Connexion sécurisée
            </h2>
            <p className="text-sm text-slate-500 mt-1" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              Saisissez vos identifiants administrateur
            </p>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@iujp2.com"
                    className="pl-10 rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-bold uppercase tracking-wider text-slate-700" style={{ fontFamily: "var(--font-oswald), Oswald, sans-serif" }}>Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 rounded-[2px] focus:ring-[#205C03] focus:border-[#205C03]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-eemi mt-2 flex justify-center items-center py-2.5 text-sm"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Université Internationale Jean Paul II de Bafang
          </p>
        </div>
      </div>
    </div>
  );
}

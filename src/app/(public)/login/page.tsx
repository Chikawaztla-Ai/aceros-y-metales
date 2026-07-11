'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const inputCls =
  'w-full bg-white border border-outline-variant rounded-md py-2.5 px-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-primary-container outline-none';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/catalogo';

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    const supabase = createClient();

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Credenciales incorrectas.');
        setLoading(false);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role: 'customer' } },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      // Si el proyecto no requiere confirmación de email, ya hay sesión.
      if (data.session) {
        router.push(redirectTo);
        router.refresh();
      } else {
        setInfo('Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.');
        setMode('login');
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="bg-white border border-outline-variant rounded-lg p-8 shadow-sm">
        <h1 className="font-montserrat font-bold text-2xl text-primary-container mb-1">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
        <p className="text-sm text-on-surface-variant mb-6">
          {mode === 'login'
            ? 'Accede para completar tu compra.'
            : 'Regístrate para comprar y dar seguimiento a tus pedidos.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                Nombre / Empresa
              </label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className={inputCls}
                placeholder="Aceros del Norte S.A."
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputCls}
              placeholder="compras@empresa.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={inputCls}
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}
          {info && <p className="text-sm text-success">{info}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-on-tertiary-container text-white text-sm font-bold uppercase tracking-wide py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? 'Cargando…' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login');
            setError(null);
            setInfo(null);
          }}
          className="w-full text-center text-sm text-on-surface-variant hover:text-primary-container mt-4"
        >
          {mode === 'login'
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto px-6 py-16" />}>
      <LoginForm />
    </Suspense>
  );
}

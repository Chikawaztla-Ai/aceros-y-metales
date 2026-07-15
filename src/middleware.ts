import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Rutas protegidas y roles requeridos
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/portal': ['customer', 'admin'],
  '/admin': ['admin'],
  '/checkout': ['customer', 'admin'],
};

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // MODO DEMO: mientras no haya un backend Supabase real conectado, el sitio
  // muestra el panel admin y el portal con datos de ejemplo, para que el
  // cliente pueda revisar todas las pantallas sin iniciar sesión.
  // En cuanto se configuren credenciales reales de Supabase, el candado de
  // login (más abajo) se activa automáticamente. Los datos hoy son mock, así
  // que no hay información sensible que proteger en esta fase.
  // Para forzar el candado aun sin Supabase (probar el flujo de login), pon
  // NEXT_PUBLIC_DEMO_PREVIEW=0 en el entorno.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseConfigurado = supabaseUrl && supabaseKey && !supabaseUrl.includes('xxxx');
  if (!supabaseConfigurado) {
    if (process.env.NEXT_PUBLIC_DEMO_PREVIEW === '0') {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Verificar rutas protegidas
  for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
    if (pathname.startsWith(route)) {
      // No autenticado → redirect a login
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }

      // Verificar rol
      const userRole = user.user_metadata?.role || 'customer';
      if (!allowedRoles.includes(userRole)) {
        const url = request.nextUrl.clone();
        url.pathname = '/403';
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*', '/checkout/:path*', '/checkout'],
};

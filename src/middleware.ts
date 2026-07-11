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

  // Sin credenciales de Supabase configuradas no hay sesión posible:
  // tratar como no autenticado (fail-closed) en vez de tronar.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('xxxx')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
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

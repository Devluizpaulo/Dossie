import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const AUTH_COOKIE_NAME = 'temp-auth-token';

if (!AUTH_TOKEN) {
  console.warn("AUTH_TOKEN is not set. The site will be publicly accessible.");
}

export function middleware(request: NextRequest) {
  // Se não houver token definido, o middleware é desativado
  if (!AUTH_TOKEN) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Ignorar a verificação para a própria página de login e para recursos estáticos
  if (pathname.startsWith('/login') || pathname.startsWith('/_next/') || pathname.startsWith('/Image/')) {
    return NextResponse.next();
  }
  
  // 1. Verificar o token no cookie
  const cookieToken = request.cookies.get(AUTH_COOKIE_NAME);
  if (cookieToken && cookieToken.value === AUTH_TOKEN) {
    return NextResponse.next();
  }

  // 2. Se não houver cookie, verificar o token no parâmetro da URL
  const urlToken = request.nextUrl.searchParams.get('token');
  
  if (urlToken === AUTH_TOKEN) {
    // Token da URL é válido.
    // Criar uma resposta de redirecionamento para a mesma URL sem o token
    const response = NextResponse.redirect(new URL(pathname, request.url));
    
    // Definir o cookie de autenticação
    response.cookies.set(AUTH_COOKIE_NAME, AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
    });
    
    return response;
  }

  // 3. Se nenhum token for válido, redirecionar para a página de login
  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto aqueles que começam com:
     * - api (rotas de API)
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (arquivo de favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

import { createCookie, createCookieSessionStorage } from '@remix-run/node';

export const themeCookie = createCookie('theme', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })
  
  export async function getThemeFromCookies(request: Request) {
    const theme = await themeCookie.parse(request.headers.get('Cookie'))
    return theme || 'dark'
  }
  
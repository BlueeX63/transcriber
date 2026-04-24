import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUsername = process.env.ADMIN_USERNAME || 'bhavit';
    const validPassword = process.env.ADMIN_PASSWORD || 'password';

    if (username === validUsername && password === validPassword) {
      // Intentional small delay to mitigate timing attacks
      await new Promise(res => setTimeout(res, 300));
      
      // Create session
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
      const session = await encrypt({ user: 'admin', expires });

      // Save cookie
      (await cookies()).set('admin_session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });

      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Intentional small delay to mitigate timing attacks for failed logins too
      await new Promise(res => setTimeout(res, 500));
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

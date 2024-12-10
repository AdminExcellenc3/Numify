export const AUTH_ROUTES = ["/login", "/register", "/reset-password"] as const;
export const PROTECTED_ROUTES = ["/", "/invoices", "/clients", "/company", "/settings"] as const;

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;
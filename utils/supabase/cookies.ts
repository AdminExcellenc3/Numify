import { type NextRequest, NextResponse } from "next/server";
import type { SupabaseCookieOptions } from "./config";

export interface Cookie {
  name: string;
  value: string;
  options?: SupabaseCookieOptions;
}

export interface CookieManager {
  getAll: () => { name: string; value: string }[];
  setAll: (cookies: Cookie[]) => void;
}

export const createCookieManager = (
  request: NextRequest,
  response: NextResponse
): CookieManager => ({
  getAll: () => request.cookies.getAll(),
  setAll: (cookiesToSet) => {
    cookiesToSet.forEach(({ name, value }) => {
      request.cookies.set(name, value);
    });
    
    cookiesToSet.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options);
    });
  },
});
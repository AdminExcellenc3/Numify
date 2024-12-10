import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";
import { createCookieManager } from "./cookies";

export const createClient = (request: NextRequest) => {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const cookieManager = createCookieManager(request, response);

  createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: cookieManager,
    }
  );

  return response;
};
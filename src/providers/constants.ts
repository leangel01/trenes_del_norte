const _env = typeof import.meta !== "undefined" && (import.meta as any).env ? (import.meta as any).env : process.env;

export const SUPABASE_URL = _env.VITE_SUPABASE_URL;
export const SUPABASE_KEY = _env.VITE_SUPABASE_KEY;
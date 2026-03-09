import { createClient } from "./client";

export type DbResult<T> =
  | { data: T; error: null }
  | { data: null; error: Error };

export type DbSingleResult<T> = DbResult<T | null>;

/**
 * Auth helpers – use from client components and event handlers
 */
export const auth = {
  async getSession() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    return { data: data.session, error } as DbSingleResult<
      Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]
    >;
  },

  async getUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    return { data: data.user, error } as DbSingleResult<
      Awaited<ReturnType<typeof supabase.auth.getUser>>["data"]["user"]
    >;
  },

  async signInWithEmail(email: string, password: string) {
    const supabase = createClient();
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signUpWithEmail(
    email: string,
    password: string,
    options?: { redirectTo?: string; data?: Record<string, unknown> }
  ) {
    const supabase = createClient();
    return supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options?.redirectTo,
        data: options?.data,
      },
    });
  },

  async signOut() {
    const supabase = createClient();
    return supabase.auth.signOut();
  },

  async resetPasswordForEmail(email: string, redirectTo?: string) {
    const supabase = createClient();
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
  },

  async updatePassword(newPassword: string) {
    const supabase = createClient();
    return supabase.auth.updateUser({ password: newPassword });
  },

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    const supabase = createClient();
    return supabase.auth.onAuthStateChange(callback);
  },
};

/**
 * Database helpers – generic CRUD for any table
 */
export const db = {
  async fetchMany<T>(
    table: string,
    options?: {
      select?: string;
      filters?: <Q>(query: Q) => Q;
      limit?: number;
      order?: { column: string; ascending?: boolean };
    }
  ): Promise<DbResult<T[]>> {
    const supabase = createClient();
    let query = supabase.from(table).select(options?.select ?? "*");

    if (options?.filters) {
      query = options.filters(query);
    }

    if (options?.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true,
      });
    }

    if (options?.limit != null) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return error ? { data: null, error } : { data: (data ?? []) as T[], error: null };
  },

  async fetchOne<T>(
    table: string,
    options?: {
      select?: string;
      filters?: <Q>(query: Q) => Q;
    }
  ): Promise<DbSingleResult<T>> {
    const supabase = createClient();
    let query = supabase.from(table).select(options?.select ?? "*");

    if (options?.filters) {
      query = options.filters(query);
    }

    const { data, error } = await query.maybeSingle();
    return { data: data as T | null, error };
  },

  async insert<T extends Record<string, unknown>>(
    table: string,
    row: T | T[],
    options?: { select?: string }
  ): Promise<DbResult<T | T[]>> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from(table)
      .insert(row)
      .select(options?.select ?? "*");

    return error ? { data: null, error } : { data: data as T | T[], error: null };
  },

  async update<T extends Record<string, unknown>>(
    table: string,
    updates: Partial<T>,
    options?: {
      filters?: <Q>(query: Q) => Q;
      select?: string;
    }
  ): Promise<DbResult<T[]>> {
    const supabase = createClient();
    let query = supabase
      .from(table)
      .update(updates)
      .select(options?.select ?? "*");

    if (options?.filters) {
      query = options.filters(query);
    }

    const { data, error } = await query;
    return error ? { data: null, error } : { data: (data ?? []) as T[], error: null };
  },

  async upsert<T extends Record<string, unknown>>(
    table: string,
    row: T | T[],
    options?: { onConflict?: string; select?: string }
  ): Promise<DbResult<T | T[]>> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from(table)
      .upsert(row, { onConflict: options?.onConflict })
      .select(options?.select ?? "*");

    return error ? { data: null, error } : { data: data as T | T[], error: null };
  },

  async delete(
    table: string,
    filters: <Q>(query: Q) => Q
  ): Promise<DbResult<unknown[]>> {
    const supabase = createClient();
    const deleteQuery = supabase.from(table).delete();
    const filtered = filters(deleteQuery);
    const { data, error } = await filtered.select();
    return error ? { data: null, error } : { data: (data ?? []) as unknown[], error: null };
  },
};

/**
 * Storage helpers – for file uploads and public URLs
 */
export const storage = {
  async upload(
    bucket: string,
    path: string,
    file: File | Blob,
    options?: { upsert?: boolean }
  ): Promise<DbSingleResult<{ path: string }>> {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: options?.upsert ?? false });

    if (error) return { data: null, error };
    return { data: { path: data.path }, error: null };
  },

  getPublicUrl(bucket: string, path: string): string {
    const supabase = createClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  async delete(bucket: string, paths: string[]): Promise<DbResult<unknown>> {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from(bucket).remove(paths);
    return error ? { data: null, error } : { data, error: null };
  },

  async list(
    bucket: string,
    path?: string,
    options?: { limit?: number; offset?: number }
  ) {
    const supabase = createClient();
    return supabase.storage.from(bucket).list(path ?? "", {
      limit: options?.limit ?? 100,
      offset: options?.offset ?? 0,
    });
  },
};

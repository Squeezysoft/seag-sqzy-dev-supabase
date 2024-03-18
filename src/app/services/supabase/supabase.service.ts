import { Injectable } from '@angular/core';
import {
  REALTIME_LISTEN_TYPES,
  RealtimePostgresChangesFilter,
  RealtimePostgresChangesPayload,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAuthSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Error acquiring session:', error);
    }
    return data.session;
  }

  async getAuthUser(): Promise<User | null> {
    const { data, error } = await this.supabase.auth.getUser();
    if (error) {
      console.error('Error acquiring user:', error);
    }
    return data.user;
  }

  async getDatabaseRows<T>(table: string, query: string = '*'): Promise<Array<T>> {
    const { data, error } = await this.supabase.from(table).select(query).returns<Array<T>>();
    if (error) {
      console.error(`Error fetching data from "${table}" table:`, error);
    }
    return data || [];
  }

  getRealtime(channelName: string, tableName: string): void {
    const changesType = REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
    const presenceType = REALTIME_LISTEN_TYPES.PRESENCE;
    const broadcastType = REALTIME_LISTEN_TYPES.BROADCAST;
    const filter: RealtimePostgresChangesFilter<'*'> = {
      event: '*',
      schema: 'public',
      table: tableName,
    };
    const channel = this.supabase.channel(channelName);
    channel
      .on(changesType, filter, (payload: RealtimePostgresChangesPayload<Record<string, any>>) => {
        console.log('Realtime changes:', payload);
        if (payload.errors) {
          console.error('Realtime errors:', payload.errors);
        }
      })
      .on(presenceType, { event: 'sync' }, () => {
        console.log('Realtime presence sync');
      })
      .on(broadcastType, { event: 'sync' }, () => {
        console.log('Realtime broadcast sync');
      })
      .subscribe((status, error) => {
        console.log('Realtime subscription status:', status);
        if (error) {
          console.error('Realtime subscription error:', error);
        }
      });
  }

  async getStorageData(bucket: string, path: string): Promise<Blob | null> {
    const { data, error } = await this.supabase.storage.from(bucket).download(path);
    if (error) {
      console.error(`Error fetching data from "${bucket}" bucket:`, error);
    }
    return data;
  }

  getStorageUrl(bucket: string, path: string): string {
    const response = this.supabase.storage.from(bucket).getPublicUrl(path);
    return response.data.publicUrl;
  }
}

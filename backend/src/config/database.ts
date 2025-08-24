import { supabaseAdmin } from './supabase';

export class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabaseAdmin.from('profiles').select('count').limit(1);
      if (error) {
        console.error('Database connection error:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  async getProfile(userId: string) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      throw new Error(`Failed to get profile: ${error.message}`);
    }

    return data;
  }

  async updateProfile(userId: string, updates: any) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`);
    }

    return data;
  }

  async createProfile(profileData: any) {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return data;
  }
}

export const db = DatabaseService.getInstance();
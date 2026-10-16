import type { JwtPayload, SupabaseClient } from '@supabase/supabase-js';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			claims: JwtPayload | null;
		}
		interface PageData {
			supabase?: SupabaseClient;
			claims?: JwtPayload | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

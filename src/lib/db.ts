import { createPool } from "@vercel/postgres";

// This creates a connection pool using the POSTGRES_URL
// found in your .env.local or Vercel environment variables.
export const sql = createPool();

/** * Example of how this is used in your API routes:
 * * import { sql } from '@/lib/db';
 * const result = await sql.query('SELECT * FROM registrations');
 */

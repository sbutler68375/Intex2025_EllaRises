// Builds the Ella Rises database: creates the tables, loads the sample data,
// adds the demo logins, and turns on row level security.
//
// Usage (from the repo root): npm run db:setup
// Uses the same RDS_* settings from .env as the app.
//
// WARNING: drops and recreates every table, so any existing data is replaced.

require("dotenv").config({ quiet: true });
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const files = ["ellarises.sql", "demo_logins.sql"];

async function main() {
    const client = new Client({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME,
        port: process.env.RDS_PORT || 5432,
        ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
    });
    await client.connect();
    try {
        for (const file of files) {
            console.log(`Running ${file}...`);
            await client.query(fs.readFileSync(path.join(__dirname, file), "utf8"));
        }

        // Supabase exposes the public schema through its REST API; RLS with no
        // policies blocks that route. The app connects directly, so it's unaffected.
        const { rows: tables } = await client.query(
            "select tablename from pg_tables where schemaname = 'public'"
        );
        for (const { tablename } of tables) {
            await client.query(`alter table "${tablename}" enable row level security`);
        }

        for (const { tablename } of tables) {
            const { rows } = await client.query(`select count(*) from "${tablename}"`);
            console.log(`  ${tablename.padEnd(18)} ${rows[0].count} rows`);
        }
        console.log("Done.");
    } finally {
        await client.end();
    }
}

main().catch((err) => {
    console.error(err.message);
    process.exit(1);
});

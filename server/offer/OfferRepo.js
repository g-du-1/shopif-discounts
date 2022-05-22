// TODO
// Look into making this not depend on postgres so db can be swapped?
// Set up testing db correctly
// For now copy DB when there is a change
// DROP DATABASE discounts_app_db_test
// CREATE DATABASE discounts_app_db_test TEMPLATE discounts_app_db OWNER discounts_app_user;

import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: process.env.PG_DB_USER,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.PG_DB + "_test"
      : process.env.PG_DB,
  password: process.env.PG_DB_PASS,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
});

export const getOffers = async () => {
  const res = await pool.query("SELECT * FROM offers");
  return res.rows;
};

export const saveOffers = async (offers) => {
  for (const offer of offers) {
    await pool.query(
      "INSERT INTO offers (gid) VALUES ($1) ON CONFLICT (gid) DO NOTHING;",
      [offer]
    );
  }
  return offers;
};

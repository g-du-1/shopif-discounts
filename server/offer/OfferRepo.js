// TODO
// Look into making this not depend on postgres?

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_DB_USER,
  database: process.env.PG_DB,
  password: process.env.PG_DB_PASS,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST,
});

export const getOffers = async () => {
  const res = await pool.query("SELECT * FROM offers");
  return res.rows;
};

export const saveOffers = async (offers) => {
  const res = await pool.query("INSERT INTO offers (productId) VALUES ($1)", [
    [offers],
  ]);
  return res;
};

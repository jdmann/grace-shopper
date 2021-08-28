require('dotenv').config();
const { client } = require('../index');

async function dropTabldes() {
	await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);
	console.log('Tables Dropped');
}

async function createTables() {
	try {
		await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" VARCHAR(255) DEFAULT 'imageUrl',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false NOT NULL
      );
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        price NUMERIC(7, 2),
        "imageURL" VARCHAR(255) DEFAULT 'imageUrl',
        "inStock" BOOLEAN DEFAULT false NOT NULL,
        category VARCHAR(255) NOT NULL
      );
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'created',
        "userId" INTEGER REFERENCES users(id),
        "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
      );
      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id) UNIQUE,
        "orderId" INTEGER REFERENCES orders(id) UNIQUE,
        price NUMERIC(7, 2),
        quantity INTEGER NOT NULL DEFAULT 0
      );
    `);
		console.log('Tables Built');
	} catch (err) {
		console.error(err);
	}
}

async function resetDB() {
	try {
		await client.connect();
		await dropTables();
		await createTables();
	} catch (error) {
		console.log(error);
	} finally {
		client.end();
	}
}

resetDB();

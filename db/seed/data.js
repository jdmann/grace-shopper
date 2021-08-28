require('dotenv').config();
const { client } = require('../client');
const faker = require('faker');

const { createProduct } = require('../products');

async function createInitialUsers() {}

async function createInitialProducts() {}

async function createInitialOrders() {}

async function createInitialOrderProducts() {}

async function seedDB() {
	try {
		await client.connect();
		await createInitialUsers();
		await createInitialProducts();
		await createInitialOrders();
		await createInitialOrderProducts();
	} catch (error) {
		console.log('error during seed');
		throw error;
	} finally {
		client.end();
	}
}

seedDB();

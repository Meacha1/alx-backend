import redis from 'redis';
const { promisify } = require("util");

// Create a Redis client
const redisClient = redis.createClient();

// Promisify the hgetall method for asynchronous usage
const asyncHgetall = promisify(redisClient.hgetall).bind(redisClient);

/**
 * This function sets key-value pairs in a Redis hash and then retrieves the hash.
 * @param {object} data - An object containing key-value pairs to be stored in Redis.
 */
async function storeAndRetrieveHashData(data) {
    // Iterate through the provided data and set key-value pairs in the Redis hash
    for (const key in data) {
        redisClient.hset('HolbertonSchools', key, data[key], redis.print);
    }

    // Retrieve the hash and store it in the 'storedObject' variable
    const storedObject = await asyncHgetall('HolbertonSchools');

    // Log the retrieved hash
    console.log(storedObject);
}

// Example data with key-value pairs
const exampleData = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
};

// Call the main function with the example data
storeAndRetrieveHashData(exampleData);

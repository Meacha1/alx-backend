import redis from 'redis';

// Create a Redis client
const redisClient = redis.createClient();

// Event handler for successful connection
redisClient.on('connect', function() {
    console.log('Connected to the Redis server');
});

// Event handler for connection errors
redisClient.on('error', function(error) {
  console.error(`Error connecting to the Redis server: ${error.message}`);
});

/**
 * Sets a new school value in Redis.
 *
 * @param {string} schoolName - The name of the school.
 * @param {string} value - The value associated with the school.
 */
function setNewSchoolValue(schoolName, value) {  
  redisClient.set(schoolName, value, redis.print);
}

/**
 * Displays the value associated with a school in Redis.
 *
 * @param {string} schoolName - The name of the school.
 */
function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, redis.print);
}

// Example usage:
displaySchoolValue('Holberton');
setNewSchoolValue('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');

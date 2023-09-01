import redis from 'redis';
const { promisify } = require("util");

// Create a Redis client instance
const redisClient = redis.createClient();

// Promisify the 'get' method of the Redis client
const getAsync = promisify(redisClient.get).bind(redisClient);

// Event listener for when the Redis client is connected to the server
redisClient.on('connect', function() {
    console.log('Connected to the Redis server');
});

// Event listener for Redis client errors
redisClient.on('error', function(error) {
  console.error(`Error connecting to the Redis server: ${error.message}`);
});

// Function to set a new school's value in Redis
function setNewSchoolValue(schoolName, value) {  
  redisClient.set(schoolName, value, redis.print);
}

// Function to display the value of a school from Redis
async function displaySchoolValue(schoolName) {
  const foundValue = await getAsync(schoolName);
  console.log(foundValue);
}

// Main function to demonstrate Redis operations
(async function main() {
  await displaySchoolValue('Holberton');
  setNewSchoolValue('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}());

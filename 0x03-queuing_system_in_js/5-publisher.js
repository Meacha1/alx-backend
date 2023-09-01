import redis from 'redis';

// Create a Redis client instance
const redisClient = redis.createClient();

// Event handler when the Redis client successfully connects to the server
redisClient.on('connect', function() {
    console.log('Redis client connected to the server');
});

// Event handler when an error occurs while connecting to the Redis server
redisClient.on('error', function(error) {
  console.error(`Redis client not connected to the server: ${error.message}`);
});

/**
 * Publishes a message to a Redis channel after a specified time delay.
 * @param {string} message - The message to be published.
 * @param {number} time - The time delay before publishing the message, in milliseconds.
 */
function publishMessageWithDelay(message, time) {
    setTimeout(() => {
        console.log(`About to send message: ${message}`);
        redisClient.publish('my_channel', message);
    }, time);
}

// Example message publications with delays
publishMessageWithDelay("User #1 performs an action", 100);
publishMessageWithDelay("User #2 performs an action", 200);
publishMessageWithDelay("SHUTDOWN_SERVER", 300);
publishMessageWithDelay("User #3 performs an action", 400);

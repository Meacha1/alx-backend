import redis from 'redis';

// Create a Redis subscriber client
const customSubscriber = redis.createClient();

// Event handler for when the client connects to the Redis server
customSubscriber.on('connect', function() {
    console.log('Custom Redis client connected to the server');
});

// Event handler for Redis client errors
customSubscriber.on('error', function(error) {
  console.error(`Custom Redis client not connected to the server: ${error.message}`);
});

// Subscribe to a specific Redis channel
customSubscriber.subscribe('custom_channel');

// Event handler for incoming messages on the subscribed channel
customSubscriber.on('message', function(channel, message) {
    console.log(message);

    // Check if the message is a special command to quit the server
    if (message === 'SHUTDOWN_SERVER') {
        customSubscriber.unsubscribe(channel);
        customSubscriber.quit();
    }
});

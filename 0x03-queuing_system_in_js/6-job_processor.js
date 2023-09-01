import kue from 'kue';

// Create a new job queue
const notificationQueue = kue.createQueue();

/**
 * Sends a notification to a specified phone number with a given message.
 * @param {string} recipient - The phone number to send the notification to.
 * @param {string} content - The message content of the notification.
 */
function sendNotification(recipient, content) {
    console.log(`Sending notification to ${recipient}, with message: ${content}`);
}

// Process jobs with the type 'push_notification_task'
notificationQueue.process('push_notification_task', (job, done) => {
    const { recipient, content } = job.data;

    // Send the notification
    sendNotification(recipient, content);

    // Mark the job as done
    done();
});

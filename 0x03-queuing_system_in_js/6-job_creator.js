import kue from 'kue';

// Create a new queue instance
const notificationQueue = kue.createQueue();

// Define the data for the notification job
const notificationData = {
    phoneNumber: '4153518780',
    message: 'This is the code to verify your account',
};

// Create a new job named 'send_notification' with the provided data and save it to the queue
const notificationJob = notificationQueue.create('send_notification', notificationData).save(
    (error) => {
        if (!error) console.log(`Notification job created: ${notificationJob.id}`);
    });

// Event listener for when the notification job is completed
notificationJob.on('complete', () => console.log('Notification job completed'));

// Event listener for when the notification job fails
notificationJob.on('failed', () => console.log('Notification job failed'));

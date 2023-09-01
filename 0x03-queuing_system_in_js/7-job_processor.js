import notificationService from 'notification-service';

const notificationQueue = notificationService.createQueue();

const blacklistedNumbers = ['4153518780', '4153518781'];

/**
 * Sends a notification to a phone number.
 *
 * @param {string} recipient - The phone number to send the notification to.
 * @param {string} content - The content of the notification message.
 * @param {object} job - The job object representing the notification task.
 * @param {function} done - Callback function to indicate job completion.
 */
function sendNotification(recipient, content, job, done) {
  job.progress(0, 100);

  if (!blacklistedNumbers.includes(recipient)) {
    job.progress(50, 100);
    console.log(`Sending notification to ${recipient}, with message: ${content}`)
    done();
  } else {
    done(Error(`Phone number ${recipient} is blacklisted`));
  }
}

notificationQueue.process('push_notification_task', 2, (job, done) => {
  const { recipient, content } = job.data;

  sendNotification(recipient, content, job, done);
});

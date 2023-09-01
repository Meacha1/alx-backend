import taskQueue from 'kue';

/**
 * Sample job data for sending verification codes.
 */
const verificationJobs =  [{
    recipientPhoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    recipientPhoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    recipientPhoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    recipientPhoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    recipientPhoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    recipientPhoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    recipientPhoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    recipientPhoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    recipientPhoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    recipientPhoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    recipientPhoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

const notificationQueue = taskQueue.createQueue();

verificationJobs.forEach((jobData) => {
    const job = notificationQueue.create('push_notification_code', jobData).save(
        (error) => {
            if (!error) console.log(`Notification job created: ${job.id}`);
        });

    job.on('complete', () => console.log(`Notification job ${job.id} completed`));
    job.on('failed', (error) => console.log(`Notification job ${job.id} failed: ${error}`));
    job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
});

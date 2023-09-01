/**
 * Creates and manages push notification jobs.
 * @param {Array} jobList - An array of jobs to be processed.
 * @param {Queue} notificationQueue - The queue for managing push notification jobs.
 */
export default function createPushNotificationsJobs(jobList, notificationQueue) {
    if (Object.getPrototypeOf(jobList) !== Array.prototype) throw Error('jobList is not an array');

    jobList.forEach((job) => {
        const singleJob = notificationQueue.create('push_notification_task', job).save(
            (err) => {
                if (!err) console.log(`Push notification job created: ${singleJob.id}`);
            });
    
        singleJob.on('complete', () => console.log(`Push notification job ${singleJob.id} completed`));
        singleJob.on('failed', (err) => console.log(`Push notification job ${singleJob.id} failed: ${err}`));
        singleJob.on('progress', (progress) => console.log(`Push notification job ${singleJob.id} ${progress}% complete`));
    });
}

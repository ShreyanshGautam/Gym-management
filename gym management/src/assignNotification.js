import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const assignNotificationForm = document.getElementById('assign-notification-form');

    assignNotificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = assignNotificationForm.elements['member-id'].value;
        const notification = assignNotificationForm.elements['notification'].value;

        const notificationsRef = ref(database, 'notifications');
        const newNotificationRef = push(notificationsRef);
        set(newNotificationRef, {
            memberId: memberId,
            notification: notification,
            assignedAt: new Date().toISOString()
        }).then(() => {
            console.log('Notification assigned successfully');
            alert('Notification assigned successfully!');
        }).catch((error) => {
            console.error('Error assigning notification:', error);
        });

        assignNotificationForm.reset();
    });
});

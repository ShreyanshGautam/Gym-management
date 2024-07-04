import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const addMemberForm = document.getElementById('add-member-form');

    addMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberName = addMemberForm.elements['member-name'].value;
        const memberEmail = addMemberForm.elements['member-email'].value;

        const membersRef = ref(database, 'members');
        const newMemberRef = push(membersRef);
        set(newMemberRef, {
            name: memberName,
            email: memberEmail,
            joinedAt: new Date().toISOString()
        }).then(() => {
            console.log('Member added successfully');
            alert('Member added successfully!');
        }).catch((error) => {
            console.error('Error adding member:', error);
        });

        addMemberForm.reset();
    });
});

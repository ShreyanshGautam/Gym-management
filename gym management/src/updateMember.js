import { ref, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const updateMemberForm = document.getElementById('update-member-form');

    updateMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = updateMemberForm.elements['member-id'].value;
        const updatedName = updateMemberForm.elements['updated-name'].value;
        const updatedEmail = updateMemberForm.elements['updated-email'].value;

        const memberRef = ref(database, 'members/' + memberId);
        update(memberRef, {
            name: updatedName,
            email: updatedEmail
        }).then(() => {
            console.log('Member updated successfully');
            alert('Member updated successfully!');
        }).catch((error) => {
            console.error('Error updating member:', error);
            alert('Error updating member. Please try again.');
        });

        updateMemberForm.reset();
    });
});

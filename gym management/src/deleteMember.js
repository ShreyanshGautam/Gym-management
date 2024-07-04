import { ref, remove } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const deleteMemberForm = document.getElementById('delete-member-form');

    deleteMemberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = deleteMemberForm.elements['member-id'].value;

        const memberRef = ref(database, 'members/' + memberId);
        remove(memberRef).then(() => {
            console.log('Member deleted successfully');
            alert('Member deleted successfully!');
        }).catch((error) => {
            console.error('Error deleting member:', error);
        });

        deleteMemberForm.reset();
    });
});

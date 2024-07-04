import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const dietDetailsForm = document.getElementById('diet-details-form');

    dietDetailsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = dietDetailsForm.elements['member-id'].value;
        const dietPlan = dietDetailsForm.elements['diet-plan'].value;

        const dietDetailsRef = ref(database, 'dietDetails');
        const newDietDetailsRef = push(dietDetailsRef);
        set(newDietDetailsRef, {
            memberId: memberId,
            dietPlan: dietPlan,
            createdAt: new Date().toISOString()
        }).then(() => {
            console.log('Diet details added successfully');
            alert('Diet details added successfully!');
        }).catch((error) => {
            console.error('Error adding diet details:', error);
        });

        dietDetailsForm.reset();
    });
});

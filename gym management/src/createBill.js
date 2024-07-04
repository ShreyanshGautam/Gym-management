import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const createBillForm = document.getElementById('create-bill-form');

    createBillForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = createBillForm.elements['member-id'].value;
        const amount = createBillForm.elements['amount'].value;
        const dueDate = createBillForm.elements['due-date'].value;

        const billsRef = ref(database, 'bills');
        const newBillRef = push(billsRef);
        set(newBillRef, {
            memberId: memberId,
            amount: amount,
            dueDate: dueDate,
            createdAt: new Date().toISOString()
        }).then(() => {
            console.log('Bill created successfully');
            alert('Bill created successfully!');
        }).catch((error) => {
            console.error('Error creating bill:', error);
        });

        createBillForm.reset();
    });
});

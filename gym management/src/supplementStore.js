import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const supplementStoreForm = document.getElementById('supplement-store-form');

    supplementStoreForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const supplementName = supplementStoreForm.elements['supplement-name'].value;
        const supplementPrice = supplementStoreForm.elements['supplement-price'].value;

        const supplementsRef = ref(database, 'supplements');
        const newSupplementRef = push(supplementsRef);
        set(newSupplementRef, {
            name: supplementName,
            price: supplementPrice,
            addedAt: new Date().toISOString()
        }).then(() => {
            console.log('Supplement added successfully');
            alert('Supplement added successfully!');
        }).catch((error) => {
            console.error('Error adding supplement:', error);
        });

        supplementStoreForm.reset();
    });
});

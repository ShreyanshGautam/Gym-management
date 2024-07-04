import { ref, set, push } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const assignFeePackageForm = document.getElementById('assign-fee-package-form');

    assignFeePackageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const memberId = assignFeePackageForm.elements['member-id'].value;
        const feePackage = assignFeePackageForm.elements['fee-package'].value;

        const feePackageRef = ref(database, 'feePackages');
        const newFeePackageRef = push(feePackageRef);
        set(newFeePackageRef, {
            memberId: memberId,
            feePackage: feePackage,
            assignedAt: new Date().toISOString()
        }).then(() => {
            console.log('Fee package assigned successfully');
            alert('Fee package assigned successfully!');
        }).catch((error) => {
            console.error('Error assigning fee package:', error);
        });

        assignFeePackageForm.reset();
    });
});

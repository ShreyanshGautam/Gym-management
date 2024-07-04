import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { database } from "../src/firebase/firebaseConfig.js";

document.addEventListener('DOMContentLoaded', function() {
    const reportExportForm = document.getElementById('report-export-form');

    reportExportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const reportType = reportExportForm.elements['report-type'].value;

        const reportsRef = ref(database, reportType);
        get(reportsRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log('Report data:', data);
                alert('Report data exported successfully!');
                // Here you can add the code to export the data as needed (e.g., CSV, PDF)
            } else {
                alert('No data available for this report type');
            }
        }).catch((error) => {
            console.error('Error exporting report:', error);
        });

        reportExportForm.reset();
    });
});

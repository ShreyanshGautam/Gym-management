import { auth, database } from "./src/firebase/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { ref, set, push, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import "./src/addMember.js";
import "./src/assignFeePackage.js";
import "./src/assignNotification.js";
import "./src/createBill.js";
import "./src/deleteMember.js";
import "./src/dietDetails.js";
import "./src/reportExport.js";
import "./src/supplementStore.js";
import "./src/updateMember.js";

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const content = document.getElementById('content');
    const authSection = document.getElementById('auth-section');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = loginForm.elements['email'].value;
        const password = loginForm.elements['password'].value;
        const userType = loginForm.elements['user-type'].value;

        // Check if admin credentials are correct
        if (userType === 'admin' && (email !== 'anupadhiyar987654321@gmail.com' || password !== '8733876492')) {
            alert('Invalid admin credentials');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                loadContent(userType);
                authSection.style.display = 'none';
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert('Error logging in. Please check your credentials.');
            });
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = registerForm.elements['register-email'].value;
        const password = registerForm.elements['register-password'].value;
        const userType = registerForm.elements['register-user-type'].value;

        // Prevent registration of admin with different credentials
        if (userType === 'admin' && (email !== 'anupadhiyar987654321@gmail.com' || password !== '8733876492')) {
            alert('Cannot register as admin with these credentials.');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    userType: userType
                });
                alert('User registered successfully!');
            })
            .catch((error) => {
                console.error('Error registering:', error);
                alert('Error registering. Please try again.');
            });
    });

    function loadContent(userType) {
        if (userType === 'admin') {
            loadAdminContent();
        } else if (userType === 'member') {
            loadMemberContent();
        } else if (userType === 'user') {
            loadUserContent();
        }
    }

    function loadAdminContent() {
        content.innerHTML = `
            <h2>Admin Section</h2>
            <p>Welcome Admin! Manage gym operations here.</p>
            <ul class="action-list">
                <li><button onclick="showAddMember()">Add Member</button></li>
                <li><button onclick="showUpdateMember()">Update/Delete Member</button></li>
                <li><button onclick="showCreateBill()">Create Bill</button></li>
                <li><button onclick="showAssignFeePackage()">Assign Fee Package</button></li>
                <li><button onclick="showAssignNotification()">Assign Notification</button></li>
                <li><button onclick="showReportExport()">Export Report</button></li>
                <li><button onclick="showSupplementStore()">Supplement Store</button></li>
                <li><button onclick="showDietDetails()">Diet Details</button></li>
            </ul>
        `;
    }

    function loadMemberContent() {
        content.innerHTML = `
            <h2>Member Section</h2>
            <p>Welcome Member! View your bills and notifications here.</p>
            <ul class="action-list">
                <li><button onclick="showViewBillReceipts()">View Bill Receipts</button></li>
                <li><button onclick="showViewBillNotifications()">View Bill Notifications</button></li>
            </ul>
        `;
    }

    function loadUserContent() {
        content.innerHTML = `
            <h2>User Section</h2>
            <p>Welcome User! View details and search records here.</p>
            <ul class="action-list">
                <li><button onclick="showViewDetails()">View Details</button></li>
                <li><button onclick="showSearchRecords()">Search Records</button></li>
            </ul>
        `;
    }

    window.showAddMember = function() {
        content.innerHTML = `
            <h2>Add Member</h2>
            <form id="add-member-form">
                <label for="member-name">Name:</label>
                <input type="text" id="member-name" name="member-name" required>
                <label for="member-email">Email:</label>
                <input type="email" id="member-email" name="member-email" required>
                <button type="submit">Add Member</button>
            </form>
        `;
        document.getElementById('add-member-form').addEventListener('submit', addMember);
    }

    window.showUpdateMember = function() {
        content.innerHTML = `
            <h2>Update/Delete Member</h2>
            <form id="update-member-form">
                <label for="member-id">Member ID:</label>
                <input type="text" id="member-id" name="member-id" required>
                <label for="updated-name">Updated Name:</label>
                <input type="text" id="updated-name" name="updated-name" required>
                <label for="updated-email">Updated Email:</label>
                <input type="email" id="updated-email" name="updated-email" required>
                <button type="submit">Update Member</button>
            </form>
        `;
    }

    window.showCreateBill = function() {
        content.innerHTML = `
            <h2>Create Bill</h2>
            <form id="create-bill-form">
                <label for="member-id">Member ID:</label>
                <input type="text" id="member-id" name="member-id" required>
                <label for="amount">Amount:</label>
                <input type="number" id="amount" name="amount" required>
                <label for="due-date">Due Date:</label>
                <input type="date" id="due-date" name="due-date" required>
                <button type="submit">Create Bill</button>
            </form>
        `;
        document.getElementById('create-bill-form').addEventListener('submit', createBill);
    }

    window.showAssignFeePackage = function() {
        content.innerHTML = `
            <h2>Assign Fee Package</h2>
            <form id="assign-fee-package-form">
                <label for="member-id">Member ID:</label>
                <input type="text" id="member-id" name="member-id" required>
                <label for="fee-package">Fee Package:</label>
                <input type="text" id="fee-package" name="fee-package" required>
                <button type="submit">Assign Fee Package</button>
            </form>
        `;
        document.getElementById('assign-fee-package-form').addEventListener('submit', assignFeePackage);
    }

    window.showAssignNotification = function() {
        content.innerHTML = `
            <h2>Assign Notification</h2>
            <form id="assign-notification-form">
                <label for="member-id">Member ID:</label>
                <input type="text" id="member-id" name="member-id" required>
                <label for="notification">Notification:</label>
                <textarea id="notification" name="notification" required></textarea>
                <button type="submit">Assign Notification</button>
            </form>
        `;
        document.getElementById('assign-notification-form').addEventListener('submit', assignNotification);
    }

    window.showReportExport = function() {
        content.innerHTML = `
            <h2>Export Report</h2>
            <form id="export-report-form">
                <label for="report-type">Report Type:</label>
                <select id="report-type" name="report-type" required>
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <button type="submit">Export Report</button>
            </form>
        `;
        document.getElementById('export-report-form').addEventListener('submit', exportReport);
    }

    window.showSupplementStore = function() {
        content.innerHTML = `
            <h2>Supplement Store</h2>
            <p>Supplement store functionality to be implemented</p>
        `;
    }

    window.showDietDetails = function() {
        content.innerHTML = `
            <h2>Diet Details</h2>
            <form id="diet-details-form">
                <label for="member-id">Member ID:</label>
                <input type="text" id="member-id" name="member-id" required>
                <label for="diet-plan">Diet Plan:</label>
                <textarea id="diet-plan" name="diet-plan" required></textarea>
                <button type="submit">Submit Diet Plan</button>
            </form>
        `;
        document.getElementById('diet-details-form').addEventListener('submit', dietDetails);
    }

    window.showViewBillReceipts = function() {
        content.innerHTML = `
            <h2>View Bill Receipts</h2>
            <p>Bill receipts functionality to be implemented</p>
        `;
    }

    window.showViewBillNotifications = function() {
        content.innerHTML = `
            <h2>View Bill Notifications</h2>
            <p>Bill notifications functionality to be implemented</p>
        `;
    }

    window.showViewDetails = function() {
        content.innerHTML = `
            <h2>View Details</h2>
            <p>Details view functionality to be implemented</p>
        `;
    }

    window.showSearchRecords = function() {
        content.innerHTML = `
            <h2>Search Records</h2>
            <p>Search records functionality to be implemented</p>
        `;
    }
});

// Registration

function openRegister() {
    document.getElementById("registerModal").style.display = "block";
}

function closeRegister() {
    document.getElementById("registerModal").style.display = "none";
}
// Login

function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}
// Logout

function logout() {
    localStorage.removeItem("shivamLoggedIn");
    window.location.href = "index.html";
}
// e-KYC

function openEkyc() {
    window.location.href = "ekyc.html";
}
// Dashboard

function openDashboard() {
    window.location.href = "dashboard.html";
}
// Application Status

function checkStatus() {
    window.location.href = "status.html";
}
// e-KYC Submit

function submitEkyc(event) {
    event.preventDefault();

    let data = getEkycData();

    data.applicationId = createApplicationId();
    data.service = "e-KYC";
    data = addApplicationDetails(data);

    const paymentSuccess =
    deductServiceAmount("ekyc");

if (!paymentSuccess) {
    return;
}

    saveApplication(data);
    displayApplicationInfo(data);

    alert("e-KYC Application Submit हो गया");
}
function createApplicationId() {
    return "SOS-EKYC-" + Date.now().toString().slice(-6);
}
function getEkycData() {
    const name = document.getElementById("ekycName").value.trim();
    const requestId = document.getElementById("requestId").value.trim();
    const familyId = document.getElementById("familyId").value.trim();

    return {
    retailerId: localStorage.getItem("shivamRetailerId"),
    retailerName: localStorage.getItem("shivamRetailerName"),
    retailerMobile: localStorage.getItem("shivamRetailerMobile"),

    name: name,
    requestId: requestId,
    familyId: familyId
};
}
function saveEkycApplication(data) {
    localStorage.setItem(
        "shivamEkycApplication",
        JSON.stringify(data)
    );
}
function showSavedApplication(data) {
    const box = document.getElementById("savedApplication");

    if (!box) return;

    box.innerHTML =
        "Application ID: <strong>" +
        data.applicationId +
        "</strong><br>" +
        "Status: <strong>" +
        data.status +
        "</strong><br>" +
        "Date: <strong>" +
        data.date +
        "</strong>";
}
function addApplicationDetails(data) {
    data.date = new Date().toLocaleDateString("en-IN");
    data.status = "Submitted";

    return data;
}
function loadSavedApplication() {
    const saved = localStorage.getItem("shivamEkycApplication");

    if (!saved) return;

    const data = JSON.parse(saved);

    showSavedApplication(data);
}
document.addEventListener("DOMContentLoaded", function () {
    loadSavedApplication();
});
function displayApplicationInfo(data) {
    const box = document.getElementById("savedApplication");

    if (!box) return;

    box.innerHTML =
        "Name: <strong>" + data.name + "</strong><br>" +
        "Request ID: <strong>" + data.requestId + "</strong><br>" +
        "Family ID: <strong>" + data.familyId + "</strong><br>" +
        "Application ID: <strong>" + data.applicationId + "</strong> " +
"<button onclick=\"copyApplicationId('" + data.applicationId + "')\">Copy</button><br>" +
        "Status: <strong>" + data.status + "</strong><br>" +
        "Date: <strong>" + data.date + "</strong>";
}
function copyApplicationId(id) {
    navigator.clipboard.writeText(id);
    alert("Application ID Copy हो गया");
}
function getStatusApplicationId() {
    return document.getElementById("statusApplicationId").value.trim();
}
function findSavedApplication(applicationId) {

    const applications =
        JSON.parse(localStorage.getItem("shivamAllApplications")) || [];

    for (const data of applications) {

        if (data.applicationId === applicationId) {
            return data;
        }
    }

    return null;
}
function showApplicationStatus(data) {
    const result = document.getElementById("statusResult");

    if (!result) return;

    result.innerHTML =
        "Application ID: <strong>" + data.applicationId + "</strong><br>" +
        "Name: <strong>" + data.name + "</strong><br>" +
        "Service: <strong>" + data.service + "</strong><br>" +
        "Status: <strong>" + data.status + "</strong><br>" +
        "Date: <strong>" + data.date + "</strong>";
}
function checkApplicationStatus(event) {
    event.preventDefault();

    const applicationId = getStatusApplicationId();

    const data = findSavedApplication(applicationId);

    if (data) {
        showApplicationStatus(data);
    } else {
        alert("Application ID नहीं मिला");
    }
}
function showApplications() {
    window.location.href = "applications.html";
}
function startApplication(service) {

    if (service === "नया सदस्य") {
        window.location.href = "new-member.html";
    }

    if (service === "नया परिवार") {
        window.location.href = "new-family.html";
    }

    if (service === "विवाह पंजीयन") {
        window.location.href = "vivah-panjiyan.html";
    }

    if (service === "महिला ट्रांसफर") {
    window.location.href = "mahila-transfer.html";
}

if (service === "Address Approved") {
    window.location.href = "address-approved.html";
}
}
function submitNewMember(event) {
    event.preventDefault();

    const applicationId =
        "SOS-MEMBER-" + Date.now().toString().slice(-6);

    const data = {
        retailerId: localStorage.getItem("shivamRetailerId"),
        retailerName: localStorage.getItem("shivamRetailerName"),
        retailerMobile: localStorage.getItem("shivamRetailerMobile"),

        applicationId: applicationId,
        service: "नया सदस्य",

        name: document.getElementById("memberName").value,
        mobile: document.getElementById("memberMobile").value,
        fatherHusbandName: document.getElementById("fatherHusbandName").value,
        dob: document.getElementById("memberDob").value,
        familyId: document.getElementById("familyId").value,
        aadhaar: document.getElementById("memberAadhaar").value,
        gender: document.getElementById("memberGender").value,
        requestId: document.getElementById("requestId").value,

        status: "Submitted",
        date: new Date().toLocaleDateString("hi-IN")
    };

    const paymentSuccess =
    deductServiceAmount("New Member");

if (!paymentSuccess) {
    return;
}

    saveApplication(data);

    alert(
        "आवेदन Submit हो गया\n" +
        "Application ID: " + applicationId
    );
}

function submitVivahPanjiyan(event) {
    event.preventDefault();

    const applicationId =
        "SOS-VIVAH-" + Date.now().toString().slice(-6);

    const data = {
        applicationId: applicationId,
        service: "विवाह पंजीयन",

        retailerId: localStorage.getItem("shivamRetailerId"),
        retailerName: localStorage.getItem("shivamRetailerName"),
        retailerMobile: localStorage.getItem("shivamRetailerMobile"),

        husbandName:
            document.getElementById("husbandName").value.trim(),

        husbandMemberId:
            document.getElementById("husbandMemberId").value.trim(),

        husbandFamilyId:
            document.getElementById("husbandFamilyId").value.trim(),

        wifeName:
            document.getElementById("wifeName").value.trim(),

        wifeMemberId:
            document.getElementById("wifeMemberId").value.trim(),

        wifeFamilyId:
            document.getElementById("wifeFamilyId").value.trim(),

        status: "Submitted",

        date: new Date().toLocaleDateString("hi-IN")
    };

    const paymentSuccess =
    deductServiceAmount("vivah panjiyan");

if (!paymentSuccess) {
    return;
}

    saveApplication(data);

    document.getElementById("vivahResult").innerHTML =
        "<h3>आवेदन सफलतापूर्वक जमा हो गया ✅</h3>" +
        "<p>Application ID: <strong>" +
        applicationId +
        "</strong></p>";

    alert(
        "विवाह पंजीयन आवेदन Submit हो गया\nApplication ID: " +
        applicationId
    );
}
function submitMahilaTransfer(event) {
    event.preventDefault();

    const applicationId =
        "SOS-MAHILA-" + Date.now().toString().slice(-6);

    const data = {
        applicationId: applicationId,
        service: "महिला ट्रांसफर",

        retailerId: localStorage.getItem("shivamRetailerId"),
retailerName: localStorage.getItem("shivamRetailerName"),
retailerMobile: localStorage.getItem("shivamRetailerMobile"),

        name: document.getElementById("mahilaName").value.trim(),

        memberId:
            document.getElementById("mahilaMemberId").value.trim(),

        pitaName:
            document.getElementById("pitaName").value.trim(),

        pitaFamilyId:
            document.getElementById("pitaFamilyId").value.trim(),

        status: "Submitted",

        date: new Date().toLocaleDateString("hi-IN")
    };

    const paymentSuccess =
    deductServiceAmount("mahila transfer");

if (!paymentSuccess) {
    return;
}

    saveApplication(data);

    document.getElementById("mahilaTransferResult").innerHTML =
        "<h3>आवेदन सफलतापूर्वक जमा हो गया ✅</h3>" +
        "<p>Application ID: <strong>" +
        applicationId +
        "</strong></p>";

    alert(
        "महिला ट्रांसफर आवेदन Submit हो गया\nApplication ID: " +
        applicationId
    );
}
function submitAddressApproved(event) {
    event.preventDefault();

    const applicationId =
        "SOS-ADDRESS-" + Date.now().toString().slice(-6);

    const data = {
        applicationId: applicationId,
        service: "Samagra ID में Address Approved",

        retailerId: localStorage.getItem("shivamRetailerId"),
retailerName: localStorage.getItem("shivamRetailerName"),
retailerMobile: localStorage.getItem("shivamRetailerMobile"),

        name: document.getElementById("addressName").value.trim(),

        requestId:
            document.getElementById("addressRequestId").value.trim(),

        familyId:
            document.getElementById("addressFamilyId").value.trim(),

        status: "Submitted",

        date: new Date().toLocaleDateString("hi-IN")
    };

    const paymentSuccess =
    deductServiceAmount("address approved");

if (!paymentSuccess) {
    return;
}

    saveApplication(data);

    document.getElementById("addressApprovedResult").innerHTML =
        "<h3>आवेदन सफलतापूर्वक जमा हो गया ✅</h3>" +
        "<p>Application ID: <strong>" +
        applicationId +
        "</strong></p>";

    alert(
        "Address Approved आवेदन Submit हो गया\nApplication ID: " +
        applicationId
    );
}
function toggleMenu() {
    const menu = document.getElementById("dashboardMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function showAllOtherApplications() {

    const box = document.getElementById("allOtherApplications");

    const applications = [
        {
            key: "shivamNewFamilyApplication",
            title: "नया परिवार स्वीकृति"
        },
        {
            key: "shivamVivahApplication",
            title: "विवाह पंजीयन"
        },
        {
            key: "shivamMahilaTransferApplication",
            title: "महिला ट्रांसफर"
        },
        {
            key: "shivamAddressApprovedApplication",
            title: "Address Approved"
        }
    ];

    let html = "";

    applications.forEach(function(app) {

        const saved = localStorage.getItem(app.key);

        if (!saved) {
            return;
        }

        const data = JSON.parse(saved);

        html +=
            "<div class='application-item'>" +
            "<h3>" + app.title + "</h3>" +
            "नाम: " + (data.name ||data.husbandName || "") + "<br>" +
            "Application ID: <strong>" + data.applicationId + "</strong><br>" +
            "Status: <strong>" + data.status + "</strong><br>" +
            "Date: " + data.date +
            "<hr>" +
            "</div>";
    });

    if (html === "") {
        box.innerHTML = "अभी कोई अन्य आवेदन उपलब्ध नहीं है।";
    } else {
        box.innerHTML = html;
    }
}
async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("regName").value;
    const mobile = document.getElementById("regMobile").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const address = document.getElementById("regAddress").value;

    if (password !== confirmPassword) {
        document.getElementById("registerMessage").innerText =
            "Password और Confirm Password अलग हैं।";
        return;
    }

    const retailerId = "RET-" + Date.now().toString().slice(-6);

    const user = {
    retailerId: retailerId,
    name: name,
    mobile: mobile,
    email: email,
    password: password,
    address: address,
    walletBalance: 0,
    status: "Pending"
};
const supabaseUser = {
    retailer_id: user.retailerId,
    name: user.name,
    mobile: user.mobile,
    email: user.email,
    password: user.password,
    address: user.address,
    wallet_balance: user.walletBalance,
    status: user.status
};

const { error } = await supabaseClient
    .from("retailers")
    .insert([supabaseUser]);

if (error) {
    console.error("Supabase Registration Error:", error);
    document.getElementById("registerMessage").innerText =
        "❌ " + error.message;
    return;
}
    let customers =
    JSON.parse(localStorage.getItem("shivamCustomers")) || [];

customers.push(user);

localStorage.setItem(
    "shivamCustomers",
    JSON.stringify(customers)
);


    document.getElementById("registerMessage").innerHTML =
        "Account सफलतापूर्वक बन गया।<br>" +
        "आपकी Retailer ID: <strong>" + retailerId + "</strong><br>" +
        "अब Login करें।";
}

function loginUser(event) {
    event.preventDefault();

    const mobile = document.getElementById("loginMobile").value;
    const password = document.getElementById("loginPassword").value;

    const savedUsers =
    JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    if (savedUsers.length === 0) {
    document.getElementById("loginMessage").innerText =
        "पहले Registration करें।";
    return;
}

    const user = savedUsers.find(function (item) {
    return mobile === item.mobile && password === item.password;
});

if (user && user.status === "Pending") {

    document.getElementById("loginMessage").innerText =
        "⏳ आपका Account अभी Admin Approval के लिए Pending है।";

    return;
}
if (user && user.status === "Blocked") {

    document.getElementById("loginMessage").innerText =
        "🔒 आपका Account Admin द्वारा Block किया गया है।";

    return;
}

if (user) {
        localStorage.setItem("shivamLoggedIn", "true");

        localStorage.setItem("shivamRetailerId", user.retailerId);
localStorage.setItem("shivamRetailerName", user.name);
localStorage.setItem("shivamRetailerMobile", user.mobile);

        document.getElementById("loginMessage").innerText =
            "Login सफलतापूर्वक हो गया।";

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 1000);

    } else {
        document.getElementById("loginMessage").innerText =
            "मोबाइल नंबर या Password गलत है।";
    }
}
window.addEventListener("DOMContentLoaded", function () {

    const savedUsers =
    JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    if (savedUsers.length === 0) {
    return;
}

    try {
    const retailerId = localStorage.getItem("shivamRetailerId");

const user = savedUsers.find(function (item) {
    return item.retailerId === retailerId;
});

        const customerName = document.getElementById("customerName");

        if (customerName && user.name) {
            customerName.textContent = user.name;
        }

    } catch (error) {
        console.log("Customer data error:", error);
    }

});
function showAdminApplications() {

    const box = document.getElementById("adminApplicationList");

    let allApplications =
        JSON.parse(localStorage.getItem("shivamAllApplications")) || [];

    const oldApplications = [
        {
            key: "shivamEkycApplication",
            title: "e-KYC"
        },
        {
            key: "shivamNewMemberApplication",
            title: "नया सदस्य"
        },
        {
            key: "shivamNewFamilyApplication",
            title: "नया परिवार स्वीकृति"
        },
        {
            key: "shivamVivahApplication",
            title: "विवाह पंजीयन"
        },
        {
            key: "shivamMahilaTransferApplication",
            title: "महिला ट्रांसफर"
        },
        {
            key: "shivamAddressApprovedApplication",
            title: "Address Approved"
        }
    ];

    oldApplications.forEach(function(oldApp) {

        const saved = localStorage.getItem(oldApp.key);

        if (!saved) {
            return;
        }

        const oldData = JSON.parse(saved);

        const alreadyExists = allApplications.some(function(app) {
            return app.applicationId === oldData.applicationId;
        });

        if (!alreadyExists) {
            allApplications.push(oldData);
        }

        localStorage.removeItem(oldApp.key);
    });

    localStorage.setItem(
    "shivamAllApplications",
    JSON.stringify(allApplications)
);

const searchInput =
    document.getElementById("retailerSearch");

const searchText =
    searchInput ? searchInput.value.trim().toLowerCase() : "";

const filteredApplications =
    allApplications.filter(function(data) {

        if (searchText === "") {
            return true;
        }

        return String(data.retailerId || "")
            .toLowerCase() === searchText;
    });

let html = "";

filteredApplications.forEach(function(data) {

        let title = data.service || "Application";

        html +=
        "<div class='application-item'>" +
        "<h3>" + title + "</h3>" +

        "Retailer ID: " + (data.retailerId || "") + "<br>" +
        "Retailer Name: " + (data.retailerName || "") + "<br>" +
        "Retailer Mobile: " + (data.retailerMobile || "") + "<br>";
        if (data.service === "विवाह पंजीयन") {

            html +=
            "पति का नाम: " + (data.husbandName || "") + "<br>" +
            "पति Member ID: " + (data.husbandMemberId || "") + "<br>" +
            "पति Family ID: " + (data.husbandFamilyId || "") + "<br>" +
            "पत्नी का नाम: " + (data.wifeName || "") + "<br>" +
            "पत्नी Member ID: " + (data.wifeMemberId || "") + "<br>" +
            "पत्नी Family ID: " + (data.wifeFamilyId || "") + "<br>";

        } else if (data.service === "नया सदस्य") {

            html +=
            "Name: " + (data.name || "") + "<br>" +
            "Request ID: " + (data.requestId || "") + "<br>" +
            "Family ID: " + (data.familyId || "") + "<br>";

        } else if (data.service === "e-KYC") {

            html +=
            "Name: " + (data.name || "") + "<br>" +
            "Request ID: " + (data.requestId || "") + "<br>" +
            "Family ID: " + (data.familyId || "") + "<br>";

        } else if (data.service === "नया परिवार स्वीकृति") {

            html +=
            "नाम: " + (data.name || "") + "<br>" +
            "Request ID: " + (data.requestId || "") + "<br>";

        } else if (data.service === "महिला ट्रांसफर") {

            html +=
            "नाम: " + (data.name || "") + "<br>" +
            "Member ID: " + (data.memberId || "") + "<br>" +
            "पिता का नाम: " + (data.pitaName || "") + "<br>" +
            "पिता Family ID: " + (data.pitaFamilyId || "") + "<br>";

        } else if (data.service === "Samagra ID में Address Approved") {

            html +=
            "नाम: " + (data.name || "") + "<br>" +
            "Request ID: " + (data.requestId || "") + "<br>" +
            "Family ID: " + (data.familyId || "") + "<br>";
        }

        html +=
        "Application ID: <strong>" + data.applicationId + "</strong><br>" +
        "Status: <strong>" + data.status + "</strong><br>" +
        "Change Status: " +
        "<select onchange=\"updateApplicationStatus('" +
        data.applicationId +
        "', this.value)\">" +

        "<option value='Submitted'" +
        (data.status === "Submitted" ? " selected" : "") +
        ">Submitted</option>" +

        "<option value='Processing'" +
        (data.status === "Processing" ? " selected" : "") +
        ">Processing</option>" +

        "<option value='Approved'" +
        (data.status === "Approved" ? " selected" : "") +
        ">Approved</option>" +

        "<option value='Rejected'" +
        (data.status === "Rejected" ? " selected" : "") +
        ">Rejected</option>" +

        "</select><br>" +

        "Date: " + data.date +

        " <button onclick=\"deleteApplication('" +
        data.applicationId +
        "')\">Delete</button>" +

        "<hr>" +
        "</div>";
    });

    if (html === "") {
        box.innerHTML = "अभी कोई application उपलब्ध नहीं है।";
    } else {
        box.innerHTML = html;
    }
}
function updateApplicationStatus(applicationId, newStatus) {

    let applications =
        JSON.parse(localStorage.getItem("shivamAllApplications")) || [];

    const application = applications.find(function(app) {
        return app.applicationId === applicationId;
    });

    if (!application) {
        alert("Application नहीं मिला।");
        return;
    }

    application.status = newStatus;

    localStorage.setItem(
        "shivamAllApplications",
        JSON.stringify(applications)
    );

    alert("Status अपडेट हो गया: " + newStatus);

    showAdminApplications();
}
function deleteApplication(applicationId) {

    let applications =
        JSON.parse(localStorage.getItem("shivamAllApplications")) || [];

    const applicationIndex = applications.findIndex(function(app) {
        return app.applicationId === applicationId;
    });

    if (applicationIndex === -1) {
        alert("Application नहीं मिला।");
        return;
    }

    const confirmDelete = confirm(
        "क्या आप यह application delete करना चाहते हैं?"
    );

    if (!confirmDelete) {
        return;
    }

    applications.splice(applicationIndex, 1);

    localStorage.setItem(
        "shivamAllApplications",
        JSON.stringify(applications)
    );

    alert("Application delete हो गया।");

    showAdminApplications();
}

function registerRetailer(event) {
    event.preventDefault();

    const name = document.getElementById("retailerName").value.trim();
    const mobile = document.getElementById("retailerMobile").value.trim();
    const password = document.getElementById("retailerPassword").value;

    const retailerId = "RET-" + Date.now().toString().slice(-6);

    const retailer = {
        retailerId: retailerId,
        name: name,
        mobile: mobile,
        password: password
    };

    localStorage.setItem(
        "shivamRetailer",
        JSON.stringify(retailer)
    );

    document.getElementById("retailerRegisterMessage").innerHTML =
        "<h3>Registration सफल हुआ ✅</h3>" +
        "<p>Retailer ID: <strong>" + retailerId + "</strong></p>" +
        "<p>Retailer Name: <strong>" + name + "</strong></p>" +
        "<p>Mobile: <strong>" + mobile + "</strong></p>";
}
function loginRetailer(event) {
    event.preventDefault();

    const mobile = document.getElementById("retailerLoginMobile").value.trim();
    const password = document.getElementById("retailerLoginPassword").value;

    const savedRetailer = localStorage.getItem("shivamRetailer");

    if (!savedRetailer) {
        document.getElementById("retailerLoginMessage").innerText =
            "पहले Retailer Registration करें।";
        return;
    }

    const retailer = JSON.parse(savedRetailer);

    if (mobile === retailer.mobile && password === retailer.password) {

        localStorage.setItem("shivamRetailerLoggedIn", "true");

        document.getElementById("retailerLoginMessage").innerText =
            "Login सफलतापूर्वक हो गया।";

    } else {

        document.getElementById("retailerLoginMessage").innerText =
            "Mobile Number या Password गलत है।";
    }
}
function getLoggedInRetailer() {

    const savedRetailer = localStorage.getItem("shivamRetailer");

    if (!savedRetailer) {
        return null;
    }

    const retailer = JSON.parse(savedRetailer);

    return {
        retailerId: retailer.retailerId,
        retailerName: retailer.name,
        retailerMobile: retailer.mobile
    };
}
function submitNewFamily(event) {
    event.preventDefault();

    const applicationId =
        "SOS-FAMILY-" + Date.now().toString().slice(-6);

    const data = {
        retailerId: localStorage.getItem("shivamRetailerId"),
        retailerName: localStorage.getItem("shivamRetailerName"),
        retailerMobile: localStorage.getItem("shivamRetailerMobile"),

        applicationId: applicationId,
        service: "नया परिवार स्वीकृति",

        name: document.getElementById("familyRequestName").value.trim(),
        requestId: document.getElementById("familyRequestId").value.trim(),

        status: "Submitted",
        date: new Date().toLocaleDateString("hi-IN")
    };

    const paymentSuccess =
    deductServiceAmount("New Family");

if (!paymentSuccess) {
    return;
}

    localStorage.setItem(
        "shivamNewFamilyApplication",
        JSON.stringify(data)
    );

    alert(
        "आवेदन Submit हो गया\n" +
        "Application ID: " + applicationId
    );
}
function saveApplication(data) {

    let applications =
        JSON.parse(localStorage.getItem("shivamAllApplications")) || [];

    applications.push(data);

    localStorage.setItem(
        "shivamAllApplications",
        JSON.stringify(applications)
    );
}
function showAdminRetailers() {

    const box = document.getElementById("adminRetailerList");

    if (!box) return;

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    if (customers.length === 0) {
        box.innerHTML = "अभी कोई Retailer registered नहीं है।";
        return;
    }

    const searchInput =
        document.getElementById("retailerSearch");

    const searchText =
        searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filteredCustomers = customers.filter(function (user) {

        if (searchText === "") {
            return true;
        }

        return String(user.retailerId).toLowerCase() === searchText;
    });

    if (filteredCustomers.length === 0) {
        box.innerHTML =
            "❌ इस Retailer ID का कोई Retailer नहीं मिला।";
        return;
    }

    let html = "";

    filteredCustomers.forEach(function (user) {

        html +=
            "<div class='retailer-item'>" +
            "<strong>" + user.retailerId + "</strong><br>" +
            "नाम: " + user.name + "<br>" +
            "Mobile: " + user.mobile +
            "<br>Wallet Balance: ₹" +
(user.walletBalance || 0) +
            "<br><br>" +

            "<strong>Status: " + (user.status || "Active") + "</strong><br><br>" +

(user.status === "Pending" ?
"<button onclick=\"activateRetailer('" +
user.retailerId +
"')\">" +
"✅ Activate Retailer" +
"</button> " : "") +

            "<button onclick=\"viewRetailerDetails('" +
            user.retailerId +
            "')\">" +
            "👁️ View Details" +
            "</button> " +

            (user.status === "Blocked" ?
"<button onclick=\"unblockRetailer('" +
user.retailerId +
"')\">" +
"🔓 Unblock" +
"</button> " :
"<button onclick=\"blockRetailer('" +
user.retailerId +
"')\">" +
"🔒 Block Retailer" +
"</button> ") +

            "<button onclick=\"deleteRetailer('" +
            user.retailerId +
            "')\">" +
            "🗑️ Delete Retailer" +
            "</button>" +

            "</div>";
    });

    box.innerHTML = html;
}

function blockRetailer(retailerId) {

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function(item) {
        return item.retailerId === retailerId;
    });

    if (!user) return;

    user.status = "Blocked";

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    alert("🔒 Retailer Account Block हो गया।");

    showAdminRetailers();
}


function unblockRetailer(retailerId) {

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function(item) {
        return item.retailerId === retailerId;
    });

    if (!user) return;

    user.status = "Active";

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    alert("🔓 Retailer Account Unblock हो गया।");

    showAdminRetailers();
}


function activateRetailer(retailerId) {

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function(item) {
        return item.retailerId === retailerId;
    });

    if (!user) return;

    user.status = "Active";

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    alert("✅ Retailer Account Activate हो गया।");

    showAdminRetailers();
}

function addService() {

    const name = document.getElementById("serviceName").value.trim();
    const rate = document.getElementById("serviceRate").value.trim();

    if (name === "" || rate === "") {
        alert("Service Name और Rate भरें।");
        return;
    }

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const service = {
        id: "SERVICE-" + Date.now(),
        name: name,
        rate: rate
    };

    services.push(service);

    localStorage.setItem(
        "shivamServices",
        JSON.stringify(services)
    );

    document.getElementById("serviceName").value = "";
    document.getElementById("serviceRate").value = "";

    showAdminServices();
}


function showAdminServices() {

    const box = document.getElementById("adminServiceList");

    if (!box) return;

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    if (services.length === 0) {
        box.innerHTML = "अभी कोई Service नहीं है।";
        return;
    }

    let html = "";

    services.forEach(function (service) {

        html +=
    "<div class='service-item'>" +
    "<strong>" + service.name + "</strong>" +
    "<br>Rate: ₹" + service.rate +
    "<br><br>" +
    "<button onclick=\"editService('" + service.id + "')\">" +
"✏️ Edit Service" +
"</button> " +

"<button onclick=\"deleteService('" + service.id + "')\">" +
"🗑️ Delete Service" +
"</button>"
    "</div>";

    });

    box.innerHTML = html;
}
function deleteService(serviceId) {

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const service = services.find(function (item) {
        return item.id === serviceId;
    });

    if (!service) {
        alert("Service नहीं मिली।");
        return;
    }

    const confirmDelete = confirm(
        "क्या आप " + service.name +
        " को Delete करना चाहते हैं?"
    );

    if (!confirmDelete) {
        return;
    }

    const updatedServices = services.filter(function (item) {
        return item.id !== serviceId;
    });

    localStorage.setItem(
        "shivamServices",
        JSON.stringify(updatedServices)
    );

    alert("Service सफलतापूर्वक Delete हो गई।");

    showAdminServices();
}
function editService(serviceId) {

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const service = services.find(function (item) {
        return item.id === serviceId;
    });

    if (!service) {
        alert("Service नहीं मिली।");
        return;
    }

    const newName = prompt(
        "Service Name बदलें:",
        service.name
    );

    if (newName === null) {
        return;
    }

    const newRate = prompt(
        "Service Rate बदलें:",
        service.rate
    );

    if (newRate === null) {
        return;
    }

    if (newName.trim() === "" || newRate.trim() === "") {
        alert("Service Name और Rate खाली नहीं हो सकते।");
        return;
    }

    service.name = newName.trim();
    service.rate = newRate.trim();

    localStorage.setItem(
        "shivamServices",
        JSON.stringify(services)
    );

    showAdminServices();

    alert("Service सफलतापूर्वक Update हो गई।");
}
function loadRetailerPricingOptions() {

    const retailerSelect =
        document.getElementById("pricingRetailer");

    const serviceSelect =
        document.getElementById("pricingService");

    if (!retailerSelect || !serviceSelect) return;

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    retailerSelect.innerHTML =
        '<option value="">Retailer चुनें</option>';

    serviceSelect.innerHTML =
        '<option value="">Service चुनें</option>';

    customers.forEach(function (user) {

        retailerSelect.innerHTML +=
            '<option value="' + user.retailerId + '">' +
            user.retailerId + " - " + user.name +
            '</option>';

    });

    services.forEach(function (service) {

        serviceSelect.innerHTML +=
            '<option value="' + service.id + '">' +
            service.name +
            '</option>';

    });
}


window.addEventListener("DOMContentLoaded", function () {
    loadRetailerPricingOptions();
});
function saveRetailerRate() {

    const retailerId =
        document.getElementById("pricingRetailer").value;

    const serviceId =
        document.getElementById("pricingService").value;

    const rate =
        document.getElementById("retailerRate").value.trim();

    if (retailerId === "" || serviceId === "" || rate === "") {
        alert("Retailer, Service और Rate सभी चुनें/भरें।");
        return;
    }

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const existingPrice = prices.find(function (item) {
        return item.retailerId === retailerId &&
               item.serviceId === serviceId;
    });

    if (existingPrice) {

        existingPrice.rate = rate;

    } else {

        prices.push({
            retailerId: retailerId,
            serviceId: serviceId,
            rate: rate
        });

    }

    localStorage.setItem(
        "shivamRetailerPrices",
        JSON.stringify(prices)
    );

    alert("Retailer का Rate सफलतापूर्वक Save हो गया।");

    document.getElementById("retailerRate").value = "";

    showRetailerPricing();
}
function showRetailerPricing() {

    const box =
        document.getElementById("retailerPricingList");

    if (!box) return;

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    if (prices.length === 0) {
        box.innerHTML = "अभी कोई Retailer Rate सेट नहीं है।";
        return;
    }

    const searchInput =
        document.getElementById("retailerSearch");

    const searchText =
        searchInput ? searchInput.value.trim().toLowerCase() : "";

    const filteredPrices = prices.filter(function (price) {

        if (searchText === "") {
            return true;
        }

        return String(price.retailerId).toLowerCase() === searchText;
    });

    if (filteredPrices.length === 0) {
        box.innerHTML =
            "❌ इस Retailer ID का कोई Service Rate नहीं मिला।";
        return;
    }

    let html = "";

    filteredPrices.forEach(function (price) {

        const retailer = customers.find(function (user) {
            return user.retailerId === price.retailerId;
        });

        const service = services.find(function (item) {
            return item.id === price.serviceId;
        });

        if (retailer && service) {

            html +=
                "<div class='service-item'>" +
                "<strong>👤 " + retailer.name + "</strong>" +
                "<br>Retailer ID: " + retailer.retailerId +
                "<br>Service: " + service.name +
                "<br><strong>Rate: ₹" + price.rate + "</strong>" +
                "</div>";
        }
    });

    box.innerHTML = html;
}
function loadRetailerServiceRates() {

    const rateBox = document.getElementById("rate-ekyc");

    if (!rateBox) return;

   const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const ekycService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "ekyc";

    });

    if (!retailerId || !ekycService) {

        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(ekycService.id);

    });

    if (retailerPrice) {

        rateBox.innerText = "₹" + retailerPrice.rate;

    } else {

        rateBox.innerText = "Rate उपलब्ध नहीं";

    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadRetailerServiceRates();
});
function loadNewMemberRate() {

    const rateBox = document.getElementById("rate-new-member");

    if (!rateBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const memberService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "new member";

    });

    if (!retailerId || !memberService) {
        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(memberService.id);

    });

    if (retailerPrice) {
        rateBox.innerText = "₹" + retailerPrice.rate;
    } else {
        rateBox.innerText = "Rate उपलब्ध नहीं";
    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadNewMemberRate();
});
function loadNewFamilyRate() {

    const rateBox = document.getElementById("rate-new-family");

    if (!rateBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const familyService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "new family";

    });

    if (!retailerId || !familyService) {
        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(familyService.id);

    });

    if (retailerPrice) {
        rateBox.innerText = "₹" + retailerPrice.rate;
    } else {
        rateBox.innerText = "Rate उपलब्ध नहीं";
    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadNewFamilyRate();
});
function loadVivahRate() {

    const rateBox = document.getElementById("rate-vivah");

    if (!rateBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const vivahService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "vivah panjiyan";

    });

    if (!retailerId || !vivahService) {
        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(vivahService.id);

    });

    if (retailerPrice) {
        rateBox.innerText = "₹" + retailerPrice.rate;
    } else {
        rateBox.innerText = "Rate उपलब्ध नहीं";
    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadVivahRate();
});
function loadMahilaTransferRate() {

    const rateBox =
        document.getElementById("rate-mahila-transfer");

    if (!rateBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const mahilaService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "mahila transfer";

    });

    if (!retailerId || !mahilaService) {
        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(mahilaService.id);

    });

    if (retailerPrice) {
        rateBox.innerText = "₹" + retailerPrice.rate;
    } else {
        rateBox.innerText = "Rate उपलब्ध नहीं";
    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadMahilaTransferRate();
});
function loadAddressApprovedRate() {

    const rateBox =
        document.getElementById("rate-address-approved");

    if (!rateBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const addressService = services.find(function (service) {

        return service.name.trim().toLowerCase() === "address approved";

    });

    if (!retailerId || !addressService) {
        rateBox.innerText = "Rate उपलब्ध नहीं";
        return;
    }

    const retailerPrice = prices.find(function (price) {

        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(addressService.id);

    });

    if (retailerPrice) {
        rateBox.innerText = "₹" + retailerPrice.rate;
    } else {
        rateBox.innerText = "Rate उपलब्ध नहीं";
    }
}
window.addEventListener("DOMContentLoaded", function () {
    loadAddressApprovedRate();
});
function loadRetailerInfo() {

    const retailerIdBox =
        document.getElementById("retailerIdDisplay");

    const retailerMobileBox =
        document.getElementById("retailerMobileDisplay");

    if (!retailerIdBox || !retailerMobileBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const retailerMobile =
        localStorage.getItem("shivamRetailerMobile");

    retailerIdBox.innerText =
        retailerId || "उपलब्ध नहीं";

    retailerMobileBox.innerText =
        retailerMobile || "उपलब्ध नहीं";
}


window.addEventListener("DOMContentLoaded", function () {
    loadRetailerInfo();
});
function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}
function loadWalletBalance() {
    const walletBox = document.getElementById("walletBalance");
    if (!walletBox) return;

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function (item) {
        return item.retailerId === retailerId;
    });

    if (user) {
        walletBox.innerText =
            "₹" + (user.walletBalance || 0);
    } else {
        walletBox.innerText = "₹0";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    loadWalletBalance();
});
function showAdminWallets() {
    const box = document.getElementById("adminWalletList");
    if (!box) return;

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    if (customers.length === 0) {
        box.innerHTML = "अभी कोई Retailer नहीं है।";
        return;
    }

    let html = "";

    customers.forEach(function (user) {
        html +=
            "<div class='service-item'>" +
            "<strong>👤 " + user.name + "</strong>" +
            "<br>Retailer ID: " + user.retailerId +
            "<br>Mobile: " + user.mobile +
            "<br><strong>Wallet: ₹" +
            (user.walletBalance || 0) +
            "</strong>" +
            "</div>";
    });

    box.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", function () {
    showAdminWallets();
});
function loadWalletRetailerOptions() {
    const retailerSelect =
        document.getElementById("walletRetailer");

    if (!retailerSelect) return;

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    retailerSelect.innerHTML =
        '<option value="">Retailer चुनें</option>';

    customers.forEach(function (user) {
        retailerSelect.innerHTML +=
            '<option value="' + user.retailerId + '">' +
            user.retailerId + " - " + user.name +
            '</option>';
    });
}

window.addEventListener("DOMContentLoaded", function () {
    loadWalletRetailerOptions();
});
function addWalletMoney() {
    const retailerId =
        document.getElementById("walletRetailer").value;

    const amount =
        document.getElementById("walletAmount").value.trim();

    if (retailerId === "" || amount === "") {
        alert("Retailer और Amount दोनों चुनें/भरें।");
        return;
    }

    const addAmount = Number(amount);

    if (addAmount <= 0) {
        alert("Amount 0 से ज्यादा होना चाहिए।");
        return;
    }

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function (item) {
        return item.retailerId === retailerId;
    });

    if (!user) {
        alert("Retailer नहीं मिला।");
        return;
    }

    user.walletBalance =
        Number(user.walletBalance || 0) + addAmount;

        saveWalletTransaction(
    retailerId,
    "ADD",
    addAmount,
    "Admin Wallet Recharge"
);

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    alert(
        "Wallet में ₹" + addAmount +
        " सफलतापूर्वक Add हो गया।"
    );

    document.getElementById("walletAmount").value = "";

    showAdminWallets();
}
function deductWalletMoney() {
    const retailerId =
        document.getElementById("walletRetailer").value;

    const amount =
        document.getElementById("walletAmount").value.trim();

    if (retailerId === "" || amount === "") {
        alert("Retailer और Amount दोनों चुनें/भरें।");
        return;
    }

    const deductAmount = Number(amount);

    if (deductAmount <= 0) {
        alert("Amount 0 से ज्यादा होना चाहिए।");
        return;
    }

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function (item) {
        return item.retailerId === retailerId;
    });

    if (!user) {
        alert("Retailer नहीं मिला।");
        return;
    }

    const currentBalance =
        Number(user.walletBalance || 0);

    if (deductAmount > currentBalance) {
        alert(
            "Wallet में पर्याप्त Balance नहीं है।\n" +
            "Current Balance: ₹" + currentBalance
        );
        return;
    }

    user.walletBalance =
        currentBalance - deductAmount;

        saveWalletTransaction(
    retailerId,
    "DEDUCT",
    deductAmount,
    "Admin Wallet Deduction"
);

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    alert(
        "Wallet से ₹" + deductAmount +
        " सफलतापूर्वक Deduct हो गया।"
    );

    document.getElementById("walletAmount").value = "";

    showAdminWallets();
}
function saveWalletTransaction(
    retailerId,
    type,
    amount,
    reason
) {
    const transactions =
        JSON.parse(
            localStorage.getItem("shivamWalletTransactions")
        ) || [];

    transactions.push({
        retailerId: retailerId,
        type: type,
        amount: Number(amount),
        reason: reason,
        date: new Date().toLocaleString("en-IN")
    });

    localStorage.setItem(
        "shivamWalletTransactions",
        JSON.stringify(transactions)
    );
}
function showWalletTransactions() {
    const box =
        document.getElementById("walletTransactionList");

    if (!box) return;

    const transactions =
        JSON.parse(
            localStorage.getItem("shivamWalletTransactions")
        ) || [];

    const customers =
        JSON.parse(
            localStorage.getItem("shivamCustomers")
        ) || [];

    if (transactions.length === 0) {
        box.innerHTML = "अभी कोई Transaction नहीं है।";
        return;
    }

    let html = "";

    transactions.slice().reverse().forEach(function (transaction) {

        const retailer = customers.find(function (user) {
            return user.retailerId === transaction.retailerId;
        });

        const retailerName =
            retailer ? retailer.name : "Unknown Retailer";

        const action =
            transaction.type === "ADD"
                ? "➕ Money Added"
                : "➖ Money Deducted";

        html +=
            "<div class='service-item'>" +
            "<strong>👤 " + retailerName + "</strong>" +
            "<br>Retailer ID: " + transaction.retailerId +
            "<br>" + action +
            "<br>Amount: ₹" + transaction.amount +
            "<br>Reason: " + transaction.reason +
            "<br>Date: " + transaction.date +
            "</div>";
    });

    box.innerHTML = html;
}

window.addEventListener("DOMContentLoaded", function () {
    showWalletTransactions();
});
function getRetailerServiceRate(serviceName) {

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const prices =
        JSON.parse(localStorage.getItem("shivamRetailerPrices")) || [];

    const services =
        JSON.parse(localStorage.getItem("shivamServices")) || [];

    const service = services.find(function (item) {
        return item.name.trim().toLowerCase() ===
               serviceName.trim().toLowerCase();
    });

    if (!retailerId || !service) {
        return null;
    }

    const retailerPrice = prices.find(function (price) {
        return String(price.retailerId) === String(retailerId) &&
               String(price.serviceId) === String(service.id);
    });

    if (!retailerPrice) {
        return null;
    }

    return Number(retailerPrice.rate);
}
function deductServiceAmount(serviceName) {

    const retailerId =
        localStorage.getItem("shivamRetailerId");

    const rate = getRetailerServiceRate(serviceName);

    if (!retailerId) {
        alert("Retailer Login नहीं है।");
        return false;
    }

    if (rate === null || rate <= 0) {
        alert(
            serviceName +
            " का Retailer Rate उपलब्ध नहीं है।"
        );
        return false;
    }

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function (item) {
        return item.retailerId === retailerId;
    });

    if (!user) {
        alert("Retailer नहीं मिला।");
        return false;
    }

    const currentBalance =
        Number(user.walletBalance || 0);

    if (currentBalance < rate) {
        alert(
            "Wallet Balance पर्याप्त नहीं है।\n\n" +
            "Service Rate: ₹" + rate + "\n" +
            "Wallet Balance: ₹" + currentBalance + "\n\n" +
            "कृपया Admin से Wallet Recharge करवाएँ।"
        );
        return false;
    }

    user.walletBalance = currentBalance - rate;

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(customers)
    );

    saveWalletTransaction(
        retailerId,
        "DEDUCT",
        rate,
        serviceName
    );

    return true;
}
function deleteRetailer(retailerId) {

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const retailer = customers.find(function (user) {
        return user.retailerId === retailerId;
    });

    if (!retailer) {
        alert("Retailer नहीं मिला।");
        return;
    }

    const confirmDelete = confirm(
        "क्या आप " + retailer.name +
        " (" + retailer.retailerId + ") को Delete करना चाहते हैं?"
    );

    if (!confirmDelete) {
        return;
    }

    const updatedCustomers = customers.filter(function (user) {
        return user.retailerId !== retailerId;
    });

    localStorage.setItem(
        "shivamCustomers",
        JSON.stringify(updatedCustomers)
    );

    alert("Retailer सफलतापूर्वक Delete हो गया।");

    showAdminRetailers();
}
function viewRetailerDetails(retailerId) {

    const customers =
        JSON.parse(localStorage.getItem("shivamCustomers")) || [];

    const user = customers.find(function (item) {
        return item.retailerId === retailerId;
    });

    if (!user) {
        alert("Retailer नहीं मिला।");
        return;
    }

    alert(
        "Retailer Details\n\n" +
        "Retailer ID: " + user.retailerId + "\n" +
        "Name: " + user.name + "\n" +
        "Mobile: " + user.mobile + "\n" +
        "Email: " + (user.email || "N/A") + "\n" +
        "Address: " + (user.address || "N/A") + "\n" +
        "Wallet Balance: ₹" + (user.walletBalance || 0)
    );
}
function updateAdminSummary() {

    // Total Retailers
    const retailers = JSON.parse(
        localStorage.getItem("shivamCustomers") || "[]"
    );

    const retailerCount =
        document.getElementById("totalRetailers");

    if (retailerCount) {
        retailerCount.innerText = retailers.length;
    }


    // Total Applications
    const applications = JSON.parse(
        localStorage.getItem("shivamAllApplications") || "[]"
    );

    const applicationCount =
        document.getElementById("totalApplications");

    if (applicationCount) {
        applicationCount.innerText = applications.length;
    }


    // Total Services
    const services = JSON.parse(
        localStorage.getItem("shivamServices") || "[]"
    );

    const serviceCount =
        document.getElementById("totalServices");

    if (serviceCount) {
        serviceCount.innerText = services.length;
    }


    // Total Wallet Balance
    const walletBalance =
        document.getElementById("totalWallet");

    if (walletBalance) {

        let totalWallet = 0;

        retailers.forEach(function(retailer) {

            totalWallet += Number(
                retailer.wallet || 0
            );

        });

        walletBalance.innerText =
            "₹" + totalWallet;
    }
}


document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementById("totalRetailers")) {
        updateAdminSummary();
    }

});
function showRetailersFromSummary() {

    const retailerSection =
        document.querySelector(".retailer-management");

    if (retailerSection) {
        retailerSection.scrollIntoView({
            behavior: "smooth"
        });
    }

    showAdminRetailers();
}
function toggleRetailerManagement() {

    const content =
        document.getElementById("retailerManagementContent");

    const arrow =
        document.getElementById("retailerFolderArrow");

    if (content.style.display === "none") {

        content.style.display = "block";
        arrow.innerText = "▲";

        showAdminRetailers();
        showRetailerPricing();

    } else {

        content.style.display = "none";
        arrow.innerText = "▼";
    }
}
document.addEventListener("DOMContentLoaded", function () {

    const summary = document.querySelector(".admin-summary");
    const retailer = document.querySelector(".retailer-section");

    if (summary && retailer) {
        summary.after(retailer);
    }

});
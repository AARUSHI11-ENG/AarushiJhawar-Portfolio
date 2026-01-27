function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    const page = document.getElementById(id);
    if (page) {
        page.classList.add("active");
        page.scrollTop = 0;
    }
}

/* IMAGE MODAL */
function openImage() {
    document.getElementById("imageModal").classList.add("active");
}

function closeImage() {
    document.getElementById("imageModal").classList.remove("active");
}

/* REVIEWS WITH OWNER CONTROL */
const OWNER_KEY = "AARUSHI_ADMIN_2026";

const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

function generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const userKeys = JSON.parse(localStorage.getItem("userReviewKeys")) || [];
    reviewsList.innerHTML = "";

    reviews.forEach((review, index) => {
        const div = document.createElement("div");
        div.className = "review-card";

        let canDelete = userKeys.includes(review.id) ||
            sessionStorage.getItem("OWNER_AUTH") === OWNER_KEY;

        div.innerHTML = `
            <h4>${review.name}</h4>
            <p>${review.message}</p>
            ${canDelete ? `<button class="delete-review" onclick="deleteReview(${index})">Delete</button>` : ""}
        `;
        reviewsList.appendChild(div);
    });
}

function deleteReview(index) {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    loadReviews();
}

reviewForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("reviewName").value;
    const message = document.getElementById("reviewMessage").value;

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const userKeys = JSON.parse(localStorage.getItem("userReviewKeys")) || [];

    const id = generateId();
    reviews.push({ id, name, message });
    userKeys.push(id);

    localStorage.setItem("reviews", JSON.stringify(reviews));
    localStorage.setItem("userReviewKeys", JSON.stringify(userKeys));

    reviewForm.reset();
    loadReviews();
});

function ownerLogin() {
    const key = prompt("Enter owner key:");
    if (key === OWNER_KEY) {
        sessionStorage.setItem("OWNER_AUTH", OWNER_KEY);
        alert("Owner access enabled");
        loadReviews();
    }
}

document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.shiftKey && e.key === "O") {
        ownerLogin();
    }
});

loadReviews();

const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Populate the product dropdown
const productSelect = document.querySelector("#productName");

if (productSelect) {
    products.forEach((product) => {
        const option = document.createElement("option");

        option.value = product.id;
        option.textContent = product.name;

        productSelect.appendChild(option);
    });
}

// Update footer information
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Review counter on the confirmation page
const reviewCountElement = document.querySelector("#reviewCount");

if (reviewCountElement) {
    const params = new URLSearchParams(window.location.search);
    const storageKey = "productReviewCount";

    let reviewCount =
        Number(localStorage.getItem(storageKey)) || 0;

    const isValidSubmission =
        params.has("productName") &&
        params.has("rating") &&
        params.has("installDate");

    if (isValidSubmission) {
        reviewCount++;
        localStorage.setItem(
            storageKey,
            String(reviewCount)
        );
    }

    reviewCountElement.textContent = reviewCount;
}
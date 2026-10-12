
function updateCopyrightYear() {
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// 2. Control the mobile navigation menu
function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", function () {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Close the menu after selecting a link
    const navigationLinks = navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.textContent = "☰";
        });
    });

    // Close the menu with the Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navigation.classList.remove("open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.textContent = "☰";
        }
    });
}

// 3. Store and display the visitor count
function trackVisits() {
    const storageKey = "beninExplorerVisitCount";
    const messageClass = "visit-message";

    try {
        let visitCount = Number(localStorage.getItem(storageKey)) || 0;
        visitCount += 1;

        localStorage.setItem(storageKey, String(visitCount));

        const contentArea = document.querySelector(
            ".hero-content, .page-banner .section-container"
        );

        if (contentArea) {
            const visitMessage = document.createElement("p");
            visitMessage.className = messageClass;
            visitMessage.setAttribute("aria-live", "polite");

            visitMessage.textContent =
                visitCount === 1
                    ? "Welcome to Benin Explorer!"
                    : `Welcome back! This browser has visited ${visitCount} times.`;

            contentArea.appendChild(visitMessage);
        }
    } catch (error) {
        console.info("Visit tracking is unavailable in this browser.");
    }
}

// 4. Collect destination information using arrays and objects
function summarizeDestinations() {
    const destinationCards = Array.from(
        document.querySelectorAll(".destination-card")
    );

    const destinations = destinationCards
        .map(function (card) {
            const heading = card.querySelector("h2, h3");

            return {
                name: heading ? heading.textContent.trim() : "",
                element: card
            };
        })
        .filter(function (destination) {
            return destination.name !== "";
        });

    if (destinations.length > 0) {
        const summary = document.createElement("p");
        summary.className = "destination-summary";
        summary.textContent =
            `Explore ${destinations.length} featured destination` +
            `${destinations.length === 1 ? "" : "s"} in Benin.`;

        const firstCard = destinations[0].element;

        firstCard.parentElement?.insertAdjacentElement("beforebegin", summary);
    }
}

// 5. Remember the newsletter preference
function setupNewsletterPreference() {
    const newsletterCheckbox = document.querySelector("#newsletter");

    if (!newsletterCheckbox) {
        return;
    }

    try {
        const savedPreference = localStorage.getItem(
            "beninExplorerNewsletter"
        );

        if (savedPreference !== null) {
            newsletterCheckbox.checked = savedPreference === "true";
        }

        newsletterCheckbox.addEventListener("change", function () {
            localStorage.setItem(
                "beninExplorerNewsletter",
                String(newsletterCheckbox.checked)
            );
        });
    } catch (error) {
        console.info("Newsletter preferences cannot be saved in this browser.");
    }
}

// 6. Validate and process the contact form
function setupContactForm() {
    const contactForm = document.querySelector("#contact-form");
    const feedback = document.querySelector("#form-feedback");

    if (!contactForm || !feedback) {
        return;
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const interest = document.querySelector("#interest").value;
        const message = document.querySelector("#message").value.trim();

        // Conditional validation
        if (!name || !email || !interest || !message) {
            feedback.textContent =
                "Please complete all required fields before submitting.";
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            feedback.textContent =
                "Please enter a valid email address.";
            return;
        }

        // Create an object containing the form information
        const contactDetails = {
            name: name,
            email: email,
            interest: interest,
            message: message,
            submittedAt: new Date().toISOString()
        };

        // Use the object to prepare a confirmation message
        feedback.textContent =
            `Thank you, ${contactDetails.name}! ` +
            "Your form has been checked successfully.";

        contactForm.reset();

        // Restore the saved newsletter preference after resetting
        setupNewsletterPreference();
    });
}

// 7. Initialize all page features
function initializeBeninExplorer() {
    updateCopyrightYear();
    setupNavigation();
    trackVisits();
    summarizeDestinations();
    setupNewsletterPreference();
    setupContactForm();
}

// Run when the HTML document is ready
document.addEventListener("DOMContentLoaded", initializeBeninExplorer);
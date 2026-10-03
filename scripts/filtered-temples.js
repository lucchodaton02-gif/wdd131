const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake/400x250/salt-lake-temple-lds-000001.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-lds-39563-wallpaper.jpg"
    },
    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-south-africa-temple-lds-102419-wallpaper.jpg"
    }
];

const templeGrid = document.querySelector("#temple-grid");

const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


/* -----------------------------
   Create temple cards
----------------------------- */

function displayTemples(templeList) {
    templeGrid.innerHTML = "";

    templeList.forEach((temple) => {
        const card = document.createElement("figure");

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = "lazy";

        const caption = document.createElement("figcaption");

        const name = document.createElement("h2");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML =
            `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

        caption.appendChild(name);
        caption.appendChild(location);
        caption.appendChild(dedicated);
        caption.appendChild(area);

        card.appendChild(image);
        card.appendChild(caption);

        templeGrid.appendChild(card);
    });
}


/* -----------------------------
   Filter functions
----------------------------- */

function showAllTemples() {
    displayTemples(temples);
}

function showOldTemples() {
    const oldTemples = temples.filter((temple) => {
        const year = Number(temple.dedicated.split(",")[0]);
        return year < 1900;
    });

    displayTemples(oldTemples);
}

function showNewTemples() {
    const newTemples = temples.filter((temple) => {
        const year = Number(temple.dedicated.split(",")[0]);
        return year > 2000;
    });

    displayTemples(newTemples);
}

function showLargeTemples() {
    const largeTemples = temples.filter((temple) => {
        return temple.area > 90000;
    });

    displayTemples(largeTemples);
}

function showSmallTemples() {
    const smallTemples = temples.filter((temple) => {
        return temple.area < 10000;
    });

    displayTemples(smallTemples);
}


/* -----------------------------
   Navigation
----------------------------- */

const navigationLinks = document.querySelectorAll("nav a");

function setActiveLink(activeLink) {
    navigationLinks.forEach((link) => {
        link.classList.remove("active");
    });

    activeLink.classList.add("active");
}

document.querySelector("#home").addEventListener("click", (event) => {
    event.preventDefault();
    showAllTemples();
    setActiveLink(event.currentTarget);
});

document.querySelector("#old").addEventListener("click", (event) => {
    event.preventDefault();
    showOldTemples();
    setActiveLink(event.currentTarget);
});

document.querySelector("#new").addEventListener("click", (event) => {
    event.preventDefault();
    showNewTemples();
    setActiveLink(event.currentTarget);
});

document.querySelector("#large").addEventListener("click", (event) => {
    event.preventDefault();
    showLargeTemples();
    setActiveLink(event.currentTarget);
});

document.querySelector("#small").addEventListener("click", (event) => {
    event.preventDefault();
    showSmallTemples();
    setActiveLink(event.currentTarget);
});




const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuButton.textContent = "✕";
        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }
});




showAllTemples();


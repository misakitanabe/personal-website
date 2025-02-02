import { attachShadow } from "./utils.mjs";

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        h1 {
            color: var(--color-accent);
            font-family: var(--font-family-header);
            font-size: 2.5rem;
            margin: 0;
        }

        a {
            color: var(--color-link);
            text-decoration: none;
        }

        .nav-bar {
            display: grid;
            grid-template-columns: 4fr 1fr;
            align-items: center;         
            background-color: var(--color-background-header);
            list-style-type: none;
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .nav-links {
            display: none;
            flex-direction: column;
            grid-column: 1 / 2;
            gap: 0.5rem;
        }

        #menu {
            width: 4rem;
            height: 2rem;
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            justify-self: end;
            background-color: var(--color-accent);
            color: white;
            font-family: var(--font-family-header);
            border-radius: 1rem;
        }

        /* desktop styles */
        @media screen and (min-width: 800px) {
            .nav-bar {
                align-items: center;
                display: flex;
                flex-direction: row;
                gap: 2em;
            }

            .nav-links {
                display: flex;
                flex-direction: row;
                gap: 1.5rem;
            }

            #menu {
                display: none;
            }
        }
    </style>

    <nav class="nav-bar">
        <h1 class="header-text"><b>Misaki Tanabe</b></h1>
        <button id="menu">Menu</button>
        <div class="nav-links">
            <a href="/index.html">Home</a>
            <a href="/cooking.html">Cooking</a>
            <a href="https://github.com/misakitanabe" target="_blank">Projects</a>
        </div>
    </nav>
`;

class NavBar extends HTMLElement {
    connectedCallback() {
        const shadowRoot = attachShadow(this, TEMPLATE);
        const links = shadowRoot.querySelectorAll("a");
        const currentURL = window.location.href;

        // bolden and underline the link of current page on nav bar
        for (let i = 0; i < links.length; i++) {
            if (currentURL == links[i].href) {
                links[i].style.fontWeight = "700";
                links[i].style.textDecoration = "underline";
            }
        }

        // event listener for toggling menu on menu button
        const menu = shadowRoot.querySelector("#menu");
        menu.onclick = () => {
            const navLinks = shadowRoot.querySelector(".nav-links");
            if (window.getComputedStyle(navLinks).display == "flex") {
                navLinks.style.display = "none";
            } else {
                navLinks.style.display = "flex";
            }
        }

        // event listener for closing menu when clicking outside of nav bar
        document.body.onclick = (e) => {
            const viewportWidth = window.innerWidth;

            // if viewport is mobile sized and event target is not .nav-bar or doesn't have .nav-bar as a parent, hide the menu
            if (viewportWidth < 800 && !e.target.closest("nav-bar")) {
                console.log("Click detected outside nav bar, hiding menu if open...");
                const navLinks = shadowRoot.querySelector(".nav-links");
                navLinks.style.display = "none";
            }
        };

        // event listener for always displaying links for desktop sizes
        let lastWidth = window.innerWidth;
        window.onresize = () => {
            const newWidth = window.innerWidth;
            const navLinks = shadowRoot.querySelector(".nav-links");

            if (lastWidth < 800 && newWidth >= 800) {
                navLinks.style.display = "flex";
            } else if (lastWidth >= 800 && newWidth < 800) {
                navLinks.style.display = "none";
            }
            lastWidth = newWidth;
        }
    }
}

customElements.define("nav-bar", NavBar);

import { toHtmlElement } from "./makeHtml.mjs"

const currentURL = window.location.href;
console.log(currentURL);

function createNav() {
    let navString = `<nav class="nav-bar">
                        <h1 class="header-text"><b>Misaki Tanabe</b></h1>
                        <a href="index.html">Home</a>
                        <a href="cooking.html">Cooking</a>
                        <a href="https://github.com/misakitanabe" target="_blank">Projects</a>
                    </nav>`

    return toHtmlElement(navString);
}

window.addEventListener("load", () => { // Create a function on the fly
    // Code in this function will run once the page is done loading
    // const bodies = document.getElementsByTagName("body");
    const navBar = createNav();
    document.body.prepend(navBar);

    // console.log("bodies: ", bodies);

    // bodies[0].prepend(navBar);

    // adds navbar to all body elements
    // for (body in bodies) {
    //     body.prepend(navBar);
    // }
});


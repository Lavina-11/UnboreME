let buttons = document.querySelectorAll(".btn-value")
let cards = document.querySelectorAll(".card")
let products = document.querySelectorAll(".product")
let searchInput = document.getElementById("search-input").value
let elements = document.querySelectorAll(".product-name")

document.getElementById("search").addEventListener("click", () => {
    elements.forEach((element, index) => {
        if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
            products[index].classList.remove("d-none")
        } else {
            products[index].classList.add("d-none")
        }
    })
})


function filter(value) {
    buttons.forEach((button) => {
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active")
        } else {
            button.classList.remove("active")
        }
    })

    products.forEach((product) => {
        if (value == "All") {
            product.classList.remove("d-none")
        } else {
            if (product.classList.contains(value)) {
                product.classList.remove("d-none")
            } else {
                product.classList.add("d-none")
            }
        }
    })
}
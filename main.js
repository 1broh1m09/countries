let boxes = document.getElementById('boxes')
let API = "https://restcountries.com/v3.1/all?fields=name,cca2,flags,region,population,capital"
let allCountries = []

fetch(API)
    .then(res => res.json())
    .then(data => {
        allCountries = data
        renderCountries(allCountries)
    })

function renderCountries(countries) {
    boxes.innerHTML = ""
    countries.map((item) => {
        boxes.innerHTML += `
        <div id="box" class="box">
            <img class="flag" src="${item.flags.png}" alt="">
            <p class="boxtext">${item.name.common}</p>
            <p class="region">Region: ${item.region}</p>
        </div>
        `
    })
}

let dark_btn = document.getElementById('dark')
let light_btn = document.getElementById('light')
let body = document.getElementById('body')
let header = document.getElementById('header')
let title = document.getElementById('title')
let searchput = document.getElementById('searchput')
let selection = document.getElementById("selection")

dark_btn.addEventListener("click", () => {
    body.style.background = "black"
    header.style.background = "black"
    dark_btn.style.color = "white"
    light_btn.style.color = "white"
    title.style.color = "white"
})

light_btn.addEventListener("click", () => {
    body.style.background = "white"
    header.style.background = "white"
    dark_btn.style.color = "black"
    light_btn.style.color = "black"
    title.style.color = "black"
})

function filterCountries() {
    let keyword = searchput.value.toLowerCase()
    let selectedType = selection.value.toLowerCase()

    let filtered = allCountries.filter((country) => {
        let filterName = country.name.common.toLowerCase().includes(keyword)
        // Agar tur bo‘lsa (masalan region yoki boshqa maydon)
        let filterType = selectedType === "" || (country.region && country.region.toLowerCase().includes(selectedType))
        return filterName && filterType
    })

    renderCountries(filtered)
}

searchput.addEventListener("input", filterCountries)
selection.addEventListener("change", filterCountries)

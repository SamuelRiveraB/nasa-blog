const resultsNav = document.getElementById('resultsNav')
const favoritesNav = document.getElementById('favoritesNav')
const imagesContainer = document.querySelector('.images-container')
const saveConfirm = document.querySelector('.save-confirmed')
const loader = document.querySelector('.loader')

const count = 2
const apiKey = 'DEMO_KEY'
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

let resultsArray = []
let favorites = {}

function updateDOM() {
    resultsArray.forEach((res) => {
        const card = document.createElement('div')
        card.classList.add('card')
        const anchor = document.createElement('a')
        anchor.href = res.hdurl
        anchor.title = 'View Full Image'
        anchor.target = '_blank'
        const image = document.createElement('img')
        image.classList.add('card-img-top')
        image.src = res.url
        image.alt = 'NASA Picture of the Day'
        image.loading = 'lazy'
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        const cardTitle = document.createElement('h5')
        cardTitle.textContent = res.title
        const addBtn = document.createElement('p')
        addBtn.classList.add('clickable')
        addBtn.textContent = 'Add to Favorites'
        addBtn.setAttribute('onclick', `saveFavorite('${res.url}')`)
        const cardText = document.createElement('p')
        cardText.classList.add('card-text')
        cardText.textContent = res.explanation
        const footer = document.createElement('small')
        footer.classList.add('text-muted')
        const date = document.createElement('strong')
        date.textContent = res.date
        const copyrightResult = res.copyright === undefined ? '': res.copyright
        const copyright = document.createElement('span')
        copyright.textContent = ` ${copyrightResult}`

        footer.append(date, copyright)
        cardBody.append(cardTitle, addBtn, cardText, footer)
        anchor.appendChild(image)
        card.append(anchor, cardBody)
        imagesContainer.appendChild(card)
    })
}

async function getPictures() {
    try {
        const response = await fetch(apiURL)
        resultsArray = await response.json()
        updateDOM()
    } catch (error) {
        console.log('Error: ', error)
    }
}

function saveFavorite(itemUrl) {
    resultsArray.forEach((item) => {
        if(item.url.includes(itemUrl) && !favorites[itemUrl]) {
            favorites[itemUrl] = item
            saveConfirm.hidden = false
            setTimeout(() => {
                saveConfirm.hidden = true
            }, 2000)
            localStorage.setItem('NASAFavorites', JSON.stringify(favorites))
        }
    })
}

// getPictures()
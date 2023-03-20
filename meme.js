import { catsData } from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

// Event Listeners

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

// Highlist Checked Option

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (const radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

// Close Modal 

function closeModal() {
    memeModal.style.display = 'none'
}

// Render Cat 

function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
    <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
    >`

    memeModal.style.display = 'flex'
    
}

// Single Cat Object 

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1) {
        return catsArray[0];
    } else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
           return catsArray[randomNumber]
    }
}

// Get Matching Cats Array

 
function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        const matchingCatsArray = catsData.filter(function (cat) {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            } 
        })

        return matchingCatsArray
    }    
}

// Get Emotions Array 

function getEmotionsArray(cats){
    const emotionsArray = []
    for (const cat of cats) {
        for (const emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion) 
            } 
        }
    }

    return emotionsArray
}

// Render Emotions Radios

function renderEmotionsRadios(cats){
    let radioItems = ""
    const emotions =  getEmotionsArray(cats)
        for (const emotion of emotions) {
            radioItems += `

            <div class="radio">
                <label for="${emotion}">${emotion}</label>
                <input 
                    type="radio" 
                    name="emotions" 
                    id="${emotion}" 
                    value="${emotion}"
                    >
            </div>
          
            `
        }

        emotionRadios.innerHTML = radioItems
 }
    
 renderEmotionsRadios(catsData)
    
    
    

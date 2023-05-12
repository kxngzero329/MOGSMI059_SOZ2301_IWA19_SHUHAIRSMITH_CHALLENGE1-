// used the import function from data.js
import { books, authors, genres } from "./data.js";

// defined the variables
const matches = books;
let page = 1;
let range = books.length;

//change the themes
//define the two theme objects
const day = {
  dark: '10, 10, 20', // dark color for day theme
  light: '255, 255, 255', // light color for day theme
};
const night = {
  dark: '255, 255, 255', //same applies here
  light: '10, 10, 20', 
};
// select elements from the DOM
const dataSettingsTheme = document.querySelector('[data-settings-theme]') // selects the input element that allows the user to change themes
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary") // selects the save button that saves the user's theme selection
// add event listener to the save button
saveButton.addEventListener('click', (event) => {
  event.preventDefault() // prevent the default behavior of the save button (i.e., submitting a form)

  if (dataSettingsTheme.value === 'day') { // if the user selects the day theme
    // set the dark and light colors for the body element
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    if (typeof appOverlays !== 'undefined') { // if the appOverlays object is defined
      appOverlays.settingsOverlay.close() // close the settings overlay
    }
  }
  if (dataSettingsTheme.value === 'night') { // if the user selects the night theme
    // set the dark and light colors for the body element
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    if (typeof appOverlays !== 'undefined') { // if the appOverlays object is defined
      appOverlays.settingsOverlay.close() // close the settings overlay
    }
  }
})

//Create a new document fragment called "fragment"
const fragment = document.createDocumentFragment()

// assigned new variables
//Set the starting and ending indices for a slice of the "books" array 
//Extract the slice of books using the "slice" method and assign it to the "extracted" variable

//Preview
let startIndex = 0;
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex)

//Book List
//layout for HTML 36 first books
//Loop through each book in the "extracted" array using a "for" loop
for (let i = 0; i < extracted.length; i++) {
//For each book, create a new "dl" element called "preview" and assign it various data attributes based on the book's properties
  const preview = document.createElement('dl')
  preview.className = 'preview'
  preview.dataset.id = books[i].id
  preview.dataset.title = books[i].title
  preview.dataset.image = books[i].image
  preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
  preview.dataset.description = books[i].description
  preview.dataset.genre = books[i].genres
  //Set the "innerHTML" of the "preview" element to a string of HTML code that includes an image, the book title, and author name
  //Template literal(using backticks)
  preview.innerHTML = /*html*/`
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`
  // add preview element to the document fragment
  //This will display all the book previews.
  fragment.appendChild(preview)
};


//Settings(when clicking the theme button)
// Select the settings button HTML element with the data attribute "data-header-settings"
// Add an event listener to the settings button that will display the settings overlay when clicked
const settingButton = document.querySelector("[data-header-settings]")
settingButton.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
})

//code to display book details on preview pop up
//defines a function detailsToggle that is used to display more details about an item in a list when the item is clicked
const detailsToggle = (event) => {// event parameter
  const overlay1 = document.querySelector('[data-list-active]');
  //The function starts by selecting various elements from the HTML document
  const title = document.querySelector('[data-list-title]')
  const subtitle = document.querySelector('[data-list-subtitle]')
  const description = document.querySelector('[data-list-description]')
  const image1 = document.querySelector('[data-list-image]')
  const imageBlur = document.querySelector('[data-list-blur]')
  event.target.dataset.id ? overlay1.style.display = "block" : undefined;//The first line checks if the event.target has a data-id attribute. If it does, then it sets the display CSS property of an element with an ID of overlay1 to "block". If it does not have a data-id attribute, it does nothing.
  event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
  event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
  event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
  event.target.dataset.image ? image1.setAttribute('src', event.target.dataset.image) : undefined;
  event.target.dataset.image ? imageBlur.setAttribute('src', event.target.dataset.image) : undefined;
};

//Close preview pop up
const detailsClose = document.querySelector('[data-list-close]')
detailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})

// search (Author)

const bookClick = document.querySelector('[data-list-items]');
bookClick.addEventListener('click', detailsToggle);
const allAuthorsOption = document.createElement('option'); // create a new option element
allAuthorsOption.value = 'any';
allAuthorsOption.textContent = 'All authors'; // use textContent instead of innerText
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.appendChild(allAuthorsOption); // add the new option element to the select
for (const authorId in authors) {
  const optionElement = document.createElement('option');
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

// Search for all Genre
// data-search-authors.appendChild(authors)
const genreSelect = document.querySelector("[data-search-genres]");
const allGenresOption = document.createElement('option');
allGenresOption.value = 'any';
allGenresOption.innerText = 'All Genres';
genreSelect.appendChild(allGenresOption);
for (const [genreId, genreName] of Object.entries(genres)) {
  const optionElement = document.createElement('option');
  optionElement.value = genreId;
  optionElement.textContent = genreName;
//  console.log( optionElement.value +' '+ optionElement.textContent)
  genreSelect.appendChild(optionElement)
}

//cancel button inside search
// Select the cancel button HTML element with the data attribute "data-search-cancel"
// Add an event listener to the cancel button that will hide the search overlay when clicked
const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
})

// show more
// Select the HTML element with the data attribute "data-list-items"
const bookList1 = document.querySelector('[data-list-items]');
// Append the "fragment" to the selected HTML element
bookList1.appendChild(fragment)
// Select the search button HTML element with the data attribute "data-header-search"
//// Add an event listener to the search button that will display the search overlay when clicked
const searchButton = document.querySelector("[data-header-search]");
searchButton.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
})
// Update the text of the "Show More" button to display how many more items will be displayed
const showMoreButton = document.querySelector('[data-list-button]')
const numItemsToShow = Math.min(books.length - endIndex,)
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
showMoreButton.innerHTML = showMoreButtonText;
showMoreButton.addEventListener('click', () => {
  const fragment = document.createDocumentFragment()
  startIndex += 36;
  endIndex += 36;
  const startIndex1 = startIndex
  const endIndex1 = endIndex
  const extracted = books.slice(startIndex1, endIndex1)

  for (const { author, image, title, id, description, published } of extracted) {
    const preview = document.createElement('dl')
    preview.className = 'preview'
    preview.dataset.id = id
    preview.dataset.title = title
    preview.dataset.image = image
    preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
    preview.dataset.description = description
    
// template literal for show more
    // preview.dataset.genre = genres
    preview.innerHTML = /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
    fragment.appendChild(preview)
  }
  const bookList1 = document.querySelector('[data-list-items]')
  bookList1.appendChild(fragment)
  // Update the text of the "Show More" button to display how many more items will be displayed
  const numItemsToShow = Math.min(books.length - endIndex,)
  const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`
  showMoreButton.innerHTML = showMoreButtonText;
})
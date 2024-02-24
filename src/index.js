import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");

async function populateBreedsSelect() {
  try {
    const breeds = await fetchBreeds();
    // breeds.forEach(breed => {
    //   const option = document.createElement("option");
    //   option.value = breed.id;
    //   option.textContent = breed.name;
    //   breedSelect.appendChild(option);
    // });
    console.log(breeds);
   
    const breedList = breeds.map( raza => { return {text:raza.name, value:raza.id}
    })

    new SlimSelect({
      select: '.breed-select',
      data: breedList
    })

    breedSelect.removeAttribute("disabled");
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
}

async function showCatInfo(breedId) {
  try {
    const data = await fetchCatByBreed(breedId);
    const cat = data[0].breeds[0];
    catInfo.innerHTML = `
      <h2>${cat.name}</h2>
      <p><strong>Description:</strong> ${cat.description}</p>
      <p><strong>Temperament:</strong> ${cat.temperament}</p>
      <img src="${data[0].url}" alt="${cat.name}" style="max-width: 300px;">
    `;
    catInfo.style.display = "block";
  } catch (error) {
    showError();
  } finally {
    hideLoader();
  }
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  Notiflix.Notify("Oops! Something went wrong! Try reloading the page!")
}



breedSelect.addEventListener("change", async function() {
  const breedId = this.value;
  showLoader();
  catInfo.style.display = "none";
  await showCatInfo(breedId);
});

document.addEventListener("DOMContentLoaded", async () => {
  showLoader();
  breedSelect.setAttribute("disabled", "disabled");
  await populateBreedsSelect();
});

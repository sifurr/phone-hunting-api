const loadPhone = async (searchText='13', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  // 1 get the div
  const phoneContainer = document.getElementById("phone-container");
  // show all containers
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  } else {
    showAllContainer.classList.add('hidden');
  }

  // console.log("is show all: ", isShowAll);

  if (!isShowAll) {
    // display only first 12 phones
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    // 2 create a div element
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    //3 set inner html
    phoneCard.innerHTML = `
      <figure>
        <img src="${phone.image}" alt="iphone" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onclick="handleShowDetails('${phone.slug}')" 
          class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `;
    // 4. append the phoneCard in the phoneContainer
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle show details
const handleShowDetails = async (id) =>{
  // console.log('show details clicked', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  // console.log(data);
  const phone = data.data;
  // console.log(phone);
  showPhoneDetails(phone);
}

// show phone details
const showPhoneDetails = (phone) =>{
  // console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
  <img src="${phone.image}" alt="">  
  <p><span>Brand: </span>${phone?.brand}</p>
  <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
  <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
  <p><span>GPS: </span>${phone?.others?.GPS}</p>
  <p><span>Release Date: </span>${phone?.releaseDate}</p>
  <p><span>Slug: </span>${phone?.slug}</p>
  `;
  // show modal
  show_modal_details.showModal();
}

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // searchField.value = "";
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
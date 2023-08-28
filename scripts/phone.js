const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // console.log(phones);
  // 1 get the div
  const phoneContainer = document.getElementById("phone-container");
  // clear the container after a search
//   phoneContainer.textContent = '';

    // show all containers
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }
  // display only first 10 phones
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    console.log(phone);
    // 2 create a div element
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
    //3 set inner html
    phoneCard.innerHTML = `
        <figure>
        <img
          src="${phone.image}"
          alt="iphone"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
    // 4. append the phoneCard in the phoneContainer
    phoneContainer.appendChild(phoneCard);
  });
};

// handle search button
const handleSearch = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    console.log(searchText);
    loadPhone(searchText)
}

// loadPhone();

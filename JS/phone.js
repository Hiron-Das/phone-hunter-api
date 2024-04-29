const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(data.data);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //1. get the phone container 
    const phoneContainer = document.getElementById('phone-container');
    // clear phoneContainer after executing a new search
    phoneContainer.innerHTML = '';

    //show all button if the phones length is greater than 12
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 photos if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone)
        //2. create a element
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        // 3. set innerHtml to created div
        phoneCard.innerHTML = `
        <figure class="p-4"><img src="${phone.image}"
                            alt="Phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>You can buy any type of mobile phones from US!</p>
            <div class="card-actions justify-end">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // 4. append the created element to phone container
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

// handle show details button
const handleShowDetail = async (id) => {
    console.log('clicked show details!', id)
    // load data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    const showDetailPhoneName = document.getElementById('show-detail-phone-name');
    showDetailPhoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}"alt="Phone" />
    <br>
    <p><span class="text-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="text-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="text-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="text-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="text-bold">Slug: </span>${phone?.slug}</p>
    <p><span class="text-bold">Release Date: </span>${phone?.releaseDate}</p>
    <p><span class="text-bold">Brand: </span>${phone?.brand}</p>
    <p><span class="text-bold">GPS: </span>${phone?.others?.GPS || 'No GPS available'}</p>
    `

    console.log(phone)
    // display the modal
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    // get search input
    const searchField = document.getElementById('search-field')
    // get the search input value
    const searchText = searchField.value;
    // console.log(searchText);
    // pass the search value to API as a function call-back for load the data to UI
    loadPhone(searchText, isShowAll);
    // empty the search field after searching
    // searchField.value = '';
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all button
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();

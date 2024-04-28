const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(data.data);
    displayPhones(phones);
}

const displayPhones = phones => {
    //1. get the phone container 
    const phoneContainer = document.getElementById('phone-container');
    // clear phoneContainer after executing a new search
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        console.log(phone)
        //2. create a element
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        // 3. set innerHtml to created div
        phoneCard.innerHTML = `
        <figure class="p-4"><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        // 4. append the created element to phone container
        phoneContainer.appendChild(phoneCard);
    })
}

// handle search button
const handleSearch = () => {
    // get search input
    const searchField = document.getElementById('search-field')
    // get the search input value
    const searchText = searchField.value;
    console.log(searchText);
    // pass the search value to API as a function call-back for load the data to UI
    loadPhone(searchText);
    // empty the search field after searching
    searchField.value = '';
}

// loadPhone();
// sort data 
const sortData = () => {

}


// loadData from API server 
const loadData = async () => {

    try {
        const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await res.json();
        showCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}
loadData();

// new menu 
const showCategory = async (AllMenu) => {
    const newsMenuField = document.getElementById('news-menu');
    AllMenu.forEach(menu => {
        const newsMenuDiv = document.createElement('div');
        newsMenuDiv.classList.add('col');
        newsMenuDiv.classList.add('py-3');
        newsMenuDiv.innerHTML =
            `
        <h6 class="btn border-0 fw-semibold"  onclick="countCategories('${menu.category_id}')" >${menu.category_name ? menu.category_name : "No Name"}</h6>
        `
        newsMenuField.appendChild(newsMenuDiv);
    });

}

// spinner part 
const sppinerLoad = (isLoading) => {
    const sppinerField = document.getElementById('spinnerId');
    if (isLoading === true) {
        sppinerField.classList.remove('d-none')
    }
    else {
        sppinerField.classList.add('d-none')
    }
}

// create a function for count 
const countCategories = async (id) => {
    sppinerLoad(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        const len = (data.data.length);
        const countInfo = document.getElementById('count-Info');
        countInfo.innerText =
            `
        ${len} items found for this category...
        `;
        displayNews(data);
    }
    catch (error) {
        console.log(error);
    }
}
// display the news in card 
const displayNews = (data) => {
    const displayField = document.getElementById('display-news');
    displayField.innerHTML = '';
    const Allnews = data.data;
    const questionField = document.getElementById('questions-field');
    questionField.classList.add('d-none')
    sppinerLoad(false);

    // check the length and show the notification data available or not
    const notFound = document.getElementById('not-found');
    if (Allnews.length === 0) {
        notFound.classList.remove('d-none');
        return;
    }
    else {
        notFound.classList.add('d-none');
    }
    // sort all the arroy according the view numbers
    const newarr = Allnews.sort(function (a, b) {
        return b.total_view - a.total_view
    });

    Allnews.forEach(news => {
        const { _id, total_view, title, image_url, details } = news;
        const { name, published_date, img } = news.author;
        const cardField = document.createElement('div');
        cardField.innerHTML =
            `
        <div onclick="showModel('${_id}')" class="card my-5 w-100 " data-bs-toggle="modal" data-bs-target="#newsInModal">
            <div class="row g-0 p-3">
                <div class="col-md-4 rounded">
                    <img src="${image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${title}</h5>
                        <p class="card-text">${details.length > 350 ? details.slice(0, 350) + '...' : details}
                        </p>
                        <div class="container text-center">
                            <div class="row">
                                <div class="col-4">
                                    <div class="row text-center">
                                        <div class="col-4 text-start"><img class="rounded-circle w-75 h-75" src="${img ? img : "img Not Found"}<" alt=""></div>
                                        <div class="col-8" style="margin-left: -30px;">
                                            <h6 class="mb-0">${name ? name : 'Name Not Found'}</h6>
                                            <p class="fs-6 mb-0">${published_date ? published_date : 'Date Not Found'}</p>
                                        </div>   
                                    </div>
                                </div>
                                <div class="col">${total_view ? total_view + "k" : "Data Not Found"}</div>
                                <div class="col d-lg-block d-sm-none d-xs-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-star-fill text-warning" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-star text-warning" viewBox="0 0 16 16">
                                <path
                                    d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                            </svg>
                                </div>
                                <div class="col text-end">
                                <img src="https://cdn.onlinewebfonts.com/svg/img_96682.png" class="w-25 h-25" alt="...">
                                <i class="fa-solid fa-arrow-right-from-arc"></i>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        `
        displayField.appendChild(cardField);
    })
}

// show the news details in modal 
const showModel = async (news_id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`);
        const data = await res.json();
        modalDatadfd(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}
const modalDatadfd = (modalData) => {
    const questionField = document.getElementById('questions-field');
    questionField.classList.add('d-none')
    const { title, total_view, image_url, details } = modalData;
    const { name, published_date, img } = modalData.author;
    const modalTitle = document.getElementById('newsInModalLabel');
    modalTitle.innerText = `${modalData.title}`
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML =
        `
        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
        <p class="card-text">${details.length > 350 ? details.slice(0, 350) + '...' : details}
                        </p>
        <div class="d-flex flex-row mb-3">
            <div class="p-2 ">
                <div class="d-flex flex-column">
                    <div class="h-50 w-50">
                        <img class="rounded-circle w-25 h-25" src="${img ? img : "Data Not Available"}<" alt="">
                    </div>
                     <div class="ps-2">${name ? name : "Data Not Available"}</div>
                </div>    
            </div>
            <div class="p-2 d-flex align-items-center">
            ${total_view ? total_view + 'K' : "Data Not Available"}
            </div>
        </div>
        `
    const published = document.getElementById('data');
    published.innerText =
        `${published_date ? published_date : "Data Not Available"}`
}

const showQuestionsAns = () => {
    const questionField = document.getElementById('questions-field');
    questionField.classList.remove('d-none')
}




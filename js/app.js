//<--------------- loadData from API server and check the error by using error handler --------->
const loadData = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await res.json();
        showCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

//<------- call the loadData function to show all news categories as a menubar ---------->
loadData();

// <------------------show all news categories as a menubar----------------> 
const showCategory = async (AllMenu) => {
    const newsMenuField = document.getElementById('news-menu');
    AllMenu.forEach(menu => {
        const newsMenuDiv = document.createElement('div');
        newsMenuDiv.classList.add('col');
        newsMenuDiv.classList.add('py-3');
        newsMenuDiv.innerHTML =
            `
        <h6 class="btn border-0 fw-semibold"  onclick="countCategories('${menu.category_id}','${menu.category_name}')" >${menu.category_name ? menu.category_name : "No Name"}</h6>
        `
        newsMenuField.appendChild(newsMenuDiv);
    });
}

//<------------- create a function to show the spinner when its needed ----------->
const sppinerLoad = (isLoading) => {
    const sppinerField = document.getElementById('spinnerId');
    if (isLoading === true) {
        sppinerField.classList.remove('d-none')
    }
    else {
        sppinerField.classList.add('d-none')
    }
}


//<-----create a function for count the news and collect the data from API server and use error handler to check erro---->
const countCategories = async (id, name) => {
    sppinerLoad(true);
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        const len = (data.data.length);
        const countInfoField = document.getElementById('count-Info');
        countInfoField.innerHTML = '';
        const countInfo = document.createElement('h4');
        countInfo.classList.add('p-3');
        countInfo.innerHTML =
            `
        <span class="text-sprimary">${len}</span> items found for this <span class="text-info" >${name}</span> category...
        `;
        countInfoField.appendChild(countInfo);
        displayNews(data);
    }
    catch (error) {
        console.log(error);
    }
}

//<------------ call the function to show the all news in initial period-------------> 
countCategories("08", 'All News');

//<-------- start the process to display the infomation about a news in a card and hide the blog section--------->
const displayNews = (data) => {
    const displayField = document.getElementById('display-news');
    displayField.innerHTML = '';
    const Allnews = data.data;
    const questionField = document.getElementById('questions-field');
    questionField.classList.add('d-none')
    sppinerLoad(false);

    // <----------check the length and show the notification data available or not------->
    const notFound = document.getElementById('not-found');
    if (Allnews.length === 0) {
        notFound.classList.remove('d-none');
        return;
    }
    else {
        notFound.classList.add('d-none');
    }

    // <---------sort all the objects in arroy according the viewer amount--------->
    const newarr = Allnews.sort(function (a, b) {
        return b.total_view - a.total_view
    });

    // <---------- collect the particular data from API server and display each data in each card --------->
    Allnews.forEach(news => {
        const { _id, total_view, title, image_url, thumbnail_url, details } = news;
        const { name, published_date, img } = news.author;
        const cardField = document.createElement('div');
        cardField.innerHTML =
            `
        <div onclick="showModel('${_id}')" class="card my-5 w-100 " data-bs-toggle="modal" data-bs-target="#newsInModal">
            <div class="row g-0 p-3" style="background-color: rgb(252, 222, 227)">
                <div class="col-md-4 rounded">
                    <img src="${image_url ? image_url : "Data Not Available"}" class="img-fluid h-100 w-full rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${title ? title : "Data Not Available"}</h5>
                        <p class="card-text fw-semibold">${details.length > 350 ? details.slice(0, 350) + '...' : details}
                            </p>
                        <div class="container ">
                            <div class="row ">
                                <div class="col-md-6 col-lg-4 ">
                                    <div class="row text-center ">
                                        <div class="col-4 text-start "><img class="rounded-circle w-75 h-75" src="${img ? img : "Date Not Available"}<" alt=""></div>
                                        <div class="col-8" style="margin-left: -30px;">
                                            <h6 class="mb-0">${name ? name : 'Date Not Available'}</h6>
                                            <p class="fs-6 mb-0">${published_date ? published_date : 'Date Not Available'}</p>
                                        </div>   
                                    </div>
                                </div>
                                <div class="col"><i class="fa-solid fa-eye pe-2"></i>${total_view ? total_view + "k" : "Data Not Available"}</div>
                                <div class="col">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star-half-stroke"></i>
                                </div> 
                                <div class="col">
                                    <i class="fa-solid fa-arrow-right-long"></i>
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

// <------collection of data from API server to provide in modal and check the error handler-------> 
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

// <---------------show the details information in a modal-----------------> 
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
        <img src="${image_url ? image_url : "Data Not Available"}" class="img-fluid rounded-start" alt="...">
        <p class="card-text fw-semibold">${details.length > 350 ? details.slice(0, 350) + '...' : details}
                        </p>
        <div class="d-flex flex-row mb-3">
            <div class="p-2 ">
                <div class="d-flex flex-column">
                    <div class="h-50 w-50">
                        <img class="rounded-circle w-25 h-25" src="${img ? img : "Data Not Available"}<" alt="">
                    </div>
                     <div class="">${name ? name : "Data Not Available"}</div>
                </div>    
            </div>
            
            <div class="p-2 d-flex align-items-center">
            <i class="fa-solid fa-eye pe-2"></i>
            ${total_view ? total_view + 'K' : "Data Not Available"}
            </div>
        </div>
        `
    const published = document.getElementById('data');
    published.innerText =
        `${published_date ? published_date : "Data Not Available"}`
}


// <----------conditional visibility of different questionnaire part----------->
const showQuestionsAns = () => {
    const questionField = document.getElementById('questions-field');
    questionField.classList.remove('d-none')
}




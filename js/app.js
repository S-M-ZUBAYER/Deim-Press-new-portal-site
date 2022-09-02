
// loadData from API server 
const loadData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    showCategory(data.data.news_category);
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
        <h6 onclick="countCategories('${menu.category_id}')" >${menu.category_name ? menu.category_name : "No Name"}</h6>
        `
        newsMenuField.appendChild(newsMenuDiv);
    });

}

// create a function for count 
const countCategories = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    const len = (data.data.length);
    const countInfo = document.getElementById('count-Info');
    countInfo.innerText =
        `
    ${len} items found for this category...
    `;

    // display the news in card 
    const displayField = document.getElementById('display-news');
    displayField.innerHTML = '';
    const Allnews = data.data;
    Allnews.forEach(news => {
        const { total_view, title, image_url, details } = news;
        const { name, published_date, img } = news.author
        console.log(total_view, title, image_url, details)
        const cardField = document.createElement('div');
        cardField.innerHTML =
            `
            <div class="card my-5 w-100">
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
                                <div class="col">${total_view ? total_view : "Data Not Found"}</div>
                                <div class="col">
                                
                                </div>
                                <div class="col">col</div>
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




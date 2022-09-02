
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
        <h6>${menu.category_name ? menu.category_name : "No Name"}</h6>
        `
        newsMenuField.appendChild(newsMenuDiv);
    });

}


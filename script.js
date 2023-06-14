const api="6dc2abbe8e224dd29cf841128e9224dc";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("India"));


async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${api}`)
    const  data=await res.json();
    bindData(data.articles);


}

function bindData(articles){
    const cardContainer=document.getElementById('cards-container');
    const newsTemp=document.getElementById('news-card');
    cardContainer.innerHTML='';

    articles.forEach(element => {
        if(!element.urlToImage)return;
        const cardClone=newsTemp.content.cloneNode(true);
        fillDataInCard(cardClone,element)
        cardContainer.appendChild(cardClone);
    });
}



//making of the function filldatain cards
function fillDataInCard(cardClone,element){
    const newsImage=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDisc=cardClone.querySelector('#news-disc');

    //now put the src in the const query selectors 
    newsImage.src=element.urlToImage;
    newsTitle.innerHTML=element.title;
    newsDisc.innerHTML=element.description;

    const date=new Date(element.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${element.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(element.url,"_blank");
    })




}



let currSelectedItem=null;
function onNavClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currSelectedItem?.classList.remove('active');
    currSelectedItem=navItem;
    currSelectedItem.classList.add('active');
}



const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('searchText');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    currSelectedItem.classList.remove('active');
    currSelectedItem=null;
})
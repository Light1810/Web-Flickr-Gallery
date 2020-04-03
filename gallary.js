const btnSearch = document.getElementById("btnSearch");
const divResult = document.getElementById("divResult");
btnSearch.addEventListener("click",getRepos);

async function getRepos(){
clear();
const searchKey= document.getElementById("key").value;
const baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s&tags="+ `${searchKey}`
// params = {method:"flickr.photos.search" , per_page:10 , page:1 , api_key: "6f102c62f41998d151e5a1b48713cf13" , format: "json" , noJsonCallback :1 , extra : "url_s" , "text":searchKey}
// Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]))

// console.log(baseUrl);
console.log(searchKey);


try {
    const response =await fetch (baseUrl);
    try {
        const result = await response.json();
        result.photos.photo.forEach(element => {
            const img = document.createElement("img");
            img.src= element.url_s;
            img.className="resultImage";
        
             const anchor = document.createElement("a");
             anchor.href = element.url_s;
             anchor.id= element.id;
             anchor.target = "_blank";
        
             divResult.appendChild(anchor);
             anchor.appendChild(img);
            // divResult.appendChild(document.createElement("br"));
            
        });
        
    } catch (error) {
        console.log('json response failed', error);
    }
  }
  catch (err) {
    console.log('fetch failed', err);
  }

}


async function getDefault(){
    clear();
    const baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s";
    try {
        const response =await fetch (baseUrl);
        try {
            const result = await response.json();
            result.photos.photo.forEach(element => {
                const img = document.createElement("img");
                img.src= element.url_s;
                img.className="resultImage";
            
                 const anchor = document.createElement("a");
                 anchor.href = element.url_s;
                 anchor.id= element.id;
                 anchor.target = "_blank";
            
                 divResult.appendChild(anchor);
                 anchor.appendChild(img);

                
            });
            
        } catch (error) {
            console.log('json response failed', error);
        }
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    
    }

function clear(){
    while(divResult.firstChild)
    divResult.removeChild(divResult.firstChild);
}

getDefault();
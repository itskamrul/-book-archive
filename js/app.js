const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("search-btn");
const resultContainer = document.getElementById("result-container");
const errorHandler = document.getElementById("error");

searchButton.addEventListener('click', function(){
    const search = searchInput.value;
    // Input value empty error
    if(search === ""){
        errorHandler.innerText = "Search field cannot be empty."
        return
    }
    //Clear error and dom
    errorHandler.innerText = "";
    resultContainer.innerHTML = "";
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data.numFound);
        if (data.numFound === 0){
            errorHandler.innerText = "NO result fount"
        }
        else{
                    // console.log(data.docs)
        data.docs.forEach((item) => {
            // console.log(item);

            const div = document.createElement("div");
            div.classList.add("col-md-3");
            div.innerHTML =`
                    <div class="rounded overflow-hidden border">
                    <img src="https://restcountries.eu/data/umi.svg" class="img-fluid"  alt="" />
                    </div>

                    <div class="
                      py-2
                      d-flex
                      justify-content-between
                      align-items-center
                      d-md-block
                      text-md-center
                    ">
                        <h3>${item.title}</h3>
                        <h5>Author Name:${item.author_name}</h5>
                        <p>First publish:${item.first_publish_year}</p>
                    </div>
                `;
            resultContainer.appendChild(div);
            //Clear Input Value
            searchInput.value = "";
        })
        }

    });
});





/* const url = http://openlibrary.org/search.json?q=${searchText};
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs));
 */
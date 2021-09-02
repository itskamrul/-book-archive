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
    .then((data) =>displayData(data));
});

const displayData = (books) => {
    if (books.numFound === 0){
        errorHandler.innerText = "NO result fount"
    }
    else{
        // Total Found
        errorHandler.innerText = `Total found: ${(books.docs).length}`
        // Loop
        books.docs.forEach((book) => {
        console.log(book);

        const div = document.createElement("div");
        div.classList.add("col-md-3");
        div.innerHTML =`
                <div class="rounded overflow-hidden border">
                <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' class="img-fluid  mx-auto d-block"  alt="" />
                </div>

                <div class="
                  py-2
                  d-flex
                  justify-content-between
                  align-books-center
                  d-md-block
                  text-md-center
                ">
                    <h3>${book.title}</h3>
                    <h5>Author Name:${book.author_name}</h5>
                    <p>First publish:${book.first_publish_year}</p>
                </div>
            `;
        resultContainer.appendChild(div);
        //Clear Input Value
        searchInput.value = "";
    })
    };

};
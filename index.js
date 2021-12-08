//SELECTORS
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('author');
const bookYear = document.getElementById('year');

const submitButton = document.getElementById('submit');

const bookList = document.querySelector('.book-list');

const msg1 = document.getElementById('add');
const msg2 = document.getElementById('remove');



//EVENTS

submitButton.addEventListener('click',addBook);
bookList.addEventListener('click',deleteBook);
window.addEventListener('DOMContentLoaded',readLS);

//FUNCTIONS

function addBook(e)
{
    e.preventDefault();

   if(bookTitle.value!="" && bookYear.value!="" && bookAuthor.value!="")
   {

    addToLS();

    const newBook = document.createElement('div')
    ;
        newBook.classList.add('grid');
    
        const title = document.createElement('p');
        title.innerText = bookTitle.value;
    
        const author = document.createElement('p');
        author.innerText = bookAuthor.value;
    
        const year = document.createElement('p');
        year.innerText = bookYear.value;
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML="<i class='fas fa-trash'></i>";
        trashButton.classList.add('btn');
    
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(year);
        newBook.appendChild(trashButton);
    
        bookTitle.value = "";
        bookAuthor.value="";
        bookYear.value="";
    
        bookList.appendChild(newBook);


        

        msg1.style.display = "flex";
        setTimeout(()=>{
            msg1.style.display = "none";
        },1000);
    
        
   }


}

function addToLS()
{
    let title;
    let author;
    let year;

    if(localStorage.getItem('title') === null)
    {
        title = [];
        author = [];
        year = [];

    }
    else
    {
        title = JSON.parse(localStorage.getItem('title'));
        author = JSON.parse(localStorage.getItem('author'));
        year = JSON.parse(localStorage.getItem('year'));

    }
    title.push(bookTitle.value);
    author.push(bookAuthor.value);
    year.push(bookYear.value);

    localStorage.setItem('title',JSON.stringify(title));
    localStorage.setItem('author',JSON.stringify(author));
    localStorage.setItem('year',JSON.stringify(year));
}

function deleteBook(e)
{
    if(e.target.tagName == "BUTTON")
    {
        const par = e.target.parentElement;
        deleteFromLS(par.childNodes[0].innerText);
        msg2.style.display = "flex";
        setTimeout(()=>{
            msg2.style.display = "none";
        },1000)
        par.remove();
    }
}

function readLS()
{
    let all_title = JSON.parse(localStorage.getItem('title'));
    let all_author = JSON.parse(localStorage.getItem('author'));
    let all_year = JSON.parse(localStorage.getItem('year'));

    for(let i=0;i<all_title.length;i++)
    {
        const newBook = document.createElement('div')
        ;
            newBook.classList.add('grid');
        
            const title = document.createElement('p');
            title.innerText = all_title[i];
        
            const author = document.createElement('p');
            author.innerText = all_author[i];
        
            const year = document.createElement('p');
            year.innerText = all_year[i];
        
            const trashButton = document.createElement('button');
            trashButton.innerHTML="<i class='fas fa-trash'></i>";
            trashButton.classList.add('btn');
        
            newBook.appendChild(title);
            newBook.appendChild(author);
            newBook.appendChild(year);
            newBook.appendChild(trashButton);
        
        
            bookList.appendChild(newBook);
            
    }
}

function deleteFromLS(title)
{
    let all_title = JSON.parse(localStorage.getItem('title'));
    let all_author = JSON.parse(localStorage.getItem('author'));
    let all_year = JSON.parse(localStorage.getItem('year'));
    console.log(all_title);
    console.log(title);
    
    let idx = all_title.indexOf(title);
    

        all_title.splice(idx,1);
        all_author.splice(idx,1);
        all_year.splice(idx,1);
    

    all_title =JSON.stringify(all_title);
    all_author=JSON.stringify(all_author);
    all_year=JSON.stringify(all_year);

    localStorage.setItem('title',all_title);
    localStorage.setItem('author',all_author);
    localStorage.setItem('year',all_year);
}
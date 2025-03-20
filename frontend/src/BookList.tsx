import { useEffect, useState } from "react";
import { Book } from "./types/Book"; //imports from the Types file

function BookList(){

    //state variables
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortByTitle, setSortByTitle] = useState<boolean>(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortByTitleAsc=${sortByTitle}`); //pulling data from the backend
            const data= await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks); 
            setTotalPages(Math.ceil(totalItems / pageSize))
        };
        fetchBooks();
    },[pageSize, pageNum, totalItems, sortByTitle]) //dependencies that trigger an effect


    return(
        <>
        <h1>Book List</h1>
        <br/><br/>
        <button onClick={() => {
        setSortByTitle(prev => !prev);
        setPageNum(1); // Reset to first page when sorting changes
        }}>
        Sort by Title {sortByTitle ? "(Default)" : "(A-Z)"} 
        </button>
        <br/><br/>
        {books.map((b) =>   //arrow function to go through each of the books in the dataset
        <div id="bookCard" className = "card" key={b.bookID}>
            <h3 className="card-title">{b.title}</h3>
            <div className ="card-body">  
            <ul className="list-unstyled">
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li>
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Classification:</strong> {b.classification}</li>
                <li><strong>Category:</strong> {b.category}</li>
                <li><strong>Page Count:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> ${b.price}</li>
            </ul>
            </div>
            
            
        </div>
    
    )}
    <br/><br/>

    {/* Pagination for the buttons in between and the previous and next buttons */}

        <button disabled = {pageNum ===1} onClick={() => setPageNum(pageNum -1)}>Previous</button>

        {
            [...Array(totalPages)].map((_,index)=> (
                <button key={index +1} onClick={() => setPageNum(index +1)} disabled = {pageNum === (index+1)}> 
                    {index+1}
                </button>
            )
            )
        }

        <button disabled = {pageNum === totalPages} onClick={() => setPageNum(pageNum +1)}>Next</button>

        <br /><br/>
        {/* allows user to select how many books are displayed on each page */}
        <label> 
            Results per page: 
            <select value={pageSize} 
            onChange={(p)=> {
                setPageSize(Number(p.target.value));
                setPageNum(1);
            }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>
        </>

    );
}

export default BookList
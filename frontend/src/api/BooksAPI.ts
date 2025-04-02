import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = 'https://mission13-gouff.azurewebsites.net/api/Book';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[],
    sortByTitle: boolean,

): Promise<FetchBooksResponse> => {
    try{
        const categoryParams = selectedCategories
                .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
                .join("&");

            const response = await fetch(
                `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortByTitleAsc=${sortByTitle}${
                    selectedCategories.length ? `&${categoryParams}` : ""
                }`,
                {
                    credentials: "include",
                }
            ); 
            if (!response.ok){
                throw new Error('Failed to fetch projects');
            }
            // Pulling data from the backend
            return await response.json();
    }
    catch(error){ 
        console.error('Error fetching projects:', error);
        throw error
    }

};

export const addBook = async(newBook: Book): Promise<Book> => {
    try{
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok){
            throw new Error('Failed to add project');
        }

        return await response.json();
    }
    catch(error){
        console.error('error adding project', error);
        throw error;
    }
};

export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> =>{
    try{   
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook)
    });

    return await response.json();

    }
    catch(error){
        console.error('Error updating project:', error);
        throw error
    }
};

export const deleteBook = async (bookID: number): Promise<void> => {
    try{
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    }
    catch(error){
        console.error('Error deleting projet:', error);
        throw error;
    }
}
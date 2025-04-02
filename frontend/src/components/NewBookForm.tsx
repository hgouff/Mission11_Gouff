import { useState } from "react";
import { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        classification: "",
        category: "",
        pageCount: 0,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
            
            {[
                { label: "Title", name: "title", type: "text" },
                { label: "Author", name: "author", type: "text" },
                { label: "Publisher", name: "publisher", type: "text" },
                { label: "ISBN", name: "isbn", type: "text" },
                { label: "Classification", name: "classification", type: "text" },
                { label: "Category", name: "category", type: "text" },
                { label: "Page Count", name: "pageCount", type: "number", min: 1 },
                { label: "Price", name: "price", type: "number", min: 0, step: "0.01" }
            ].map(({ label, name, type, ...rest }) => (
                <div key={name} className="mb-3">
                    <label className="block text-sm font-medium mb-1">{label}:</label>
                    <input
                        type={type}
                        name={name}
                        value={formData[name as keyof Book]}
                        onChange={handleChange}
                        className="w-full border rounded-md p-2"
                        {...rest}
                    />
                </div>
            ))}

            <div className="flex gap-3 mt-4">
                <button 
                    style={{
                        backgroundColor: "#F0F8FF",
                        color: "black",
                        border: "1px solid #d1d5db",
                        transition: "background-color 0.3s ease",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0EFFB")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
                    type="submit" 
                    
                >
                    Add Book
                </button>
                <button 
                    style={{
                        backgroundColor: "#F0F8FF",
                        color: "black",
                        border: "1px solid #d1d5db",
                        transition: "background-color 0.3s ease",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E0EFFB")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#F0F8FF")}
                    type="button" 
                    onClick={onCancel} 
                    
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default NewBookForm;

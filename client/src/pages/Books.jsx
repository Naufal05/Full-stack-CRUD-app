import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../styles.css"
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try{
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data)

            } catch(err) {
                console.log(err)
            }
        }
        fetchAllBooks();
    }, []);

    // delete
    const handleDelete = async(id) => {
        try{
          await axios.delete(`http://localhost:8000/books/${id}`);
          //note the backticks to the api above
          window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    console.log(books);
  return (
    <div className='app'> 
     <h1>My Book store</h1>
    <div className="books">
    {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <button className="delete" onClick={()=>handleDelete(book.id)} >Delete</button>
            <button className="update">
             <Link to={`/update/${book.id}`}>
             Update

             </Link>
            </button>
          </div>
        ))}
    
    </div>
    </div>
  )
}

export default Books

// Books.jsx
import "../css/BookCard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookCard } from "./BookCard";

export const Books = ({role}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/book/books')
      .then(res => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="book-list">
      {
        books.map(book => (
          <BookCard key={book.id} book={book}  role = {role}/>
        ))
      }
    </div>
  );
};

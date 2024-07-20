// import React from 'react'
import "../css/BookCard.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { BookCard } from "./BookCard"

export const Books = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/book/books')
    .then(res => {
      setBooks(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))
  }, [])
  return (
    <div className="book-list">
      {
        books.map(book => {
          return <BookCard key={book.id} book = {book}></BookCard>
        })
      }
    </div>
  )
}

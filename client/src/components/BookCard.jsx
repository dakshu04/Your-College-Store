// BookCard.jsx
import { Link } from 'react-router-dom';
import "../css/BookCard.css";

export const BookCard = ({ book }) => {
    const { name, author, imageUrl, _id } = book; // Ensure _id or a unique identifier is used

    return (
        <div className='book-card'>
            <img src={imageUrl} alt={name} className='book-image' />
            <div className="book-details">
                <h3>{name}</h3>
                <p>{author}</p>
            </div>
            <div className="book-actions">
                <button><Link to={`/book/${_id}`} className='btn-link'>Edit</Link></button>
                <button><Link to={`/delete/${_id}`} className='btn-link'>Delete</Link></button>
            </div>
        </div>
    );
};

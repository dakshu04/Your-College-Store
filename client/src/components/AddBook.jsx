import { useState } from 'react'; // Ensure useState is imported
import "../css/AddStudent.css";
// index.js or App.js

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    // Define state variables
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/book/add', { name, author, imageUrl }, { withCredentials: true })
            .then(res => {
                if (res.data.added) {
                    setName('');
                    setAuthor('');
                    setImageUrl('');
                    navigate('/books'); // Navigate to the books page
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log('Axios error is', err));
    };

    return (
        <div>
            <div className='student-form-container'>
                <form className='student-form' onSubmit={handleSubmit}>
                    <h2>Add Book</h2>
                    <div className='form-group'>
                        <label htmlFor="book">Book Name:</label>
                        <input type="text" id='book' name='book' onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="author">Author Name:</label>
                        <input type="text" id='author' name='author' onChange={(e) => setAuthor(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="grade">Image URL:</label>
                        <input type="text" id='image' name='image' onChange={(e) => setImageUrl(e.target.value)} />
                    </div>

                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    );
}

export default AddBook;

import { useEffect, useState } from 'react'; // Ensure useState and useEffect are imported
import "../css/AddStudent.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    // Define state variables
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate(); // Initialize navigate
    const { id } = useParams(); // Get ID from URL params

    // Fetch book data on component mount
    useEffect(() => {
        axios.get(`http://localhost:3001/book/book/`+id)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log('Axios error is', err));
    }, [id]); // Added id as dependency

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/book/book/${id}`, { name, author, imageUrl }, { withCredentials: true })
            .then(res => {
                if (res.data.updated) {
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
                    <h2>Edit Book</h2>
                    <div className='form-group'>
                        <label htmlFor="book">Book Name:</label>
                        <input type="text" id='book' name='book' value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="author">Author Name:</label>
                        <input type="text" id='author' name='author' value={author}
                            onChange={(e) => setAuthor(e.target.value)} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="image">Image URL:</label>
                        <input type="text" id='image' name='image' value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)} />
                    </div>

                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditBook;

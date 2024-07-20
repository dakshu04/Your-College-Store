import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

export const DeleteBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Use DELETE method to delete the book
        axios.delete('http://localhost:3001/book/book/' + id)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/books');
                }
            })
            .catch(err => console.log(err));
    }, [id, navigate]);

    return null; // This component does not render anything
};

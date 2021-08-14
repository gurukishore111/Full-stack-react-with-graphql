import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);
  console.log(loading, error, data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { books } = data;

  const handleDelete = (id) => {
    if (window.confirm('Sure to delete this item')) {
      deleteBook({
        variables: { id: id },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    }
  };
  return (
    <div>
      <ul className="book-list">
        <h1>Book List</h1>
        {books.map((book) => (
          <div
            key={book.id}
            className={'list ' + (selectedBook === book.id ? 'active' : '')}
          >
            <li onClick={() => setSelectedBook(book.id)}>{book.name}</li>
            <span onClick={() => handleDelete(book.id)}>x</span>
          </div>
        ))}
      </ul>
      {selectedBook && <BookDetails bookId={selectedBook} />}
      {!selectedBook && <div className="details">No Book Selected</div>}
    </div>
  );
};

export default BookList;

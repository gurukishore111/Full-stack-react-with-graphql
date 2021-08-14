import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHOR, GET_BOOKS, ADD_BOOK } from '../queries/queries';

function AddBooks() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState(null);

  const { loading, error, data } = useQuery(GET_AUTHOR);
  const [addBook] = useMutation(ADD_BOOK);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name, genre, authorId);
    addBook({
      variables: { name, authorId, genre },
      refetchQueries: [{ query: GET_BOOKS }],
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { authors } = data;
  return (
    <form className="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select author</option>
          {!authors && <option>Loading</option>}
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBooks;

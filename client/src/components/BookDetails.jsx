import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';

function BookDetails({ bookId }) {
  console.log(bookId);
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: bookId },
  });

  if (loading)
    return (
      <div className="details">
        <p>Loading...</p>
      </div>
    );
  if (error) return <p>Error :(</p>;
  const { book } = data;
  return (
    <div className="details">
      {data.book && bookId && (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookDetails;

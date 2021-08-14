import { gql } from '@apollo/client';
export const GET_BOOKS = gql`
  {
    books {
      id
      name
      author {
        id
        name
      }
    }
  }
`;

export const GET_AUTHOR = gql`
  {
    authors {
      id
      name
      # books {
      #   id
      #   name
      # }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation ($name: String!, $authorId: ID!, $genre: String!) {
    addBook(name: $name, authorId: $authorId, genre: $genre) {
      name
      genre
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query ($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation ($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

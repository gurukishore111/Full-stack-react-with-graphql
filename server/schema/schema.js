const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/books');

//Author Type
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        const { id } = parent;
        return Book.find({ authorId: id });
      },
    },
  }),
});

// BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const { authorId } = parent;
        return Author.findById(authorId).exec();
      },
    },
  }),
});
// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Book.findById(id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args;
        return Author.findById(id);
      },
    },
    books: {
      type: GraphQLList(BookType),
      resolve() {
        return Book.find({});
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve() {
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, age } = args;
        let author = new Author({
          name: name,
          age: age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { name, authorId, genre } = args;
        let book = new Book({
          name: name,
          authorId: authorId,
          genre: genre,
        });
        return book.save();
      },
    },
    deleteAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Author.findByIdAndDelete(id);
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const { id } = args;
        return Book.findByIdAndDelete(id);
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { id, name, authorId, genre } = args;
        let book = await Book.findByIdAndUpdate(
          id,
          {
            name: name,
            authorId: authorId,
            genre: genre,
          },
          { new: true }
        );
        return await book.save();
      },
    },
    updateAuthor: {
      type: AuthorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const { id, name, age } = args;
        let author = await Author.findByIdAndUpdate(
          id,
          {
            name: name,
            age: age,
          },
          { new: true }
        );
        return await author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

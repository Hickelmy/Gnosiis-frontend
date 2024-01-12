// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Pagination,
  Typography,
} from '@mui/material';
import axios from 'axios';

interface Book {
  id: number;
  nome: string;
  nomeDoAutor: string;
  lancamento: number;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numEdicao: number;
}

// interface BooksResponse {
//   books: Book[];
//   totalPages: number;
// }

// const API_URL = 'http://54.167.117.206:8000/livro/';
const API_URL = '/livro/';

export const BookList: React.FC<any> = ({ history }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    
    useEffect(() => {
        async function fetchBooks() {
          try {
            // ?page=${page}
            const response = await axios.get<any>(`${API_URL}`);

            console.log('Response', response)
            setBooks(response.data);
            setTotalPages(response.data.totalPages);
          } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]); // Defina a variável 'books' como um array vazio em caso de erro.
          }
        }
    
        fetchBooks();
      }, [page]);

      const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };
    
      const handleCardClick = (bookId: number) => {
        history.push(`/book/${bookId}`);
      };
    

      const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) {
          return text;
        } else {
          return text.slice(0, maxLength) + '...';
        }
      };

  return (
    <Container>
    <Grid container spacing={2}>
      {books && books.length > 0 ? (
        books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card onClick={() => handleCardClick(book.id)} style={{ cursor: 'pointer' }}>

            <CardContent>
                <Typography variant="h6">{book.nome}</Typography>
                <Typography>Autor: {book.nomeDoAutor}</Typography>
                <Typography>Lançamento: {book.lancamento}</Typography>
                <Typography>Tipo: {book.tipo}</Typography>
                <Typography>Gênero: {book.genero}</Typography>
                <Typography>Editora: {book.editora}</Typography>
                <Typography>Ano de Edição: {book.anoEdicao}</Typography>
                <Typography>Número de Edição: {book.numEdicao}</Typography>
                {/* <Typography>
                  Descrição: {truncateText(book., 150)}
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">Nenhum livro encontrado.</Typography>
      )}
    </Grid>
    <Pagination count={totalPages} page={page} onChange={handlePageChange} />
  </Container>
  );
};

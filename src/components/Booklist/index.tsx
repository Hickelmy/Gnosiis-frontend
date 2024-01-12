import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Pagination, Switch, FormControlLabel } from '@mui/material';
import axios from 'axios';

interface Book {
  id: number;
  nome: string;
  nomeDoAutor: string;
  lancamento: number | string; // Pode ser um número ou uma string
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numEdicao: number;
}

interface ApiResponseDefault {
  books: Book[];
  totalPages: number;
}

interface ApiResponseCustom {
  items: Book[];
  total?: number;
}

const API_URL_DEFAULT = '/livro/';
const API_URL_CUSTOM = 'http://localhost:3090/api/books/';

export const BookList: React.FC<any> = ({ history }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [useCustomApi, setUseCustomApi] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiUrl = useCustomApi ? API_URL_CUSTOM : API_URL_DEFAULT;
        const response = await axios.get<any>(`${apiUrl}?page=${page}`);

        console.log('Response', response);

        if (useCustomApi) {
          const customResponse = response.data as ApiResponseCustom;
          setBooks(customResponse.items);
          console.log('defaultResponse.books :',customResponse.items)

          setTotalPages(customResponse.total || 1);
        } else {
          const defaultResponse = response.data;
          setBooks(defaultResponse);
          console.log('defaultResponse.books :', defaultResponse.books)
          setTotalPages(defaultResponse.totalPages);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
      }
    };


    console.log('Book s' , books)
    fetchBooks();
  }, [page, useCustomApi]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCardClick = (bookId: number) => {
    history.push(`/book/${bookId}`);
  };

  const handleApiSwitchChange = () => {
    setUseCustomApi((prev) => !prev);
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
      <FormControlLabel
        control={
          <Switch
            checked={useCustomApi}
            onChange={handleApiSwitchChange}
            color="primary"
          />
        }
        label="Usar API customizada"
      />
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

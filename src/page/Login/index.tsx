import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        const { token } = responseData;
        localStorage.setItem('token', token);

        setSnackbarMessage('Login bem-sucedido!');
        setSnackbarSeverity('success');
      } else {
        const errorMessage = responseData.message || 'Credenciais inválidas';

        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);

      setSnackbarMessage('Erro ao realizar a requisição');
      setSnackbarSeverity('error');
    } finally {
      // Certifique-se de abrir o Snackbar mesmo em caso de erro para exibir mensagens de erro
      setSnackbarOpen(true);
    }
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4">Login</Typography>
      <TextField
        label="Nome de Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Entrar
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;

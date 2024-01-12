import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export const Register: React.FC = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Leitor');

  const cadastrarUsuario = async () => {
    try {
      const dataNascimentoDate = new Date(dataNascimento);
  
      const response = await fetch('http://localhost:3090/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          dataNascimento: dataNascimentoDate, 
          email,
          senha,
          tipo: tipoUsuario,
        }),
      });
  
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!');
        setNome('');
        setDataNascimento('');
        setEmail('');
        setSenha('');
        setTipoUsuario('Leitor');
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4">Cadastro de Usuário</Typography>
      <TextField
        label="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="date"
        label="Data de Nascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="tipo-usuario-label">Tipo de Usuário</InputLabel>
        <Select
          labelId="tipo-usuario-label"
          label="Tipo de Usuário"
          value={tipoUsuario}
          onChange={(e) => setTipoUsuario(e.target.value as string)}
        >
          <MenuItem value="Leitor">Leitor</MenuItem>
          <MenuItem value="Escritor">Escritor</MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={cadastrarUsuario}>
        Cadastrar
      </Button>
    </Container>
  );
};

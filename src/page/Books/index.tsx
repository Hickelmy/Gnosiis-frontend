import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";

interface BookFormData {
  nomeDoAutor: string;
  nome: string;
  lancamento: Date;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numEdicao: number;
  preco: number;
  descricao: string;
}

export const AddBook: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState<BookFormData>({
    nomeDoAutor: "",
    nome: "",
    lancamento: new Date(),
    tipo: "",
    genero: "",
    editora: "",
    anoEdicao: 0,
    numEdicao: 0,
    preco: 0,
    descricao: "",
  });

  const handleChange = (name: keyof BookFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { value: unknown }>
  ) => {
    let value: string | number | Date;

    if (name === "anoEdicao" || name === "numEdicao" || name === "preco") {
      value = parseFloat((event as React.ChangeEvent<HTMLInputElement>).target.value);
    } else if (name === "lancamento") {
      value = new Date(event.target.value as string);
    } else {
      value = event.target.value as string;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGeneroChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      genero: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formattedData = {
        ...formData,
        lancamento: formData.lancamento.toISOString().split('T')[0],
      };

      console.log('formData : ', formattedData);

      const response = await fetch("http://localhost:3090/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setSnackbarOpen(true);

        console.log("Livro cadastrado com sucesso!");
      } else {
        console.error("Erro ao cadastrar livro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
    }
  };


  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4">Cadastrar Livro</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Autor"
          value={formData.nomeDoAutor}
          onChange={handleChange("nomeDoAutor")}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Nome do Livro"
          value={formData.nome}
          onChange={handleChange("nome")}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          // label="Lançamento"
          value={formData.lancamento}
          onChange={handleChange("lancamento")}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tipo"
          value={formData.tipo}
          onChange={handleChange("tipo")}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="genero-label">Gênero</InputLabel>
          <Select
            labelId="genero-label"
            label="Gênero"
            value={formData.genero}
            onChange={handleGeneroChange}
          >
            <MenuItem value="Romance">Romance</MenuItem>
            <MenuItem value="Ficção Científica">Ficção Científica</MenuItem>
            <MenuItem value="Mistério">Mistério</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Editora"
          value={formData.editora}
          onChange={handleChange("editora")}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Ano de Edição"
          value={formData.anoEdicao}
          onChange={handleChange("anoEdicao")}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Número de Edição"
          value={formData.numEdicao}
          onChange={handleChange("numEdicao")}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          label="Preço"
          value={formData.preco || ""}
          onChange={handleChange("preco")}
          fullWidth
          margin="normal"
        />
        <TextField
          multiline
          rows={4}
          label="Descrição"
          value={formData.descricao || ""}
          onChange={handleChange("descricao")}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Cadastrar Livro
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarOpen ? "Livro cadastrado com sucesso!" : ""}
      />
    </Container>
  );
};

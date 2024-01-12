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
  Input,
} from "@mui/material";

interface BookFormData {
  autor: string;
  lancamento: string;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: string;
  numEdicao: number;
  preco?: number;
  descricao?: string;
  imagem?: File | null;
}

export const AddBook: React.FC = () => {
  const [formData, setFormData] = useState<BookFormData>({
    autor: "",
    lancamento: "",
    tipo: "",
    genero: "",
    editora: "",
    anoEdicao: "",
    numEdicao: 0,
    preco: undefined,
    descricao: undefined,
    imagem: null,
  });

  const handleChange =
    (name: keyof BookFormData) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | { value: unknown }
      >
    ) => {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.value,
      }));
    };

  const handleGeneroChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      genero: event.target.value,
    }));
  };

  const handleCapaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        imagem: files[0],
      }));
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (key === "imagem" && value === null) {
        continue;
      }

      formDataToSend.append(key, value as string | Blob);
    }

    try {
      const response = await fetch("http://localhost:3090/api/books", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Livro cadastrado com sucesso!");
      } else {
        console.error("Erro ao cadastrar livro:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao realizar a requisição:", error);
    }
  };

  return (
    <Container style={{ padding: "20px" }}>
      <Typography variant="h4">Cadastrar Livro</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Autor"
          value={formData.autor}
          onChange={handleChange("autor")}
          fullWidth
          margin="normal"
        />
        <TextField
          type="date"
          label="Lançamento"
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
          type="date"
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

        <Input
          type="file"
          name="imagem"
          onChange={handleCapaChange}
          inputProps={{ accept: "image/*" }}
          style={{ marginTop: "16px" }}
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
    </Container>
  );
};

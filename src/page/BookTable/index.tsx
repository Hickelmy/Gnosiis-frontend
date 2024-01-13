import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Switch,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

interface Product {
  id: number;
  nome: string;
  nomeDoAutor: string;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numEdicao: number;
  description: string;
  price: number;
}

interface ApiResponseCustom {
  items: Product[];
  total?: number;
}

const API_URL_DEFAULT = "/livro/";
const API_URL_CUSTOM = "http://localhost:3090/api/books/";
const SWITCH_LOCAL_STORAGE_KEY = "apiSwitch2";

export const BooktListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [useCustomApi, setUseCustomApi] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(SWITCH_LOCAL_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(10);
  const [editedProduct, setEditedProduct] = useState<Omit<
    Product,
    "lancamento"
  > | null>(null);
  const [searchField, setSearchField] = useState<string>("nome");
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const apiUrl = useCustomApi ? API_URL_CUSTOM : API_URL_DEFAULT;
        const response = await axios.get<any>(
          `${apiUrl}?page=${page}&${searchField}=${searchValue}`
        );

        if (useCustomApi) {
          const customResponse = response.data as ApiResponseCustom;
          setProducts(customResponse.items);
          setTotalPages(customResponse.total || 1);
        } else {
          const defaultResponse = response.data;
          setProducts(defaultResponse);
          setTotalPages(defaultResponse.totalPages);
        }
      } catch (error) {
        console.error("Error :", error);
        setProducts([]);
      }
    };

    fetchBooks();
  }, [page, useCustomApi, searchField, searchValue]);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${useCustomApi ? API_URL_CUSTOM : API_URL_DEFAULT}${
          selectedProduct?.id
        }`
      );

      const updatedProducts = products.filter(
        (product) => product.id !== selectedProduct?.id
      );
      setProducts(updatedProducts);

      setDeleteConfirmationOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setSelectedProduct(null);
  };

  const handleEditClick = (product: Product) => {
    const {...editedProductWithoutLancamento } = product;
    setEditedProduct(editedProductWithoutLancamento);
    setSelectedProduct(product);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct!,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const { id, nome, nomeDoAutor } = editedProduct || {};

      if (!id || !nome || !nomeDoAutor) {
        console.error("Invalid data for update");
        return;
      }

      const response = await axios.put(
        `${useCustomApi ? API_URL_CUSTOM : API_URL_DEFAULT}${id}`,
        {
          nome,
          nomeDoAutor,
        }
      );

      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product.id === id ? { ...product, nome, nomeDoAutor } : product
        );

        setProducts(updatedProducts);
        setSelectedProduct(null);
        setEditedProduct(null);
      } else {
        console.error("Error :", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nome", headerName: "Title", width: 200 },
    { field: "nomeDoAutor", headerName: "Author", width: 200 },
    { field: "tipo", headerName: "Type", width: 120 },
    { field: "genero", headerName: "Genre", width: 150 },
    { field: "editora", headerName: "Publisher", width: 200 },
    { field: "anoEdicao", headerName: "Edition Year", width: 120 },
    { field: "numEdicao", headerName: "Edition Number", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: { row: Product }) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row)} title="Edit">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row)}
            title="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container component="main" style={{ padding: "20px" }}>
      <CssBaseline />
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Listar Livros
      </Typography>

      <Switch
        checked={useCustomApi}
        onChange={() => {
          setUseCustomApi(!useCustomApi);
          localStorage.setItem(
            SWITCH_LOCAL_STORAGE_KEY,
            JSON.stringify(!useCustomApi)
          );
        }}
        inputProps={{ "aria-label": "alternar API" }}
      />
      <span>Alternar API</span>

      <FormControl style={{ marginBottom: '20px', minWidth: '120px' }}>
        <InputLabel id="search-field-label">Campo de Pesquisa</InputLabel>
        <Select
          labelId="search-field-label"
          id="search-field"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value as string)}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="nome">Nome</MenuItem>
          <MenuItem value="nomeDoAutor">Nome do Autor</MenuItem>
          {/* Add more fields as needed */}
        </Select>
      </FormControl>

      <TextField
        label="Valor de Pesquisa"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        fullWidth
        margin="normal"
        style={{ marginBottom: '20px' }}
      />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={products} columns={columns} pagination />
      </div>

      <Dialog
        open={Boolean(selectedProduct)}
        onClose={() => {
          setSelectedProduct(null);
          setEditedProduct(null);
        }}
      >
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
          {editedProduct && (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome"
                    name="nome"
                    fullWidth
                    value={editedProduct.nome || ""}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nome do Autor"
                    name="nomeDoAutor"
                    fullWidth
                    value={editedProduct.nomeDoAutor || ""}
                    onChange={handleEditChange}
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setSelectedProduct(null);
              setEditedProduct(null);
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Deletar Livros</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o produto "{selectedProduct?.nome}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

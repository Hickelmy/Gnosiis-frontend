import { useState, useEffect } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';



interface Product {
  id: number;
  nome: string;
  nomeDoAutor: string;
  lancamento: number;
  tipo: string;
  genero: string;
  editora: string;
  anoEdicao: number;
  numEdicao: number;
  description: string;
  price: number;
}

// const apiUrl = 'http://localhost/api/produtos'; 

const API_URL = '/livro/';

export const BooktListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetch(`${API_URL}/${selectedProduct?.id}`, {
        method: 'DELETE',
      });

      const updatedProducts = products.filter((product) => product.id !== selectedProduct?.id);
      setProducts(updatedProducts);

      setDeleteConfirmationOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationOpen(false);
    setSelectedProduct(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nome', headerName: 'Title', width: 200 },
    { field: 'nomeDoAutor', headerName: 'Author', width: 200 },
    { field: 'lancamento', headerName: 'Release Date', width: 150 },
    { field: 'tipo', headerName: 'Type', width: 120 },
    { field: 'genero', headerName: 'Genre', width: 150 },
    { field: 'editora', headerName: 'Publisher', width: 200 },
    { field: 'anoEdicao', headerName: 'Edition Year', width: 120 },
    { field: 'numEdicao', headerName: 'Edition Number', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params: { row: Product }) => (
        <>
          <IconButton onClick={() => setSelectedProduct(params.row)} title="Edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)} title="Delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleUpdate = () => {
    console.log('Update');
    setSelectedProduct(null);
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Listar Livros
      </Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          // pageSize={10}
          // rowsPerPageOptions={[10]}
          pagination
        />
      </div>

      <Dialog open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)}>
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent>
          {selectedProduct && (
            <form>
              <Grid container spacing={2}>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedProduct(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Deletar Livro s</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Tem certeza de que deseja excluir o produto "{selectedProduct?.nome}"?
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


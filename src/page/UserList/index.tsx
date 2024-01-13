import React, { useState, useEffect } from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Snackbar,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarContainerProps,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  dataNascimento: string;
  [key: string]: any;
}

interface ApiResponse {
  items: User[];
  total: number;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
  const [searchField, setSearchField] = useState<string>('nome');
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, [searchField, searchValue]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3090/api/user?${searchField}=${searchValue}`
      );
      const data: ApiResponse = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (id: number, field: string) => {
    const userToEdit = users?.find((user) => user.id === id);
    setSelectedUser(userToEdit || null);
    setFieldToEdit(field);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3090/api/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedUsers = users?.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setSnackbarOpen(true);
      } else {
        console.error('Erro ao deletar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (fieldToEdit && selectedUser) {
        const response = await fetch(
          `http://localhost:3090/api/user/${selectedUser.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              [fieldToEdit]: selectedUser[fieldToEdit],
            }),
          }
        );

        if (response.ok) {
          const updatedUsers = users?.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
          );
          setUsers(updatedUsers);
          setEditDialogOpen(false);
          setSnackbarOpen(true);
        } else {
          console.error('Erro ao editar usuário:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    {
      field: 'edit',
      headerName: 'Editar',
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: any) => (
        <Tooltip title="Editar">
          <IconButton onClick={() => handleEdit(params.row.id, 'nome')}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'delete',
      headerName: 'Deletar',
      sortable: false,
      filterable: false,
      width: 120,
      renderCell: (params: any) => (
        <Tooltip title="Deletar">
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Container style={{ marginTop: '20px' }}>
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
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="tipo">Tipo</MenuItem>
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

      {users !== undefined && users.length > 0 ? (
        <DataGrid
          rows={users}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      ) : (
        <Typography variant="body1">Nenhum usuário encontrado.</Typography>
      )}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          {selectedUser && fieldToEdit && (
            <>
              <TextField
                label={`Novo ${fieldToEdit}`}
                value={selectedUser[fieldToEdit]}
                onChange={(e) =>
                  setSelectedUser({
                    ...selectedUser,
                    [fieldToEdit]: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Operação concluída com sucesso!"
      />
    </Container>
  );
};

const CustomToolbar: React.FC<GridToolbarContainerProps> = (props) => (
  <GridToolbarContainer>
    <GridToolbarColumnsButton />
    <GridToolbarFilterButton />
    <GridToolbarDensitySelector />
    <GridToolbarExport />
  </GridToolbarContainer>
);

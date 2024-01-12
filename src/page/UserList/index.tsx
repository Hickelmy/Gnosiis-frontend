import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarContainerProps,
} from '@mui/x-data-grid';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  dataNascimento: string; // Adicionado o campo dataNascimento
}

interface ApiResponse {
  items: User[];
  total: number;
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    // Carregar usuários da API ao montar o componente
    fetch('http://localhost:3090/api/user')
      .then((response) => response.json())
      .then((data: ApiResponse) => setUsers(data.items))
      .catch((error) => console.error('Erro ao carregar usuários:', error));
  }, []);

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    setSelectedUser(userToEdit || null);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3090/api/user/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Atualiza a lista de usuários após a exclusão
        const updatedUsers = users.filter((user) => user.id !== id);
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
      const response = await fetch(
        `http://localhost:3090/api/user/${selectedUser?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedUser),
        }
      );

      if (response.ok) {
        // Atualiza a lista de usuários após a edição
        const updatedUsers = users.map((user) =>
          user.id === selectedUser?.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        setEditDialogOpen(false);
        setSnackbarOpen(true);
      } else {
        console.error('Erro ao editar usuário:', response.statusText);
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
          <IconButton onClick={() => handleEdit(params.row.id)}>
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
      <DataGrid
        rows={users}
        columns={columns}
        // pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />

      {/* Modal de Edição */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <TextField
                label="Novo Nome"
                value={selectedUser.nome}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, nome: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              {/* Adicione campos adicionais conforme necessário */}
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

      {/* Snackbar para exibir mensagem de sucesso */}
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

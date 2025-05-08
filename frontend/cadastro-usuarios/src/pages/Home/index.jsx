import Form from "../../components/Form";
import UserCard from "../../components/UserCard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../theme";
import "./style.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import EditDialog from "../../components/EditDialog";
import AlertMessage from "../../components/AlertMessage";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [userBeingEdited, setUserBeingEdited] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    async function fetchUsers() {
      const response = await api.get("/users");
      setUsers(response.data);
      console.log(users);
    }

    fetchUsers();
  }, []);

  function handleCloseAlert() {
    setAlert((prev) => ({ ...prev, open: false }));
  }

  async function handleNewUser(newUser) {
    try {
      const response = await api.post("/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);

      setAlert({
        open: true,
        message: "Usuário cadastrado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setAlert({
            open: true,
            message: error.response.data.message,
            severity: "warning",
          });
        } else {
          setAlert({
            open: true,
            message: "Erro ao cadastrar usuário!",
            severity: "error",
          });
        }
      }
    }
  }

  async function handleDeleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));

      setAlert({
        open: true,
        message: "Usuário deletado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: "Erro ao deletar usuário!",
        severity: "error",
      });
    }
  }

  async function handleUpdateUser(updatedUser) {
    try {
      const response = await api.put(`/users/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? response.data : user
        )
      );

      setAlert({
        open: true,
        message: "Usuário atualizado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: "Erro ao atualizar usuário!",
        severity: "error",
      });
    }
  }

  function handleOpenModal(user) {
    setUserBeingEdited(user);
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
    setUserBeingEdited(null);
  }

  return (
    <div className="home">
      <div className="form-container">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Form onSubmit={handleNewUser} />
        </ThemeProvider>
      </div>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id}>
            <UserCard
              name={user.name}
              age={user.age}
              email={user.email}
              id={user.id}
              onDelete={handleDeleteUser}
              onEdit={handleOpenModal}
            />
          </div>
        ))}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EditDialog
            open={open}
            onClose={handleCloseModal}
            onSubmit={handleUpdateUser}
            initialData={userBeingEdited}
          />
        </ThemeProvider>

        <AlertMessage
          open={alert.open}
          message={alert.message}
          severity={alert.severity}
          onClose={handleCloseAlert}
        />
      </div>
    </div>
  );
}

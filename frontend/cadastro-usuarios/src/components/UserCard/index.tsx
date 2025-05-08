import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./UserCard.module.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { IUser } from "./interface/IUser";

interface UserCardProps {
  name: string;
  age: number;
  email: string;
  id: string;
  onDelete: (id: string) => void;
  onEdit: (user: IUser & { id: string }) => void;
}

export default function UserCard({
  name,
  age,
  email,
  id,
  onDelete,
  onEdit,
}: UserCardProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Card className={styles.container}>
        <CardContent>
          <Typography className={styles.text}>
            <strong>Nome:</strong> {name}
          </Typography>
          <Typography className={styles.text}>
            <strong>Idade:</strong> {age}
          </Typography>
          <Typography className={styles.text}>
            <strong>E-mail:</strong> {email}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            onClick={() => onDelete(id)}
            aria-label="delete"
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => onEdit({ name, age, email, id })}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </StyledEngineProvider>
  );
}

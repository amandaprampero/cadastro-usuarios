import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import IForm from "../Form/interface/IForm";
import styles from "./EditDialog.module.scss";
import { useEffect } from "react";

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IForm & { id: string }) => void;
  initialData?: IForm & { id: string };
}

export default function EditDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: EditDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>();

  const submit = (data: IForm) => {
    onSubmit({
      ...data,
      id: initialData?.id || "",
    });
    onClose();
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={open}
        onClose={onClose}
        component={"form"}
        onSubmit={handleSubmit(submit)}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#2e2d4e",
            color: "whitesmoke",
            padding: "1rem",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "Poppins",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Editar Usuário
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            type="text"
            label="Nome"
            sx={{ marginTop: "8px" }}
            {...register("name", { required: "Campo obrigatório" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            type="number"
            label="Idade"
            {...register("age", { required: "Campo obrigatório" })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <TextField
            type="email"
            label="E-mail"
            {...register("email", { required: "Campo obrigatório" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <button type="submit" className={styles.button}>
            Salvar
          </button>
          <button type="button" onClick={onClose} className={styles.cancel}>
            Cancelar
          </button>
        </DialogActions>
      </Dialog>
    </StyledEngineProvider>
  );
}

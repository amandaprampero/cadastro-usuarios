import styles from "./Form.module.scss";
import { Box, StyledEngineProvider, TextField } from "@mui/material";
import IForm from "./interface/IForm";
import { IUser } from "../UserCard/interface/IUser";
import { useForm } from "react-hook-form";

interface FormProps {
  onSubmit: (newUser: IUser) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const submit = (data: IForm) => {
    onSubmit({ ...data });
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <h1 className={styles.title}>Cadastro de Usuário</h1>
        <Box
          component="form"
          className={styles.form}
          onSubmit={handleSubmit(submit)}
        >
          <div className={styles.inputsContainer}>
            <TextField
              type="text"
              label="Nome"
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
          </div>
          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </Box>
      </div>
    </StyledEngineProvider>
  );
}

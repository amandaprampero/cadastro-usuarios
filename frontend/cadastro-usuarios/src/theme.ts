import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#363653",
          color: "whitesmoke",
          paddingLeft: "1rem",
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #48456c",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid indigo",
          },
        },
        input: {
          padding: "0.5rem",
        },
        notchedOutline: {
          border: "1px solid #48456c",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "whitesmoke",
          fontFamily: "Poppins, sans-serif",
          fontSize: "14px",
          "&.Mui-focused": {
            color: "whitesmoke",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
          fontSize: "10px",
        },
      },
    },
  },
});

export default theme;

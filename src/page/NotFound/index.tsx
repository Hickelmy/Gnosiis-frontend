import { Button } from "@mui/material";
import { NotFound } from "./Animation/lottie";
import { NotFoundStyle } from "./styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <NotFoundStyle>
      <Link to="/">
        <Button
          color="success"
          component="label"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Voltar
        </Button>
      </Link>
      <NotFound />;
    </NotFoundStyle>
  );
}
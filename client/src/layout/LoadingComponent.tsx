import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

interface Props {
  message?: string;
}
export default function LoadingComponent({ message }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display='flex'
        justifyContent='center'
        alignContent='center'
        height='100px'
      >
        <CircularProgress size={90} color="primary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}

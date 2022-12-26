import { Button, Container, Divider, Paper, Typography } from "@mui/material";



export default function NotFound() {
    return (
        <Container component={Paper} sx={{ height : 400 }}>
            <Typography gutterBottom variant="h3">Ooops we can not find what you looking for </Typography>
            <Divider/>
            <Button fullWidth href="/Catalog">Go back to the store</Button>
        </Container>
    )
}
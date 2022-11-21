
import { AppBar, Switch, Toolbar, Typography } from "@mui/material";
import React from "react";

interface Props {
    darkMode : boolean ;
    ChangeTheme: () => void ;
}

export default function Header({darkMode,ChangeTheme}:Props) {
    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">
                    RE-STORE
                </Typography>
                <Switch checked={darkMode} color="default" onChange={ChangeTheme} />
            </Toolbar>
        </AppBar>
    )
}
import React from 'react';
import {appBar, ToolBar, Typography} from'@material-ui/core';
function Header() {
    return (
        <appBar position="fixed">
            <toolbar>
                <Typography variant="h6">
                    Carros
                </Typography>
            </toolbar>
        </appBar>
    );
};
export default Header;
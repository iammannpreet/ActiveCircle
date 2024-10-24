import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function VariantButtonGroup() {
    return (
        <Box
            className="flex flex-col items-center space-y-4 mt-4"
            sx={{
                '& > *': {
                    margin: '8px', // Equivalent to Tailwind's `space-y-2` for MUI
                },
            }}
        >
            <ButtonGroup variant="outlined" aria-label="Outlined button group">
                <Button className="hover:bg-primary hover:text-white">One</Button>
                <Button className="hover:bg-primary hover:text-white">Two</Button>
                <Button className="hover:bg-primary hover:text-white">Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text" aria-label="Text button group">
                <Button className="hover:bg-primary hover:text-white">One</Button>
                <Button className="hover:bg-primary hover:text-white">Two</Button>
                <Button className="hover:bg-primary hover:text-white">Three</Button>
            </ButtonGroup>
        </Box>
    );
}

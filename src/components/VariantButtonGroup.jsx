import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const VariantButtonGroup = ({ labels, onClick, variant = "outlined" }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px', // Example margin for each group
            }}
        >
            <ButtonGroup variant={variant} aria-label="button group">
                {labels.map((label, index) => (
                    <Button key={index} onClick={() => onClick(label)}>
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    );
};

export default VariantButtonGroup;

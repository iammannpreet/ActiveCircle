// PageHeader.jsx
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';

const PageHeader = ({ title, backUrl }) => (
    <div className="w-full md:w-1/3 p-4 lg:px-12 overflow-auto relative">
        <Button size="small" className="flex items-center">
            <ArrowBackIcon fontSize="small" className="text-darkGray" />
            <a className="text-darkGray" href={backUrl}>Back</a>
        </Button>
        <h2 className="text-2xl font-bold mb-4 text-black text-center lg:text-start">{title}</h2>
    </div>
);

export default PageHeader;


import React, { useMemo } from 'react'
import { emphasize, styled } from '@mui/material/styles';
import BreadcrumbsComponent from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate, useLocation } from 'react-router-dom'

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

function BreadcrumbsComp() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentLocation = useMemo(() => {
        const curr = location.pathname.slice(location.pathname.indexOf('/', 1) + 1, location.pathname.lastIndexOf('/'));
        const firstLetter = curr[0].toUpperCase();
        return firstLetter + curr.slice(1);
    }, [location])
    // handle navigate
    const handleNavigate = (to) => {
        navigate(to);
    }

    return (
        <BreadcrumbsComponent aria-label="breadcrumb">
            <StyledBreadcrumb
                component='div'
                onClick={() => handleNavigate('/')}
                label="Home"
                icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="div" onClick={() => handleNavigate('/projects')} label="Projects" />
            <StyledBreadcrumb
                label={currentLocation}
            />
        </BreadcrumbsComponent>
    )
}

export default BreadcrumbsComp
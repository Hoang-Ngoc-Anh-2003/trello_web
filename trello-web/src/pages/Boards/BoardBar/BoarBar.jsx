import { Box, Chip, Tooltip } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparent',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar({board}) {
    // const {board} = props
    // const board = props.board

    return (
        <Box sx={{
            position: "static",
            backgroundColor: '#fff',
            width: '100%',
            height: (theme) => theme.trello.boarBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976D2')
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLE}
                    icon={<DashboardIcon />}
                    label={board?.title}
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<VpnLockIcon />}
                    label= {capitalizeFirstLetter(board?.type)}
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<AddToDriveIcon />}
                    label="Add to google Drive"
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<FilterListIcon />}
                    label="filters"
                    clickable
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<PersonAddAltIcon />}
                    sx={{
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': { borderColor: 'white' }
                    }}
                >
                    Invite</Button>
                <AvatarGroup
                    max={3}
                    sx={{
                        gap: '10px',
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            '&: first-of-type': {bgcolor: '#a4b0be'}
                        }
                    }}>
                    <Tooltip title='HoangNgocAnh'>
                        <Avatar alt="Avatar" src="https://tse3.mm.bing.net/th?id=OIP.qIu2wcvur-VB04HW0V0j0QHaFj&pid=Api&P=0&h=180" />
                    </Tooltip>
                    <Tooltip title='HoangNgocAnh'>
                        <Avatar alt="Avatar" src="https://tse3.mm.bing.net/th?id=OIP.qIu2wcvur-VB04HW0V0j0QHaFj&pid=Api&P=0&h=180" />
                    </Tooltip>
                    <Tooltip title='HoangNgocAnh'>
                        <Avatar alt="Avatar" src="https://tse3.mm.bing.net/th?id=OIP.qIu2wcvur-VB04HW0V0j0QHaFj&pid=Api&P=0&h=180" />
                    </Tooltip>
                    <Tooltip title='HoangNgocAnh'>
                        <Avatar alt="Avatar" src="https://tse3.mm.bing.net/th?id=OIP.qIu2wcvur-VB04HW0V0j0QHaFj&pid=Api&P=0&h=180" />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    )
}

export default BoardBar

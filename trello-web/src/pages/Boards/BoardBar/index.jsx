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

const MENU_STYLE = {
    color: 'primary.main',
    bgcolor: 'white',
    border: 'none',
    paddingX: '5px',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'primary.main'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar() {
    return (
        <Box sx={{
            backgroundColor: '#fff',
            width: '100%',
            height: (theme) => theme.trello.boarBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            paddingX: 2,
            overflowX: 'auto',
            borderTop: '1px solid #00bfa5'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    sx={MENU_STYLE}
                    icon={<DashboardIcon />}
                    label="HoangNgocAnh Trello Web"
                    clickable
                />

                <Chip
                    sx={MENU_STYLE}
                    icon={<VpnLockIcon />}
                    label="Add to google Drive"
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
                <Button variant="outlined" startIcon={<PersonAddAltIcon />}>Invite</Button>
                <AvatarGroup
                    max={3}
                    sx={{
                        '& .MuiAvatar-root': {
                            width: 34,
                            height: 34,
                            fontSize: 16
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

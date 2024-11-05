import Box from '@mui/material/Box'
import ModeSelect from '../ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Templates from './Menus/Templates'
import Starred from './Menus/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

function AppBar() {
    return (
        <Box sx={{
            width: '100%',
            height: (theme) => theme.trello.appBarheight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // cac phan tu con cach deu nhau va sat mep container 
            gap: 2,
            paddingX: 2,
            backgroundColor: '#fff',
            overflowX: 'auto'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                <AppsIcon sx={{ color: 'primary.main' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <SvgIcon component={TrelloIcon} inheritViewBox fontSize='small' sx={{ color: 'primary.main' }} />
                    <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>Trello</Typography>
                </Box>

                {/*responsive*/}
                <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
                    <Workspaces></Workspaces>
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button variant="outlined" startIcon={<LibraryAddIcon />}>Create</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: '120px' }} />
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
                        <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
                </Tooltip>
                <Profiles />
            </Box>

        </Box>
    )
}

export default AppBar

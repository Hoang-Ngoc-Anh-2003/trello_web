import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"

function BoardContent() {
    return (
        <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976D2'),
                width: '100%',
                display: 'flex',
                flexGrow: 1,
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>
            <ListColumns />
        </Box>
    )
}

export default BoardContent

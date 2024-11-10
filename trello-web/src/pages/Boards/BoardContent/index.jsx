import { Box, colors } from "@mui/material"

function BoardContent() {
    return (
        <Box sx={{
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976D2'),
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center'
        }}>
            Board Content
        </Box>
    )
}

export default BoardContent

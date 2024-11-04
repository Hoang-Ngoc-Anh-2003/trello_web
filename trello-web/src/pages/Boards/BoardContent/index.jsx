import { Box } from "@mui/material"

function BoardContent() {
    return (
        <Box sx={{
            backgroundColor: 'primary.main',
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

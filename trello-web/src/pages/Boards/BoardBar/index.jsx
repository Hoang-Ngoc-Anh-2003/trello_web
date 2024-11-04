import { Box } from "@mui/material"

function BoardBar() {
    return (
        <Box sx={{
            backgroundColor: 'primary.dark',
            width: '100%',
            height: (theme) => theme.trello.boarBarHeight,
            display: 'flex',
            alignItems: 'center'
        }}>
            Board Bar
        </Box>
    )
}

export default BoardBar

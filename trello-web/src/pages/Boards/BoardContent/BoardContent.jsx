import Box from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { mapOrder } from "~/utils/sorts"

function BoardContent({board}) {
     const orderedColumns = mapOrder (board?.columns, board?.columnOrderIds, '_id')
    return (
        <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976D2'),
                width: '100%',
                display: 'flex',
                flexGrow: 1,
                height: (theme) => theme.trello.boardContentHeight,
                p: '10px 0'
            }}>
            <ListColumns columns={orderedColumns}/> 
        </Box>
    )
}

export default BoardContent

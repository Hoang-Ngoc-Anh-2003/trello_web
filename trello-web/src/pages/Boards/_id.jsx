import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoarBar'
import BoardContent from './BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import {mockData} from '~/apis/mock_data'

function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main' }}>
            <AppBar />
            <BoardBar board={mockData?.board}/>
            <BoardContent board={mockData?.board} />
        </Container>
    )
}

export default Board

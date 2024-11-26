import Container from '@mui/material/Container';
import BoardBar from './BoardBar/BoarBar';
import BoardContent from './BoardContent/BoardContent';
import AppBar from '~/components/AppBar/AppBar';
function Board() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main' }}>
            <AppBar />
            <BoardBar />
            <BoardContent />
        </Container>
    )
}

export default Board

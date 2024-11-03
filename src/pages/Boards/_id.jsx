// lam ve chuyen huong trang /.com/123/
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
function Board() {
  return (
    // boc lai App vao 1 container , disableGutters maxWidth={false}: bao container toan man hinh
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
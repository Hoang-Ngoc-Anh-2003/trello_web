import Container from '@mui/material/Container'
import BoardBar from './BoardBar/BoarBar'
import BoardContent from './BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import { mockData } from '~/apis/mock_data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        //lay id tu url , nen su dung react-router-dom
        const boardId = '67655e4843da9dde923534b3'
        //callAPI
        fetchBoardDetailsAPI(boardId).then((board) => {
            setBoard(board)
        })
    }, [])
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main' }}>
            <AppBar />
            <BoardBar board={mockData.board} />
            <BoardContent board={mockData.board} />
        </Container>
    )
}

export default Board

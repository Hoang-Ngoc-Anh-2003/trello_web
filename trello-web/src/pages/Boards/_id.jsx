import Container from '@mui/material/Container'
<<<<<<< HEAD
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
=======
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import AppBar from '~/components/AppBar/AppBar'
import { mockData } from '~/apis/mock_data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI, updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToDifferentColumnAPI,deleteColumnDetailsAPI } from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from "~/utils/sorts"
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import {toast} from 'react-toastify'
function Board() {
    const [board, setBoard] = useState(null)

    useEffect(() => {
        //lay id tu url , nen su dung react-router-dom
        const boardId = '67655e4843da9dde923534b3'
        //callAPI
        fetchBoardDetailsAPI(boardId).then((board) => {
            //sap xxep thu tu column trc khi dua xuong component con vid 71
            board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
            // Khi F5 trang web thì cần xử lý vấn đề kéo thả vào một column rỗng (Nhớ lại video 37.2, code hiện tại là video 69)
            board.columns.forEach(column => {
                if (isEmpty(column.cards)) {
                    column.cards = [generatePlaceholderCard(column)]
                    column.cardOrderIds = [generatePlaceholderCard(column)._id]
                } else { //sap xxep thu tu column trc khi dua xuong component con vid 71
                    column.cards = mapOrder(column.cards, column.cardOrderIds, "_id")
                }
            })
            setBoard(board)
        })
    }, [])


    // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
    const createNewColumn = async (newColumnData) => {
        const createdColumn = await createNewColumnAPI({
            ...newColumnData,
            boardId: board._id
        })
        console.log('createdColumn:', createdColumn)

        // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng (Nhó lại video 37.2, code hiện tại là video 69)
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

        // Cập nhật state board
        /**
         * - Phía Front-end chúng ta phải tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
         * - Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì Back-end sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card đi chăng nữa. => Lúc này Front-end sẽ nhàn hơn
         */
        const newBoard = { ...board }
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        setBoard(newBoard)
    }

    // Func này có nhiệm vụ gọi API tạo mới Card và làm lại dữ liệu State Board
    const createNewCard = async (newCardData) => {
        const createdCard = await createNewCardAPI({
            ...newCardData,
            boardId: board._id
        })
        console.log('createdCard:', createdCard)

        // Cập nhật state board
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
        if (columnToUpdate) {
            //neu column rong: ban chat la no dang chua 1 place-ordercard
            if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard )){
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds=[createdCard._id]
            }
            else{
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)
            }
        }
        setBoard(newBoard)
    }
    //func nay co nhiem vu goi API khi da keo tha columns xong xuoi
    const moveColumns = (dndOrderedColumns) => {
        // Update cho chuẩn dữ liệu state Board
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)

        // Gọi API update Board
        updateBoardDetailsAPI(newBoard._id, {
            columnOrderIds: dndOrderedColumnsIds
        })
    }

    const moveCardInTheSameColumn = (
        dndOrderedCards,
        dndOrderedCardIds,
        columnId
    ) => {
        // Update cho chuẩn dữ liệu state Board
        const newBoard = { ...board }
        const columnToUpdate = newBoard.columns.find(
            (column) => column._id === columnId
        )
        if (columnToUpdate) {
            columnToUpdate.cards = dndOrderedCards
            columnToUpdate.cardOrderIds = dndOrderedCardIds
        }
        setBoard(newBoard)

        // // Gọi API update Column
        updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
    }

    // const moveCardToDifferentColumn = (
    //     currentCardId,
    //     prevColumnId,
    //     nextColumnId,
    //     dndOrderedColumns
    // ) => {
    //     console.log(
    //         '🚀 ~ moveCardBetweenDifferentColumns ~ dndOrderedColumns:',
    //         dndOrderedColumns
    //     )
    //     console.log(
    //         '🚀 ~ moveCardBetweenDifferentColumns ~ nextColumnId:',
    //         nextColumnId
    //     )
    //     console.log(
    //         '🚀 ~ moveCardBetweenDifferentColumns ~ prevColumnId:',
    //         prevColumnId
    //     )
    //     console.log(
    //         '🚀 ~ moveCardBetweenDifferentColumns ~ currentCardId:',
    //         currentCardId
    //     )
    //     // Update cho chuẩn dữ liệu state Board
    //     const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    //     const newBoard = { ...board }
    //     newBoard.columns = dndOrderedColumns
    //     newBoard.columnOrderIds = dndOrderedColumnsIds
    //     setBoard(newBoard)
    //     //// Gọi API xử lý phía BE
    //     let prevCardOrderIds = dndOrderedColumns.find(
    //         (c) => c._id === prevColumnId
    //     )?.cardOrderIds

    //     // console.log(
    //     //     ' moveCardBetweenDifferentColumns ~ prevCardOrderIds:',
    //     //     prevCardOrderIds
    //     // )

    //     // Xử lý vấn đề khi kéo Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder-card, cần xóa nó đi trước khi gửi dữ liệu lên cho phía BE. (Nhớ lại video 37.2)
    //     if (prevCardOrderIds[0].includes('placeholder-card')) { prevCardOrderIds = [] }

    //     // console.log(
    //     //     ' moveCardBetweenDifferentColumns ~ prevCardOrderIds:',
    //     //     prevCardOrderIds
    //     // )

    //     moveCardToDifferentColumnAPI({
    //         currentCardId,
    //         prevColumnId,
    //         prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
    //         nextColumnId,
    //         nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    //     })
    // }
    const moveCardToDifferentColumn = (
        currentCardId,
        prevColumnId,
        nextColumnId,
        dndOrderedColumns
    ) => {
        console.log(
            '🚀 ~ moveCardToDifferentColumn ~ dndOrderedColumns:',
            dndOrderedColumns
        )
        console.log(
            '🚀 ~ moveCardToDifferentColumn ~ nextColumnId:',
            nextColumnId
        )
        console.log(
            '🚀 ~ moveCardToDifferentColumn ~ prevColumnId:',
            prevColumnId
        )
        console.log(
            '🚀 ~ moveCardToDifferentColumn ~ currentCardId:',
            currentCardId
        )
        // Update cho chuẩn dữ liệu state Board
        const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
        const newBoard = { ...board }
        newBoard.columns = dndOrderedColumns
        newBoard.columnOrderIds = dndOrderedColumnsIds
        setBoard(newBoard)

        // Gọi API xử lý phía BE
        let prevCardOrderIds = dndOrderedColumns.find(
            (c) => c._id === prevColumnId
        )?.cardOrderIds

        // Loại bỏ "placeholder-card" nếu có trong cardOrderIds
        if (prevCardOrderIds && prevCardOrderIds[0]?.includes('placeholder-card')) {
            prevCardOrderIds = []
        }

        // Cập nhật "nextCardOrderIds"
        const nextCardOrderIds = dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds

        // Gọi API
        moveCardToDifferentColumnAPI({
            currentCardId,
            prevColumnId,
            prevCardOrderIds,
            nextColumnId,
            nextCardOrderIds //:dndOrderColumns.find(c=> c._id === nextColumnId)?.cardOrderIds
        })
    }


    // xu ly xoa 1 column va card ben trong no
    const deleteColumnDetails = (columnId) => {
        console.log('🚀 ~ deleteColumnDetails ~ columnId:', columnId)
        // Update cho chuẩn dữ liệu state Board
        const newBoard = { ...board }
        newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId)
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
          (_id) => _id !== columnId
        )
        setBoard(newBoard)
    
        // Gọi API xử lý phía BE
        deleteColumnDetailsAPI(columnId).then((res) => {
          toast.success(res?.deleteResult)
          console.log('🚀 ~ deleteColumnDetails ~ res:', res)
        })
      }
    


    if (!board) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    width: '100vw',
                    height: '100vh'
                }}
            >
                <CircularProgress />
                <Typography>Loading Board...</Typography>
            </Box>
        )
    }



    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'primary.main' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent
                board={board}
                createNewColumn={createNewColumn}
                createNewCard={createNewCard}
                moveColumns={moveColumns}
                moveCardInTheSameColumn={moveCardInTheSameColumn}
                moveCardToDifferentColumn={moveCardToDifferentColumn}
                deleteColumnDetails = {deleteColumnDetails} />
                
>>>>>>> FEfix
        </Container>
    )
}

export default Board

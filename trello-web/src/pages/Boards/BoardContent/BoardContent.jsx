<<<<<<< HEAD
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { mapOrder } from "~/utils/sorts";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import ListColumns from "./ListColumns/ListColumns";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCar } from "~/utils/formatters";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  // yeu cau chuot di chuyen 10px thi moi goi even keo tha, fix truong hop click goi even
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  // nhan giu 250ms va dung sai cam ung(lien quan den phan dung but vs tay keo tren mobile) thi moi kich hoat event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  // const mySensors = useSensors(pointerSensor);
  const mySensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);
  // cung 1 thoi diem chi duoc keo column hoac card
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const findColummnByCardId = cardId => {
    return orderedColumns.find(column =>
      column?.cards?.map(card => card._id)?.includes(cardId)
    );
  };
  // cap nhat lai state khi di chuyen card giua 2 column khac nhau
=======
// import {
//   DndContext,
//   DragOverlay,
//   // MouseSensor,
//   // TouchSensor,
//   defaultDropAnimationSideEffects,
//   useSensor,
//   useSensors,
//   closestCorners,
// } from "@dnd-kit/core";
// import { MouseSensor, TouchSensor } from "~/customLibraries/DndKitSensors"
// import { arrayMove } from "@dnd-kit/sortable";
// import Box from "@mui/material/Box";
// import { useEffect, useState } from "react";
// import { mapOrder } from "~/utils/sorts";
// import Column from "./ListColumns/Column/Column";
// import Card from "./ListColumns/Column/ListCards/Card/Card";
// import ListColumns from "./ListColumns/ListColumns";
// import { cloneDeep, isEmpty } from "lodash";
// import { generatePlaceholderCard } from "~/utils/formatters";

// const ACTIVE_DRAG_ITEM_TYPE = {
//   COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
//   CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
// };

// function BoardContent({ board, createNewColumn, createNewCard, moveColumns, moveCardInTheSameColumn, moveCardToDifferentColumn }) {
//   // yeu cau chuot di chuyen 10px thi moi goi even keo tha, fix truong hop click goi even
//   // const pointerSensor = useSensor(PointerSensor, {
//   //   activationConstraint: { distance: 10 },
//   // });

//   const mouseSensor = useSensor(MouseSensor, {
//     activationConstraint: { distance: 10 },
//   });
//   // nhan giu 250ms va dung sai cam ung(lien quan den phan dung but vs tay keo tren mobile) thi moi kich hoat event
//   const touchSensor = useSensor(TouchSensor, {
//     activationConstraint: { delay: 250, tolerance: 500 },
//   });
//   // const mySensors = useSensors(pointerSensor);
//   const mySensors = useSensors(mouseSensor, touchSensor);

//   const [orderedColumns, setOrderedColumns] = useState([]);
//   // cung 1 thoi diem chi duoc keo column hoac card
//   const [activeDragItemId, setActiveDragItemId] = useState(null);
//   const [activeDragItemType, setActiveDragItemType] = useState(null);
//   const [activeDragItemData, setActiveDragItemData] = useState(null);
//   const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
//     useState(null);

//   useEffect(() => {
//     setOrderedColumns(board.columns);
//   }, [board]);

//   const findColummnByCardId = cardId => {
//     return orderedColumns.find(column =>
//       column?.cards?.map(card => card._id)?.includes(cardId)
//     );
//   };
//   // cap nhat lai state khi di chuyen card giua 2 column khac nhau
//   const moveCardBetweenDifferentColumns = (
//     overColumn,
//     overCardId,
//     active,
//     over,
//     activeColumn,
//     activeDraggingCardId,
//     activeDraggingCardData,
//     triggerFrom
//   ) => {
//     setOrderedColumns(prevColumns => {
//       const overCardIndex = overColumn?.cards?.findIndex(
//         card => card._id === overCardId
//       );

//       let newCardIndex;
//       const isBelowOverItem =
//         active.rect.current.translated &&
//         active.rect.current.translated.top > over.rect.top + over.rect.height;
//       const modifier = isBelowOverItem ? 1 : 0;
//       newCardIndex =
//         overCardIndex >= 0
//           ? overCardIndex + modifier
//           : overColumn?.cards?.length + 1;

//       // console.log("isBelowOverItem: ", isBelowOverItem);
//       // console.log("modifier: ", modifier);
//       // console.log("newCarIndex ", newCardIndex);

//       // Clone mang orderedColumnsState cu ra 1 cas moi de xu ly data roi return cap nhat lai ordererColumnsState moi
//       const nextColumns = cloneDeep(prevColumns);
//       const nextActiveColumn = nextColumns.find(
//         column => column._id === activeColumn._id
//       );
//       const nextOverColumn = nextColumns.find(
//         column => column._id === overColumn._id
//       );

//       // column cu
//       if (nextActiveColumn) {
//         // xoas card
//         nextActiveColumn.cards = nextActiveColumn.cards.filter(
//           card => card._id !== activeDraggingCardId
//         );

//         // them card display:none khi khong con card nao nua trong column
//         if (isEmpty(nextActiveColumn.cards)) {
//           nextActiveColumn.cards = [generatePlaceholderCar(nextActiveColumn)];
//         }

//         // cap nhat lai mang cardorderId cho chuan dulieu
//         nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
//           card => card._id
//         );
//       }

//       // column moi
//       if (nextOverColumn) {
//         // kieu tra card dang keo co ton tai o overColumn chua, neu co thi xoa no truoc
//         nextOverColumn.cards = nextOverColumn.cards.filter(
//           card => card._id !== activeDraggingCardId
//         );

//         const rebuild_activeDraggingCardData = {
//           ...activeDraggingCardData,
//           columnId: nextOverColumn._id,
//         };

//         // them card vao orderColum theo vi tri index
//         nextOverColumn.cards = nextOverColumn.cards.toSpliced(
//           newCardIndex,
//           0,
//           rebuild_activeDraggingCardData
//         );

//         // xoa card trang neu no ton tai
//         nextOverColumn.cards = nextOverColumn.cards.filter(
//           card => !card.FE_PlaceholderCard
//         );

//         // cap nhat lai mang cardOrderIds
//         nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
//           card => card._id
//         );
//       }

//       console.log("nextColumns: ", nextColumns);

//       return nextColumns;
//     });
//   };
//   const handleDragStart = event => {
//     // console.log("handleDragStart: ", event);
//     setActiveDragItemId(event?.active?.id);
//     setActiveDragItemType(
//       event?.active?.data?.current?.columnId
//         ? ACTIVE_DRAG_ITEM_TYPE.CARD
//         : ACTIVE_DRAG_ITEM_TYPE.COLUMN
//     );
//     setActiveDragItemData(event?.active?.data?.current);
//     if (event?.active?.data?.current?.columnId) {
//       setOldColumnWhenDraggingCard(findColummnByCardId(event?.active?.id));
//     }
//   };

//   const handleDragOver = event => {
//     // khong lam gi neu dang keo column
//     if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

//     //neu keo card thi xu ly de co the keo qua lai giua cac cot
//     // console.log("handleDragOver: ", event);
//     const { active, over } = event;

//     // neu keo linh tinh( ko ton tai active hoac over)ra ngoai thi return
//     if (!active || !over) return;

//     // activerDraggingCard: la card dang duoc keo
//     const {
//       id: activeDraggingCardId,
//       data: { current: activeDraggingCardData },
//     } = active;
//     // overCard: la card dang tuong tac
//     const { id: overCardId } = over;

//     // tim 2 column theo cardId
//     const activeColumn = findColummnByCardId(activeDraggingCardId);

//     const overColumn = findColummnByCardId(overCardId);

//     // console.log("activeColumn ", activeColumn);
//     // console.log("overColumn ", overColumn);

//     // neu khong ton tai 1 trong 2 column thi khong lam gi
//     if (!activeColumn || !overColumn) return;

//     // keo tha trong 2 column khac nhau
//     if (activeColumn._id !== overColumn._id) {
//       moveCardBetweenDifferentColumns(
//         overColumn,
//         overCardId,
//         active,
//         over,
//         activeColumn,
//         activeDraggingCardId,
//         activeDraggingCardData,
//         'handleDragOver'
//       );
//     }
//   };

//   const handleDragEnd = event => {
//     // console.log("handleDragEnd: ", event);
//     const { active, over } = event;
//     // kiem tra neu khong ton tai over ( keo tra ngoai thi return luon)
//     if (!over || !active) return;

//     // xu ly keo tha card
//     if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
//       // console.log("Hanh dong keo tha Card - Tam thoi khong lam gi ca");

//       // activerDraggingCard: la card dang duoc keo
//       const {
//         id: activeDraggingCardId,
//         data: { current: activeDraggingCardData },
//       } = active;
//       // overCard: la card dang tuong tac
//       const { id: overCardId } = over;

//       // tim 2 column theo cardId
//       const activeColumn = findColummnByCardId(activeDraggingCardId);
//       const overColumn = findColummnByCardId(overCardId);

//       // neu khong ton tai 1 trong 2 column thi khong lam gi
//       if (!activeColumn || !overColumn) return;

//       // console.log("oldColumnWhenDraggingCard ", oldColumnWhenDraggingCard);
//       // console.log("overColumn ", overColumn);
//       if (oldColumnWhenDraggingCard._id !== overColumn._id) {
//         // keo tha giua cac clomun khac nhau
//         moveCardBetweenDifferentColumns(
//           overColumn,
//           overCardId,
//           active,
//           over,
//           activeColumn,
//           activeDraggingCardId,
//           activeDraggingCardData,
//           'handleDragEnd'

//         );
//       } else {
//         const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
//           c => c._id === activeDragItemId
//         );
//         const newCardIndex = overColumn?.cards?.findIndex(
//           c => c._id === overCardId
//         );
//         const dndOrderedCards = arrayMove(
//           oldColumnWhenDraggingCard?.cards,
//           oldCardIndex,
//           newCardIndex
//         )
//         const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

//         setOrderedColumns(prevColumns => {
//           // Clone mang orderedColumnsState cu ra 1 cas moi de xu ly data roi return cap nhat lai ordererColumnsState moi
//           const nextColumns = cloneDeep(prevColumns);

//           // lay column dang thuc hien hanh dong
//           const targerColumn = nextColumns.find(c => c._id === overColumn._id);
//           // console.log("targerColswums ", targerColumn);

//           targerColumn.cards = dndOrderedCards;

//           targerColumn.cardOrderIds = dndOrderedCardIds;
//           if (triggerFrom === 'handleDragEnd') {
//             moveCardToDifferentColumn(activeDraggingCardId,
//               oldColumnWhenDraggingCard._id,
//               nextOverColumn._id,
//               nextColumns)
//           }
//           return nextColumns;
//         })

//         moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
//       }
//     }

//     // xu ly keo tha column
//     if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
//       // neu vi tri sau khi keo tha khac voi vi tri ban dau
//       if (active.id !== over.id) {
//         // lay vi tri cu ( tu active)
//         const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
//         // lay vi tri moi (tu over)
//         const newIndex = orderedColumns.findIndex(c => c._id === over.id);
//         // dung arrayMove cua dnd_kit de sap xep lai mang Columns ban dau
//         const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
//         // cap nhat lai state columns ban dau sau khi keo tha
//         setOrderedColumns(dndOrderedColumns);

//         moveColumns(dndOrderedColumns)

//       }
//     }

//     setActiveDragItemId(null);
//     setActiveDragItemType(null);
//     setActiveDragItemData(null);
//     setOldColumnWhenDraggingCard(null);
//   };

//   // console.log("activeDragItemId: ", activeDragItemId);
//   // console.log("activeDragItemType: ", activeDragItemType);
//   // console.log("activeDragItemData: ", activeDragItemData);

//   const customDropAnimation = {
//     sideEffects: defaultDropAnimationSideEffects({
//       styles: {
//         active: {
//           opacity: "0.5",
//         },
//       },
//     }),
//   };

//   return (
//     <DndContext
//       onDragStart={handleDragStart}
//       onDragOver={handleDragOver}
//       onDragEnd={handleDragEnd}
//       sensors={mySensors}
//       collisionDetection={closestCorners} // phat hien va cham, dung de keo card lon
//     >
//       <Box
//         sx={{
//           bgcolor: theme =>
//             theme.palette.mode === "dark" ? "#34495E" : "#1976D2",
//           width: "100%",
//           display: "flex",
//           flexGrow: 1,
//           height: theme => theme.trello.boardContentHeight,
//           p: "10px 0",
//         }}
//       >
//         <ListColumns
//           columns={orderedColumns}
//           createNewColumn={createNewColumn}
//           createNewCard={createNewCard} />
//         <DragOverlay dropAnimation={customDropAnimation}>
//           {!activeDragItemType && null}
//           {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
//             <Column column={activeDragItemData} />
//           )}
//           {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
//             <Card card={activeDragItemData} />
//           )}
//         </DragOverlay>
//       </Box>
//     </DndContext>
//   );
// }

// export default BoardContent;

import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import {
  DndContext,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails
}) {
  // https://docs.dndkit.com/api-documentation/sensors
  // Nếu dùng PointerSensor mặc định thì phải kết hợp thuộc tính CSS touch-action: none ở trong phần tử kéo thả - nhưng mà còn bug

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })

  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  // Nhấn giữ 250ms (delay) và dung sai (tolerance) của cảm ứng 500px (dễ hiểu là di chuyển/chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })

  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Cùng một thời điểm chỉ có một phần tử đang được kéo (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  // Điểm va chạm cuối cùng trước đó (xử lý thuật toán phát hiện va chạm, video 37)
  const lastOverId = useRef(null)

  useEffect(() => {
    // Column đã được sắp xếp ở component cha cao nhất (boards/_id.jsx) (Video 71 đã giải thích lý do)
    setOrderedColumns(board.columns)
  }, [board])

  // Tìm một cái Column theo CardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới.
    return orderedColumns.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  // Khởi tạo Function chung xử lý việc cập nhật lại state trong trường hợp di chuyển Card giữa các Column khác nhau
>>>>>>> FEfix
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
<<<<<<< HEAD
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(
        card => card._id === overCardId
      );

      let newCardIndex;
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // console.log("isBelowOverItem: ", isBelowOverItem);
      // console.log("modifier: ", modifier);
      // console.log("newCarIndex ", newCardIndex);

      // Clone mang orderedColumnsState cu ra 1 cas moi de xu ly data roi return cap nhat lai ordererColumnsState moi
      const nextColumns = cloneDeep(prevColumns);
      const nextActiveColumn = nextColumns.find(
        column => column._id === activeColumn._id
      );
      const nextOverColumn = nextColumns.find(
        column => column._id === overColumn._id
      );

      // column cu
      if (nextActiveColumn) {
        // xoas card
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          card => card._id !== activeDraggingCardId
        );

        // them card display:none khi khong con card nao nua trong column
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCar(nextActiveColumn)];
        }

        // cap nhat lai mang cardorderId cho chuan dulieu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          card => card._id
        );
      }

      // column moi
      if (nextOverColumn) {
        // kieu tra card dang keo co ton tai o overColumn chua, neu co thi xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(
          card => card._id !== activeDraggingCardId
        );

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // them card vao orderColum theo vi tri index
=======
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí (index) của cái overCard trong column đích (nơi activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      )

      // Logic tính toán "cardIndex mới" (trên hoặc dưới overCard) lấy chuẩn ra từ code của thư viện - nhiều khi muốn từ chối hiểu =))
      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(
        (column) => column._id === activeColumn._id
      )
      const nextOverColumn = nextColumns.find(
        (column) => column._id === overColumn._id
      )

      // nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xoá card ở cái column active (cũng có thể là column cũ, cái lúc mà kéo card ra khỏi nó để sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        // Thêm Placeholder Card nếu Column rỗng: Bị kéo hết Card đi, không còn cái nào nữa. (Video 37.2)
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        )
      }

      // nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem cái card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xoá nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        )

        // Phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trí index mới
>>>>>>> FEfix
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
<<<<<<< HEAD
        );

        // xoa card trang neu no ton tai
        nextOverColumn.cards = nextOverColumn.cards.filter(
          card => !card.FE_PlaceholderCard
        );

        // cap nhat lai mang cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          card => card._id
        );
      }

      console.log("nextColumns: ", nextColumns);

      return nextColumns;
    });
  };
  const handleDragStart = event => {
    // console.log("handleDragStart: ", event);
    setActiveDragItemId(event?.active?.id);
=======
        )

        // Xoá cái Placeholder Card đi nếu nó đang tồn tại (Video 37.2)
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        )

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        )
      }

      // Nếu function này được gọi từ handleDragEnd nghĩa là đã kéo thả xong, lúc này mới xử lý gọi API 1 lần ở đây
      if (triggerFrom === 'handleDragEnd') {
        /**
         * - Gọi lên props function moveCardToDifferentColumn nằm ở component cha cao nhất (boards/_id.jsx)
         * - Lưu ý: về sau ở học phần MERN Stack Advance nâng cao học trực tiếp với mình thì chúng ta sẽ đưa dữ liệu Board ra ngoài Redux Global Store
         * - Thì lúc này chúng ta có thể gọi luôn API ở đây là xong thay vì phải lần lược gọi ngược lên những component cha phía bên trên. (Đối với component con nằm càng sâu thì càng khổ 😆)
         * - Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều
         */
        /**
         * Phải dùng tới activeDragItemData.columnId hoặc tốt nhất là oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver và tới đây là state của card đã bị cập nhật một lần rồi.
         */
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns
        )
      }
      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo (drap) một phần tử
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
>>>>>>> FEfix
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
<<<<<<< HEAD
    );
    setActiveDragItemData(event?.active?.data?.current);
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColummnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = event => {
    // khong lam gi neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;

    //neu keo card thi xu ly de co the keo qua lai giua cac cot
    // console.log("handleDragOver: ", event);
    const { active, over } = event;

    // neu keo linh tinh( ko ton tai active hoac over)ra ngoai thi return
    if (!active || !over) return;

    // activerDraggingCard: la card dang duoc keo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    // overCard: la card dang tuong tac
    const { id: overCardId } = over;

    // tim 2 column theo cardId
    const activeColumn = findColummnByCardId(activeDraggingCardId);

    const overColumn = findColummnByCardId(overCardId);

    // console.log("activeColumn ", activeColumn);
    // console.log("overColumn ", overColumn);

    // neu khong ton tai 1 trong 2 column thi khong lam gi
    if (!activeColumn || !overColumn) return;

    // keo tha trong 2 column khac nhau
=======
    )
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá trình kéo (drag) một phần tử
  const handleDragOver = (event) => {
    // Không làm gì thêm nếu đang kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các columns
    // console.log('handleDragOver', event)
    const { active, over } = event

    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì (tránh crash trang)
    if (!active || !over) return

    // activeDraggingCard: Là cái card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active

    // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over

    // Tìm 2 cái column theo cái cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 column thì không làm gì hết, tránh crash trang web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì đây đang làm đoạn xử lý lúc kéo (handleDragOver), còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
>>>>>>> FEfix
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
<<<<<<< HEAD
        activeDraggingCardData
      );
    }
  };

  const handleDragEnd = event => {
    // console.log("handleDragEnd: ", event);
    const { active, over } = event;
    // kiem tra neu khong ton tai over ( keo tra ngoai thi return luon)
    if (!over || !active) return;

    // xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log("Hanh dong keo tha Card - Tam thoi khong lam gi ca");

      // activerDraggingCard: la card dang duoc keo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      // overCard: la card dang tuong tac
      const { id: overCardId } = over;

      // tim 2 column theo cardId
      const activeColumn = findColummnByCardId(activeDraggingCardId);
      const overColumn = findColummnByCardId(overCardId);

      // neu khong ton tai 1 trong 2 column thi khong lam gi
      if (!activeColumn || !overColumn) return;

      // console.log("oldColumnWhenDraggingCard ", oldColumnWhenDraggingCard);
      // console.log("overColumn ", overColumn);
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // keo tha giua cac clomun khac nhau
=======
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  // Trigger khi kết thúc hành động kéo một phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    const { active, over } = event

    // Cần đảm bảo nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi container) thì không làm gì (tránh crash trang)
    if (!active || !over) return

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard: Là cái card đang được kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active

      // overCard: là cái card đang tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over

      // Tìm 2 cái column theo cái cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại 1 trong 2 column thì không làm gì hết, tránh crash trang web
      if (!activeColumn || !overColumn) return

      // Hành động kéo thả card giữa 2 column khác nhau
      // Phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart) chứ không phải activeData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật một lần rồi
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
>>>>>>> FEfix
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
<<<<<<< HEAD
          activeDraggingCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        );
=======
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        // Hành động kéo thả card trong cùng 1 cái column

        // Lấy vị trí cũ (từ thằng oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        )
        console.log('oldCardIndex:', oldCardIndex)

        // Lấy vị trí cũ (từ thằng over)
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        )
        console.log('newCardIndex:', newCardIndex)

        // Dùng arrayMove vì kéo card trong một cái column thì tương tự với logic kéo column trong một cái board content
>>>>>>> FEfix
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
<<<<<<< HEAD
        );

        setOrderedColumns(prevColumns => {
          // Clone mang orderedColumnsState cu ra 1 cas moi de xu ly data roi return cap nhat lai ordererColumnsState moi
          const nextColumns = cloneDeep(prevColumns);

          // lay column dang thuc hien hanh dong
          const targerColumn = nextColumns.find(c => c._id === overColumn._id);
          // console.log("targerColswums ", targerColumn);

          targerColumn.cards = dndOrderedCards;

          targerColumn.cardOrderIds = dndOrderedCards.map(card => card._id);

          return nextColumns;
        });
      }
    }

    // xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // neu vi tri sau khi keo tha khac voi vi tri ban dau
      if (active.id !== over.id) {
        // lay vi tri cu ( tu active)
        const oldIndex = orderedColumns.findIndex(c => c._id === active.id);
        // lay vi tri moi (tu over)
        const newIndex = orderedColumns.findIndex(c => c._id === over.id);
        // dung arrayMove cua dnd_kit de sap xep lai mang Columns ban dau
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
        // 2 console.log du lieu nay dung de xu ly goi API
        // const dndOderedColumnsIds = dndOrderedColumns.map(c => c._id);
        // console.log("dndOderedColumns: ", dndOrderedColumns);
        // console.log("dndOderedColumnsIds: ", dndOderedColumnsIds);

        // cap nhat lai state columns ban dau sau khi keo tha
        setOrderedColumns(dndOrderedColumns);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  // console.log("activeDragItemId: ", activeDragItemId);
  // console.log("activeDragItemType: ", activeDragItemType);
  // console.log("activeDragItemData: ", activeDragItemData);

=======
        )

        const dndOrderedCardIds = dndOrderedCards.map((card) => card._id)

        // Vẫn gọi update State ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chờ gọi API (small trick)
        setOrderedColumns((prevColumns) => {
          // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)

          // Tìm tới Column mà chúng ta đang thả
          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          )

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds

          // Trả về giá trị state mới (chuẩn vị trí)
          return nextColumns
        })

        /**
         * - Gọi lên props function moveCardInTheSameColumn nằm ở component cha cao nhất (boards/_id.jsx)
         * - Lưu ý: về sau ở học phần MERN Stack Advance nâng cao học trực tiếp với mình thì chúng ta sẽ đưa dữ liệu Board ra ngoài Redux Global Store
         * - Thì lúc này chúng ta có thể gọi luôn API ở đây là xong thay vì phải lần lược gọi ngược lên những component cha phía bên trên. (Đối với component con nằm càng sâu thì càng khổ 😆)
         * - Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều
         */
        moveCardInTheSameColumn(
          dndOrderedCards,
          dndOrderedCardIds,
          oldColumnWhenDraggingCard._id
        )
      }
    }

    // Xử lý kéo thả Columns trong một cái boardContent
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí cũ (từ thằng active)
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        )
        // Lấy vị trí cũ (từ thằng over)
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        )

        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Column ban đầu
        // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        )

        // Vẫn gọi update State ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chờ gọi API (small trick)
        setOrderedColumns(dndOrderedColumns)

        /**
         * - Gọi lên props function moveColumns nằm ở component cha cao nhất (boards/_id.jsx)
         * - Lưu ý: về sau ở học phần MERN Stack Advance nâng cao học trực tiếp với mình thì chúng ta sẽ đưa dữ liệu Board ra ngoài Redux Global Store
         * - Thì lúc này chúng ta có thể gọi luôn API ở đây là xong thay vì phải lần lược gọi ngược lên những component cha phía bên trên. (Đối với component con nằm càng sâu thì càng khổ 😆)
         * - Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều
         */
        moveColumns(dndOrderedColumns)
      }
    }

    // Những hành động sau khi kéo thả này luôn phải đưa về giá trị null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  /**
   * Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay (video 32)
   */
>>>>>>> FEfix
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
<<<<<<< HEAD
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      collisionDetection={closestCorners} // phat hien va cham, dung de keo card lon
    >
      <Box
        sx={{
          bgcolor: theme =>
            theme.palette.mode === "dark" ? "#34495E" : "#1976D2",
          width: "100%",
          display: "flex",
          flexGrow: 1,
          height: theme => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
=======
          opacity: '0.5'
        }
      }
    })
  }

  // Chúng ta sẽ custom lại chiến lược / thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns (video 37 fix bug quan trọng)
  //  args = arguments = Các đối số, tham số
  const collisionDetectionStrategy = useCallback(
    // Trường hợp kéo column thì dùng thuật toán closestCorners là chuẩn nhất
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      // Tìm các điểm giao nhau, va chạm, trả về một mảng các va chạm - intersections với con trỏ
      const pointerIntersections = pointerWithin(args)

      // Video 37.1: Nếu pointerIntersections là mảng rỗng, return luôn không làm gì hết
      // Fix triệt để cái bug flickering của thư viện Dnd-kit trong trường hợp sau:
      // - Kéo một cái card có image cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
      if (!pointerIntersections?.length) return

      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây (không cần bước này nữa - video 37.1)
      // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)

      // Tìm overId đầu tiên trong đám intersection ở trên
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        // Video 37: Đoạn này để fix cái vụ flickering nhé
        // Nếu cái over nó là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCorners mình thấy mượt mà hơn
        const checkColumn = orderedColumns.find(
          (column) => column._id === overId
        )
        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                )
              }
            )
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      // Nếu overId là null thì trả về mảng rỗng - tránh bug crash trang
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      // Cảm biến (đã giải thích kỹ ở video số 30)
      sensors={sensors}
      // Thuật toán phát hiện va chạm (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestCorners thay vì closestCenter
      // https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      // Update video 37: nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu (vui lòng xem video 37 sẽ rõ)
      // collisionDetection={closestCorners}

      // Tự custom nâng cao thuật toán phát hiện va chạm (video fix bug số 37)
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
>>>>>>> FEfix
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
<<<<<<< HEAD
  );
}

export default BoardContent;
=======
  )
}

export default BoardContent
>>>>>>> FEfix

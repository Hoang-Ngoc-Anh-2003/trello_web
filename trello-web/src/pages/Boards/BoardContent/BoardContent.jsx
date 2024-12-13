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
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
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
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
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
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
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
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
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
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        );
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
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

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
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
  );
}

export default BoardContent;

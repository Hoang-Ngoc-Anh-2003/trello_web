import React from "react";
import Box from "@mui/material/Box";
import theme from "~/theme";
import Card from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy, //keo theo chieu doc
} from "@dnd-kit/sortable";

function ListCards({ cards }) {
  return (
    <SortableContext
      items={cards?.map(c => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
<<<<<<< HEAD
          p: "0 5px",
=======
          p: "0 5px 5px 5px",
>>>>>>> FEfix
          m: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: theme =>
<<<<<<< HEAD
            `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${
              theme.trello.columnHeaderHeight
=======
            `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight
>>>>>>> FEfix
            } - ${theme.trello.columnFooterHeight} )`,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
            borderRadius: "5px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2cf",
            borderRadius: "5px",
          },
        }}
      >
        {cards?.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  );
}

export default ListCards;

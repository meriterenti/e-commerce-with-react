import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function CartColumns(props) {
  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: 'orange',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);

  const {cart} = props.value;
  return (
    <TableRow>
      <StyledTableCell align="right"></StyledTableCell>
      <StyledTableCell align="right">SKU</StyledTableCell>
      <StyledTableCell align="right">Product</StyledTableCell>
      <StyledTableCell align="right">Title</StyledTableCell>
      <StyledTableCell align="right">Price</StyledTableCell>
      <StyledTableCell align="right">Quantity</StyledTableCell>
      <StyledTableCell align="right">Total</StyledTableCell>
    </TableRow>
  );
}

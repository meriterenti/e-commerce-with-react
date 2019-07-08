import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Cancel from '@material-ui/icons/Cancel';

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

export default function CartItem(props) {
  const {id, title, img, price, total, count} = props.item;
  const {increment, decrement, removeItem} = props.value;
  return(
    <StyledTableRow>
      <StyledTableCell align="right">
        <Cancel onClick={()=>removeItem(id)} style={{ color:'grey', cursor:'pointer'}} />
      </StyledTableCell>
      <StyledTableCell align="right">dumbsku{id}</StyledTableCell>
      <StyledTableCell align="right"><img src={img} alt={title} width="50px" /></StyledTableCell>
      <StyledTableCell align="right">{title}</StyledTableCell>
      <StyledTableCell align="right">{price}</StyledTableCell>
      <StyledTableCell align="right">
        <RemoveCircle color="primary" onClick={()=>decrement(id)} style={{cursor:'pointer'}} />
        <span>{count}</span>
        <AddCircle color="secondary" onClick={()=>increment(id)} style={{cursor:'pointer'}} />
      </StyledTableCell>
      <StyledTableCell align="right">{total}</StyledTableCell>
    </StyledTableRow>
  )
}

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MultiButton = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <IconButton color="primary">
        <AddShoppingCartIcon />
      </IconButton>

      <IconButton color="primary">
        <DeleteIcon />
      </IconButton>

      <IconButton color="primary">
        <AlarmIcon />
      </IconButton>
    </div>
  );
}

export default MultiButton;
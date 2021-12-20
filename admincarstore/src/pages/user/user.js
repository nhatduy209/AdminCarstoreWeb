/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Icon} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCar} from '../../Redux/reducer/CarReducer';
import UserForm from './Component/UserForm/UserForm';
import Dialog from '@mui/material/Dialog';
import {getCategory} from '../../Redux/reducer/CategoryReducer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: '0.5s ease-in-out',
  width: 400,
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
};
const options = ['View', 'Edit', 'Delete'];
const User = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const isOpen = Boolean(anchorEl);
  const cars = useSelector(state => state.CarReducer.listCar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCar());
    dispatch(getCategory());
  }, [pageIndex, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const optionClick = item => {
    console.log('click', item);
    setOpen(true);
  };

  const renderNull = () => {
    return cars.length > 0 ? (
      <caption></caption>
    ) : (
      <caption>
        <div className="table-null">
          <img
            height={100}
            width={100}
            src="https://i.pinimg.com/originals/98/4a/0e/984a0eb26ddb184a63ad4f9f53f8efeb.png"
          />{' '}
          No data
        </div>
      </caption>
    );
  };
  return (
    <div className="car-management-container">
      <div className="car-management__header">
        <div className="car-management__header__title">Title</div>
        <div className="car-management__header__control">
          <input />
          <div className="add-button">
            <Icon
              onClick={() => optionClick()}
              baseClassName="fas"
              className="fa-car-side"
              sx={{fontSize: 20, padding: 1, color: '#fff', marginLeft: -0.5}}
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          {renderNull()}
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right" width="45">
                Image
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((row, index) => (
              <TableRow
                key={index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">
                  <img width={200} src={row.img} />
                </TableCell>
                <TableCell align="right">{row.name ?? '--'}</TableCell>
                <TableCell align="right">{row.email ?? '--'}</TableCell>
                <TableCell align="right">{row?.role ?? '--'}</TableCell>
                <TableCell align="right">
                  <div className="user-option">
                    <div className='user-option-item edit'>
                      <Icon
                        baseClassName="fas"
                        className="fa-user-pen"
                        sx={{fontSize: 18, padding: 0.5}}
                      />
                    </div>
                    <div className='user-option-item view'>
                      <Icon
                        baseClassName="fas"
                        className="fa-info"
                        sx={{fontSize: 18, padding: 0.5}}
                      />
                    </div>
                    {/* <div className='user-option-item delete'>
                      <Icon
                        baseClassName="fas"
                        className="fa-user-xmark"
                        sx={{fontSize: 18, padding: 0.5}}
                      />
                    </div> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cars.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog
        open={open}
        className="car-form"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <div className="car-form--main">
          <div className="car-form__header">
            <div>Title</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          {UserForm(selectedItem)}
        </div>
      </Dialog>
    </div>
  );
};

export default User;

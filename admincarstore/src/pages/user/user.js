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
import ProfileForm from '../profile/Component/ProfileForm/ProfileForm';
import {ToastContainer} from 'react-toastify';
import defaultAvatar from '../../assets/img/default-avatar.svg'
import emptyList from '../../assets/img/empty-list.svg'

import {
  getAllUser,
  deleteUser,
  deleteUserRedux,
  
} from '../../Redux/reducer/AccountReducer';

const options = ['View', 'Edit', 'Delete'];
const User = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cars = useSelector(state => state.CarReducer.listCar);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const listUser = useSelector(state => {
    if (!searchText.length) {
      return state.AccountReducer.lisAcc.listUser;
    } else {
      return state.AccountReducer.lisAcc.listUser.filter(item =>
        item.name.includes(searchText),
      );
    }
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [pageIndex, rowsPerPage]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = useCallback(email => {
    dispatch(deleteUser({email}));
    dispatch(deleteUserRedux(email));
  }, []);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const optionClick = item => {
    setOpen(true);
  };

  const onSearch = val => {
    setTimeout(() => setSearchText(val.target.value), 3000);
  };

  // useEffect(() => {
  //   if (searchText.length) {
  //     dispatch(filterUser(searchText));
  //   }
  // }, [searchText]);

  const renderNull = () => {
    return listUser.length > 0 ? (
      <caption></caption>
    ) : (
      <caption>
        <div className="table-null">
          <img
            height={150}
            width={150}
            src={emptyList}
          />{' '}
          No data
        </div>
      </caption>
    );
  };

  return (
    <div className="car-management-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <div className="car-management__header">
        <div className="car-management__header__title">Users</div>
        <div className="car-management__header__control">
          <div className="filter">
            <div className="filter-text">Find:</div>
            <input
              className="filter-input"
              placeholder="Find by name"
              onChange={val => onSearch(val)}></input>
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
                Avatar
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUser?.map((row, index) => (
              <TableRow
                key={index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">
                  <img className='navigator-header__avatar' width={100} src={row.image ?? defaultAvatar} />
                </TableCell>
                <TableCell align="right">{row.name ?? '--'}</TableCell>
                <TableCell align="right">{row.email ?? '--'}</TableCell>
                <TableCell align="right">{row?.role ?? '--'}</TableCell>
                <TableCell align="right">{row?.address ?? '--'}</TableCell>
                <TableCell align="right">{row?.phone ?? '--'}</TableCell>
                <TableCell align="right">
                  <div className="user-option">
                    <div className="user-option-item view">
                      <Icon
                        baseClassName="fas"
                        className="fa-info"
                        sx={{fontSize: 18, padding: 3}}
                        onClick={() => {
                          setSelectedItem(row);
                          setOpen(true);
                        }}
                      />
                    </div>
                    <div className="user-option-item delete">
                      <Icon
                        onClick={() => handleDelete(row.email)}
                        baseClassName="fas"
                        className="fa-user-xmark"
                        sx={{fontSize: 18, padding: 0.5}}
                      />
                    </div>
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
      {ProfileForm(setOpen, open, selectedItem, true)}
    </div>
  );
};

export default User;

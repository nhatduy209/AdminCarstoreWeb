/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Dialog, Icon} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ProfileForm from '../profile/Component/ProfileForm/ProfileForm';
import {ToastContainer} from 'react-toastify';
import defaultAvatar from '../../assets/img/default-avatar.svg';
import emptyList from '../../assets/img/empty-list.svg';

import {
  getAllUser,
  deleteUser,
  deleteUserRedux,
} from '../../Redux/reducer/AccountReducer';

const options = ['View', 'Edit', 'Delete'];
const User = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cars = useSelector(state => state.CarReducer.listCar);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const listUser = useSelector(state => {
    if (!searchText.length) {
      return state.AccountReducer.listAcc.listUser;
    } else {
      return state.AccountReducer.listAcc.listUser.filter(item =>
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
    setSelectedItem(email);
    setDeleteOpen(true);
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
          <img height={150} width={150} src={emptyList} /> No data
        </div>
      </caption>
    );
  };
  const confirmDelete = () => {
    dispatch(deleteUser({email: selectedItem}));
    dispatch(deleteUserRedux(selectedItem));
    setSelectedItem(null);
    setDeleteOpen(false);
  };
  const cancelDelete = () => {
    setSelectedItem(null);
    setDeleteOpen(false);
  };
  const getUserPagination = () => {
    if (page - 1 < 0) {
      return listUser?.slice(0, rowsPerPage) || [];
    } else {
      return (
        listUser?.slice(
          page * rowsPerPage,
          (page + 1) * rowsPerPage < listUser.length
            ? (page + 1) * rowsPerPage
            : listUser.length,
        ) || []
      );
    }
  };
  return (
    <div className="management-container">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      <div className="car-management__header">
        <div className="car-management__header__control">
          <div className="filter filter-input">
            <Icon
              baseClassName="fas"
              className="fa-search"
              sx={{fontSize: 20, padding: 1, color: '#cecece'}}
            />
            <input
              className="no-border"
              placeholder="Find by name"
              onChange={val => onSearch(val)}></input>
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          sx={{minWidth: 650}}
          aria-label="simple table"
          className="dt-table">
          {renderNull()}
          <TableHead className="dt-table__header">
            <TableRow className="dt-table__header__row">
              <TableCell className="dt-table__header__cell">#</TableCell>
              <TableCell className="dt-table__header__cell" align="center">
                Avatar
              </TableCell>
              <TableCell className="dt-table__header__cell" align="center">
                Email
              </TableCell>
              <TableCell className="dt-table__header__cell" align="center">
                Role
              </TableCell>
              <TableCell className="dt-table__header__cell" align="center">
                Address
              </TableCell>
              <TableCell className="dt-table__header__cell" align="center">
                Phone Number
              </TableCell>
              <TableCell
                className="dt-table__header__cell"
                align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="dt-table__body">
            {getUserPagination().map((row, index) => (
              <TableRow
                className="dt-table__body__row"
                key={index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell
                  className="dt-table__body__cell"
                  component="th"
                  scope="row">
                  {index + 1}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  <div style={{display: 'flex', width: '200px'}}>
                    {' '}
                    <img
                      className="dt-table__avatar"
                      src={row.image ?? defaultAvatar}
                    />
                    <div style={{marginBlock: 'auto', marginLeft: '12px'}}>
                      {row.name ?? '--'}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {row.email ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {row?.role ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {row?.address ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {row?.phone ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  <div className="option">
                    <div className="option-item view">
                      <div
                        className="icon icon__detail"
                        onClick={() => {
                          setSelectedItem(row);
                          setOpen(true);
                        }}></div>
                    </div>
                    <div className="option-item delete">
                      <div
                        onClick={() => handleDelete(row.email)}
                        className="icon icon__delete"></div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          className="dt-table__pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={cars.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={deleteOpen}>
        <div className="car-form--main">
          <div className="car-form__header">
            <div></div>
            <Icon
              onClick={() => cancelDelete()}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          <div className="confirm-content">
            <img
              width={200}
              src={selectedItem?.img ?? ''}
              style={{margin: 'auto'}}
            />
            Are you sure you want to delete this user?
          </div>
          <div className="form-group-btn">
            <button className="cancel-btn">
              <div onClick={() => cancelDelete()}>Cancel</div>
            </button>
            <button
              className="confirm-btn">
              <div onClick={() => confirmDelete()}>Confirm</div>
            </button>
          </div>
        </div>
      </Dialog>
      {ProfileForm(setOpen, open, selectedItem, true)}
    </div>
  );
};

export default User;

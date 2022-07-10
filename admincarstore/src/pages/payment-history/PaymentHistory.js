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
import Dialog from '@mui/material/Dialog';
import {ToastContainer} from 'react-toastify';
import BillForm from './Component/BillForm/BillForm';
import {getBills} from '../../Redux/reducer/PaymentHistoryReducer';
import emptyList from '../../assets/img/empty-list.svg';
import { formatFullDate } from '../../helps/formatter';
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
const PaymentHistory = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const bills = useSelector(state => {
    if (!searchText.length) {
      return state.PaymentHistoryReducer.bills;
    } else {
      return state.PaymentHistoryReducer.bills.filter(item =>
        item.car.car_name.includes(searchText),
      );
    }
  });

  useEffect(() => {
    dispatch(getBills());
  }, [pageIndex, rowsPerPage]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
    return bills.length > 0 ? (
      <caption></caption>
    ) : (
      <caption>
        <div className="table-null">
          <img height={100} width={100} src={emptyList} /> No data
        </div>
      </caption>
    );
  };
  const getCarPagination = () => {
    if (page - 1 < 0) {
      return bills?.slice(0, rowsPerPage) || [];
    } else {
      return (
        bills?.slice(
          page * rowsPerPage,
          (page + 1) * rowsPerPage < bills.length
            ? (page + 1) * rowsPerPage
            : bills.length,
        ) || []
      );
    }
  };
  return (
    <div className="management-container">
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
      <TableContainer component={Paper} className="dt-table">
        <Table sx={{minWidth: 650}} aria-label="simple table">
          {renderNull()}
          <TableHead className="dt-table__header">
            <TableRow className="dt-table__header__row">
              <TableCell className="dt-table__header__cell">#</TableCell>
              <TableCell
                className="dt-table__header__cell"
                align="right"
                width="45">
                Image
              </TableCell>
              <TableCell className="dt-table__header__cell" align="right">
                Name
              </TableCell>
              <TableCell className="dt-table__header__cell" align="right">
                Selling Date
              </TableCell>
              <TableCell className="dt-table__header__cell" align="right">
                Info
              </TableCell>
              <TableCell className="dt-table__header__cell" align="right">
                Admin Info
              </TableCell>
              <TableCell
                className="dt-table__header__cell"
                align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="dt-table__body">
            {getCarPagination().map((row, index) => (
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
                  <img width={100} src={row.car.image} />
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {row.car.car_name ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  {formatFullDate(row.car.selling_date) ?? '--'}
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  <div>
                    <div>{row.client?.name ?? '--'}</div>
                    <div>{row.client?.email ?? '--'}</div>
                  </div>
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  <div>
                    <div>{row.admin?.name ?? '--'}</div>
                    <div>{row.admin?.email ?? '--'}</div>
                  </div>
                </TableCell>
                <TableCell className="dt-table__body__cell" align="right">
                  <div className="option">
                    <div className="option-item view">
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
                    {/* <div className="user-option-item delete">
                      <Icon
                        onClick={() => handleDelete(row.email)}
                        baseClassName="fas"
                        className="fa-circle-minus"
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
          count={bills.length ?? 0}
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
            <div>Bill detail</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          {BillForm(selectedItem)}
        </div>
      </Dialog>
    </div>
  );
};

export default PaymentHistory;

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
import Dialog from '@mui/material/Dialog';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeCarStatus,
  deleteCar,
  getCar,
} from '../../Redux/reducer/CarReducer';
import CarForm from './Component/CarForm/CarForm';
import {getCategory} from '../../Redux/reducer/CategoryReducer';
import {ToastContainer} from 'react-toastify';

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
const CarManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [formType, setFormType] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchText, setSearchText] = useState('');
  const carStatus = useSelector(state => state.CarReducer.status);
  const cars = useSelector(state => {
    if (!searchText.length) {
      return state.CarReducer.listCar;
    } else {
      return state.CarReducer.listCar.filter(item =>
        item.name.includes(searchText),
      );
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (carStatus) {
      dispatch(changeCarStatus());
      return;
    }
    dispatch(getCar({start: 0, end: 30}));
    dispatch(getCategory());
  }, [pageIndex, rowsPerPage, carStatus]);

  useEffect(() => {
    if (!open) {
      setSelectedItem(null);
      setFormType('create');
    }
  }, [open]);

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

  const handleDelete = item => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };
  const confirmDelete = () => {
    dispatch(deleteCar(selectedItem.name));
    setSelectedItem(null);
    setDeleteOpen(false);
  };
  const cancelDelete = () => {
    setSelectedItem(null);
    setDeleteOpen(false);
  };

  const onSearch = val => {
    setTimeout(() => setSearchText(val.target.value), 1000);
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
      <div className="car-management__header">
        <div className="car-management__header__title">Cars</div>
        <div className="car-management__header__control">
          <div className="filter">
            <div className="filter-text">Find:</div>
            <input
              className="filter-input"
              placeholder="Find by name"
              onChange={val => onSearch(val)}></input>
          </div>
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
              <TableCell align="center" width="45">
                Image
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Brand</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center"></TableCell>
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
                <TableCell align="center">
                  <img width={200} src={row.img} />
                </TableCell>
                <TableCell align="center">{row.name ?? '--'}</TableCell>
                <TableCell align="center">{row.category ?? '--'}</TableCell>
                <TableCell align="center">
                  {row?.color[0]?.numberInStore ?? '--'}
                </TableCell>
                <TableCell align="center">{`$${row.prices ?? '--'}`}</TableCell>
                <TableCell align="center">
                  <div
                    className="car-color"
                    style={{
                      backgroundColor: row.color[0]?.color ?? 'black',
                    }}></div>
                </TableCell>
                <TableCell align="center">
                  <div className="user-option">
                    <div className="user-option-item edit">
                      <Icon
                        baseClassName="fas"
                        className="fa-pencil"
                        sx={{fontSize: 18, padding: 3}}
                        onClick={() => {
                          setFormType('edit');
                          setSelectedItem(row);
                          setOpen(true);
                        }}
                      />
                    </div>
                    <div className="user-option-item view">
                      <Icon
                        baseClassName="fas"
                        className="fa-info"
                        sx={{fontSize: 18, padding: 3}}
                        onClick={() => {
                          setFormType('detail');
                          setSelectedItem(row);
                          setOpen(true);
                        }}
                      />
                    </div>
                    <div className="user-option-item delete">
                      <Icon
                        onClick={() => handleDelete(row)}
                        baseClassName="fas"
                        className="fa-trash"
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
          <div className='confirm-content'>
          <img width={200} src={selectedItem?.img ?? ''} style={{margin: 'auto'}}/>
          Are you sure you want to delete this car?
          </div>
          <div className="form-group-btn">
            <button className="cancel-btn">
              <div onClick={() => cancelDelete()}>Cancel</div>
            </button>
            <button
              className="confirm-btn"
              style={formType === 'detail' ? {display: 'none'} : {}}>
              <div onClick={() => confirmDelete()}>Confirm</div>
            </button>
          </div>
        </div>
      </Dialog>
      {CarForm(selectedItem, formType, setOpen, open)}
    </div>
  );
};

export default CarManagement;

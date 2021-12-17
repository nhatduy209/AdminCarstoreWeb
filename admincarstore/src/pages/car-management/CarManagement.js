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
import {getCar, getListCar} from '../../Redux/reducer/CarReducer';
import {ToastContainer, toast} from 'react-toastify';

function createData(name, calories, fat, carbs, protein) {
  return {name, calories, fat, carbs, protein};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const CarManagement = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [cars, setCar] = useState([]);
  const getListCars = useSelector(getListCar);
  const dispatch = useDispatch();

  console.log('LIST--', getListCars);

  const handleGet = useCallback(() => {
    console.log('click');
    try {
      dispatch(getCar());
    } catch (Err) {
      console.log(Err);
    }
    console.log('OH NO');
    // toast.success('Success Loggin !', {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    // setCar(getListCars);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const optionClick = () => {
    console.log('click');
  };
  return (
    <div className="car-management-container">
      <div className="car-management__header">
        <div className="car-management__header__title">Title</div>
        <div className="car-management__header__control">
          <input />
          <div className="add-button">
            <Icon
              onClick={() => handleGet()}
              baseClassName="fas"
              className="fa-car-side"
              sx={{fontSize: 20, padding: 1, color: '#fff', marginLeft: -0.5}}
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right" width="45">
                Image
              </TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Color</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right" onClick={() => optionClick()}>
                  <Icon
                    baseClassName="fas"
                    className="fa-ellipsis-vertical"
                    sx={{fontSize: 18}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default CarManagement;

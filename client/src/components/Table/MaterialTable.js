import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { Button } from 'semantic-ui-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import EnhancedTableHead from './TableHead';

import { deleteBio } from '../../actions/bioActions';
import { getComparator, stableSort } from '../../helpers/helperFunctions';
import { useStyles } from '../../helpers/styleFunctions';

import styles from './Table.module.css';

export default function EnhancedTable({ setCurrentId }) {
	const bios = useSelector((state) => state.bio);

	console.log(bios);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ order, setOrder ] = React.useState('asc');
	const [ orderBy, setOrderBy ] = React.useState('calories');
	const [ selected, setSelected ] = React.useState([]);
	const [ page, setPage ] = React.useState(0);
	const [ dense, setDense ] = React.useState(false);
	const [ rowsPerPage, setRowsPerPage ] = React.useState(5);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = bios.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleChangeDense = (event) => {
		setDense(event.target.checked);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, bios.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<TableContainer>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={dense ? 'small' : 'medium'}
						aria-label='enhanced table'
					>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={bios.length}
						/>
						<TableBody>
							{
								stableSort(bios, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										const isItemSelected = isSelected(row.name);
										const labelId = `enhanced-table-checkbox-${index}`;

										return (
											<TableRow
												hover
												onClick={(event) => handleClick(event, row.name)}
												role='checkbox'
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={row.name}
												selected={isItemSelected}
											>
												<TableCell component='th' id={labelId} scope='row' align='center'>
													{row.name}
												</TableCell>
												<TableCell align='center'>{row.email}</TableCell>
												<TableCell align='center'>{row.mobile}</TableCell>
												<TableCell align='center'>
													{moment(row.dateOfBirth).format('DD-MM-YYYY')}
												</TableCell>
												<TableCell align='center'>{row.jobType}</TableCell>
												<TableCell align='center'>
													<div className={styles.action}>
														<img
															className={styles.profile}
															src={row.profilePicture}
															alt='pp'
														/>
														<Button
															primary
															onClick={() => {
																setCurrentId(row._id);
															}}
														>
															<i className='fas fa-edit    ' />
														</Button>
														<Button
															color='red'
															onClick={() => dispatch(deleteBio(row._id))}
														>
															<i className='fas fa-trash    ' />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										);
									})}
							{emptyRows > 0 && (
								<TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[ 5, 10, 25 ]}
					component='div'
					count={bios.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
		</div>
	);
}

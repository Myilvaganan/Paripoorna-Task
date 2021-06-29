import React from 'react';
import moment from 'moment';
import { Table, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBio, sortByAsc } from '../../actions/bioActions';

import styles from './Table.module.css';
const DataTable = ({ setCurrentId }) => {
	const bios = useSelector((state) => state.bio);

	const dispatch = useDispatch();

	return (
		<Table singleLine>
			<Button onClick={() => dispatch(sortByAsc())}>Sort</Button>
			<Table.Header>
				<Table.Row align='center'>
					<Table.HeaderCell onClick={() => dispatch(sortByAsc())}>Name</Table.HeaderCell>
					<Table.HeaderCell>Email</Table.HeaderCell>
					<Table.HeaderCell>Mobile</Table.HeaderCell>
					<Table.HeaderCell>DOB</Table.HeaderCell>
					<Table.HeaderCell>Job Type</Table.HeaderCell>
					<Table.HeaderCell>Actions</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body align='center'>
				{bios.map(({ name, email, mobile, dateOfBirth, jobType, _id, profilePicture }) => (
					<Table.Row key={_id}>
						<Table.Cell>{name}</Table.Cell>
						<Table.Cell>{email}</Table.Cell>
						<Table.Cell>{mobile}</Table.Cell>
						<Table.Cell>{moment(dateOfBirth).format('DD-MM-YYYY')}</Table.Cell>
						<Table.Cell>{jobType}</Table.Cell>
						<Table.Cell className={styles.action}>
							<img className={styles.profile} src={profilePicture} alt='pp' />
							<Button
								primary
								onClick={() => {
									setCurrentId(_id);
								}}
							>
								<i className='fas fa-edit    ' />
							</Button>
							<Button color='red' onClick={() => dispatch(deleteBio(_id))}>
								<i className='fas fa-trash    ' />
							</Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
};

export default DataTable;

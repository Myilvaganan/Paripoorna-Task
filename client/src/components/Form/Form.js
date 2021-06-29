import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { Form, Button } from 'semantic-ui-react';

import { createBio, updateBio } from '../../actions/bioActions';
import styles from './Form.module.css';

const options = [
	{ key: 'c', text: 'Chennai', value: 'chennai' },
	{ key: 's', text: 'Salem', value: 'salem' },
	{ key: 'b', text: 'Bangalore', value: 'bangalore' },
	{ key: 'coi', text: 'Coimbatore', value: 'coimbatore' },
	{ key: 'co', text: 'Cochin', value: 'cochin' }
];
const Forms = ({ currentId, setCurrentId }) => {
	const dispatch = useDispatch();
	const bio = useSelector((state) => (currentId ? state.bio.find((content) => content._id === currentId) : null));

	const [ bioData, setBioData ] = useState({
		name: '',
		email: '',
		mobile: '',
		location: '',
		dateOfBirth: '04-11-1996',
		jobType: 'full time',
		profilePicture: ''
	});

	useEffect(
		() => {
			if (bio) setBioData(bio);
		},
		[ bio ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(currentId);
		if (currentId) {
			dispatch(updateBio(currentId, bioData));
			clearHandler();
		} else {
			dispatch(createBio(bioData));
			clearHandler();
		}
	};

	const clearHandler = () => {
		setCurrentId(null);
		setBioData({
			name: '',
			email: '',
			mobile: '',
			location: '',
			dateOfBirth: '',
			jobType: '',
			profilePicture: ''
		});
	};

	const handleChange = (e, { value, name }) => {
		setBioData({ ...bioData, [name]: value });
	};

	return (
		<div className={styles.form}>
			<Form onSubmit={submitHandler}>
				<Form.Group widths='equal'>
					<Form.Input
						label='Full Name'
						placeholder='Full Name'
						name='name'
						value={bioData.name}
						onChange={handleChange}
						required
					/>
					<div className={styles.fileInput}>
						<FileBase
							type='file'
							multiple={false}
							onDone={({ base64 }) => setBioData({ ...bioData, profilePicture: base64 })}
						/>
					</div>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input
						label='Mobile'
						placeholder='Mobile Number'
						name='mobile'
						value={bioData.mobile}
						onChange={handleChange}
						required
					/>
					<Form.Input
						label='Email'
						placeholder='Email Id'
						name='email'
						value={bioData.email}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Select
						label='Location'
						options={options}
						placeholder='Choose location'
						name='location'
						onChange={handleChange}
						required
					/>{' '}
					<Form.Input
						type='date'
						label='DOB'
						name='dateOfBirth'
						value={bioData.dateOfBirth}
						onChange={handleChange}
						required
					/>
				</Form.Group>
				<Form.Group>
					<label>JobType</label>
					<Form.Radio
						label='Full Time'
						value='full time'
						name='jobType'
						checked={bioData.jobType === 'full time'}
						onChange={handleChange}
					/>
					<Form.Radio
						label='Part Time'
						value='part time'
						name='jobType'
						checked={bioData.jobType === 'part time'}
						onChange={handleChange}
					/>
					<Form.Radio
						label='Consultant'
						value='consultant'
						name='jobType'
						checked={bioData.jobType === 'consultant'}
						onChange={handleChange}
					/>{' '}
				</Form.Group>
				<Form.Group className={styles.button}>
					<Form.Button color='green'>
						ADD / UPDATE
					</Form.Button>
					<Button onClick={clearHandler}>
						<i className='fas fa-sync' />
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Forms;

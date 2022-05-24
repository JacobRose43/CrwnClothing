//REACT
import { useState } from 'react';

// FIREBASE
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

// COMPONENTS
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

// STYLE
import './sign-up-form.style.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFileds = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFileds();
		} catch (e) {
			if (e.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log(`User creation: ${e.message}`);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign Up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					inputOptions={{
						required: true,
						type: 'text',
						onChange: handleChange,
						name: 'displayName',
						value: displayName,
					}} // double brackets coz its nested element in html (javascript) { and then inside creating { object } }
				/>

				<FormInput
					label='Email'
					inputOptions={{
						required: true,
						type: 'email',
						onChange: handleChange,
						name: 'email',
						value: email,
					}}
				/>

				<FormInput
					label='Password'
					inputOptions={{
						required: true,
						type: 'password',
						onChange: handleChange,
						name: 'password',
						value: password,
					}}
				/>

				<FormInput
					label='Confirm Password'
					inputOptions={{
						required: true,
						type: 'password',
						onChange: handleChange,
						name: 'confirmPassword',
						value: confirmPassword,
					}}
				/>

				<Button buttonType={BUTTON_TYPES_CLASSES.base} type='submit'>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;

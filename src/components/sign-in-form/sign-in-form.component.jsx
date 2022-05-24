//REACT
import { useState } from 'react';

// FIREBASE
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

// COMPONENTS
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

// STYLE
import './sign-in-form.style.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFileds = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);

			resetFormFileds();
			alert('logged in!');
		} catch (e) {
			alert('User Sign In Failed');
			console.log(e);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign In with your email and password</span>
			<form onSubmit={handleSubmit}>
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

				<div className='buttons-container'>
					<Button buttonType={BUTTON_TYPES_CLASSES.base} type='submit'>
						Sign In
					</Button>
					<Button
						buttonType={BUTTON_TYPES_CLASSES.google}
						type='button'
						onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;

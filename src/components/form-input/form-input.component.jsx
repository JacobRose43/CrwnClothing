import { Group, Input, FormInputLabel } from './form-input.style';

const FormInput = ({ label, inputOptions }) => {
	return (
		<Group>
			<Input {...inputOptions} />

			{label && (
				// && ----> if label THEN -> ...  thats short of "then"
				<FormInputLabel shrink={inputOptions.value.length}>{label}</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;

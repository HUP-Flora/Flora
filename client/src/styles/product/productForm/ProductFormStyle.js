import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

export const UploadPictureWrapper = styled.div`
	// margin: 0 16px;
	// margin-bottom: 32px;
	padding: 32px 0;

	background-color: var(--gray-50);

	border: 1px solid ${props => (props.isError ? "var(--primary-500)" : "var(--gray-500)")};
	border-radius: 5px;
`;

export const PictureWrapper = styled.div`
	margin: 0 16px;
	margin-bottom: 32px;
`;

export const FormWrapper = styled.div`
	margin: 0 16px;
	padding-bottom: 150px;

	& div:nth-child(2) > div:first-child {
		display: flex;
		align-items: end;
	}

	& div:nth-child(2) > div:first-child > input {
		text-align: right;

		::placeholder {
			text-align: left;
		}
	}

	& p {
		margin-left: 8px;
	}
`;

export const InputWrapper = styled.div`
	margin-bottom: 32px;
	align-items: flex-end;
`;

export const BottomBorderInput = styled.input`
	width: 100%;

	padding: 8px;

	border: none;
	border-bottom: 1px solid var(--gray-500);

	::placeholder {
		color: var(--gray-500);
	}

	&:focus {
		outline: none;

		border: none;
		border-bottom: 1.5px solid black;
	}
`;

export const BorderTextAreaAuto = styled(TextareaAutosize)`
	width: 100%;

	padding: 8px;

	border: 1px solid var(--gray-500);
	border-radius: 5px;

	resize: none;

	::placeholder {
		color: var(--gray-500);
	}

	:focus {
		outline: none;
		border: 1px solid black;
	}
`;

export const BorderTextArea = styled.textarea`
	width: 100%;

	padding: 8px;

	border: 1px solid var(--gray-500);
	border-radius: 5px;

	resize: none;

	::placeholder {
		color: var(--gray-500);
	}

	:focus {
		outline: none;
		border: 1px solid black;
	}
`;

export const TextLimit = styled.div`
	margin-top: 4px;
	margin-left: 8px;

	display: block;
	float: right;
	width: 50px;
`;

export const ValidTextWrapper = styled.div`
	display: inline-flex !important;
`;

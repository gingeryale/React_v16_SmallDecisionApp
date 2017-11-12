import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
	<div>
		<Modal 
		isOpen={!!props.SelectedOption}
		onRequestClose={props.handleClearModal}
		contentLabel="Selected Option"
		closeTimeoutMS={200}
		className="modal"
		>
		<h3 className="modal__title">Selected Option</h3>
		{props.SelectedOption && <p className="modal__body">{props.SelectedOption}</p>}
		<button className="button" onClick={props.handleClearModal}>Close</button>
		</Modal>
	</div>
);

export default OptionModal;
import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttp from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttp(axios);

        return (
            <Aux>
                <Modal
                    show={error}
                    closeModal={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;
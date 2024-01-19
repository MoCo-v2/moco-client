import styled from 'styled-components';

import {Modal} from 'react-bootstrap';

export const StyledModal = styled(Modal)`
  --bs-modal-header-padding: 1.5rem;
  --bs-modal-padding: 1.5rem;
  --bs-modal-border-radius: 2rem;
  --bs-modal-border-color: #d1d1d1;
  .modal-content {
    padding: 1.5rem 0;
  }
  .modal-body {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
  }
  .modal-footer {
    border-top: 0;
    justify-content: center;
  }
  .btn {
    min-width: 8rem;
    font-size: 1.6rem;
    font-weight: 600;
    padding: 0.8rem 1.5rem;
    border-radius: 5rem;
  }
`;

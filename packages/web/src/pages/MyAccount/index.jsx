import React, { useContext, useState } from 'react';
import Card from '../../containers/Card';
import PageTitle from '../../components/Header/PageTitle';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import { UserContext } from '../../contexts/UserContext';
import { DataTitle, DataWrapper } from './styles';
import ChangePasswordForm from './ChangePasswordForm';
import SinglePageLoading from '../../components/SinglePageLoading';

const MyAccount = () => {
  const [user] = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return !user ? (
    <SinglePageLoading />
  ) : (
    <>
      <PageTitle>My Account</PageTitle>
      <Card borderRadius="10px" padding="30px">
        <DataWrapper>
          <DataTitle>Name:</DataTitle> {user.name}
        </DataWrapper>
        <DataWrapper>
          <DataTitle>E-mail:</DataTitle> {user.email}
        </DataWrapper>
      </Card>
      <Button onClick={() => setModalOpen(true)}>Change Password</Button>
      {modalOpen && (
        <Modal open={modalOpen} onClose={handleModalClose}>
          <ChangePasswordForm modalClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
};

export default MyAccount;

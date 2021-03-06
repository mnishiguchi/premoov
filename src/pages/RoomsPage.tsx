import React from 'react';
import { Fab, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { Link } from '@reach/router';
import { toast } from 'react-toastify';

import SEO from '../components/SEO';
import { selectProjectById } from '../redux/selectors';
import RoomTable from '../components/RoomTable';
import RoomFormDialog from '../components/RoomFormDialog';
import useToggle from '../components/useToggle';
import { Room } from '../types';
import PageContainer from '../components/PageContainer';
import AppHeader from '../components/AppHeader';
import { createRoomAction, updateRoomAction, deleteRoomAction } from '../redux/actions';

const RoomsPage: React.FC<{
  projectId: string;
}> = ({ projectId }) => {
  const { project, rooms } = useSelector(selectProjectById(projectId));
  const dispatch = useDispatch();

  const {
    open: openAddRoomModal,
    close: closeAddRoomModal,
    isOpen: isOpenAddRoomModal,
  } = useToggle(false);

  const handleRoomAdded = (room: Room, projectId: string) => {
    dispatch(createRoomAction(room, projectId));
    toast.success(`${room.name} was created`);
  };

  const handleRoomUpdated = (room: Room) => {
    dispatch(updateRoomAction(room));
    toast.success(`${room.name} was updated`);
  };

  const handleRoomDeleted = (roomId: string) => {
    dispatch(deleteRoomAction(roomId));
    toast.success(`Room was deleted`);
  };

  return (
    <>
      <AppHeader />

      <PageContainer>
        <SEO title={`Rooms | ${project!.name}`} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1" gutterBottom>
              Rooms of <Link to={`/projects/${project!.id}`}>{project!.name}</Link>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            {rooms.length > 0 && (
              <Fab color="primary" style={{ float: 'right' }} onClick={openAddRoomModal}>
                <AddIcon />
              </Fab>
            )}
          </Grid>

          <Grid item xs={12}>
            <RoomTable
              rows={rooms}
              onItemUpdated={handleRoomUpdated}
              onItemDeleted={handleRoomDeleted}
            />
          </Grid>
        </Grid>

        <div className="Premoov-modals">
          {project && (
            <RoomFormDialog
              key={shortid.generate()}
              isOpen={isOpenAddRoomModal}
              onClose={closeAddRoomModal}
              onSubmit={(room: Room, { resetForm }: any) => {
                closeAddRoomModal();
                handleRoomAdded(room, projectId);
                resetForm();
              }}
              title={`Add Room to "${project!.name}"`}
            />
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default RoomsPage;

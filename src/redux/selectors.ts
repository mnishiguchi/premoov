import { AppState, Project, Room, RoomItem } from '../types';

type selectProjectByIdType = (
  productId: string
) => (
  state: AppState
) => {
  project?: Project;
  rooms: Room[];
  roomItems: RoomItem[];
};

export const selectProjectById: selectProjectByIdType = (productId: string) => (
  state: AppState
) => ({
  project: state.projects.find((project: Project) => project.id === productId),
  rooms: state.rooms.filter((room: Room) => room.projectId === productId),
  roomItems: state.roomItems.filter((roomItem: RoomItem) => roomItem.projectId === productId),
});

export const createFilterRoomsByProjectId = (rooms: Room[]) => (projectId: string) =>
  rooms.filter((room: Room) => room.projectId === projectId);

export const createFilterRoomItemsByProjectId = (roomItems: RoomItem[]) => (projectId: string) =>
  roomItems.filter((roomItem: RoomItem) => roomItem.projectId === projectId);

export const sumRoomItemsCount = (roomItems: RoomItem[]) =>
  roomItems.reduce((acc: number, roomItem: RoomItem) => acc + roomItem.count, 0);

export const sumRoomItemsVolume = (roomItems: RoomItem[]) =>
  roomItems.reduce((acc: number, roomItem: RoomItem) => acc + roomItem.volume * roomItem.count, 0);

import { AppState, Project, Room, RoomItem } from '../types';

type SelectProjectByIdType = (
  productId: string
) => (
  state: AppState
) => {
  project?: Project;
  rooms: Room[];
  roomItems: RoomItem[];
  defaultVolumeLookup: any;
};

export const selectProjectById: SelectProjectByIdType = (productId: string) => (
  state: AppState
) => ({
  project: state.projects.find((project: Project) => project.id === productId),
  rooms: state.rooms.filter((room: Room) => room.projectId === productId),
  roomItems: state.roomItems.filter((roomItem: RoomItem) => roomItem.projectId === productId),
  defaultVolumeLookup: state.defaultVolumeLookup,
});

export const selectDefaultRoomItemNames: (state: AppState) => string[] = state =>
  Object.keys(state.defaultVolumeLookup);

export const createFilterRoomsByProjectId = (rooms: Room[]) => (projectId: string) =>
  rooms.filter((room: Room) => room.projectId === projectId);

export const createFilterRoomItemsByProjectId = (roomItems: RoomItem[]) => (projectId: string) =>
  roomItems.filter((roomItem: RoomItem) => roomItem.projectId === projectId);

export const sumRoomItemsCount = (roomItems: RoomItem[]) =>
  roomItems.reduce((acc: number, roomItem: RoomItem) => acc + roomItem.count, 0);

export const sumRoomItemsVolume = (roomItems: RoomItem[]) =>
  roomItems.reduce((acc: number, roomItem: RoomItem) => acc + roomItem.volume * roomItem.count, 0);

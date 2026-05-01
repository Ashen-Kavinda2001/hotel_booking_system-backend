import express from 'express';
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom, disableRoom } from '../controllers/RoomController.js';

const roomRouter = express.Router();

roomRouter.get('/', getRooms);
roomRouter.get("/:roomNumber", getRoomById);
roomRouter.post('/', createRoom);
roomRouter.put('/:roomNumber', updateRoom);
roomRouter.delete('/:roomNumber', deleteRoom);
roomRouter.patch('/:roomNumber/disable', disableRoom);

export default roomRouter;

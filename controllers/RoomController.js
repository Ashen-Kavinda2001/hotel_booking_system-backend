import Room from '../models/room.js';

export function getRooms(req, res) {
    Room.find().then(
        (roomsList) => {
            res.json({
                list: roomsList
            });
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error fetching rooms'
        });
    });
}

export function getRoomById(req, res) {
    const roomNumber = req.params.roomNumber;
    Room.findOne({ roomNumber: roomNumber }).then(
        (room) => {
            if (room) {
                res.json(room);
            } else {
                res.status(404).json({
                    message: 'Room not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error fetching room'
        });
    });
}

export function createRoom(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({
            message: 'Please login to create room'
        });
    }
    if (user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can create rooms'
        });
    }

    const roomData = {
        roomNumber: req.body.roomNumber,
        category: req.body.category,
        maxGuests: req.body.maxGuests,
        photos: req.body.photos,
        description: req.body.description
    };

    const newRoom = new Room(roomData);
    newRoom.save().then(() => {
        res.json({
            message: 'Room added successfully'
        });
    }).catch(() => {
        res.status(500).json({
            message: 'Error adding room'
        });
    });
}

export function updateRoom(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({
            message: 'Please login to update room'
        });
    }
    if (user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can update rooms'
        });
    }

    const roomNumber = req.params.roomNumber;
    Room.findOneAndUpdate({ roomNumber: roomNumber }, req.body, { new: true }).then(
        (room) => {
            if (room) {
                res.json({
                    message: 'Room updated successfully',
                    room: room
                });
            } else {
                res.status(404).json({
                    message: 'Room not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error updating room'
        });
    });
}

export function deleteRoom(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({
            message: 'Please login to delete room'
        });
    }
    if (user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can delete rooms'
        });
    }

    const roomNumber = req.params.roomNumber;
    Room.findOneAndDelete({ roomNumber: roomNumber }).then(
        (room) => {
            if (room) {
                res.json({
                    message: 'Room deleted successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Room not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error deleting room'
        });
    });
}

export function disableRoom(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({
            message: 'Please login'
        });
    }
    if (user.type !== 'Admin') {
        return res.status(403).json({
            message: 'Only admin can disable rooms'
        });
    }

    const roomId = req.params.id;
    Room.findByIdAndUpdate(roomId, { disabled: true }, { new: true }).then(
        (room) => {
            if (room) {
                res.json({
                    message: 'Room disabled successfully'
                });
            } else {
                res.status(404).json({
                    message: 'Room not found'
                });
            }
        }
    ).catch(() => {
        res.status(500).json({
            message: 'Error disabling room'
        });
    });
}

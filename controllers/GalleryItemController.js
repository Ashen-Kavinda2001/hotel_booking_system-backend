
import GalleryItem from '../models/galleryItems.js';

export function getGalleryItem(req, res) {
    GalleryItem.find().then(
        (galleryItemsList) => {
            res.json({
                list: galleryItemsList
            });
        }
    )
}

export function postGalleryItem(req, res) {
    const user = req.body.user;
    if (user == null) {
        return res.status(403).json({ 
            message: 'please login to create gallery item' 
        });

    }
    if(user.type !== 'admin') {
        return res.status(403).json({ 
            message: 'only admin can create gallery item' 
        });
    }

    const galleryItem = req.body.item;
    const newGalleryItem = new GalleryItem(galleryItem);

    newGalleryItem.save().then(() => {
        res.json({
            message: 'Gallery item added successfully'
        }); 
    }).catch(() => {
        res.status(500).json({
            message: 'Error adding gallery item'
        });
    });
}
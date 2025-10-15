import express from 'express';

const galleryItemRoute =express.Router();
import { getGalleryItem, postGalleryItem} from '../controllers/GalleryItemController.js';  

galleryItemRoute.get('/',getGalleryItem)

galleryItemRoute.post('/',postGalleryItem)  

// galleryItemRoute.put('/',putGalleryItem)

// galleryItemRoute.delete('/',deleteGalleryItem)

export default galleryItemRoute;
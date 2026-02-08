const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validateApartment } = require('../middleware/validator');
const apartmentController = require('../controllers/apartmentcontroller');

router.get('/', auth, apartmentController.getApartments);
router.post('/', auth, validateApartment, apartmentController.createApartment);
router.get('/:id', auth, apartmentController.getApartmentById);
router.put('/:id', auth, validateApartment, apartmentController.updateApartment);
router.delete('/:id', auth, apartmentController.deleteApartment);

module.exports = router;
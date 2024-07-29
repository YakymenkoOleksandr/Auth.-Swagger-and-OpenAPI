import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createStudentSchema, updateStudentSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getStudentsController));

router.get('/:studentId', isValidId, checkRoles(ROLES.TEACHER, ROLES.PARENT), ctrlWrapper(getStudentByIdController));

router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

router.put(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

router.patch(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

router.delete(
  '/:studentId',
  isValidId,
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteStudentController),
);



export default router;

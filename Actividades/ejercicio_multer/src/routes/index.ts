import multer from 'multer';
import {Router, Request, Response} from 'express';
const router = Router();

const File = {
    originalname: string,
    mimetype: mimetype
};

const multerStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    }
})

const fileFilter = (req: Request, file: File, cd: FileFilterCallback) => {
    const isValid = file.mimetype.startsWith('images/');
    cd(null, isValid);
}

const upload = multer({
    storage: multerStorage,
    fileFilter
})

router.get('',(req: Request,res: Response)=> {
    res.send('Api Works');
})

router.post('/upload',upload.single('foto'),(req: Request,res: Response)=> {
    console.log('File: ', req.file)
    res.send('Endpoint para subir archivos');
})

export default router;
import { body, param, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({
            status: 400,
            mensaje: 'Error de validación de datos.',
            errors: errors.array({ onlyFirstError: true }),
        });
    };
};


export const createEquipoValidations: ValidationChain[] = [
    body('serial').notEmpty().withMessage('El serial es obligatorio').isString().isLength({ max: 50 }).withMessage('Serial muy largo.'),
    body('nombre_activo').notEmpty().withMessage('El nombre del activo es obligatorio.'),
    body('marca').notEmpty().withMessage('La marca es obligatoria.'),
    body('modelo').notEmpty().withMessage('El modelo es obligatorio.'),
    
    body('tipoId').isInt({ gt: 0 }).withMessage('Tipo debe ser un ID válido.'),
    body('ubicacionId').isInt({ gt: 0 }).withMessage('Ubicación debe ser un ID válido.'),
    body('responsableId').optional({ nullable: true }).isInt({ gt: 0 }).withMessage('Responsable debe ser un ID válido.'),
    
    body('fecha_adquisicion').isISO8601().toDate().withMessage('La fecha de adquisición debe ser una fecha válida (YYYY-MM-DD).'),
    

    body('estado').isIn(['Operativo', 'En Reparación', 'Descartado']).withMessage('Estado inválido.'),
];

export const loginValidations: ValidationChain[] = [
    body('email').isEmail().withMessage('Debe ser un correo electrónico válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
];
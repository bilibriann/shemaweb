import { z } from 'zod';

export const esquemaContacto = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'El nombre solo puede contener letras'),
  correo: z.string().email('Ingresa un correo electrónico válido').max(200),
  telefono: z
    .string()
    .regex(/^(\+?56)?[\s-]?[2-9]\d[\s-]?\d{4}[\s-]?\d{4}$|^$/, 'Formato de teléfono inválido (ej: +56 9 1234 5678)')
    .optional()
    .or(z.literal('')),
  asunto: z
    .string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(150, 'El asunto no puede superar los 150 caracteres'),
  mensaje: z
    .string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
  campoCebo: z.string().max(0, 'Campo inválido').optional(),
});

export type EntradaFormularioContacto = z.infer<typeof esquemaContacto>;

import z from 'zod'
export const StoreLowonganKerjaSchema = z.object({
  position: z.string().trim().min(2, "Posisiton Wajib diisi"),
  company: z.string().trim().min(1, "Nama Company Wajib Diisi"),
  location: z.string().trim().min(1, "Nama Location Wajib diisi"),
  is_open: z.boolean()
})
export const UpdateLowonganKerjaSchema = z.object({
  position: z.string().trim().min(2, "Posisiton Wajib diisi"),
  company: z.string().trim().min(3, "Nama Company Wajib Diisi"),
  location: z.string().trim().min(1, "Nama Location Wajib diisi"),
  is_open: z.boolean()
})
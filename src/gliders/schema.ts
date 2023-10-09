import { z } from "zod"

export const GliderClassEnum = z.enum(["A", "B", "B+", "C", "D", "COMPETITION", "OPEN"])
export const GliderTypeEnum = z.enum(["Cross country", "Acro", "Tandem", "Mini", "Speed", "Other"])

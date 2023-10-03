import { z } from "zod"

export const GliderClassEnum = z.enum(["A", "B", "B+", "C", "D", "COMPETITION", "OPEN"])

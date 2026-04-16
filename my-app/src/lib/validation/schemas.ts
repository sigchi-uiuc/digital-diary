import { z } from "zod"

/** Reusable constraints (OWASP: length limits, type safety) */
const MAX_EMAIL = 255
const CONTENT_MAX = 100_000
const DISPLAY_NAME_MAX = 100
const URL_MAX = 2048
const MEDIA_URLS_MAX = 20
const PROMPT_ITEM_MAX = 2000
const PROMPT_ITEMS_MAX = 50
const CUID_LENGTH = 25

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .max(MAX_EMAIL, "Email too long")
      .email("Invalid email"),
  })
  .strict()

/**
 * Media URLs are stored either as absolute URLs OR as relative paths we serve
 * from `/api/uploads/...`. Accept both, cap length.
 */
const mediaUrlSchema = z
  .string()
  .max(URL_MAX)
  .refine(
    (v) => v.startsWith("/api/uploads/") || /^https?:\/\//.test(v),
    "Invalid media URL"
  )

export const createEntrySchema = z
  .object({
    type: z.enum(["FREEWRITE", "GUIDED"]),
    content: z.string().max(CONTENT_MAX),
    visibility: z.enum(["PRIVATE", "PUBLIC", "PROTECTED"]).default("PRIVATE"),
    qualityEmoji: z.string().max(10).nullable().optional(),
    mediaUrls: z.array(mediaUrlSchema).max(MEDIA_URLS_MAX).default([]),
    locations: z
      .array(
        z.object({
          lat: z.number().min(-90).max(90),
          lng: z.number().min(-180).max(180),
          name: z.string().max(200).optional(),
          at: z.string().datetime().optional(),
        })
      )
      .max(100)
      .optional(),
  })
  .strict()

export const updateEntrySchema = z
  .object({
    content: z.string().max(CONTENT_MAX).optional(),
    visibility: z.enum(["PRIVATE", "PUBLIC", "PROTECTED"]).optional(),
    qualityEmoji: z.string().max(10).nullable().optional(),
    mediaUrls: z.array(mediaUrlSchema).max(MEDIA_URLS_MAX).optional(),
    locations: z
      .array(
        z.object({
          lat: z.number().min(-90).max(90),
          lng: z.number().min(-180).max(180),
          name: z.string().max(200).optional(),
          at: z.string().datetime().optional(),
        })
      )
      .max(100)
      .optional(),
  })
  .strict()

export const calendarSyncSchema = z
  .object({
    timeMin: z.string().datetime().optional(),
    timeMax: z.string().datetime().optional(),
    maxResults: z.coerce.number().int().min(1).max(250).default(50),
  })
  .strict()

export const calendarEventsQuerySchema = z.object({
  timeMin: z.string().datetime().optional(),
  timeMax: z.string().datetime().optional(),
  maxResults: z.coerce.number().int().min(1).max(250).default(50),
})

export const profileUpdateSchema = z
  .object({
    firstName: z.string().max(DISPLAY_NAME_MAX).nullable().optional(),
    lastName: z.string().max(DISPLAY_NAME_MAX).nullable().optional(),
    profilePicture: z.string().url().max(URL_MAX).nullable().optional(),
  })
  .strict()

const weatherDataSchema = z.object({
  city: z.string().max(100).optional(),
  state: z.string().max(50).optional(),
  condition: z.string().max(100).optional(),
  temperature: z.number().nullable().optional(),
  description: z.string().max(200).optional(),
})

export const followupQuestionsSchema = z
  .object({
    prompts: z.array(z.string().max(PROMPT_ITEM_MAX)).min(1).max(PROMPT_ITEMS_MAX),
    responses: z.array(z.string().max(PROMPT_ITEM_MAX)).min(1).max(PROMPT_ITEMS_MAX),
    mood: z.string().max(200).optional(),
    weather: weatherDataSchema.optional(),
  })
  .strict()
  .refine((data) => data.prompts.length === data.responses.length, {
    message: "prompts and responses must have the same length",
  })

export const journalQuestionsBodySchema = z
  .object({
    qualityScore: z.number().int().min(1).max(10).nullable().optional(),
  })
  .strict()

export const journalQuestionsQuerySchema = z.object({
  qualityScore: z.optional(z.coerce.number().int().min(1).max(10)),
})

export const weatherQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
})

/** Entry/account resource ID (cuid-like) */
export const resourceIdSchema = z
  .string()
  .min(20)
  .max(30)
  .regex(/^[a-z0-9]+$/, "Invalid id format")

export type SignupInput = z.infer<typeof signupSchema>
export type CreateEntryInput = z.infer<typeof createEntrySchema>
export type UpdateEntryInput = z.infer<typeof updateEntrySchema>
export type CalendarSyncInput = z.infer<typeof calendarSyncSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type FollowupQuestionsInput = z.infer<typeof followupQuestionsSchema>
export type JournalQuestionsBodyInput = z.infer<typeof journalQuestionsBodySchema>

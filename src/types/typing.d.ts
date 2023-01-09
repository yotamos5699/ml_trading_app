import { z } from "zod";

interface DateRange {
  startDate: string;
  endDate: string;
  resulution: {
    type: string;
    amount: number;
  };
}

export const ZodDateRange = {
  ticker: z.string(),
  token: z.string(),
  adjust: z.boolean().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  dateRange: z.object({
    startDate: z.string(),
    endDate: z.string(),
    resulution: z.object({
      type: z.string(),
      amount: z.number(),
    }),
  }),
};

export const ParsedZodDateRange = z.object({ ...ZodDateRange }).parse(null);

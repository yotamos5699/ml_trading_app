import { Input } from "postcss";
import { z } from "zod";
//import { ZodDateRange } from "../../../types/typing";
import { getSingleTickerData } from "../../utils/axiosCalls";
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

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const mainRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getTickerData: protectedProcedure
    .input(z.object({ ...ZodDateRange }))
    .query(async ({ input }) => {
      const result = await getSingleTickerData(input);
      console.log({ result });
      return {
        stockData: result,
      };
    }),
});

const 身体状态 = z.enum(['常态', '情动', '娇喘', '高潮余韵', '熟睡']);

const 机组人员 = z
  .object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 120, 200)),
    性欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    衣着: z.string(),
    内衣: z.string(),
    身体状态: 身体状态,
  })
  .transform(data => {
    const $好感阶段 =
      data.好感度 < 160
        ? '相爱'
        : '至死不渝';
    return { ...data, $好感阶段 };
  });

const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
    航班状态: z.string(),
  }),

  沈静姝: 机组人员,
  苏含烟: 机组人员,
  江雪: 机组人员,
  顾知秋: 机组人员,
  江如歌: 机组人员,

  虞栖梧: z
    .object({
      好感度: z.coerce.number().transform(v => _.clamp(v, 0, 200)),
      性欲值: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
      衣着: z.string(),
      内衣: z.string(),
      身体状态: 身体状态,
    })
    .transform(data => {
      const $好感阶段 =
        data.好感度 < 40
          ? '陌生'
          : data.好感度 < 80
            ? '熟悉'
            : data.好感度 < 120
              ? '亲密'
              : data.好感度 < 160
                ? '相爱'
                : '至死不渝';
      return { ...data, $好感阶段 };
    }),
});

export { Schema };
export type Schema = z.output<typeof Schema>;

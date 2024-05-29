"use client";

import { formatDate } from "@/app/utils/helpers";

export default function DynamicDateFormat({
  date,
  classes,
}: {
  date: Date;
  classes?: string;
}) {
  return <div className={classes}>{`Released at: ${formatDate(date)}`}</div>;
}

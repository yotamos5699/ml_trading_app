import { useState } from "react";
import { useLogger } from "../../pages/dashboard";
import { ParsedZodDateRange } from "../../types/typing";

type _ParsedZodDateRange = typeof ParsedZodDateRange;

interface topNavProps {
  handleClick: Function;
  vectors: _ParsedZodDateRange;
  setVectors: React.Dispatch<React.SetStateAction<_ParsedZodDateRange>>;
  token: string;
}
const timeGaps = [
  { value: "minute", name: "דקה" },
  { value: "nour", name: "שעה" },
  { value: "day", name: "יום" },
  { value: "week", name: "שבוע" },
  { value: "month", name: "חודש" },
  { value: "quarter", name: "רבעון" },
  { value: "year", name: "שנה" },
];

export const TopNav = (props: topNavProps) => {
  const [dateFocus, setDateFocus] = useState({
    start: false,
    end: false,
    timeDup: false,
  });

  useLogger(dateFocus);

  return (
    <div className="top_nav ">
      <button className="btn1 mt-2 mr-2 h-8 w-1/12">משוך</button>
      <div className="tnvi_1 ">
        <select
          className="sl"
          name="select"
          //className={"bg-orange-100 align-middle text-5xl text-black"}
          id="pivot"
          onChange={(e) => {
            console.log(e);
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                ticker: e.target.value,
                dateRange: {
                  ...props.vectors.dateRange,

                  resulution: {
                    ...props.vectors.dateRange.resulution,
                  },
                },
              });
          }}
        >
          <option className="f_1" value={undefined} selected hidden>
            בחר מניות
          </option>
          {timeGaps.map((tg: any, idx: number) => (
            <option className="w-1/3 text-xl text-black" key={idx}>
              {tg.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tnvi_2">
        <p>פיצולים</p>
        <input
          className="f_1"
          onChange={(e) => {
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                adjust: JSON.parse(e.target.value),
                dateRange: {
                  ...props.vectors.dateRange,
                  startDate: e.target.value,
                  resulution: { ...props.vectors.dateRange.resulution },
                },
              });
          }}
          type={"checkbox"}
          value={
            typeof props.vectors?.adjust === "boolean" &&
            props.vectors?.adjust === true
              ? "true"
              : "false"
          }
        />
      </div>
      <div className="tnvi_1 text-center text-black">
        <input
          className="f_1"
          onFocus={() => {
            setDateFocus({ ...dateFocus, start: true });
          }}
          onChange={(e) => {
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                dateRange: {
                  ...props.vectors.dateRange,
                  startDate: e.target.value,
                  resulution: { ...props.vectors.dateRange.resulution },
                },
              });
            setDateFocus({ ...dateFocus, start: false });
          }}
          placeholder={"תאריך התחלה"}
          type={dateFocus.start ? "date" : "text"}
        />
      </div>
      <div className="tnvi_1 text-black">
        {/* <p> ת.סיום</p> */}
        <input
          className="f_1"
          onFocus={() => {
            setDateFocus({ ...dateFocus, end: true });
          }}
          onChange={(e) => {
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                dateRange: {
                  ...props.vectors.dateRange,
                  endDate: e.target.value,
                  resulution: { ...props.vectors.dateRange.resulution },
                },
              });
            setDateFocus({ ...dateFocus, end: false });
          }}
          placeholder={"תאריך סיום"}
          type={dateFocus.end ? "date" : "text"}
        />
      </div>
      <div className="tnvi_1">
        {/* <p>מכפלת זמן</p> */}
        <input
          className="f_1"
          onChange={(e) => {
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                dateRange: {
                  ...props.vectors.dateRange,

                  resulution: {
                    ...props.vectors.dateRange.resulution,
                    amount: parseInt(e.target.value),
                  },
                },
              });
          }}
          placeholder={"מכפלה"}
          type={"number"}
        />
      </div>
      <div className="tnvi_1">
        <select
          className="sl"
          name="select"
          onChange={(e) => {
            const value = timeGaps.filter((tg) => tg.name == e.target.value)[0]
              ?.value;
            console.log(e);
            if (props.vectors && value)
              props.setVectors({
                ...props.vectors,
                dateRange: {
                  ...props.vectors.dateRange,

                  resulution: {
                    ...props.vectors.dateRange.resulution,
                    type: value,
                  },
                },
              });
          }}
        >
          <option className="f_1" value={undefined} selected hidden>
            מרווח זמן
          </option>
          {timeGaps.map((tg: any, idx: number) => (
            <option className="f_1 w-1/3" key={idx}>
              {tg.name}
            </option>
          ))}
        </select>
      </div>
      <div className="tnvi_1 ml-2">
        <input
          className="f_1"
          onChange={(e) => {
            if (props.vectors)
              props.setVectors({
                ...props.vectors,
                limit: parseInt(e.target.value),
                dateRange: {
                  ...props.vectors.dateRange,

                  resulution: {
                    ...props.vectors.dateRange.resulution,
                  },
                },
              });
          }}
          placeholder={"מגבלת נתונים"}
          type={"number"}
        />
      </div>
    </div>
  );
};

export const SideNav = () => {
  return (
    <div className="flex justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ">
      <p>SideNav</p>
    </div>
  );
};

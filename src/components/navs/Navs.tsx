import { useState } from "react";
import { useLogger } from "../../pages/dashboard";
import { ParsedZodDateRange } from "../../types/typing";
import { BiBot } from "react-icons/bi";

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
  const [navDD, setNavDD] = useState({
    botsList: false,
  });
  return (
    <div className="flex flex-col">
      <button
        id="botsButton"
        data-dropdown-toggle="dropdownRadioHelper"
        className="inline-flex items-center gap-4 rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          setNavDD({ ...navDD, botsList: !navDD.botsList });
        }}
      >
        בוטים <BiBot />
        <svg
          className="ml-2 h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {navDD.botsList && (
        <div
          id="dropdownHelper"
          className="z-10  w-60 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHelperButton"
          >
            <li>
              <div className="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex h-5 items-center">
                  <input
                    id="helper-checkbox-1"
                    aria-describedby="helper-checkbox-text-1"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label className="font-medium text-gray-900 dark:text-gray-300">
                    <div>BOT FT_W34FGH</div>
                    <p
                      id="helper-checkbox-text-1"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      רמת סיכון נמוכה.
                    </p>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex h-5 items-center">
                  <input
                    id="helper-checkbox-2"
                    aria-describedby="helper-checkbox-text-2"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label className="font-medium text-gray-900 dark:text-gray-300">
                    <div>BOT A_12EASD</div>
                    <p
                      id="helper-checkbox-text-2"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      רמת סיכון בינונית.
                    </p>
                  </label>
                </div>
              </div>
            </li>
            <li>
              <div className="flex rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
                <div className="flex h-5 items-center">
                  <input
                    id="helper-checkbox-3"
                    aria-describedby="helper-checkbox-text-3"
                    type="checkbox"
                    value=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label
                    for="helper-checkbox-3"
                    className="font-medium text-gray-900 dark:text-gray-300"
                  >
                    <div>BOT ZEDA_132</div>
                    <p
                      id="helper-checkbox-text-3"
                      className="text-xs font-normal text-gray-500 dark:text-gray-300"
                    >
                      רמת סיכון גבוהה.
                    </p>
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

import React from "react";
import { useState } from "react";
import { Calendar, Tabs } from "antd";
import dayjs from "dayjs";
function Datebar({ setSelectedDate }) {
  const [value, setValue] = useState(dayjs());
  function dateChange(date) {
    setValue(date);
    setSelectedDate(date.format("YYYY-MM-DD"));
  }

  return (
    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-[23vw]">
      <Calendar
        fullscreen={false}
        onChange={(date) => dateChange(date)}
        value={value}
        className="w-full bg-white shadow-md"
        style={{ borderRadius: "10px", padding: "10px" }}
      />
    </div>
  );
}

export default Datebar;

import React from "react";
import { useDispatch } from "react-redux";
import { removeWidgetFromCategory } from "../store/slice/dashboardSlice";

export const WidgetCard = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative bg-white border rounded-lg shadow-sm p-4 flex flex-col">
      <button onClick={() => dispatch(removeWidgetFromCategory({ categoryId, widgetId: widget.id }))}
        className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold"
      >X</button>
      <h3 className="font-semibold text-sm mb-4">{widget.title}</h3>
      <p className="text-slate-500 text-sm">{widget.text || "No description"}</p>
    </div>
  );
};

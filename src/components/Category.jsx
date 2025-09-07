import React from "react";
import { WidgetCard } from "./WidgetCard";

export const Category = ({ category, onAddWidget }) => {
  const widgets = category.widgets;

  return (
    <div className=" rounded-xl p-4 mb-4">
      <h2 className="font-semibold text-lg mb-3">{category.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {widgets.map((w) => (
          <WidgetCard key={w.id} widget={w} categoryId={category.id} />
        ))}

        <div
          onClick={() => onAddWidget(category.id)}
          className="flex items-center justify-center h-28 border-2 border-dashed rounded-lg text-slate-400 cursor-pointer hover:bg-slate-50"
        >
          + Add Widget
        </div>
      </div>
    </div>
  );
};

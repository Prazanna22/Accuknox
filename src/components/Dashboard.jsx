import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TopBar } from "./TopBar";
import { Category } from "./Category";
import { DrawerAddWidget } from "./DrawerAddWidget";
import { setSearchQuery } from "../store/slice/dashboardSlice";

export const Dashboard = () => {
  const categories = useSelector((s) => s.dashboard.categories);
  const allWidgets = useSelector((s) => s.dashboard.allWidgets);
  const searchQuery = useSelector((s) => s.dashboard.searchQuery);
  const [drawerCat, setDrawerCat] = useState(null);
  const dispatch = useDispatch();

  
  const onSearchChange = (val) => dispatch(setSearchQuery(val));


  const filtered = categories
    .map((cat) => {
      const widgets = cat.widgets
        .map((id) => allWidgets.find((w) => w.id === id))
        .filter(Boolean);

      if (!searchQuery) return { ...cat, widgets };

      const q = searchQuery.trim().toLowerCase();
      const matched = widgets.filter(
        (w) =>
          (w.title || "").toLowerCase().includes(q) ||
          (w.text || "").toLowerCase().includes(q)
      );

      return { ...cat, widgets: matched };
    })
    .filter((cat) => cat.widgets.length > 0 || !searchQuery);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 ">
        <TopBar
          onAddWidget={() => setDrawerCat(categories[0]?.id)}
          onSearchChange={onSearchChange}
          searchValue={searchQuery}
        />
      </div>

      <div className="bg-white rounded-xl shadow md:p-4 mb-6">

        {filtered.map((cat) => (
        <Category key={cat.id} category={cat} onAddWidget={setDrawerCat} />
      ))}

      {drawerCat && (
        <DrawerAddWidget
          categoryId={drawerCat}
          onClose={() => setDrawerCat(null)}
        />
      )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidgetInCategory,addWidget,} from "../store/slice/dashboardSlice";

export const DrawerAddWidget = ({ categoryId, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories);
  const allWidgets = useSelector((s) => s.dashboard.allWidgets);

  const [activeTab, setActiveTab] = useState(categoryId || categories[0]?.id);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const activeCategory = categories.find((c) => c.id === activeTab);

  const widgetsForTab = allWidgets.filter((w) => w.categoryId === activeTab);

  const included = (catId, widgetId) => {
    const cat = categories.find((c) => c.id === catId);
    return cat?.widgets.includes(widgetId);
  };

  const handleAddNew = () => {
    if (!newTitle.trim()) return;
    dispatch(addWidget(activeCategory.id, newTitle, newText));
    setNewTitle("");
    setNewText("");
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`relative bg-white w-[500px] h-full shadow-lg z-10 flex flex-col transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
       
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Manage Widgets</h3>
          <button onClick={onClose} className="text-slate-500 text-xl">
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={`flex-1 py-2 text-sm ${
                activeTab === c.id
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-slate-500"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

       
        <div className="flex-1 overflow-y-auto p-4">
          {widgetsForTab.map((w) => (
            <label
              key={w.id}
              className="flex items-center gap-2 p-2 border my-4 rounded-md cursor-pointer hover:bg-slate-50"
            >
              <input
                type="checkbox"
                checked={included(activeCategory.id, w.id)}
                onChange={(e) =>
                  dispatch(
                    toggleWidgetInCategory({
                      categoryId: activeCategory.id,
                      widgetId: w.id,
                      include: e.target.checked,
                    })
                  )
                }
              />
              <span className="font-medium">{w.title}</span>
            </label>
          ))}
        </div>

        {/* Add new widget form */}
        <div className="p-4 border-t bg-slate-50">
          <h4 className="font-semibold text-sm mb-3">Add New Widget</h4>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Widget title"
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Widget text"
            rows={3}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleAddNew}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow"
          >
            + Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

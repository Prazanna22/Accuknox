import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState =  {
      searchQuery: "",
      categories: [
        {
          id: "cspm",
          name: "CSPM Executive Dashboard",
          widgets: ["cloud-accounts", "cloud-risk"],
        },
        {
          id: "cwpp",
          name: "CWPP Dashboard",
          widgets: ["namespace-alerts", "workload-alerts"],
        },
        {
          id: "registry",
          name: "Registry Scan",
          widgets: ["image-risk", "image-security"],
        },
      ],

      allWidgets: [
        {
          id: "cloud-accounts",
          title: "Cloud Accounts",
          text: "Shows number of connected vs not connected accounts",
          categoryId: "cspm",
        },
        {
          id: "cloud-risk",
          title: "Cloud Account Risk Assessment",
          text: "Displays failed, warning, not available, and passed counts",
          categoryId: "cspm",
        },
        {
          id: "namespace-alerts",
          title: "Top 5 Namespace Specific Alerts",
          text: "Lists the top alerts across namespaces",
          categoryId: "cwpp",
        },
        {
          id: "workload-alerts",
          title: "Workload Alerts",
          text: "Shows alerts related to workloads",
          categoryId: "cwpp",
        },
        {
          id: "image-risk",
          title: "Image Risk Assessment",
          text: "Highlights vulnerabilities detected in images",
          categoryId: "registry",
        },
        {
          id: "image-security",
          title: "Image Security Issues",
          text: "Displays security issues identified in images",
          categoryId: "registry",
        },
      ],
    };

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    
    addWidget: {
      reducer(state, action) {
        const { categoryId, widget } = action.payload;
        state.allWidgets.push(widget);

      
        const cat = state.categories.find((c) => c.id === categoryId);
        if (cat && !cat.widgets.includes(widget.id)) {
          cat.widgets.push(widget.id);
        }
      },
      prepare(categoryId, title, text) {
        return {
          payload: {
            categoryId,
            widget: {
              id: `w-${nanoid()}`,
              title,
              text,
              categoryId,
            },
          },
        };
      },
    },

    
    toggleWidgetInCategory(state, action) {
      const { categoryId, widgetId, include } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (!cat) return;

      if (include) {
        if (!cat.widgets.includes(widgetId)) {
          cat.widgets.push(widgetId);
        }
      } else {
        cat.widgets = cat.widgets.filter((id) => id !== widgetId);
      }
    },
    removeWidgetFromCategory(state, action) {
      const { categoryId, widgetId } = action.payload;
      const cat = state.categories.find((c) => c.id === categoryId);
      if (cat) {
        cat.widgets = cat.widgets.filter((id) => id !== widgetId);
      }
    },
    removeWidgetCompletely(state, action) {
      const widgetId = action.payload;
      state.allWidgets = state.allWidgets.filter((w) => w.id !== widgetId);
      state.categories.forEach((cat) => {
        cat.widgets = cat.widgets.filter((id) => id !== widgetId);
      });
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    addCategory(state, action) {
      const { name } = action.payload;
      state.categories.push({
        id: `cat-${nanoid()}`,
        name,
        widgets: [],
      });
    },
  },
});

export const { addWidget, toggleWidgetInCategory, removeWidgetFromCategory, removeWidgetCompletely, setSearchQuery, addCategory,} = dashboardSlice.actions;

export default dashboardSlice.reducer;
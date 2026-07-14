import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async (_, thunkAPI) => {
    try {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];

      return projects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const saveProjectAsync = createAsyncThunk(
  "projects/saveProjectAsync",
  async (project, thunkAPI) => {
    try {
      const projects = JSON.parse(localStorage.getItem("projects")) || [];

      const newProject = {
        ...project,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      projects.unshift(newProject);

      localStorage.setItem("projects", JSON.stringify(projects));

      return newProject;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: initialProjects,
    activeProject: null,
    loading: false,
    error: null,
  },

  reducers: {
    saveProject: (state, action) => {
      state.projects.unshift(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },

    deleteProject: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload,
      );
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },

    setActiveProject: (state, action) => {
      state.activeProject = action.payload;
    },

    clearActiveProject: (state) => {
      state.activeProject = null;
    },

    clearProjects: (state) => {
      state.projects = [];
      localStorage.removeItem("projects");
    },

    setProjects: (state, action) => {
      state.projects = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        localStorage.setItem("projects", JSON.stringify(action.payload));
      })

      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveProjectAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(saveProjectAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
        localStorage.setItem("projects", JSON.stringify(state.projects));
      })

      .addCase(saveProjectAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  saveProject,
  deleteProject,
  setActiveProject,
  clearActiveProject,
  clearProjects,
  setProjects,
} = projectSlice.actions;

export default projectSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost/Mywp/wp-json/wp/v2/buildie_project";

const initialProjects = JSON.parse(localStorage.getItem("projects")) || [];

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetchProjectsAsync",
  async (_, thunkAPI) => {
    try {
      // 1. Grab the auth state to get the token and the current user's email
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");
      const currentUserEmail = state.auth.user?.email;

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      
      // 2. Parse all the projects coming from WordPress
      const allProjects = data.map((project) => {
        const rawData =
          project.meta?.project_data || project.acf?.project_data || null;

        const parsedData = rawData ? JSON.parse(rawData) : {};

        return {
          id: project.id,
          name: project.title.rendered,
          createdAt: project.date,
          formData: parsedData.formData || {},
          roomData: parsedData.roomData || {},
          floors: parsedData.floors || [],
          result: parsedData.result || {},
          mode: parsedData.mode || "volume",
          authorEmail: parsedData.authorEmail || "", // Retrieve the stamped email
        };
      });

      // 3. FILTER: Only return projects that belong to the logged-in user
      return allProjects.filter((project) => project.authorEmail === currentUserEmail);

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const saveProjectAsync = createAsyncThunk(
  "projects/saveProjectAsync",
  async (project, thunkAPI) => {
    try {
      // 1. Grab auth state
      const state = thunkAPI.getState();
      const token = state.auth.token || localStorage.getItem("token");
      const currentUserEmail = state.auth.user?.email;

      // 2. Stamp the project with the user's email before converting to JSON
      const projectToSave = { 
        ...project, 
        authorEmail: currentUserEmail 
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: project.name,
          status: "publish",
          meta: {
            project_data: JSON.stringify(projectToSave), // Save the stamped version
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save project");
      }

      const data = await response.json();
      return {
        ...projectToSave,
        wpId: data.id,
      };
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteProject,
  setActiveProject,
  fetchProjectsAsync,
  clearActiveProject,
} from "../../store/slices/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch]);

  const projects = useSelector((state) => state.projects.projects);

  const handleDelete = (id) => {
    if (window.confirm("Delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleOpenProject = (project) => {
    dispatch(setActiveProject(project));
    navigate(`/projects/${project.id}`);
  };

  const handleEditProject = (project) => {
    dispatch(setActiveProject(project));
    navigate("/");
  };

  const handleNewProject = () => {
    dispatch(clearActiveProject());
    navigate("/");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold dark:text-white">Saved Projects</h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {projects.length} Project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow
            p-12
            text-center
          "
        >
          <h2 className="text-3xl font-bold dark:text-white mb-3">
            No Projects Yet
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by creating your first construction estimation using the
            Buildie Dashboard.
          </p>

          <button
            onClick={handleNewProject}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              transition
            "
          >
           Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                bg-white
                dark:bg-gray-800
                border
                border-gray-200
                dark:border-gray-700
                rounded-xl
                shadow
                p-6
                flex
                flex-col
                md:flex-row
                justify-between
                gap-5
              "
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold dark:text-white">
                  {project.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  Created: {new Date(project.createdAt).toLocaleString()}
                </p>

                <p className="dark:text-gray-300">
                  Floors: {project.floors?.length || 0}
                </p>

                <p className="font-semibold text-green-600 dark:text-green-400">
                  Total Cost: ₹{project.result?.totalCost?.toFixed(2) || "0.00"}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 items-start">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Open
                </button>

                <button
                  onClick={() => handleEditProject(project)}
                  className="
                    bg-indigo-600
                    hover:bg-indigo-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;

import { createContext, useEffect, useMemo, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { mockActivities, mockProjects } from '../data/mockData'
import { getStorage, setStorage } from '../utils/helpers'

const STORAGE_KEY = 'task_profile_app_data'

const initialState = {
  projects: mockProjects,
  activities: mockActivities,
}

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        activities: [
          { id: uuidv4(), message: `Project “${action.payload.title}” created`, time: 'just now' },
          ...state.activities,
        ],
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? { ...project, ...action.payload } : project,
        ),
      }
    case 'ASSIGN_STUDENT':
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== action.payload.projectId) return project

          const groupsWithoutUser = project.groups.map((group) => ({
            ...group,
            memberIds: group.memberIds.filter((memberId) => memberId !== action.payload.studentId),
          }))

          return {
            ...project,
            groups: groupsWithoutUser.map((group) =>
              group.id === action.payload.groupId
                ? { ...group, memberIds: [...new Set([...group.memberIds, action.payload.studentId])] }
                : group,
            ),
          }
        }),
      }
    case 'ADD_GROUP':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                groups: [
                  ...project.groups,
                  {
                    id: uuidv4(),
                    name: action.payload.groupName,
                    memberIds: [],
                    progress: 0,
                    lastUpdate: new Date().toISOString(),
                  },
                ],
              }
            : project,
        ),
      }
    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: [...project.tasks, action.payload.task],
              }
            : project,
        ),
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === action.payload.taskId
                    ? {
                        ...task,
                        ...action.payload.updates,
                        logs: [...(task.logs || []), action.payload.logEntry].filter(Boolean),
                      }
                    : task,
                ),
              }
            : project,
        ),
      }
    case 'DELETE_TASK':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== action.payload.taskId),
              }
            : project,
        ),
      }
    case 'ADD_COMMENT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                comments: [...project.comments, action.payload.comment],
              }
            : project,
        ),
      }
    case 'ADD_SUBMISSION':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                submissions: [...project.submissions, action.payload.submission],
              }
            : project,
        ),
      }
    case 'REVIEW_SUBMISSION':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                submissions: project.submissions.map((submission) =>
                  submission.id === action.payload.submissionId
                    ? {
                        ...submission,
                        status: action.payload.status,
                        feedback: action.payload.feedback,
                        history: [
                          ...submission.history,
                          {
                            date: new Date().toISOString(),
                            text: `Status updated to ${action.payload.status}`,
                          },
                        ],
                      }
                    : submission,
                ),
              }
            : project,
        ),
      }
    default:
      return state
  }
}

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, getStorage(STORAGE_KEY, initialState))

  useEffect(() => {
    setStorage(STORAGE_KEY, state)
  }, [state])

  const createProject = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const project = {
      id: uuidv4(),
      title: payload.title,
      description: payload.description,
      course: payload.course,
      mentor: payload.mentor || 'Assigned Teacher',
      status: 'Active',
      startDate: payload.startDate,
      endDate: payload.endDate,
      maxGroupSize: payload.maxGroupSize,
      milestones: payload.milestones,
      groups: [
        { id: uuidv4(), name: 'Group A', memberIds: [], progress: 0, lastUpdate: new Date().toISOString() },
      ],
      tasks: [],
      submissions: [],
      comments: [],
    }
    dispatch({ type: 'CREATE_PROJECT', payload: project })
    return project
  }

  const createTask = (projectId, payload) =>
    dispatch({
      type: 'ADD_TASK',
      payload: {
        projectId,
        task: { id: uuidv4(), ...payload, logs: ['Task created'] },
      },
    })

  const updateTask = (projectId, taskId, updates, logEntry) =>
    dispatch({ type: 'UPDATE_TASK', payload: { projectId, taskId, updates, logEntry } })

  const deleteTask = (projectId, taskId) =>
    dispatch({ type: 'DELETE_TASK', payload: { projectId, taskId } })

  const assignStudent = (projectId, studentId, groupId) =>
    dispatch({ type: 'ASSIGN_STUDENT', payload: { projectId, studentId, groupId } })

  const addGroup = (projectId, groupName) => dispatch({ type: 'ADD_GROUP', payload: { projectId, groupName } })

  const addComment = (projectId, comment) =>
    dispatch({ type: 'ADD_COMMENT', payload: { projectId, comment: { id: uuidv4(), ...comment } } })

  const addSubmission = (projectId, submission) =>
    dispatch({ type: 'ADD_SUBMISSION', payload: { projectId, submission: { id: uuidv4(), ...submission } } })

  const reviewSubmission = (projectId, submissionId, status, feedback) =>
    dispatch({ type: 'REVIEW_SUBMISSION', payload: { projectId, submissionId, status, feedback } })

  const updateProject = (project) => dispatch({ type: 'UPDATE_PROJECT', payload: project })

  const value = useMemo(
    () => ({
      projects: state.projects,
      activities: state.activities,
      createProject,
      updateProject,
      createTask,
      updateTask,
      deleteTask,
      assignStudent,
      addGroup,
      addComment,
      addSubmission,
      reviewSubmission,
    }),
    [state],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
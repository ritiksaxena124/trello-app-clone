export interface taskModel {
  title: string;
  description: string;
  priority: string;
  deadline: string;
  lastUpdated: string;
}

interface tasksDataModel {
  status: string;
  tasks: taskModel[];
}

export const tasksData: tasksDataModel[] = [
  {
    status: "Todo",
    tasks: [
      {
        title: "Implement User Authentication",
        description:
          "Develop and integrate user authentication using email and password.",
        priority: "Urgent",
        deadline: "2024-08-15",
        lastUpdated: "1hr ago",
      },
    ],
  },
  {
    status: "In Progress",
    tasks: [
      {
        title: "Design Home Page UI",
        description:
          "Develop and integrate user authentication using email and password.",
        priority: "Medium",
        deadline: "2024-08-15",
        lastUpdated: "1hr ago",
      },
      {
        title: "Conduct User Feedback Survey",
        description:
          "Collect and analyze user feedback to improve app features.",
        priority: "Low",
        deadline: "2024-08-15",
        lastUpdated: "3hr ago",
      },
    ],
  },
  {
    status: "Under Review",
    tasks: [
      {
        title: "Integrate Cloud Storage",
        description:
          "Enable cloud storage for note backup and synchronization.",
        priority: "Urgent",
        deadline: "2024-08-15",
        lastUpdated: "2 days ago",
      },
    ],
  },
  {
    status: "Finished",
    tasks: [
      {
        title: "Test Cross-browser Compatibility",
        description:
          "Ensure the app works seamlessly across different web browsers.",
        priority: "Medium",
        deadline: "2024-08-15",
        lastUpdated: "4 days ago",
      },
    ],
  },
];

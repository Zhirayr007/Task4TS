class BasicAgent {
  constructor(private _MAINurl: string) {}

  fetch = async <T>(url: string, config?: RequestInit): Promise<T> => {
    const res = await fetch(`${this._MAINurl}${url}`, config);
    if (res.ok) {
      const data = (await res.json()) as T;
      return data;
    } else {
      throw new Error('ошибка');
    }
  };
}
// Должен ли быть Id?
// interface Task {
//   name: string;
//   info: string;
//   isImportant: boolean;
//   isCompleted: boolean;
//   id: number;
// }
interface Task {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
}
type TypeUpdate = Partial<Task>;

class PostsAgent extends BasicAgent {
  constructor() {
    super('https://intership-liga.ru');
  }

  getTasks = async (): Promise<Task[] | null> => {
    try {
      const tasks = await this.fetch<Task[]>(`/tasks`);
      console.log('Все задачи:', tasks);
      return tasks;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  getTask = async (Id: number): Promise<Task | null> => {
    try {
      const task = await this.fetch<Task>(`/tasks/${Id}`);
      console.log(`Задача под идентификатором ${Id}`, task);
      return task;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  createTask = async (task: Task): Promise<Task | null> => {
    try {
      const addTask = await this.fetch<Task>('/tasks', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      console.log('Задача создана:', addTask);
      return addTask;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  updateTask = async (updateData: TypeUpdate, Id: number): Promise<Task | null> => {
    try {
      const updatedPost = await this.fetch<Task>(`/tasks/${Id}`, {
        method: 'PATCH',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      console.log(`Задача под идентификатором ${Id} обновлена:`, updatedPost);
      return updatedPost;
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  removeTask = async (id: number): Promise<boolean> => {
    try {
      await this.fetch<Task>(`/tasks/${id}`, {
        method: 'DELETE',
      });
      console.log('Задача удалена');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
const PostAgentInstance = new PostsAgent();
PostAgentInstance.getTasks();
PostAgentInstance.getTask(32);
PostAgentInstance.createTask({
  name: 'Meeting',
  info: 'Meeting with a friend at 20:00',
  isImportant: true,
  isCompleted: false,
});
PostAgentInstance.updateTask(
  {
    name: 'New Name',
    info: 'UpdeteTask',
  },
  32
);
PostAgentInstance.removeTask(23);

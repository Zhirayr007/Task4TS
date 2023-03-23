"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class BasicAgent {
    constructor(_MAINurl) {
        this._MAINurl = _MAINurl;
        this.fetch = (url, config) => __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this._MAINurl}${url}`, config);
            if (res.ok) {
                const data = (yield res.json());
                return data;
            }
            else {
                throw new Error('ошибка');
            }
        });
    }
}
class PostsAgent extends BasicAgent {
    constructor() {
        super('https://intership-liga.ru');
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.fetch(`/tasks`);
                console.log('Все задачи:', tasks);
                return tasks;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
        this.getTask = (Id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.fetch(`/tasks/${Id}`);
                console.log(`Задача под идентификатором ${Id}`, task);
                return task;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
        this.createTask = (task) => __awaiter(this, void 0, void 0, function* () {
            try {
                const addTask = yield this.fetch('/tasks', {
                    method: 'POST',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify(task),
                });
                console.log('Задача создана:', addTask);
                return addTask;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
        this.updateTask = (updateData, Id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedPost = yield this.fetch(`/tasks/${Id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                });
                console.log(`Задача под идентификатором ${Id} обновлена:`, updatedPost);
                return updatedPost;
            }
            catch (err) {
                console.error(err);
                return null;
            }
        });
        this.removeTask = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fetch(`/tasks/${id}`, {
                    method: 'DELETE',
                });
                console.log('Задача удалена');
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        });
    }
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
//# sourceMappingURL=index.js.map
//CRUD
import Task from "./task.js"; //Destructuring hatane ke liye we can do is export Task not as an object but as an function by declaring import default at Task function in it's file. Note: import default 1 hi baar use ho skata 1 file me so agr. 1 function me laga diya toh dubara nahi lag sakta same file me.

export const taskOperations = {
  // ek object banaya hai taskOperations naam ka jisme array of objects pade hai(tasks:[]) aur ek function banaya hai jiski key aur value dono ek hai i.e add.
  tasks: [],
  getAllTask(){
    return this.tasks;
  },
  add(id, name, desc, date, URL) {
    const task = new Task(id, name, desc, date, URL);
    this.tasks.push(task);
    console.log("Added", this.tasks);
    return task;
  },
  deletedMarked() {
    this.tasks = this.tasks.filter((task) => task.isMarked == false);
    return this.tasks;
  },
  mark(id) {
    //Red marked hai ki nahi yeah batayega(imperative type of function i.e jo hume banaya hai)
    // for (let i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].id == id) {
    //     const taskObject = this.tasks[i];
    //     taskObject.isMarked = !taskObject.isMarked;
    //   }
    // }
    let task = this.tasks.find((task=>task.id == id));           
    if(task){
      task.toggle();
    }

  },
  countMarked() {
    //gives me the count of total marked objects
    // let counter = 0;
    // for (var i = 0; i < this.tasks.length; i++) {
    //   if (this.tasks[i].isMarked) {
    //     counter++;
    //   }
    // }
    // return counter;
    return this.tasks.filter(task=>task.isMarked).length;
  },
  countUnmarked() {
    return this.tasks.length - this.countMarked();
  },
};

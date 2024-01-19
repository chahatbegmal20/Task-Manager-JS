function Task(id, name, desc, date, url) {
  this.id = id;
  this.name = name;
  this.desc = desc;
  this.date = date;
  this.url = url;
  this.isMarked = false; //Btayega ki red color se marked hai ki nahi perticular object
}
Task.prototype.toggle = function(){
  this.isMarked = !this.isMarked;
};

export default Task;

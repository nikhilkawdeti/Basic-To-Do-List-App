import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from './../modal/task.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  todoForm!: FormGroup;

  task: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];

  updateIndex!: any;
  isEditEnable: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group(
      {
        item: ['', Validators.required]
      }
    )
  }

  addTasks() {
    this.task.push(
      {
        description: this.todoForm.value.item,
        done: false
      }
    )
    this.todoForm.reset();
  }

  editTask(item: ITask, i: any) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnable = true;
    this.task.push()
  }

  updateTask() {
    this.task[this.updateIndex].description = this.todoForm.value.item;
    this.task[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnable = false;
  }

  deleteTask(i: any) {
    this.task.splice(i, 1);
  }
  deleteTaskInProgress(i: any) {
    this.inProgress.splice(i, 1);
  }
  deleteTaskInDone(i: any) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}

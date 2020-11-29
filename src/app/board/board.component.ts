import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cardForm: FormGroup;
  display;
  currentDate;
  counter: number = 0;
  lists = [
    {
      name: '',
      isDisable: true,
      cards: []
    }
  ];

  constructor(public fb: FormBuilder) { }


  ngOnInit(): void {
    this.cardForm = this.fb.group({
      cardTitle: ['', Validators.required],
      comments: ['', Validators.required]
    })
  }

  addNew() {
    let val = this.counter++;
    this.lists.push({
      name: 'new item',
      isDisable: false,
      cards: []
    });
  }

  addNewCard(i) {
    this.lists[i].cards.push({
      cardTitle: '',
      comments: '',
      currentDate: ''
    });
  }

  delete(index: any) {
    this.lists.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }
  currentCard;
  showModalCard(j) {
    this.display = 'block';
    this.currentCard = j;
  }

  onCloseHandled() {
    this.display = 'none';
  }

  onSubmit(cardForm, i) {

    if (this.cardForm.valid) {
      this.currentDate = new Date();
      let cardData = {
        cardTitle: this.cardForm.get('cardTitle').value,
        comments: this.cardForm.get('comments').value,
        currentDate: this.currentDate
      }

      this.lists[i].cards.splice(this.currentCard, 1, cardData)
    }
  }

  deleteCard(index) {
    debugger;
    this.lists[index].cards.splice(this.currentCard, 1);
    this.display = 'none';
  }
}

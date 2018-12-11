import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Board, FirestoreService } from '../firestore.service'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms'

@Component({
  selector: 'app-boards-edit',
  templateUrl: './boards-edit.component.html',
  styleUrls: ['./boards-edit.component.css'],
})
export class BoardsEditComponent implements OnInit {
  boardsForm: FormGroup
  id = ''
  name = ''
  email = ''
  phone = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fs: FirestoreService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.getBoard(this.route.snapshot.params['id'])
    this.boardsForm = this.formBuilder.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],
    })
  }

  getBoard(id) {
    this.fs.getBoard(id).subscribe(data => {
      this.id = id
      this.boardsForm.setValue({
        name: data.name,
        email: data.email,
        phone: data.phone,
      })
    })
  }

  onFormSubmit() {
    const board = this.boardsForm.value as Board
    this.fs.updateBoards(this.id, board).subscribe(
      res => {
        this.router.navigate(['/boards'])
      },
      err => {
        console.log(err)
      },
    )
  }

  boardsDetails() {
    this.router.navigate(['/boards-details', this.id])
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-inform',
  templateUrl: './personal-inform.component.html',
  styleUrls: ['./personal-inform.component.css'],
})
export class PersonalInformComponent implements OnInit {
  @Input('personalForm') personalForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}

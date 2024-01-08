import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { publicApiFunction, obj ,pubSub} from "@app/utils"

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-app';

  subs !: Subscription

  value :string = ""


  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      name: obj.name, 
      token: obj.token 
    });

    pubSub.angular.forEach((entry:any)=>{
      console.log(entry);
      entry.f
      
    })
  }


  ngOnInit(): void {
  

    console.log(obj,"in angular");
    
   
  }

  ngOnDestroy(): void {
    obj.name = this.myForm.get("name")?.value
    obj.token = this.myForm.get("token")?.value
    // this.subs.unsubscribe()
    // globalState.next({data:"angular"})
  }
  handleClick() {
    publicApiFunction("angular")
  }
}

import {Component, OnInit} from '@angular/core';
import {TestService} from "../../service/test_service/test.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';

  constructor(private Service: TestService,) { }

  public getTest(){
   this.Service.getTest().subscribe(data => {
     console.log(data);
   });
  }

  ngOnInit(): void {
    console.log("Hello, i'm going to get the test data!");
    this.getTest();
  }
}

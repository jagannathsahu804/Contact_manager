import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iContact } from '../models/iContact';
import { iGroup } from '../models/iGroup';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading: boolean = false;
  public contact: iContact = {} as iContact;
  public errorMessage : string | null = null;
  public groups: iGroup[] = {} as iGroup[];

  constructor(private contactService: ContactService, private router:Router) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data:iGroup[])=>{
      this.groups = data;
    },(error)=>{
      this.errorMessage = error;
    }
    );
  }

  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe(()=>{
      this.router.navigate(['/']).then();
    },(error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    }
    )
  }

}

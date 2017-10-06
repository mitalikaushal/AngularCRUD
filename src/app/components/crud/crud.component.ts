import {Component} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
    selector: 'crud',
    template:`
    <form (submit)="onSubmit(isEdit)">
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" [(ngModel)]="user.name" name="name">
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" [(ngModel)]="user.email" name="email">
        </div>
        <div class="form-group">
            <label>Phone</label>
            <input type="text" class="form-control" [(ngModel)]="user.phone" name="phone">
        </div>
        <input type="submit" class="btn btn-success" value="Submit">
    </form>
        <hr>
        <div *ngFor = "let user of users">
            <div class="well">
                <ul class="list-group">
                    <li class="list-group-item">Name: {{ user.name }}</li>
                    <li class="list-group-item">Email: {{ user.email }}</li>
                    <li class="list-group-item">Phone: {{ user.phone }}</li>
                </ul>
                <br>
                <button (click)="onDeleteButton(user.id)" class="btn btn-danger">Delete</button>
                <button (click)="onUpdateButton(user)" class="btn btn-primary">Edit</button>
            </div>
        </div>
    `

})

export class CrudComponent{
    users:any[];
    user = {
        id:'',
        name:'',
        email:'',
        phone:''
    }
    isEdit:boolean = false;

    constructor(public dataService: DataService){
        this.dataService.getUsers().subscribe(users => {
            //console.log(users);
            this.users = users;
        });
    }
    onSubmit(isEdit){
        if(isEdit){
            this.dataService.updateUser(this.user).subscribe(user => {
                for(let i=0; i<this.users.length;i++){
                    if(this.users[i].id == this.user.id){
                        this.users.splice(i,1);
                    }
                }
                this.users.unshift(this.user);
                this.dataService.getUsers().subscribe(users => {
                    console.log(users);
                    //this.users = users;
                });

            })
        }
        else {
            this.dataService.addUsers(this.user).subscribe(user =>{
                this.users.unshift(this.user);
            })
        }
        
    }
    onDeleteButton(id){
        this.dataService.deleteUser(id).subscribe(res => {
            for(let i =0; i< this.users.length; i++){
                if(this.users[i].id == id){
                    this.users.splice(i,1);
                }
            }
        })
        
    }
    onUpdateButton(user){
        this.isEdit = true;
        this.user = user;

        }
}
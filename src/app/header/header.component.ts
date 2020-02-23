import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe-book/recipe.service';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private dataService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
      console.log(user);
    }
    )
  }

  saveData() {
    this.dataService.onSaveData()
    .subscribe(data => {
      console.log(data);
    });
  }

  fetchData() {
    this.dataService.onFetchData().subscribe();
  }

  logout() {
    this.authService.logout();
  }

}

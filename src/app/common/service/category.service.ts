import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataModel } from './userData.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(category: any) {
    return this.http.post<UserDataModel>(environment.apiUrl + '/categories', category );
  }

  getCategory() {
    return this.http.get<UserDataModel>(environment.apiUrl + '/categories');
  }

  updateCategoryLive(id: string, isLive: string) {
    const live = {
      isLive
    };
    return this.http.put<{status: string}>(environment.apiUrl + '/categories/' + id, live);
  }

}

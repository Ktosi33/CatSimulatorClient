import { Routes } from '@angular/router';
import { HelloComponent } from './components/hello/hello.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { loggedGuard } from './guards/logged.guard';
import { CatCreatorComponent } from './pages/cat-creator/cat-creator.component';
import { CatDetailsComponent } from './pages/cat-details/cat-details.component';
import { CatEditorComponent } from './pages/cat-editor/cat-editor.component';


export const routes: Routes = [
  {
    path:'',
    component: AccountComponent,
    canActivate: [loggedGuard]
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path:'cat/create',
    component: CatCreatorComponent,
    canActivate: [authGuard]
  },
  {
    path:'cat/:id',
    component: CatDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path:'cat/edit/:id',
    component: CatEditorComponent,
    canActivate: [authGuard]
  },
  {
    path:'hello',
    component: HelloComponent,
    canActivate: [authGuard]
  }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthanticatedGuardFn } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./application/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'tasks-management',
    canActivate: [isAuthanticatedGuardFn],
    canActivateChild: [],
    loadChildren: () =>
      import('./application/tasks-management/task-management.module').then(
        (m) => m.TaskManagementModule
      ),
  },

  // {
  //   path: 'errors',
  //   loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  // },
  { path: '**', redirectTo: '/errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

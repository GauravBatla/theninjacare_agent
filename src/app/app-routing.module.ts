import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'personal-details',
    loadChildren: () => import('./pages/personal-details/personal-details.module').then( m => m.PersonalDetailsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path:"edit-profile",
    loadChildren:()=> import('./pages/edit-profile/edit-profile.module').then(m=>m.EditProfilePageModule)
  },
  {
    path:"signup",
    loadChildren:()=> import('./pages/signup/signup.module').then(m=>m.SignupPageModule)
  },
  {
    path:"wallet",
    loadChildren:()=>import('./pages/wallet/wallet-routing.module').then(m=>m.WalletPageRoutingModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}


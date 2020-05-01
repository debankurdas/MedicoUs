import { FormGroup, ValidationErrors } from '@angular/forms';
export class CustomValidation {
   static validatorPassword(form: FormGroup): ValidationErrors {
     const password = form.get('password');
     const confirmPassword = form.get('confirm_password');
     if (password.value === confirmPassword.value) {
      return null;
     } else {
      return {invalidPassword: true};
     }
   }
}

package io.kunstix.kbm.validator;

import io.kunstix.kbm.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object object, Errors errors) {
        User user = (User) object;
        System.out.println(user);
        if (user.getPassword() == null || user.getPassword().length() < 8) {
            errors.rejectValue("password", "Length",
                    "Password must be at least 8 characters");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match.");
        }
    }
}

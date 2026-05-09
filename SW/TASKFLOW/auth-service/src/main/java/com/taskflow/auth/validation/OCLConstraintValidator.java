package com.taskflow.auth.validation;

import com.taskflow.auth.entity.User;
import org.springframework.stereotype.Component;

/**
 * OCL Constraint Validator for TaskFlow
 * Implements Object Constraint Language style validations
 */
@Component
public class OCLConstraintValidator {

    /**
     * User Age Constraint: self.age >= 18 and self.age <= 65
     */
    public boolean validateUserAge(User user) {
        return user.getAge() != null && 
               user.getAge() >= 18 && 
               user.getAge() <= 65;
    }

    /**
     * Email Format Constraint: self.email->matches('.*@.*\\..*')
     */
    public boolean validateEmailFormat(String email) {
        return email == null || email.matches(".*@.*\\..*");
    }

    /**
     * Username Size Constraint: self.userName->size() >= 3
     */
    public boolean validateUsernameSize(String username) {
        return username != null && username.length() >= 3;
    }

    /**
     * Password Hash Constraint: self.passwordHash->notEmpty()
     */
    public boolean validatePasswordHash(String passwordHash) {
        return passwordHash != null && !passwordHash.trim().isEmpty();
    }

    /**
     * First Name Constraint: self.firstName->size() >= 2
     */
    public boolean validateFirstName(String firstName) {
        return firstName != null && firstName.length() >= 2;
    }

    /**
     * Last Name Constraint: self.lastName->size() >= 2
     */
    public boolean validateLastName(String lastName) {
        return lastName != null && lastName.length() >= 2;
    }

    /**
     * Complete User Validation
     */
    public void validateUser(User user) throws OCLConstraintViolationException {
        if (!validateUsernameSize(user.getUserName())) {
            throw new OCLConstraintViolationException("Username must be at least 3 characters long");
        }

        if (!validatePasswordHash(user.getPasswordHash())) {
            throw new OCLConstraintViolationException("Password hash cannot be empty");
        }

        if (!validateUserAge(user)) {
            throw new OCLConstraintViolationException("User age must be between 18 and 65");
        }

        if (user.getFirstName() != null && !validateFirstName(user.getFirstName())) {
            throw new OCLConstraintViolationException("First name must be at least 2 characters long");
        }

        if (user.getLastName() != null && !validateLastName(user.getLastName())) {
            throw new OCLConstraintViolationException("Last name must be at least 2 characters long");
        }
    }
}

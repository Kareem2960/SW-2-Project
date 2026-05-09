package com.taskflow.auth.service;

import com.taskflow.auth.dto.UserRegistrationDTO;
import com.taskflow.auth.entity.User;
import com.taskflow.auth.repository.UserRepository;
import com.taskflow.auth.validation.OCLConstraintValidator;
import com.taskflow.auth.validation.OCLConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * OCL Enhanced User Service
 * Implements OCL constraints validation for user operations
 */
@Service
@Transactional
public class OCLUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OCLConstraintValidator oclValidator;

    /**
     * Create user with OCL validation
     * OCL Constraints:
     * - self.age >= 18 and self.age <= 65
     * - self.email->matches('.*@.*\\..*')
     * - self.userName->size() >= 3
     * - self.passwordHash->notEmpty()
     */
    public User createUser(UserRegistrationDTO userDTO) throws OCLConstraintViolationException {
        User user = convertToEntity(userDTO);

        // Apply OCL constraints validation
        oclValidator.validateUser(user);

        // Additional business constraints
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new OCLConstraintViolationException(
                "Username already exists", 
                "UniqueUsername", 
                "User"
            );
        }

        return userRepository.save(user);
    }

    /**
     * Update user with OCL validation
     */
    public User updateUser(Integer userId, UserRegistrationDTO userDTO) throws OCLConstraintViolationException {
        User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new OCLConstraintViolationException(
                "User not found", 
                "UserExists", 
                "User"
            ));

        // Update fields
        if (userDTO.getFirstName() != null) {
            existingUser.setFirstName(userDTO.getFirstName());
        }
        if (userDTO.getLastName() != null) {
            existingUser.setLastName(userDTO.getLastName());
        }
        if (userDTO.getAge() != null) {
            existingUser.setAge(userDTO.getAge());
        }

        // Apply OCL constraints validation
        oclValidator.validateUser(existingUser);

        return userRepository.save(existingUser);
    }

    /**
     * Validate user without persisting
     */
    public void validateUser(UserRegistrationDTO userDTO) throws OCLConstraintViolationException {
        User user = convertToEntity(userDTO);
        oclValidator.validateUser(user);
    }

    /**
     * Convert DTO to Entity
     */
    private User convertToEntity(UserRegistrationDTO dto) {
        User user = new User();
        user.setUserName(dto.getUserName());
        user.setPasswordHash(dto.getPasswordHash());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setIsApproved(dto.getIsApproved() != null ? dto.getIsApproved() : false);
        return user;
    }
}

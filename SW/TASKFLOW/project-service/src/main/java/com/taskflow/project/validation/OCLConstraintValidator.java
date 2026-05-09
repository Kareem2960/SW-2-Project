package com.taskflow.project.validation;

import com.taskflow.project.entity.Project;
import com.taskflow.project.entity.ProjectMember;
import org.springframework.stereotype.Component;

/**
 * OCL Constraint Validator for Project Service
 * Implements Object Constraint Language style validations
 */
@Component
public class OCLConstraintValidator {

    /**
     * Project Name Constraint: self.name->size() >= 3
     */
    public boolean validateProjectName(String name) {
        return name != null && name.length() >= 3;
    }

    /**
     * Project Members Constraint: self.members->size() >= 1
     */
    public boolean validateProjectMembers(Project project) {
        return project.getMembers() != null && 
               project.getMembers().size() >= 1;
    }

    /**
     * Manager ID Constraint: self.managerId->notEmpty()
     */
    public boolean validateManagerId(Integer managerId) {
        return managerId != null;
    }

    /**
     * Budget Constraint: self.budget > 0 (if implemented)
     */
    public boolean validateBudget(Double budget) {
        return budget == null || budget > 0;
    }

    /**
     * Member Role Constraint: self.role->size() >= 2
     */
    public boolean validateMemberRole(String role) {
        return role != null && role.length() >= 2;
    }

    /**
     * Complete Project Validation
     */
    public void validateProject(Project project) throws OCLConstraintViolationException {
        if (!validateProjectName(project.getName())) {
            throw new OCLConstraintViolationException("Project name must be at least 3 characters long");
        }

        if (!validateManagerId(project.getManagerId())) {
            throw new OCLConstraintViolationException("Project manager ID is required");
        }

        if (!validateProjectMembers(project)) {
            throw new OCLConstraintViolationException("Project must have at least one member");
        }
    }

    /**
     * Validate Project Member
     */
    public void validateProjectMember(ProjectMember member) throws OCLConstraintViolationException {
        if (member.getUserId() == null) {
            throw new OCLConstraintViolationException("Project member must have a user ID");
        }

        if (member.getProject() == null) {
            throw new OCLConstraintViolationException("Project member must have a project");
        }
    }
}

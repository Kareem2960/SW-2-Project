package com.taskflow.project.validation;

/**
 * OCL Constraint Violation Exception
 * Thrown when OCL constraints are violated
 */
public class OCLConstraintViolationException extends RuntimeException {

    private String constraintName;
    private String entityName;

    public OCLConstraintViolationException(String message) {
        super(message);
    }

    public OCLConstraintViolationException(String message, String constraintName, String entityName) {
        super(message);
        this.constraintName = constraintName;
        this.entityName = entityName;
    }

    public String getConstraintName() {
        return constraintName;
    }

    public String getEntityName() {
        return entityName;
    }

    @Override
    public String toString() {
        return "OCLConstraintViolationException: " + getMessage() + 
               (constraintName != null ? " [Constraint: " + constraintName + "]" : "") +
               (entityName != null ? " [Entity: " + entityName + "]" : "");
    }
}

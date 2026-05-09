package com.taskflow.project.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);

    @Pointcut("execution(* com.taskflow.project.controller..*(..))")
    public void controllerMethods() {}

    @Pointcut("execution(* com.taskflow.project.service..*(..))")
    public void serviceMethods() {}

    @Before("controllerMethods() || serviceMethods()")
    public void logMethodEntry(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        
        logger.info("Entering {}.{} with arguments: {}", 
                   className, methodName, args);
    }

    @AfterReturning(pointcut = "controllerMethods() || serviceMethods()", returning = "result")
    public void logMethodExit(JoinPoint joinPoint, Object result) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        logger.info("Exiting {}.{} with result: {}", 
                   className, methodName, result);
    }

    @AfterThrowing(pointcut = "controllerMethods() || serviceMethods()", throwing = "exception")
    public void logMethodException(JoinPoint joinPoint, Throwable exception) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        logger.error("Exception in {}.{}: {}", 
                    className, methodName, exception.getMessage(), exception);
    }
}

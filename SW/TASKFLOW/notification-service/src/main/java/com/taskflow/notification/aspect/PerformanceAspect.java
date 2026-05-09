package com.taskflow.notification.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class PerformanceAspect {

    private static final Logger logger = LoggerFactory.getLogger(PerformanceAspect.class);

    @Around("execution(* com.taskflow.notification.service..*(..))")
    public Object logServicePerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            if (executionTime > 1000) {
                logger.warn("SLOW PERFORMANCE: {}.{} took {} ms", 
                           className, methodName, executionTime);
            } else {
                logger.debug("Performance: {}.{} took {} ms", 
                           className, methodName, executionTime);
            }
            
            return result;
        } catch (Exception e) {
            long endTime = System.currentTimeMillis();
            logger.error("Exception in {}.{} after {} ms: {}", 
                        className, methodName, endTime - startTime, e.getMessage());
            throw e;
        }
    }

    @Around("execution(* com.taskflow.notification.controller..*(..))")
    public Object logControllerPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        
        try {
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            
            logger.info("API CALL: {}.{} completed in {} ms", 
                       className, methodName, executionTime);
            
            return result;
        } catch (Exception e) {
            long endTime = System.currentTimeMillis();
            logger.error("API ERROR: {}.{} failed after {} ms: {}", 
                        className, methodName, endTime - startTime, e.getMessage());
            throw e;
        }
    }
}

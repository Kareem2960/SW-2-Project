package com.taskflow.gateway.config;

import com.taskflow.gateway.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            // Swagger and API docs routes (no JWT required); rewrite to each service's /v3/api-docs
            .route("auth-service-swagger", r -> r.path("/api/auth/v3/api-docs/**")
                .filters(f -> f.rewritePath("^/api/auth(?<rest>/v3/api-docs.*)$", "${rest}"))
                .uri("http://host.docker.internal:18081"))
            .route("project-service-swagger", r -> r.path("/api/projects/v3/api-docs/**")
                .filters(f -> f.rewritePath("^/api/projects(?<rest>/v3/api-docs.*)$", "${rest}"))
                .uri("http://host.docker.internal:18082"))
            .route("task-service-swagger", r -> r.path("/api/tasks/v3/api-docs/**")
                .filters(f -> f.rewritePath("^/api/tasks(?<rest>/v3/api-docs.*)$", "${rest}"))
                .uri("http://host.docker.internal:18083"))
            .route("notification-service-swagger", r -> r.path("/api/notifications/v3/api-docs/**")
                .filters(f -> f.rewritePath("^/api/notifications(?<rest>/v3/api-docs.*)$", "${rest}"))
                .uri("http://host.docker.internal:18084"))
            // Public auth routes (no JWT at gateway) - MUST come before general /api/auth/** route
            .route("auth-service-public", r -> r.path("/api/auth/register", "/api/auth/login")
                .uri("http://host.docker.internal:18081"))

            // Admin routes (JWT required at gateway)
            .route("auth-service-admin", r -> r.path("/api/admin/**")
                .filters(f -> f.filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
                                .stripPrefix(0))
                .uri("http://host.docker.internal:18081"))

            // Other auth routes: let auth-service enforce its own security
            .route("auth-service", r -> r.path("/api/auth/**")
                .uri("http://host.docker.internal:18081"))
            .route("project-service", r -> r.path("/api/projects/**", "/api/dashboard/**")
                .filters(f -> f.filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
                                .stripPrefix(0))
                .uri("http://host.docker.internal:18082"))
            .route("task-service", r -> r.path("/api/tasks/**")
                .filters(f -> f.filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
                                .stripPrefix(0))
                .uri("http://host.docker.internal:18083"))
            // STOMP/SockJS lives at /notifications on notification-service (not under /api); no JWT on SockJS XHR
            .route("notification-websocket", r -> r.path("/notifications/**")
                .uri("http://host.docker.internal:18084"))
            .route("notification-service", r -> r.path("/api/notifications/**")
                .filters(f -> f.filter(jwtFilter.apply(new JwtAuthenticationFilter.Config()))
                                .stripPrefix(0))
                .uri("http://host.docker.internal:18084"))
            .build();
    }
}

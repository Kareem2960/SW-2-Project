package com.taskflow.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class CorsHeaderCleanupFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            ServerHttpResponse response = exchange.getResponse();
            HttpHeaders headers = response.getHeaders();

            // Remove duplicate CORS headers by keeping only the first value
            String origin = headers.getFirst(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN);
            if (origin != null) {
                headers.remove(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN);
                headers.add(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origin);
            }
        }));
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}

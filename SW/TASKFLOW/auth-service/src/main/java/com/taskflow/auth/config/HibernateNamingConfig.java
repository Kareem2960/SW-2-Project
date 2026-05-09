package com.taskflow.auth.config;

import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class HibernateNamingConfig {

    @Bean
    public HibernatePropertiesCustomizer physicalNamingStrategy() {
        return (Map<String, Object> properties) ->
                properties.put("hibernate.physical_naming_strategy", PhysicalNamingStrategyStandardImpl.class);
    }
}

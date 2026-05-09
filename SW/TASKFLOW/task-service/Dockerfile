# Build stage
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Create settings.xml with retry configuration
RUN mkdir -p ~/.m2 && echo '<?xml version="1.0" encoding="UTF-8"?><settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd"><profiles><profile><id>default</id><properties><maven.wagon.http.retryHandler.count>10</maven.wagon.http.retryHandler.count><maven.wagon.httpconnectionManager.maxTotal>100</maven.wagon.httpconnectionManager.maxTotal><maven.wagon.http.timeout>60000</maven.wagon.http.timeout></properties></profile></profiles><activeProfiles><activeProfile>default</activeProfile></activeProfiles></settings>' > ~/.m2/settings.xml
# Copy parent POM and install it
COPY pom.xml ./pom.xml
RUN mvn install -N -f pom.xml -DskipTests -Dmaven.wagon.http.retryHandler.count=5
# Copy service files
COPY task-service/pom.xml ./task-service/pom.xml
COPY task-service/src ./task-service/src
# Build service
RUN mvn clean package -f task-service/pom.xml -DskipTests -Dmaven.test.skip=true -Dmaven.wagon.http.retryHandler.count=5

# Run stage
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/task-service/target/*.jar app.jar
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]

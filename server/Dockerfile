FROM openjdk:11-jdk-slim

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

# COPY ./resources ./resources

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app.jar"]

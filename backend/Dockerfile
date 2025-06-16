FROM gradle:jdk-21-and-23-graal-jammy AS builder

WORKDIR /app

COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY gradlew ./
COPY gradle gradle/
RUN chmod +x ./gradlew
RUN ./gradlew dependencies --no-daemon

COPY src src/
RUN ./gradlew build --no-daemon -x test

FROM container-registry.oracle.com/graalvm/jdk:23

WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
FROM maven:3.9.4-amazoncorretto-17

WORKDIR /app
COPY . .

RUN mvn clean package -DskipTests

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "target/fridger-0.0.1-SNAPSHOT.jar"]


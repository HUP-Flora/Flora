package com.ssafy.floraserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class FloraServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(FloraServerApplication.class, args);
    }

}

package com.atu1117.jee_final;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.atu1117.jee_final.dao")
public class JeeFinalApplication {

    public static void main(String[] args) {
        SpringApplication.run(JeeFinalApplication.class, args);
    }

}

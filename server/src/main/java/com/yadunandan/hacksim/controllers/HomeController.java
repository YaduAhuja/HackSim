package com.yadunandan.hacksim.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    String getHello() {
        return "Hello hacksim";
    }
}

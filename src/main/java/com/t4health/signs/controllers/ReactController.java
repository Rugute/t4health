package com.t4health.signs.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

    @Controller
    public class ReactController {

        // Catch all routes that are not API calls
        @GetMapping(value = {"/{path:[^\\.]*}", "/**/{path:^(?!api$).*}"})
        public String redirect() {
            return "forward:/index.html";
        }
    }


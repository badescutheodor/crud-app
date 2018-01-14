package com.web.app.controller;

import com.web.app.model.User;
import com.web.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public @ResponseBody
    String register(@RequestBody HashMap<String, String> apiInput) {
        String username = apiInput.get("username");
        String passwd = apiInput.get("password");
        return userService.registerUser(username, passwd);
    }

    @PostMapping("/list")
    public @ResponseBody
    Iterable<User> list() {
        return userService.list();
    }

    @PostMapping("/remove")
    public @ResponseBody
    String remove(@RequestBody HashMap<String, Number> apiInput) {
        return userService.remove(apiInput.get("id").longValue());
    }

}

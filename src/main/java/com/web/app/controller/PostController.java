package com.web.app.controller;

import com.web.app.model.Post;
import com.web.app.service.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostRepository postRepository;

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public @ResponseBody
    String register(@RequestBody HashMap<String, String> input) {
        Post post = new Post(input.get("title"), input.get("content"));
        postRepository.save(post);
        return "added post";
    }

    @PostMapping("/list")
    public @ResponseBody
    Iterable<Post> list() {
        return postRepository.findAll();
    }

    @PostMapping("/find")
    public @ResponseBody
    Iterable<Post> find(@RequestBody Iterable<Long> input) {
        return postRepository.findAll(input);
    }

    @PostMapping("/remove")
    public @ResponseBody
    String remove(@RequestBody HashMap<String, Number> input) {
        postRepository.delete(input.get("id").longValue());
        return "removed post";
    }

}

package com.web.app.service;

import com.web.app.model.User;
import com.web.app.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public String registerUser(String username, String passwd) {
        User user = new User(username, encoder.encode(passwd));
        userRepository.save(user);
        return "saved " + username;
    }

    public Iterable<User> list() {
        return userRepository.findAll();
    }

    public String remove(Long id) {
        User user = userRepository.findOne(id);
        userRepository.delete(id);
        return "removed " + id;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //Add default admin
        if (!userRepository.existsByUsername("admin"))
            registerUser("admin", "admin");

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), Collections.emptySet());
    }
}

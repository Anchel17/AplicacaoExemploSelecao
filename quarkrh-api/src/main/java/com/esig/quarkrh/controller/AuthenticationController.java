package com.esig.quarkrh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.esig.quarkrh.entity.Users;
import com.esig.quarkrh.record.AuthenticationRecord;
import com.esig.quarkrh.record.RegisterRecord;
import com.esig.quarkrh.repository.UserRepository;
import com.esig.quarkrh.security.service.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  @Valid AuthenticationRecord authenticationRecord){
        var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationRecord.login(), authenticationRecord.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        
        var token = tokenService.generateToken((Users)auth.getPrincipal());
        
        return ResponseEntity.ok(token);
    }
    
    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRecord registerRecord){
        if(this.userRepository.findByLogin(registerRecord.login()) != null ) {
            return ResponseEntity.badRequest().build();
        }
        
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerRecord.password());
        var user = new Users(registerRecord.login(), encryptedPassword, registerRecord.role());
        
        this.userRepository.save(user);
        
        return ResponseEntity.ok().build();
    }
}

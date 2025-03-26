package com.esig.quarkrh.security.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.esig.quarkrh.entity.Users;

@Service
public class TokenService {
    
    @Value("${api.security.token.secret}")
    private String secret;
    
    public String generateToken(Users user) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                                .withIssuer("quarkrh")
                                .withSubject(user.getLogin())
                                .withExpiresAt(generateExpirationDate())
                                .sign(algorithm);
        }
        catch(JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar token JWT para o usuário", e);
        }
    }
    
    public String validateToken(String token) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            
            return JWT.require(algorithm)
                        .withIssuer("quarkrh")
                        .build()
                        .verify(token)
                        .getSubject();
        }
        catch(JWTVerificationException e) {
            return "";
        }
    }
    
    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}

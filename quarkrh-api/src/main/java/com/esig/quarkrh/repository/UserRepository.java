package com.esig.quarkrh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.esig.quarkrh.entity.Users;

public interface UserRepository extends JpaRepository<Users, String>{
    UserDetails findByLogin(String login);
}

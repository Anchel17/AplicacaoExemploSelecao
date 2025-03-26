package com.esig.quarkrh.record;

import com.esig.quarkrh.enums.UserRole;

public record RegisterRecord(String login, String password, UserRole role) {

}

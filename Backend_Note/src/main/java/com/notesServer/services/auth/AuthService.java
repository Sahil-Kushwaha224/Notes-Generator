package com.notesServer.services.auth;


import com.notesServer.dto.SignupRequest;
import com.notesServer.dto.UserDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthService {

     UserDto createUser(SignupRequest signupRequest) throws Exception;

     Boolean hasUserWithEmail(String email);

     UserDto getUserById(Long userId);

//     UserDto updateUser(UserDto userDto) throws IOException;
//
//    ResponseEntity<?> updatePasswordById(ChangePasswordDto changePasswordDto);
}

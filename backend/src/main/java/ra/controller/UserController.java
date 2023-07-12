package ra.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ra.dto.reponse.JwtResponse;
import ra.dto.reponse.ResponseMessage;
import ra.dto.request.ChangePass;
import ra.dto.request.SignInForm;
import ra.dto.request.SignUpForm;
import ra.model.Role;
import ra.model.RoleName;
import ra.model.User;
import ra.repository.UserRepository;
import ra.security.jwt.JwtProvider;
import ra.security.userPrincipal.UserDetailService;
import ra.security.userPrincipal.UserPrincipal;
import ra.service.role.RoleService;
import ra.service.user.UserService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/api/auth")
public class UserController {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private RoleService roleService;

    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    @PostMapping("/signup")
    public ResponseEntity<ResponseMessage> doSignUp( @RequestBody SignUpForm signUpForm) {
        boolean isExistUsername = userService.existsByUsername(signUpForm.getUsername());
        if (isExistUsername) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    ResponseMessage.builder()
                            .status("FAILED")
                            .message("This username is already existed!")
                            .data("")
                            .build()
            );
        }

        boolean isExistEmail = userService.existsByEmail(signUpForm.getEmail());
        if (isExistEmail) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    ResponseMessage.builder()
                            .status("FAILED")
                            .message("This email is already existed!")
                            .data("")
                            .build()
            );
        }


        Set<Role> roles = new HashSet<>();

        if (signUpForm.getRoles() == null || signUpForm.getRoles().isEmpty()) {
            Role role = roleService.findByName(RoleName.STUDENT)
                    .orElseThrow(() -> new RuntimeException("Failed -> NOT FOUND ROLE"));
            roles.add(role);
        } else {
            signUpForm.getRoles().forEach(role -> {
                switch (role) {
                    case "ADMIN":
                        Role adminRole = roleService.findByName(RoleName.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Failed -> NOT FOUND ROLE"));
                        roles.add(adminRole);
//                        break;
                    case "PM":
                        Role pmRole = roleService.findByName(RoleName.PM)
                                .orElseThrow(() -> new RuntimeException("Failed -> NOT FOUND ROLE"));
                        roles.add(pmRole);
//                        break;
                    case "TEACHER":
                        Role teacherRole = roleService.findByName(RoleName.TEACHER)
                                .orElseThrow(() -> new RuntimeException("Failed -> NOT FOUND ROLE"));
                        roles.add(teacherRole);
//                        break;
                    case "STUDENT":
                        Role studentRole = roleService.findByName(RoleName.STUDENT)
                                .orElseThrow(() -> new RuntimeException("Failed -> NOT FOUND ROLE"));
                        roles.add(studentRole);
//                        break;
                }
            });
        }

        User user = User.builder()
                .name(signUpForm.getName())
                .username(signUpForm.getUsername())
                .password(passwordEncoder.encode(signUpForm.getPassword()))
                .email(signUpForm.getEmail())
                .avatar(signUpForm.getAvatar())
                .phoneNumber(signUpForm.getPhoneNumber())
                .address(signUpForm.getAddress())
                .birthDate(signUpForm.getBirthDate())
                .roles(roles)
                .build();

        return ResponseEntity.ok().body(
                ResponseMessage.builder()
                        .status("OK")
                        .message("Account created successfully!")
                        .data(userService.save(user))
                        .build()
        );
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signIn")
    public ResponseEntity<?> doSignIn(@RequestBody SignInForm signInForm) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            signInForm.getUsername(),
                            signInForm.getPassword())
                    );
            String token = jwtProvider.generateToken(authentication);
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            return new ResponseEntity<>(
                    JwtResponse.builder()
                            .status("OK")
                            .type("Bearer")
                            .name(userPrincipal.getName())
                            .email(userPrincipal.getEmail())
                            .address(userPrincipal.getAddress())
                            .phoneNumber(userPrincipal.getPhoneNumber())
                            .birthDate(userPrincipal.getBirthDate())
                            .status(String.valueOf(userPrincipal.isStatus()))
                            .token(token)
                            .roles(userPrincipal.getAuthorities())
                            .build(), HttpStatus.OK);

        } catch (AuthenticationException e) {
            return new ResponseEntity<>(
                    ResponseMessage.builder()
                            .status("Failed")
                            .message("Invalid email or password!")
                            .data("")
                            .build(), HttpStatus.UNAUTHORIZED);
        }
    }
    @PutMapping("/change-password")
    public ResponseEntity<ResponseMessage> changPass(@RequestBody ChangePass changePass){
        User user = userDetailService.getFromAuthentication();
        String pass = user.getPassword();
        if (!passwordEncoder.matches(changePass.getOldPass(), pass)){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseMessage("Failed","Mật khẩu trùng!!",null)
            );
        }
        user.setPassword(passwordEncoder.encode(changePass.getNewPass()));
        userRepository.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/show-all")
    public List<User> findAllUser() {
        return userService.findAll();
    }

    @PutMapping("/block-user/{id}")
    public ResponseEntity<ResponseMessage> blockUser(@PathVariable String id){
        userRepository.blockUser(Long.valueOf(id));
        return new ResponseEntity<>(new ResponseMessage("","Block success!!",null), HttpStatus.OK);
    }
    @PutMapping("/unblock-user/{id}")
    public ResponseEntity<ResponseMessage>  unblockUser(@PathVariable String id){
        userRepository.unBlockUser(Long.valueOf(id));
        return new ResponseEntity<>(new ResponseMessage("","Unblock success!!",null), HttpStatus.OK);
    }
}

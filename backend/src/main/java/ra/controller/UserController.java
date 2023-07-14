package ra.controller;

import lombok.RequiredArgsConstructor;
import org.omg.CORBA.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ra.dto.reponse.JwtResponse;
import ra.dto.reponse.ResponseMessage;
import ra.dto.request.*;
import ra.model.Role;
import ra.model.RoleName;
import ra.model.User;
import ra.repository.UserRepository;
import ra.security.jwt.JwtProvider;
import ra.security.jwt.JwtTokenFilter;
import ra.security.userPrincipal.UserDetailService;
import ra.security.userPrincipal.UserPrincipal;
import ra.service.role.RoleService;
import ra.service.user.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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
    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @PostMapping("/signup")
    @PreAuthorize("hasAnyAuthority('ADMIN','PM','TEACHER')")
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
                    new ResponseMessage("Failed","Mật khẩu cũ không khớp!!",null)
            );
        }
        if (!changePass.getRePass().matches(changePass.getNewPass())){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseMessage("Failed","Mật khẩu mới không khớp nhau!!",null)
            );
        } else
        user.setPassword(passwordEncoder.encode(changePass.getNewPass()));
        userRepository.save(user);
        new ResponseMessage("OK","Đổi mật khẩu thành công!!",null);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/show-all")
    public List<User> findAllUser() {
        return userService.findAll();
    }

    //2 phương thức block và unblock bị ngược nhau :))
    @PutMapping("/unblock-user/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage> blockUser(@PathVariable String id){
        userRepository.blockUser(Long.valueOf(id));
        return new ResponseEntity<>(new ResponseMessage("OK","unblock success!!",null), HttpStatus.OK);
    }
    @PutMapping("/block-user/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseMessage>  unblockUser(@PathVariable String id){
        userRepository.unBlockUser(Long.valueOf(id));
        return new ResponseEntity<>(new ResponseMessage("OK","Block success!!",null), HttpStatus.OK);
    }
    @PutMapping("/change-avatar")
    public ResponseEntity<?> changeAvatar(HttpServletRequest request, @RequestBody ChangeAvatar changeAvatar){
        String token = jwtTokenFilter.getTokenFromRequest(request);
        String username = jwtProvider.getUserNameFromToken(token);
        User user = userService.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username Not found"));
        if(changeAvatar.getAvatar()==null||changeAvatar.getAvatar().trim().equals("")){
            return new ResponseEntity<>(new ResponseMessage("Failed","Thay đổi avatar lỗi",null), HttpStatus.OK);
        }else {
            user.setAvatar(changeAvatar.getAvatar());
            userService.save(user);
            return new ResponseEntity<>(new ResponseMessage("OK","Đổi avatar thành công",userService.save(user)), HttpStatus.OK);
        }
    }
    @PutMapping("/updateProfile")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_SELLER','ROLE_SM','ROLE_USER')")
    @Transactional(rollbackFor = UserException.class)
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfile user) {
        Long userId = userDetailService.getFromAuthentication().getId();
        Optional<User> usersOptional = userService.findUserById(userId);
        User userOld = usersOptional.get();
        User users = User.builder()
                .id(userId)
                .username(user.getUsername() == null ? userOld.getUsername() : user.getUsername())
                .name(user.getName() == null ? userOld.getName() : user.getName())
                .email(user.getEmail() == null ? userOld.getEmail() : user.getEmail())
                .address(user.getAddress()==null ? userOld.getAddress() : user.getAddress())
                .avatar(user.getAvatar() == null ? userOld.getAvatar() : user.getAvatar())
                .phoneNumber(user.getPhoneNumber() == null ? userOld.getPhoneNumber() : user.getPhoneNumber())
                .address(user.getAddress() == null ? userOld.getAddress() : user.getAddress())
                .password(userOld.getPassword())
                .status(userOld.isStatus())
                .birthDate(userOld.getBirthDate())
                .roles(userOld.getRoles())

                .build();
        userService.save(users);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public User findUserById(@PathVariable String id){
        return userService.findUserById(Long.valueOf(id)).get();
    }
}

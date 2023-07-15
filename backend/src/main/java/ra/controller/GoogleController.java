package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ra.dto.reponse.ResponseMessage;
import ra.model.User;
import ra.service.user.UserService;

@RestController
@RequestMapping("/v1/api/auth")
public class GoogleController {
    @Autowired
    private UserService userService;
    private OAuth2User oauth2User;
    @GetMapping("/google")
    public ResponseEntity<ResponseMessage> getOAuth2(){

        return ResponseEntity.ok().body(
                ResponseMessage.builder()
                        .status("OK")
                        .message("Account created successfully!")
                        .data(userService.save((User) oauth2User))
                        .build()
        );
    }
}

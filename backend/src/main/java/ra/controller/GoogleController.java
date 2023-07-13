package ra.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/api/auth")
public class GoogleController {

    private static final String CLIENT_PROPERTY_KEY = "1013389625787-rbl8u76k4borqtr88rr2420hnpga6sfn.apps.googleusercontent.com";

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @GetMapping("/login/google")
    public String loginGoogle() {
        ClientRegistration clientRegistration = getClientRegistration();
        if (clientRegistration != null) {
            return "redirect:" + clientRegistration.getProviderDetails().getAuthorizationUri();
        }
        return "redirect:/error";
    }

    private ClientRegistration getClientRegistration() {
        return clientRegistrationRepository.findByRegistrationId("google");
    }
}
